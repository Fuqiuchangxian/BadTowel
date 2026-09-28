import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// 博客文章：src/content/blog/*.md，文件名就是网址，例如 011.md → /blog/011
// public: false 的文章只显示标题和 lockReason，正文不会被发布。
const blog = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    public: z.boolean().default(true),
    lockReason: z.string().default(''),
  }),
});

export const collections = { blog };
