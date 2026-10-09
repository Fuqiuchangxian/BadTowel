// 线上写作接口：/write 页面通过它读写 GitHub 仓库里的博客文件，推送后 Vercel 自动重新部署。
// 需要在 Vercel 环境变量里配置：
//   GITHUB_TOKEN   只授权 BadTowel 仓库 Contents 读写的 fine-grained token
//   WRITE_PASSWORD 发布密码
import type { APIRoute } from 'astro';
import { createHash, timingSafeEqual } from 'node:crypto';
import { cleanPost, nextId, parsePost, serializePost, sortPosts } from '../../lib/post-file.mjs';

export const prerender = false;

const REPO = 'Fuqiuchangxian/BadTowel';
const BRANCH = 'master';
const DIRS = { blog: 'src/content/blog', poetry: 'src/content/poetry' } as const;
const kindOf = (v: unknown) => (v === 'poetry' ? 'poetry' : 'blog');
const SITE = 'https://www.badtowel.com';

const json = (body: unknown, status = 200) =>
  new Response(JSON.stringify(body), {
    status,
    headers: { 'Content-Type': 'application/json; charset=utf-8', 'Cache-Control': 'no-store' },
  });

const sha256 = (s: string) => createHash('sha256').update(s).digest();

/** 未配置或密码不对时返回错误响应，通过时返回 null */
async function guard(request: Request) {
  const expected = process.env.WRITE_PASSWORD;
  if (!expected || !process.env.GITHUB_TOKEN) {
    return json({ error: '网站还没配置 WRITE_PASSWORD / GITHUB_TOKEN 环境变量' }, 503);
  }
  const given = request.headers.get('authorization')?.replace(/^Bearer /, '') ?? '';
  if (timingSafeEqual(sha256(given), sha256(expected))) return null;
  // 猜错密码要多等一秒，拖慢暴力尝试
  await new Promise((r) => setTimeout(r, 1000));
  return json({ error: '密码不对' }, 401);
}

async function github(path: string, init: RequestInit = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
    ...init,
    headers: {
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
      'User-Agent': 'badtowel-write',
      ...init.headers,
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || data.errors) throw new Error(`GitHub 返回错误（${res.status}）：${data.message ?? JSON.stringify(data.errors)}`);
  return data;
}

/** 一次请求拿到目录里所有文章的全文 */
async function readAll(kind: keyof typeof DIRS): Promise<{ name: string; oid: string; text: string }[]> {
  const [owner, name] = REPO.split('/');
  const { data } = await github('/graphql', {
    method: 'POST',
    body: JSON.stringify({
      query: `query($owner: String!, $name: String!, $expr: String!) {
        repository(owner: $owner, name: $name) {
          object(expression: $expr) { ... on Tree { entries { name object { ... on Blob { oid text } } } } }
        }
      }`,
      variables: { owner, name, expr: `${BRANCH}:${DIRS[kind]}` },
    }),
  });
  // 目录里还没有任何文章时（比如刚建的诗歌栏目），仓库里没有这个目录
  return (data.repository.object?.entries ?? [])
    .filter((e: any) => e.name.endsWith('.md'))
    .map((e: any) => ({ name: e.name, oid: e.object.oid, text: e.object.text ?? '' }));
}

export const GET: APIRoute = async ({ request, url }) => {
  const denied = await guard(request);
  if (denied) return denied;
  try {
    const files = await readAll(kindOf(url.searchParams.get('c')));
    const id = url.searchParams.get('id');
    if (id) {
      const file = files.find((f) => f.name === `${id}.md`);
      return file ? json({ id, ...parsePost(file.text) }) : json({ error: '找不到这篇文章' }, 404);
    }
    const posts = files.map((f) => {
      const { title, date, public: pub } = parsePost(f.text);
      return { id: f.name.slice(0, -3), title, date, public: pub };
    });
    return json(sortPosts(posts));
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
};

export const POST: APIRoute = async ({ request }) => {
  const denied = await guard(request);
  if (denied) return denied;
  try {
    const input = await request.json();
    const post = cleanPost(input);
    const kind = kindOf(input.kind);
    const files = await readAll(kind);
    const isNew = !input.id;
    const id = isNew ? nextId(files.map((f) => f.name)) : String(input.id);
    const existing = files.find((f) => f.name === `${id}.md`);
    const content = serializePost(post);
    const url = `${SITE}/${kind}/${id}/`;

    if (existing && existing.text.replace(/\r\n/g, '\n') === content) {
      return json({ id, url, log: ['内容没有变化'] });
    }
    await github(`/repos/${REPO}/contents/${DIRS[kind]}/${id}.md`, {
      method: 'PUT',
      body: JSON.stringify({
        message: `${existing ? 'Update' : 'Add'} ${kind === 'poetry' ? 'poem' : 'post'}: ${post.title}`,
        content: Buffer.from(content, 'utf8').toString('base64'),
        branch: BRANCH,
        ...(existing && { sha: existing.oid }),
      }),
    });
    return json({ id, url, log: ['已保存到 GitHub', '大约 1 分钟后网站更新'] });
  } catch (e) {
    return json({ error: (e as Error).message }, 500);
  }
};
