import { getAllArticles } from "@/lib/content";
import { site } from "@/lib/site";

export function GET() {
  const articles = getAllArticles();
  const items = articles
    .map(
      (article) => `
        <item>
          <title><![CDATA[${article.title}]]></title>
          <description><![CDATA[${article.description}]]></description>
          <link>${site.url}/articles/${article.slug}</link>
          <guid>${site.url}/articles/${article.slug}</guid>
          <pubDate>${new Date(article.date).toUTCString()}</pubDate>
        </item>`
    )
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8" ?>
    <rss version="2.0">
      <channel>
        <title>${site.name}</title>
        <description>${site.description}</description>
        <link>${site.url}</link>
        ${items}
      </channel>
    </rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8"
    }
  });
}
