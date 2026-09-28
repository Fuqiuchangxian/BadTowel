import { getCollection } from 'astro:content';

// 按日期从新到旧；同一天的，文件名大的在前。
export async function getPosts() {
  const posts = await getCollection('blog');
  return posts.sort((a, b) => b.data.date.localeCompare(a.data.date) || b.id.localeCompare(a.id));
}

export const formatDate = (date: string) => date.replaceAll('-', '.');
