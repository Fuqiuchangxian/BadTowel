import { getCollection } from 'astro:content';

/** 博客和诗歌是两个结构完全一样的栏目：src/content/<kind>/*.md，网址是 /<kind>/<文件名> */
export type Kind = 'blog' | 'poetry';

// 按日期从新到旧；同一天的，文件名大的在前。
export async function getPosts(kind: Kind = 'blog') {
  const posts = await getCollection(kind);
  return posts.sort((a, b) => b.data.date.localeCompare(a.data.date) || b.id.localeCompare(a.id));
}

export const formatDate = (date: string) => date.replaceAll('-', '.');

export const sections = {
  blog: { label: '博客', path: '/blog/', empty: '还没有文章。' },
  poetry: { label: '诗歌', path: '/poetry/', empty: '还没有诗。' },
} as const;
