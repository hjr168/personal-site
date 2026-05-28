import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { CodeCopyEnhancer } from "@/components/code-copy-enhancer";
import { TocNav } from "@/components/article-navigation";
import { TocSpy } from "@/components/toc-spy";
import { getAllProjects, getProject } from "@/lib/content";
import { site } from "@/lib/site";

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.description,
    alternates: { canonical: `${site.url}/projects/${project.slug}` }
  };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="article-layout">
      <aside className="article-sidebar">
        <div className="side-card">
          <p className="side-label">项目状态</p>
          <ul className="side-list">
            <li>
              <span className="active">{project.status}</span>
            </li>
          </ul>
        </div>
      </aside>
      <article className="article-main">
        <header className="article-header">
          <div className="meta-row">
            <span>{project.status}</span>
            <span>{project.date}</span>
          </div>
          <h1>{project.title}</h1>
          <p className="article-description">{project.description}</p>
          <div className="tag-list">
            {project.tags.map((tag) => (
              <span className="tag" key={tag}>
                {tag}
              </span>
            ))}
          </div>
        </header>
        <div className="mobile-article-tools">
          <details>
            <summary>本文目录</summary>
            <div className="side-card">
              <TocNav toc={project.toc} />
            </div>
          </details>
        </div>
        <div className="prose" dangerouslySetInnerHTML={{ __html: project.html }} />
        <CodeCopyEnhancer />
        <TocSpy />
      </article>
      <aside className="article-toc">
        <TocNav toc={project.toc} />
      </aside>
    </main>
  );
}
