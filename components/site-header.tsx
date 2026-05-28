import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="container site-header-inner">
        <Link className="brand" href="/">
          <span className="brand-mark">狮</span>
          <span>狮子AI</span>
        </Link>
        <nav className="main-nav" aria-label="主导航">
          <Link href="/articles">文章</Link>
          <Link href="/projects">项目</Link>
          <Link href="/about">关于</Link>
          <a href="mailto:hjr597490544@qq.com">联系</a>
        </nav>
      </div>
    </header>
  );
}
