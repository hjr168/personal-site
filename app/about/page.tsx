import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "关于",
  description: "关于狮子AI，AI 产品经理与独立创造者。"
};

export default function AboutPage() {
  return (
    <main className="page-shell">
      <div className="container about-grid">
        <div>
          <p className="eyebrow">About</p>
          <h1 className="page-title">一个人，从问题走到产品。</h1>
          <p className="page-lead">
            我是{site.author}，也用“狮子AI”记录自己的 AI 产品实践。过去做产品经理，现在更关注如何把 AI 能力变成真实可用、可持续迭代的产品。
          </p>
          <div className="prose" style={{ marginTop: 34 }}>
            <h2>我会写什么</h2>
            <p>这里会持续记录 AI 产品观察、独立开发实践、工具工作流、项目复盘，以及从一个想法走到上线过程中的判断。</p>
            <h2>我想建立什么</h2>
            <p>比起只展示结果，我更想把过程写清楚：为什么选择这个方向，如何拆解问题，哪些判断后来被证明是错的，哪些方法值得复用。</p>
            <h2>联系</h2>
            <p>
              有产品合作、AI 应用、内容共创或有趣项目，欢迎通过{" "}
              <a href={`mailto:${site.email}`}>{site.email}</a> 联系我。
            </p>
          </div>
        </div>
        <aside className="note-panel" style={{ padding: 24 }}>
          <p className="side-label">当前关注</p>
          <div className="tag-list" style={{ paddingTop: 0 }}>
            <Link className="tag" href="/articles?tag=AI产品">
              AI 产品
            </Link>
            <Link className="tag" href="/articles?tag=独立开发">
              独立开发
            </Link>
            <Link className="tag" href="/articles?tag=工作流">
              工作流
            </Link>
          </div>
        </aside>
      </div>
    </main>
  );
}
