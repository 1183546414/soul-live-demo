"use client";

import { useState } from "react";
import type { Gift } from "@/lib/mockData";

interface GiftPanelProps {
  gifts: Gift[];
  onSend: (gift: Gift) => void;
  onClose: () => void;
}

export default function GiftPanel({ gifts, onSend, onClose }: GiftPanelProps) {
  const [tab, setTab] = useState<"free" | "mid" | "premium">("mid");

  const filtered = gifts.filter((g) => g.tier === tab);

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 200,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
      }}
    >
      <div
        onClick={onClose}
        style={{ flex: 1, background: "rgba(0,0,0,0.4)" }}
      />
      <div
        style={{
          background: "#fff",
          borderRadius: "20px 20px 0 0",
          padding: "16px 16px calc(16px + env(safe-area-inset-bottom))",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <span style={{ fontWeight: 600, fontSize: 16 }}>Soul 专属礼物</span>
          <button onClick={onClose} style={{ color: "var(--text-muted)", fontSize: 18 }}>
            ✕
          </button>
        </div>
        <p style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 12 }}>
          去货币感，强情感连接 — 点亮灵魂而非进贡
        </p>
        <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
          {(
            [
              ["free", "灵魂补给"],
              ["mid", "共鸣礼物"],
              ["premium", "守护礼物"],
            ] as const
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setTab(key)}
              style={{
                flex: 1,
                padding: "8px 0",
                borderRadius: 20,
                fontSize: 13,
                background: tab === key ? "var(--accent)" : "var(--surface-2)",
                color: tab === key ? "#fff" : "var(--text-muted)",
                fontWeight: tab === key ? 600 : 400,
              }}
            >
              {label}
            </button>
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 12,
          }}
        >
          {filtered.map((gift) => (
            <button
              key={gift.id}
              onClick={() => onSend(gift)}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 4,
                padding: 12,
                borderRadius: 12,
                background: "var(--surface-2)",
              }}
            >
              <span style={{ fontSize: 28 }}>{gift.emoji}</span>
              <span style={{ fontSize: 12, color: "var(--text)" }}>{gift.name}</span>
              <span style={{ fontSize: 10, color: "var(--text-muted)" }}>
                {gift.price === 0 ? "免费" : `${gift.price} Soul币`}
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
