import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container site-footer-inner">
        <span>© 2026 {site.name}</span>
        <span>AI 产品经理 · 独立创造者 · 用心构建</span>
      </div>
    </footer>
  );
}
