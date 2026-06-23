"use client";

import Link from "next/link";
import { useState } from "react";
import BottomNav from "@/components/BottomNav";
import LiveRoomView from "@/components/LiveRoomView";
import { MODE_OPTIONS } from "@/lib/mockData";
import type { LiveMode } from "@/lib/mockData";

export default function GoLivePage() {
  const [step, setStep] = useState<"mode" | "config" | "live">("mode");
  const [selectedMode, setSelectedMode] = useState<LiveMode | null>(null);
  const [title, setTitle] = useState("画画中的元气甜心");
  const [visibility, setVisibility] = useState("公开");

  if (step === "live") {
    return (
      <LiveRoomView
        title={title}
        isHost
        onEndLive={() => {
          setStep("mode");
          setSelectedMode(null);
        }}
      />
    );
  }

  return (
    <>
      <header
        style={{
          padding: "16px",
          background: "#fff",
          borderBottom: "1px solid var(--divider)",
        }}
      >
        <Link href="/" style={{ color: "var(--text-muted)", fontSize: 14 }}>
          ← 返回
        </Link>
        <h1 style={{ fontSize: 20, fontWeight: 600, marginTop: 12 }}>
          {step === "mode" ? "选择直播模式" : "开播配置"}
        </h1>
        <p style={{ fontSize: 13, color: "var(--text-muted)", marginTop: 4 }}>
          {step === "mode"
            ? "极低开播门槛，保护隐私，灵魂表达"
            : "AI 已根据你的标签生成标题"}
        </p>
      </header>

      <main className="page-content" style={{ padding: "16px", background: "var(--surface-2)" }}>
        {step === "mode" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {MODE_OPTIONS.map((mode) => (
              <button
                key={mode.id}
                onClick={() => {
                  setSelectedMode(mode.id);
                  setStep("config");
                }}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 16,
                  padding: 20,
                  borderRadius: 16,
                  background: "#fff",
                  border: mode.highlight
                    ? "1.5px solid var(--accent)"
                    : "1px solid var(--border)",
                  textAlign: "left",
                  color: "var(--text)",
                  boxShadow: mode.highlight
                    ? "0 2px 12px var(--accent-glow)"
                    : "0 1px 4px rgba(0,0,0,0.04)",
                }}
              >
                <span style={{ fontSize: 40 }}>{mode.emoji}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                    <span style={{ fontWeight: 600, fontSize: 16 }}>{mode.title}</span>
                    {mode.highlight && (
                      <span
                        style={{
                          fontSize: 10,
                          padding: "2px 6px",
                          borderRadius: 4,
                          background: "var(--accent)",
                          color: "#fff",
                        }}
                      >
                        核心护城河
                      </span>
                    )}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--text-muted)", marginTop: 2 }}>
                    {mode.subtitle}
                  </div>
                  <div style={{ fontSize: 13, marginTop: 6, color: "var(--text-secondary)" }}>
                    {mode.description}
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}

        {step === "config" && selectedMode && (
          <div>
            <div
              style={{
                padding: 16,
                borderRadius: 12,
                background: "#fff",
                marginBottom: 12,
              }}
            >
              <label
                style={{
                  fontSize: 12,
                  color: "var(--text-muted)",
                  display: "block",
                  marginBottom: 6,
                }}
              >
                直播标题
              </label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                style={{
                  width: "100%",
                  padding: "10px 12px",
                  borderRadius: 8,
                  background: "var(--surface-2)",
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  fontSize: 15,
                  outline: "none",
                }}
              />
            </div>

            <div
              style={{
                padding: 16,
                borderRadius: 12,
                background: "#fff",
                marginBottom: 12,
              }}
            >
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
                主题标签（自动关联引力签）
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                {["#民谣", "#绘画", "#治愈"].map((tag) => (
                  <span key={tag} className="hashtag" style={{ fontSize: 14 }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div
              style={{
                padding: 16,
                borderRadius: 12,
                background: "#fff",
                marginBottom: 24,
              }}
            >
              <div style={{ fontSize: 12, color: "var(--text-muted)", marginBottom: 8 }}>
                可见范围
              </div>
              {["公开", "仅互关好友", "定向邀请"].map((v) => (
                <button
                  key={v}
                  onClick={() => setVisibility(v)}
                  style={{
                    display: "block",
                    width: "100%",
                    textAlign: "left",
                    padding: "10px 0",
                    color: visibility === v ? "var(--accent-dark)" : "var(--text)",
                    fontSize: 14,
                    fontWeight: visibility === v ? 600 : 400,
                    borderBottom: "1px solid var(--divider)",
                  }}
                >
                  {visibility === v ? "● " : "○ "}
                  {v}
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep("live")}
              className="btn-solid"
              style={{ width: "100%", padding: 16 }}
            >
              开始直播
            </button>
          </div>
        )}
      </main>

      <BottomNav />
    </>
  );
}
