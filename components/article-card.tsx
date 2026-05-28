import Link from "next/link";
import type { Article } from "@/lib/content";

export function ArticleCard({ article, featured = false }: { article: Article; featured?: boolean }) {
  return (
    <Link className={featured ? "article-card article-card-featured" : "article-card"} href={`/articles/${article.slug}`}>
      <div className="meta-row">
        <span>{article.category}</span>
        <span>{formatDate(article.date)}</span>
        <span>{article.readingMinutes} 分钟</span>
      </div>
      <h3>{article.title}</h3>
      <p>{article.description}</p>
      <div className="tag-list">
        {article.tags.map((tag) => (
          <span className="tag" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </Link>
  );
}

export function formatDate(date: string) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).format(new Date(date));
}
