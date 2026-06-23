"use client";

import Link from "next/link";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import LiveCard from "@/components/LiveCard";
import SoulTopBar from "@/components/SoulTopBar";
import { LIVE_ROOMS } from "@/lib/mockData";

const TABS = ["关注", "推荐", "虚拟形象", "才艺", "语音"];

export default function LiveSquarePage() {
  const [activeTab, setActiveTab] = useState("推荐");
  const [showGuide, setShowGuide] = useState(true);

  const filtered =
    activeTab === "关注"
      ? LIVE_ROOMS.filter((r) => r.isFollowing || r.isFriend)
      : activeTab === "虚拟形象"
        ? LIVE_ROOMS.filter((r) => r.mode === "avatar")
        : activeTab === "才艺"
          ? LIVE_ROOMS.filter((r) => r.mode === "real")
          : activeTab === "语音"
            ? LIVE_ROOMS.filter((r) => r.mode === "voice")
            : LIVE_ROOMS;

  return (
    <>
      <SoulTopBar
        tabs={TABS}
        activeTab={activeTab}
        onTabChange={setActiveTab}
        banner={`为您推荐了 ${filtered.length} 个灵魂直播间`}
      />

      {activeTab === "关注" && (
        <div
          style={{
            padding: "12px 16px",
            overflowX: "auto",
            display: "flex",
            gap: 14,
            background: "#fff",
            borderBottom: "1px solid var(--divider)",
          }}
        >
          {LIVE_ROOMS.filter((r) => r.isFollowing || r.isFriend).map((r) => (
            <Link
              key={r.id}
              href={`/room/${r.id}`}
              style={{ flexShrink: 0, width: 68, textAlign: "center" }}
            >
              <div
                className="live-ring"
                style={{
                  width: 52,
                  height: 52,
                  borderRadius: "50%",
                  margin: "0 auto 6px",
                  background: r.gradient,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 22,
                  border: "2px solid var(--live-red)",
                }}
              >
                {r.hostAvatar}
              </div>
              <span style={{ fontSize: 11, color: "var(--text-secondary)" }}>
                {r.hostName}
              </span>
            </Link>
          ))}
        </div>
      )}

      <main className="page-content">
        {filtered.map((room) => (
          <LiveCard key={room.id} room={room} embedded />
        ))}
      </main>

      <Link
        href="/go-live"
        style={{
          position: "fixed",
          right: "calc(50% - 215px)",
          bottom: "calc(72px + var(--safe-bottom))",
          width: 44,
          height: 44,
          borderRadius: "50%",
          background: "#fff",
          boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 20,
          zIndex: 90,
        }}
      >
        ✉️
      </Link>

      {showGuide && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 300,
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              background: "#fff",
              borderRadius: "20px 20px 0 0",
              padding: 24,
              width: "100%",
              maxWidth: 430,
            }}
          >
            <h2 style={{ fontSize: 18, marginBottom: 6, fontWeight: 600 }}>
              发现灵魂直播间
            </h2>
            <p style={{ fontSize: 13, color: "var(--text-muted)", marginBottom: 20 }}>
              不只是看脸，更是灵魂的实时共鸣
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {[
                { emoji: "👾", title: "虚拟形象直播", desc: "3D捏脸，零容貌焦虑" },
                { emoji: "🎸", title: "才艺直播", desc: "弹唱绘画，灵魂表达" },
                { emoji: "🎙️", title: "语音直播", desc: "深夜陪伴，观众上麦" },
              ].map((card) => (
                <div
                  key={card.title}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    padding: 14,
                    borderRadius: 12,
                    background: "var(--surface-2)",
                  }}
                >
                  <span style={{ fontSize: 32 }}>{card.emoji}</span>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 15 }}>{card.title}</div>
                    <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
                      {card.desc}
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={() => setShowGuide(false)}
              className="btn-solid"
              style={{ width: "100%", marginTop: 20, padding: 14 }}
            >
              开始探索
            </button>
          </div>
        </div>
      )}

      <BottomNav />
    </>
  );
}
