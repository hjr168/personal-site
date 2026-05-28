import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SeriesNav, TocNav } from "@/components/article-navigation";
import { CodeCopyEnhancer } from "@/components/code-copy-enhancer";
import { formatDate } from "@/components/article-card";
import { TocSpy } from "@/components/toc-spy";
import { getAllArticles, getArticle, getArticleNavigation } from "@/lib/content";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};

  const url = `${site.url}/articles/${article.slug}`;
  return {
    title: article.title,
    description: article.description,
    alternates: { canonical: url },
    openGraph: {
      title: article.title,
      description: article.description,
      type: "article",
      url,
      publishedTime: article.date,
      modifiedTime: article.updated ?? article.date,
      authors: [site.author]
    }
  };
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const nav = getArticleNavigation(article);
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: article.title,
    description: article.description,
    datePublished: article.date,
    dateModified: article.updated ?? article.date,
    author: { "@type": "Person", name: site.author },
    publisher: { "@type": "Organization", name: site.name },
    mainEntityOfPage: `${site.url}/articles/${article.slug}`
  };

  return (
    <main className="article-layout">
      <aside className="article-sidebar" aria-label="文章系列导航">
        <SeriesNav currentSlug={article.slug} seriesTitle={nav.seriesTitle} articles={nav.seriesArticles} />
      </aside>

      <article className="article-main">
        <header className="article-header">
          <div className="meta-row">
            <span>{article.category}</span>
            <span>{formatDate(article.date)}</span>
            <span>{article.readingMinutes} 分钟</span>
          </div>
          <h1>{article.title}</h1>
          <p className="article-description">{article.description}</p>
          <div className="tag-list">
            {article.tags.map((tag) => (
              <Link className="tag" href={`/articles?tag=${encodeURIComponent(tag)}`} key={tag}>
                {tag}
              </Link>
            ))}
          </div>
        </header>

        <div className="mobile-article-tools">
          <details>
            <summary>系列导航</summary>
            <SeriesNav currentSlug={article.slug} seriesTitle={nav.seriesTitle} articles={nav.seriesArticles} />
          </details>
          <details>
            <summary>本文目录</summary>
            <div className="side-card">
              <TocNav toc={article.toc} />
            </div>
          </details>
        </div>

        <div className="prose" dangerouslySetInnerHTML={{ __html: article.html }} />
        <CodeCopyEnhancer />
        <TocSpy />

        <nav className="article-bottom-nav" aria-label="上一篇下一篇">
          {nav.previous ? (
            <Link href={`/articles/${nav.previous.slug}`}>
              <span>上一篇</span>
              {nav.previous.title}
            </Link>
          ) : (
            <div />
          )}
          {nav.next ? (
            <Link href={`/articles/${nav.next.slug}`}>
              <span>下一篇</span>
              {nav.next.title}
            </Link>
          ) : (
            <div />
          )}
        </nav>

        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      </article>

      <aside className="article-toc" aria-label="本文目录">
        <TocNav toc={article.toc} />
      </aside>
    </main>
  );
}
