import MarkdownIt from "markdown-it";

export type TocItem = {
  id: string;
  text: string;
  level: 2 | 3;
};

function slugify(input: string) {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^\p{L}\p{N}]+/gu, "-")
    .replace(/^-+|-+$/g, "");
}

function uniqueSlug(base: string, counts: Map<string, number>) {
  const fallback = base || "section";
  const current = counts.get(fallback) ?? 0;
  counts.set(fallback, current + 1);
  return current === 0 ? fallback : `${fallback}-${current + 1}`;
}

function createMarkdownRenderer() {
  return new MarkdownIt({
    html: false,
    linkify: true,
    typographer: true
  });
}

export function extractToc(markdown: string): TocItem[] {
  const md = createMarkdownRenderer();
  const tokens = md.parse(markdown, {});
  const counts = new Map<string, number>();
  const toc: TocItem[] = [];

  tokens.forEach((token, index) => {
    if (token.type !== "heading_open") return;
    if (token.tag !== "h2" && token.tag !== "h3") return;

    const next = tokens[index + 1];
    const text = next?.content?.trim();
    if (!text) return;

    toc.push({
      id: uniqueSlug(slugify(text), counts),
      text,
      level: token.tag === "h2" ? 2 : 3
    });
  });

  return toc;
}

export function renderMarkdown(markdown: string) {
  const toc = extractToc(markdown);
  const md = createMarkdownRenderer();
  let headingIndex = 0;

  md.renderer.rules.heading_open = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if ((token.tag === "h2" || token.tag === "h3") && toc[headingIndex]) {
      token.attrSet("id", toc[headingIndex].id);
      headingIndex += 1;
    }
    return self.renderToken(tokens, idx, options);
  };

  md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
    const href = tokens[idx].attrGet("href") ?? "";
    if (/^https?:\/\//.test(href)) {
      tokens[idx].attrSet("target", "_blank");
      tokens[idx].attrSet("rel", "noopener noreferrer");
    }
    return self.renderToken(tokens, idx, options);
  };

  return {
    html: md.render(markdown),
    toc
  };
}
