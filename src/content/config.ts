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
    otherLocaleSlug: z.string().optional(),
  }),
});

const essays = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    titleEn: z.string(),
    description: z.string(),
    descriptionEn: z.string(),
    category: z.string(),
    categoryEn: z.string(),
    date: z.string(),
    cover: z.string(),
    order: z.number().default(99),
    takeaways: z.array(z.string()).optional(),
    takeawaysEn: z.array(z.string()).optional(),
  }),
});

export const collections = {
  projects,
  essays,
};
