"use client";

import { useEffect } from "react";

export function TocSpy() {
  useEffect(() => {
    const headings = Array.from(document.querySelectorAll<HTMLElement>(".prose h2[id], .prose h3[id]"));
    const links = Array.from(document.querySelectorAll<HTMLAnchorElement>(".toc-list a"));
    if (!headings.length || !links.length) return;

    const setActive = (id: string) => {
      links.forEach((link) => {
        link.classList.toggle("active", link.hash === `#${CSS.escape(id)}`);
      });
    };

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (visible?.target.id) setActive(visible.target.id);
      },
      { rootMargin: "-88px 0px -70% 0px", threshold: [0, 1] }
    );

    headings.forEach((heading) => observer.observe(heading));
    setActive(headings[0].id);

    return () => observer.disconnect();
  }, []);

  return null;
}
