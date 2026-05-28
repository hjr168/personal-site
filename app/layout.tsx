import type { Metadata } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://huangjiarong.top"),
  title: {
    default: "狮子AI",
    template: "%s | 狮子AI"
  },
  description: "AI 产品经理与独立创造者的文章、项目和产品实践记录。",
  openGraph: {
    title: "狮子AI",
    description: "AI 产品经理与独立创造者的文章、项目和产品实践记录。",
    type: "website",
    locale: "zh_CN"
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="zh-CN">
      <body>
        <SiteHeader />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
