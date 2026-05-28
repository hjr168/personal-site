import type { Metadata } from "next";
import Link from "next/link";
import { formatDate } from "@/components/article-card";
import { getAllArticles } from "@/lib/content";

export const metadata: Metadata = {
  title: "文章",
  description: "狮子AI 关于 AI 产品、独立开发和工具工作流的文章。"
};

export default async function ArticlesPage({
  searchParams
}: {
  searchParams: Promise<{ tag?: string; category?: string }>;
}) {
  const params = await searchParams;
  const articles = getAllArticles().filter((article) => {
    if (params.tag) return article.tags.includes(params.tag);
    if (params.category) return article.category === params.category;
    return true;
  });
  const allArticles = getAllArticles();
  const categories = Array.from(new Set(allArticles.map((article) => article.category)));
  const tags = Array.from(new Set(allArticles.flatMap((article) => article.tags)));

  return (
    <main className="page-shell">
      <div className="container">
        <p className="eyebrow">Articles</p>
        <h1 className="page-title">文章</h1>
        <p className="page-lead">围绕 AI 产品、独立创造和效率工具的长期记录。先写清楚问题，再交付观点。</p>

        <div className="note-panel" style={{ marginTop: 32, padding: 22 }}>
          <div className="tag-list" style={{ paddingTop: 0 }}>
            <Link className="tag" href="/articles">
              全部
            </Link>
            {categories.map((category) => (
              <Link className="tag" href={`/articles?category=${encodeURIComponent(category)}`} key={category}>
                {category}
              </Link>
            ))}
            {tags.map((tag) => (
              <Link className="tag" href={`/articles?tag=${encodeURIComponent(tag)}`} key={tag}>
                #{tag}
              </Link>
            ))}
          </div>
        </div>

        <div className="content-list">
          {articles.map((article) => (
            <Link className="list-item" href={`/articles/${article.slug}`} key={article.slug}>
              <div>
                <div className="meta-row">
                  <span>{article.category}</span>
                  <span>{formatDate(article.date)}</span>
                  <span>{article.readingMinutes} 分钟</span>
                </div>
                <h2>{article.title}</h2>
                <p>{article.description}</p>
              </div>
              <div className="tag-list" style={{ alignContent: "start", paddingTop: 0 }}>
                {article.tags.slice(0, 3).map((tag) => (
                  <span className="tag" key={tag}>
                    {tag}
                  </span>
                ))}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
