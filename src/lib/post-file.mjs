// 博客 .md 文件的读写格式，线上写作接口（src/pages/api/write）和本地工具（tools/write-blog.mjs）共用。

/** 解析 frontmatter + 正文 */
export function parsePost(text) {
  const m = text.replace(/\r\n/g, '\n').match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) return { body: text };
  const data = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i < 0) continue;
    const v = line.slice(i + 1).trim();
    data[line.slice(0, i).trim()] = v.startsWith('"') ? JSON.parse(v) : v === 'false' ? false : v === 'true' ? true : v;
  }
  return { public: true, lockReason: '', ...data, body: m[2].replace(/^\n+/, '').trimEnd() };
}

/** 未公开的文章正文也写进文件，但博客页面不会渲染它 */
export function serializePost(p) {
  let fm = `title: ${JSON.stringify(p.title)}\ndate: ${JSON.stringify(p.date)}\n`;
  if (!p.public) fm += `public: false\nlockReason: ${JSON.stringify(p.lockReason)}\n`;
  return `---\n${fm}---\n\n${p.body}\n`;
}

/** 校验并整理页面提交的内容，出错时抛出中文提示 */
export function cleanPost(input) {
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
  if (input.id != null && !/^\d+$/.test(String(input.id))) throw new Error('文章编号不对');
  return p;
}

/** 文件名列表 → 下一篇的编号，如 012 */
export function nextId(names) {
  const nums = names.map((f) => parseInt(f, 10)).filter(Number.isFinite);
  return String(Math.max(0, ...nums) + 1).padStart(3, '0');
}

export const sortPosts = (posts) => posts.sort((a, b) => b.date.localeCompare(a.date) || b.id.localeCompare(a.id));
