// 本地写博客工具（线上 www.badtowel.com/write 的备用版）：双击根目录的「写博客.bat」，或运行 npm run write
// 只在本机 127.0.0.1 上运行。点「发布」会写入 src/content/blog/xxx.md，然后 git commit + push，Vercel 自动上线。
// 页面和线上共用 tools/write-blog.html，接口也和 src/pages/api/write.ts 一样，只是本地不用密码。
import http from 'node:http';
import { readdir, readFile, writeFile } from 'node:fs/promises';
import { exec, execFile } from 'node:child_process';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { cleanPost, nextId, parsePost, serializePost, sortPosts } from '../src/lib/post-file.mjs';

const ROOT = fileURLToPath(new URL('..', import.meta.url));
const POSTS = path.join(ROOT, 'src/content/blog');
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

const names = async () => (await readdir(POSTS)).filter((f) => f.endsWith('.md'));

async function listPosts() {
  const posts = await Promise.all(
    (await names()).map(async (f) => {
      const { title, date, public: pub } = parsePost(await readFile(path.join(POSTS, f), 'utf8'));
      return { id: f.slice(0, -3), title, date, public: pub };
    }),
  );
  return sortPosts(posts);
}

const getPost = async (id) => ({ id, ...parsePost(await readFile(path.join(POSTS, `${id}.md`), 'utf8')) });

async function publish(input) {
  const p = cleanPost(input);
  const isNew = !input.id;
  const id = isNew ? nextId(await names()) : String(input.id);
  await writeFile(path.join(POSTS, `${id}.md`), serializePost(p));

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
    if (url.pathname === '/api/write') {
      const id = url.searchParams.get('id');
      if (req.method === 'GET' && id) {
        return /^\d+$/.test(id) ? send(res, 200, await getPost(id)) : send(res, 404, { error: '找不到这篇文章' });
      }
      if (req.method === 'GET') return send(res, 200, await listPosts());
      if (req.method === 'POST') {
        if (!req.headers['content-type']?.startsWith('application/json')) return send(res, 415, { error: 'json only' });
        return send(res, 200, await publish(JSON.parse(await readBody(req))));
      }
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
