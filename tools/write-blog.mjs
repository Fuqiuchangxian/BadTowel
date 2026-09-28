// 本地写博客工具：双击根目录的「写博客.bat」，或运行 npm run write
// 只在本机 127.0.0.1 上运行。点「发布」会写入 src/content/blog/xxx.md，然后 git commit + push，Vercel 自动上线。
// 未公开的文章：网站仓库里只保存标题和理由，正文另存在本地 drafts/（不会上传）。
import http from 'node:http';
import { mkdir, readdir, readFile, writeFile } from 'node:fs/promises';
import { exec, execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const POSTS = path.join(ROOT, 'src/content/blog');
const DRAFTS = path.join(ROOT, 'drafts');
const PAGE = fileURLToPath(new URL('write-blog.html', import.meta.url));
const PORT = 4399;
const ORIGIN = `http://127.0.0.1:${PORT}`;
const SITE = 'https://www.badtowel.com';

const git = (...args) =>
  new Promise((resolve, reject) =>
    execFile('git', args, { cwd: ROOT }, (err, stdout, stderr) => {
      const out = `${stdout}${stderr}`.trim();
      err ? reject(new Error(out || err.message)) : resolve(out);
    }),
  );

const exists = (file) => readFile(file, 'utf8').catch(() => null);

function parse(text) {
  const m = text.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { body: text };
  const data = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i < 0) continue;
    const v = line.slice(i + 1).trim();
    data[line.slice(0, i).trim()] = v.startsWith('"') ? JSON.parse(v) : v === 'false' ? false : v === 'true' ? true : v;
  }
  return { ...data, body: m[2].replace(/^\n+/, '').trimEnd() };
}

function serialize(p) {
  let fm = `title: ${JSON.stringify(p.title)}\ndate: ${JSON.stringify(p.date)}\n`;
  if (!p.public) fm += `public: false\nlockReason: ${JSON.stringify(p.lockReason)}\n`;
  return `---\n${fm}---\n\n${p.public ? p.body + '\n' : ''}`;
}

async function listPosts() {
  const files = (await readdir(POSTS)).filter((f) => f.endsWith('.md'));
  const posts = await Promise.all(
    files.map(async (f) => {
      const { title, date, public: pub = true } = parse(await readFile(path.join(POSTS, f), 'utf8'));
      return { id: f.slice(0, -3), title, date, public: pub };
    }),
  );
  return posts.sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
}

async function getPost(id) {
  const post = parse(await readFile(path.join(POSTS, `${id}.md`), 'utf8'));
  if (post.public === false) post.body = (await exists(path.join(DRAFTS, `${id}.md`))) ?? '';
  return { id, public: true, lockReason: '', ...post };
}

async function publish(input) {
  const p = {
    title: String(input.title ?? '').trim(),
    date: String(input.date ?? ''),
    public: input.public !== false,
    lockReason: String(input.lockReason ?? '').trim(),
    body: String(input.body ?? '').replace(/\r\n/g, '\n').trim(),
  };
  if (!p.title) throw new Error('标题不能为空');
  if (!/^\d{4}-\d{2}-\d{2}$/.test(p.date)) throw new Error('日期格式应为 2026-09-28');
  if (!p.body) throw new Error('正文不能为空');

  let id = input.id;
  const isNew = !id;
  if (isNew) {
    const nums = (await readdir(POSTS)).map((f) => parseInt(f, 10)).filter(Number.isFinite);
    id = String(Math.max(0, ...nums) + 1).padStart(3, '0');
  } else if (!/^\d+$/.test(id)) {
    throw new Error('文章编号不对');
  }

  await writeFile(path.join(POSTS, `${id}.md`), serialize(p));
  if (!p.public) {
    await mkdir(DRAFTS, { recursive: true });
    await writeFile(path.join(DRAFTS, `${id}.md`), p.body + '\n');
  }

  const rel = `src/content/blog/${id}.md`;
  const log = [];
  await git('add', '--', rel);
  const changed = await git('diff', '--cached', '--quiet', '--', rel).then(() => false, () => true);
  if (changed) {
    await git('commit', '-m', `${isNew ? 'Add' : 'Update'} post: ${p.title}`, '--', rel);
    log.push('已保存到本地仓库');
  } else {
    log.push('内容没有变化');
  }

  // 网络偶尔会断，推送失败就再试两次；上一次没推上去的提交也会一起推上去
  let lastErr;
  for (let i = 0; i < 3; i++) {
    try {
      await git('pull', '--rebase', '--autostash', 'origin', 'master');
      await git('push', 'origin', 'master');
      log.push('已推送到 GitHub，大约 1 分钟后网站更新');
      return { id, url: `${SITE}/blog/${id}/`, log };
    } catch (e) {
      lastErr = e;
    }
  }
  throw new Error(`已保存在本地，但推送到 GitHub 失败（多半是网络问题），稍后再点一次「发布」即可。\n\n${lastErr.message}`);
}

const send = (res, status, body, type = 'application/json; charset=utf-8') => {
  res.writeHead(status, { 'Content-Type': type, 'Cache-Control': 'no-store' });
  res.end(type.startsWith('application/json') ? JSON.stringify(body) : body);
};

const readBody = (req) =>
  new Promise((resolve, reject) => {
    let s = '';
    req.setEncoding('utf8');
    req.on('data', (d) => (s += d));
    req.on('end', () => resolve(s));
    req.on('error', reject);
  });

const server = http.createServer(async (req, res) => {
  // 只接受本机页面发来的请求，防止别的网站借你的浏览器往仓库里写东西
  if (req.headers.host !== `127.0.0.1:${PORT}` || (req.headers.origin && req.headers.origin !== ORIGIN)) {
    return send(res, 403, { error: 'forbidden' });
  }
  try {
    const url = new URL(req.url, ORIGIN);
    if (req.method === 'GET' && url.pathname === '/') {
      return send(res, 200, await readFile(PAGE, 'utf8'), 'text/html; charset=utf-8');
    }
    if (req.method === 'GET' && url.pathname === '/api/posts') return send(res, 200, await listPosts());
    const m = url.pathname.match(/^\/api\/posts\/(\d+)$/);
    if (req.method === 'GET' && m) return send(res, 200, await getPost(m[1]));
    if (req.method === 'POST' && url.pathname === '/api/publish') {
      if (!req.headers['content-type']?.startsWith('application/json')) return send(res, 415, { error: 'json only' });
      return send(res, 200, await publish(JSON.parse(await readBody(req))));
    }
    send(res, 404, { error: 'not found' });
  } catch (e) {
    send(res, 500, { error: e.message });
  }
});

const openBrowser = () => {
  const cmd = process.platform === 'win32' ? `start "" ${ORIGIN}` : process.platform === 'darwin' ? `open ${ORIGIN}` : `xdg-open ${ORIGIN}`;
  exec(cmd);
};

server.on('error', (e) => {
  if (e.code === 'EADDRINUSE') {
    console.log('写博客工具已经开着了，直接打开浏览器。');
    openBrowser();
  } else {
    console.error(e);
  }
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`写博客工具已启动：${ORIGIN}`);
  console.log('写完关掉这个窗口即可。');
  openBrowser();
});
