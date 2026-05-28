import Link from "next/link";
import { ArticleCard } from "@/components/article-card";
import { ProjectCard } from "@/components/project-card";
import { getAllArticles, getAllProjects } from "@/lib/content";

export default function HomePage() {
  const articles = getAllArticles();
  const featured = articles.find((article) => article.featured) ?? articles[0];
  const latest = articles.filter((article) => article.slug !== featured?.slug).slice(0, 4);
  const projects = getAllProjects().filter((project) => project.featured).slice(0, 3);
  const tags = Array.from(new Set(articles.flatMap((article) => article.tags))).slice(0, 12);

  return (
    <main>
      <section className="hero">
        <div className="container hero-grid">
          <div>
            <p className="eyebrow">AI Product Notes / Indie Creation</p>
            <h1>把 AI 产品实践，写成可复用的经验。</h1>
            <p className="hero-lead">
              我是狮子AI，一名 AI 产品经理与独立创造者。这里记录我对 AI 产品、独立开发、工具工作流和从 0 到 1 的持续观察。
            </p>
          </div>
          <aside className="hero-aside">
            <p>
              这个网站会优先服务于长期写作：每篇文章都尽量保留问题背景、判断过程、实践细节和复盘结论。项目只是结果，思考过程才是更值得积累的部分。
            </p>
          </aside>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>精选文章</h2>
            <Link className="view-link" href="/articles">
              查看全部文章 →
            </Link>
          </div>
          <div className="article-grid">
            {featured ? <ArticleCard article={featured} featured /> : null}
            {latest.slice(0, 2).map((article) => (
              <ArticleCard article={article} key={article.slug} />
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>主题索引</h2>
            <span className="view-link">持续更新中</span>
          </div>
          <div className="note-panel" style={{ padding: 24 }}>
            <div className="tag-list" style={{ paddingTop: 0 }}>
              {tags.map((tag) => (
                <Link className="tag" href={`/articles?tag=${encodeURIComponent(tag)}`} key={tag}>
                  {tag}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="section-head">
            <h2>项目背书</h2>
            <Link className="view-link" href="/projects">
              查看项目归档 →
            </Link>
          </div>
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard project={project} key={project.slug} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
