"use client";

import Link from "next/link";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import LiveCard from "@/components/LiveCard";
import SoulTopBar from "@/components/SoulTopBar";
import { FEED_POSTS, LIVE_ROOMS } from "@/lib/mockData";

export default function FeedPage() {
  const [activeTab, setActiveTab] = useState("推荐");
  const liveRoom = LIVE_ROOMS[0];

  return (
    <>
      <SoulTopBar
        tabs={["关注", "推荐", "上海"]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        banner="为您推荐了6个瞬间"
      />

      <main className="page-content">
        <article className="soul-card">
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 10,
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <span
                style={{
                  width: 44,
                  height: 44,
                  borderRadius: "50%",
                  background: "linear-gradient(135deg, #a8edea, #fed6e3)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                }}
              >
                {FEED_POSTS[0].avatar}
              </span>
              <div>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{FEED_POSTS[0].author}</div>
                <div style={{ fontSize: 11, color: "var(--text-muted)" }}>刚刚</div>
              </div>
            </div>
            <button className="btn-outline">关注</button>
          </div>
          <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 12 }}>
            {FEED_POSTS[0].content}
          </p>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              paddingTop: 8,
              borderTop: "1px solid var(--divider)",
            }}
          >
            <button style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
              <span style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--accent-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "var(--accent)", fontWeight: 700 }}>Hi</span>
              私聊
            </button>
            <div style={{ display: "flex", gap: 20, fontSize: 13, color: "var(--text-muted)" }}>
              <span>❤️ 12</span>
              <span>💬 评论</span>
            </div>
          </div>
        </article>

        <LiveCard room={liveRoom} embedded />

        {FEED_POSTS.slice(1).map((post) => (
          <article key={post.id} className="soul-card">
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: 10,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <Link href={`/room/${LIVE_ROOMS[1].id}`}>
                  <span
                    className="live-ring"
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "linear-gradient(135deg, #ffecd2, #fcb69f)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 22,
                      border: "2px solid var(--live-red)",
                    }}
                  >
                    {post.avatar}
                  </span>
                </Link>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{post.author}</div>
                  <div style={{ fontSize: 11, color: "var(--live-red)" }}>
                    直播中 · 点击头像进入
                  </div>
                </div>
              </div>
              <button className="btn-outline">关注</button>
            </div>
            <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 12 }}>
              {post.content}{" "}
              <span className="hashtag">#晨跑打卡</span>
            </p>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingTop: 8,
                borderTop: "1px solid var(--divider)",
              }}
            >
              <button style={{ fontSize: 13, color: "var(--text-muted)", display: "flex", alignItems: "center", gap: 4 }}>
                <span style={{ width: 22, height: 22, borderRadius: "50%", background: "var(--accent-light)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, color: "var(--accent)", fontWeight: 700 }}>Hi</span>
                私聊
              </button>
              <div style={{ display: "flex", gap: 20, fontSize: 13, color: "var(--text-muted)" }}>
                <span>❤️ 8</span>
                <span>💬 评论</span>
              </div>
            </div>
          </article>
        ))}

        <div style={{ padding: 16 }}>
          <Link
            href={`/room/${LIVE_ROOMS[1].id}`}
            style={{
              display: "block",
              padding: 14,
              borderRadius: 12,
              background: "var(--accent-light)",
              border: "1px solid var(--accent)",
              textAlign: "center",
              fontSize: 14,
              color: "var(--accent-dark)",
              fontWeight: 500,
            }}
          >
            💬 互关好友开播提醒：云画画小李 正在直播 → 去看看
          </Link>
        </div>
      </main>

      <BottomNav />
    </>
  );
}
