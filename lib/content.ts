import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { z } from "zod";
import { renderMarkdown, type TocItem } from "./markdown";

const root = process.cwd();
const articlesDir = path.join(root, "content", "articles");
const projectsDir = path.join(root, "content", "projects");

const articleSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  updated: z.string().optional(),
  tags: z.array(z.string()).default([]),
  category: z.string().min(1),
  series: z.string().optional(),
  order: z.number().optional(),
  cover: z.string().optional(),
  draft: z.boolean().default(false),
  featured: z.boolean().default(false)
});

const projectSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  tags: z.array(z.string()).default([]),
  status: z.string().default("进行中"),
  url: z.string().optional(),
  image: z.string().optional(),
  featured: z.boolean().default(false),
  draft: z.boolean().default(false)
});

export type Article = z.infer<typeof articleSchema> & {
  slug: string;
  readingMinutes: number;
  content: string;
  html: string;
  toc: TocItem[];
};

export type Project = z.infer<typeof projectSchema> & {
  slug: string;
  content: string;
  html: string;
  toc: TocItem[];
};

function getMarkdownFiles(dir: string) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir).filter((file) => file.endsWith(".md"));
}

function readMarkdownFile(dir: string, file: string) {
  const fullPath = path.join(dir, file);
  const raw = fs.readFileSync(fullPath, "utf8");
  const parsed = matter(raw);
  return {
    slug: file.replace(/\.md$/, ""),
    data: parsed.data,
    content: parsed.content
  };
}

function readingMinutes(content: string) {
  const cjk = content.match(/[\u4e00-\u9fff]/g)?.length ?? 0;
  const words = content.replace(/[\u4e00-\u9fff]/g, " ").trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil((cjk + words) / 450));
}

function sortByDateDesc<T extends { date: string; order?: number }>(items: T[]) {
  return items.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
    return new Date(b.date).getTime() - new Date(a.date).getTime();
  });
}

export function getAllArticles({ includeDrafts = false } = {}) {
  const articles = getMarkdownFiles(articlesDir).map((file) => {
    const source = readMarkdownFile(articlesDir, file);
    const meta = articleSchema.parse(source.data);
    const rendered = renderMarkdown(source.content);

    return {
      ...meta,
      slug: source.slug,
      readingMinutes: readingMinutes(source.content),
      content: source.content,
      html: rendered.html,
      toc: rendered.toc
    };
  });

  return sortByDateDesc(articles.filter((article) => includeDrafts || !article.draft));
}

export function getArticle(slug: string) {
  return getAllArticles({ includeDrafts: true }).find((article) => article.slug === slug && !article.draft);
}

export function getAllProjects({ includeDrafts = false } = {}) {
  const projects = getMarkdownFiles(projectsDir).map((file) => {
    const source = readMarkdownFile(projectsDir, file);
    const meta = projectSchema.parse(source.data);
    const rendered = renderMarkdown(source.content);

    return {
      ...meta,
      slug: source.slug,
      content: source.content,
      html: rendered.html,
      toc: rendered.toc
    };
  });

  return sortByDateDesc(projects.filter((project) => includeDrafts || !project.draft));
}

export function getProject(slug: string) {
  return getAllProjects({ includeDrafts: true }).find((project) => project.slug === slug && !project.draft);
}

export function getArticleNavigation(current: Article) {
  const articles = getAllArticles();
  const sameSeries = current.series
    ? articles.filter((article) => article.series === current.series)
    : articles.filter((article) => article.category === current.category);

  const ordered = sameSeries.sort((a, b) => {
    if (a.order !== undefined && b.order !== undefined) return a.order - b.order;
    return new Date(a.date).getTime() - new Date(b.date).getTime();
  });
  const index = ordered.findIndex((article) => article.slug === current.slug);

  return {
    seriesTitle: current.series ?? current.category,
    seriesArticles: ordered,
    previous: index > 0 ? ordered[index - 1] : undefined,
    next: index >= 0 && index < ordered.length - 1 ? ordered[index + 1] : undefined
  };
}
