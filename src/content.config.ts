import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 博客文章：src/content/blog/*.md，文件名就是网址，例如 011.md → /blog/011
// public: false 的文章只显示标题和 lockReason，正文不会被发布。
const schema = z.object({
  title: z.string(),
  date: z.string(),
  public: z.boolean().default(true),
  lockReason: z.string().default(''),
});

const blog = defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/blog' }), schema });
// 诗歌：src/content/poetry/*.md，格式和博客完全一样，文件名 001.md → /poetry/001
const poetry = defineCollection({ loader: glob({ pattern: '*.md', base: './src/content/poetry' }), schema });

export const collections = { blog, poetry };
