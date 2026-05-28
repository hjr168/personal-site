import { getAllArticles, getAllProjects } from "@/lib/content";
import { site } from "@/lib/site";

export function GET() {
  const staticRoutes = ["", "/articles", "/projects", "/about"];
  const articleRoutes = getAllArticles().map((article) => `/articles/${article.slug}`);
  const projectRoutes = getAllProjects()
    .filter((project) => !project.url)
    .map((project) => `/projects/${project.slug}`);
  const urls = [...staticRoutes, ...articleRoutes, ...projectRoutes]
    .map(
      (route) => `
        <url>
          <loc>${site.url}${route}</loc>
        </url>`
    )
    .join("");

  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls}</urlset>`, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8"
    }
  });
}
