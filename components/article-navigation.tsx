import Link from "next/link";
import type { Article } from "@/lib/content";
import type { TocItem } from "@/lib/markdown";

export function SeriesNav({
  currentSlug,
  seriesTitle,
  articles
}: {
  currentSlug: string;
  seriesTitle: string;
  articles: Article[];
}) {
  return (
    <div className="side-card">
      <p className="side-label">{seriesTitle}</p>
      <ul className="side-list">
        {articles.map((article) => (
          <li key={article.slug}>
            <Link className={article.slug === currentSlug ? "active" : undefined} href={`/articles/${article.slug}`}>
              {article.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TocNav({ toc }: { toc: TocItem[] }) {
  return (
    <nav aria-label="本文目录">
      <p className="side-label">本文目录</p>
      <ul className="toc-list">
        {toc.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} data-level={item.level}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
