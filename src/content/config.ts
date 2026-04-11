import { defineCollection, z } from 'astro:content';

const poems = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    collection: z.string().optional().default(''),
    backstory: z.string().optional().default(''),
    public: z.boolean().optional().default(true),
    lockReason: z.string().optional().default(''),
    starred: z.boolean().optional().default(false),
    order: z.number().optional(),
  }),
});

const songs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    album: z.string().optional().default(''),
    platforms: z.array(z.object({ name: z.string(), url: z.string() })).optional().default([]),
    artImage: z.string().optional().default(''),
    notes: z.string().optional().default(''),
    public: z.boolean().optional().default(true),
    lockReason: z.string().optional().default(''),
    starred: z.boolean().optional().default(false),
    order: z.number().optional(),
  }),
});

const blogs = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    links: z.array(z.object({ text: z.string(), type: z.enum(['poem', 'song', 'blog', 'note']), targetId: z.string() })).optional().default([]),
    public: z.boolean().optional().default(true),
    lockReason: z.string().optional().default(''),
    starred: z.boolean().optional().default(false),
    order: z.number().optional(),
  }),
});

const notes = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.string(),
    categories: z.array(z.string()).optional().default([]),
    public: z.boolean().optional().default(true),
    lockReason: z.string().optional().default(''),
    starred: z.boolean().optional().default(false),
    order: z.number().optional(),
  }),
});

export const collections = { poems, songs, blogs, notes };
