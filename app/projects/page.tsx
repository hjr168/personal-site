import type { Metadata } from "next";
import { ProjectCard } from "@/components/project-card";
import { getAllProjects } from "@/lib/content";

export const metadata: Metadata = {
  title: "项目",
  description: "狮子AI 的项目作品和产品实践。"
};

export default function ProjectsPage() {
  const projects = getAllProjects();

  return (
    <main className="page-shell">
      <div className="container">
        <p className="eyebrow">Projects</p>
        <h1 className="page-title">项目</h1>
        <p className="page-lead">这里保留已经完成或正在探索的产品、文档、设计与原型。项目不是终点，是文章和复盘的证据。</p>
        <div className="project-grid" style={{ marginTop: 34 }}>
          {projects.map((project) => (
            <ProjectCard project={project} key={project.slug} />
          ))}
        </div>
      </div>
    </main>
  );
}
