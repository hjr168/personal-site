import Link from "next/link";
import type { Project } from "@/lib/content";

export function ProjectCard({ project }: { project: Project }) {
  const card = (
    <article className="project-card">
      {project.image ? (
        <div className="project-card-image">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.image} alt={project.title} />
        </div>
      ) : null}
      <div className="project-card-body">
        <div className="meta-row">
          <span>{project.status}</span>
          <span>{project.date}</span>
        </div>
        <h3>{project.title}</h3>
        <p>{project.description}</p>
        <div className="tag-list">
          {project.tags.map((tag) => (
            <span className="tag" key={tag}>
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );

  if (project.url) {
    return (
      <a href={project.url} target="_blank" rel="noopener noreferrer">
        {card}
      </a>
    );
  }

  return <Link href={`/projects/${project.slug}`}>{card}</Link>;
}
