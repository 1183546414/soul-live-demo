import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Soul 直播 Demo",
  description: "Soul APP 直播功能板块 — 灵魂的实时共鸣",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="zh-CN">
      <body>
        <div className="app-shell">{children}</div>
      </body>
    </html>
  );
}
