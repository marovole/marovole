import { defineCollection, z } from 'astro:content';

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    image: z.string().optional(),
    demoUrl: z.string().optional(),
    repoUrl: z.string().optional(),
    featured: z.boolean().default(false),
    date: z.string().or(z.date()),
    lang: z.enum(['en', 'zh']).default('en'),
  }),
});

export const collections = {
  projects,
};
