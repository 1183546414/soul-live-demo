"use client";

import Link from "next/link";
import { useState } from "react";
import GiftPanel from "@/components/GiftPanel";
import type { Gift, LiveRoom } from "@/lib/mockData";
import { GIFTS } from "@/lib/mockData";
import { formatViewers } from "@/lib/mockData";

interface FloatingGift {
  id: number;
  emoji: string;
  name: string;
}

interface LiveRoomViewProps {
  room?: LiveRoom;
  title?: string;
  isHost?: boolean;
  onEndLive?: () => void;
  backHref?: string;
}

const CHAT_INIT = [
  { user: "冰醋酸", text: "来了来了", type: "enter" as const },
  { user: "系统", text: "欢迎来到灵魂直播间", type: "normal" as const },
  { user: "深夜猫", text: "唱得太好了！", type: "normal" as const },
];

export default function LiveRoomView({
  room,
  title,
  isHost = false,
  onEndLive,
  backHref = "/",
}: LiveRoomViewProps) {
  const hostName = room?.hostName ?? "画画中的元气甜心";
  const hostAvatar = room?.hostAvatar ?? "🎨";
  const displayTitle = title ?? room?.title ?? "深夜治愈电台";
  const viewers = room?.viewers ?? 12;
  const bgGradient =
    room?.gradient ?? "linear-gradient(135deg, #a8edea 0%, #25d4d0 100%)";
  const bgEmoji = room?.emoji ?? "🎨";

  const [showGifts, setShowGifts] = useState(false);
  const [floatingGifts, setFloatingGifts] = useState<FloatingGift[]>([]);
  const [messages, setMessages] = useState(CHAT_INIT);
  const [input, setInput] = useState("");
  const [resonance, setResonance] = useState(false);

  const handleSendGift = (gift: Gift) => {
    const id = Date.now();
    setFloatingGifts((prev) => [...prev, { id, emoji: gift.emoji, name: gift.name }]);
    setTimeout(() => setFloatingGifts((prev) => prev.filter((g) => g.id !== id)), 2000);
    if (gift.tier === "mid" || gift.tier === "premium") {
      setResonance(true);
      setTimeout(() => setResonance(false), 3000);
    }
    setMessages((prev) => [...prev, { user: "你", text: `送出了「${gift.name}」${gift.emoji}`, type: "normal" }]);
    setShowGifts(false);
  };

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages((prev) => [...prev, { user: "你", text: input, type: "normal" }]);
    setInput("");
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 430,
        margin: "0 auto",
        minHeight: "100dvh",
        overflow: "hidden",
        background: "#1a1a1a",
        ...(resonance && { boxShadow: "inset 0 0 0 3px var(--accent)" }),
      }}
    >
      {/* 全屏直播画面 — 渐变背景 */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: bgGradient,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 140,
          opacity: 0.2,
          pointerEvents: "none",
        }}
      >
        {bgEmoji}
      </div>
      <div
        style={{
          position: "absolute",
          inset: 0,
          background:
            "linear-gradient(180deg, rgba(0,0,0,0.3) 0%, transparent 30%, transparent 55%, rgba(0,0,0,0.45) 100%)",
        }}
      />

      {/* 顶部左侧：主播信息 */}
      <div style={{ position: "absolute", top: 12, left: 12, zIndex: 20, maxWidth: "72%" }}>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(0,0,0,0.45)",
            backdropFilter: "blur(8px)",
            borderRadius: 24,
            padding: "4px 10px 4px 4px",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #89f7fe, #66a6ff)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 18,
              flexShrink: 0,
            }}
          >
            {hostAvatar}
          </div>
          <div style={{ minWidth: 0, flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#fff", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
              {hostName}
            </div>
            <div style={{ fontSize: 10, color: "rgba(255,255,255,0.65)" }}>
              Lv.1 · ID {1284736 + (room?.id ? parseInt(room.id) : 0)}
            </div>
          </div>
          {!isHost && (
            <button
              style={{
                padding: "5px 14px",
                borderRadius: 16,
                background: "var(--accent)",
                color: "#fff",
                fontSize: 12,
                fontWeight: 600,
                flexShrink: 0,
              }}
            >
              关注
            </button>
          )}
        </div>

        {/* 榜单 & 热力挑战 */}
        <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 8, flexWrap: "wrap" }}>
          {["群主榜", "礼物榜"].map((label) => (
            <span
              key={label}
              style={{
                fontSize: 11,
                padding: "3px 8px",
                borderRadius: 10,
                background: "rgba(0,0,0,0.4)",
                color: "rgba(255,255,255,0.85)",
              }}
            >
              {label}
            </span>
          ))}
          <span
            style={{
              fontSize: 11,
              padding: "3px 8px",
              borderRadius: 10,
              background: "rgba(0,0,0,0.4)",
              color: "rgba(255,255,255,0.85)",
              display: "flex",
              alignItems: "center",
              gap: 4,
            }}
          >
            热力挑战
            <span style={{ color: "#ffb347" }}>24/600</span>
          </span>
          <span style={{ fontSize: 11, padding: "3px 8px", borderRadius: 10, background: "rgba(255,180,50,0.25)", color: "#ffc966" }}>
            流量卡
          </span>
        </div>
      </div>

      {/* 顶部右侧 */}
      <div style={{ position: "absolute", top: 12, right: 12, zIndex: 20, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
        <div style={{ display: "flex", gap: 8 }}>
          <IconBtn>⛶</IconBtn>
          <IconBtn>⋯</IconBtn>
        </div>
        <button style={{ fontSize: 11, color: "rgba(255,255,255,0.8)", background: "rgba(0,0,0,0.35)", padding: "4px 10px", borderRadius: 12 }}>
          设置背景
        </button>
        {isHost ? (
          <button
            onClick={onEndLive}
            style={{
              marginTop: 4,
              padding: "6px 14px",
              borderRadius: 16,
              background: "rgba(255,255,255,0.92)",
              color: "var(--live-red)",
              fontSize: 12,
              fontWeight: 600,
            }}
          >
            结束直播
          </button>
        ) : (
          <Link
            href={backHref}
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: "rgba(0,0,0,0.4)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#fff",
              fontSize: 14,
            }}
          >
            ✕
          </Link>
        )}
      </div>

      {/* 右侧观众 & 操作 */}
      <div style={{ position: "absolute", right: 12, top: "38%", zIndex: 20, display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
        <div style={{ fontSize: 10, color: "rgba(255,255,255,0.7)", background: "rgba(0,0,0,0.35)", padding: "2px 8px", borderRadius: 8 }}>
          捏脸兑好礼
        </div>
        <ViewerStack count={viewers} />
        <SideAction icon="↗" label="分享" />
        <SideAction icon="👤" label="邀请" />
      </div>

      {/* 左侧聊天区 */}
      <div
        style={{
          position: "absolute",
          left: 12,
          bottom: 80,
          right: 70,
          maxHeight: "42%",
          overflowY: "auto",
          zIndex: 20,
          display: "flex",
          flexDirection: "column",
          gap: 6,
          scrollbarWidth: "none",
        }}
      >
        {messages.map((msg, i) => (
          <div key={i}>
            {msg.type === "enter" ? (
              <div
                style={{
                  display: "inline-block",
                  padding: "5px 12px",
                  borderRadius: 14,
                  background: "linear-gradient(90deg, rgba(120,80,200,0.85), rgba(80,120,220,0.85))",
                  fontSize: 12,
                  color: "#fff",
                }}
              >
                <span style={{ fontWeight: 600 }}>{msg.user}</span> {msg.text}
              </div>
            ) : (
              <div style={{ fontSize: 12, color: "#fff", lineHeight: 1.5 }}>
                <span style={{ color: "rgba(255,255,255,0.65)" }}>{msg.user}</span>
                <br />
                <span
                  style={{
                    display: "inline-block",
                    marginTop: 2,
                    padding: "4px 10px",
                    borderRadius: 12,
                    background: "rgba(0,0,0,0.35)",
                  }}
                >
                  {msg.text}
                </span>
              </div>
            )}
          </div>
        ))}

        {/* 平台提示 */}
        <div
          style={{
            marginTop: 4,
            padding: "10px 12px",
            borderRadius: 10,
            background: "rgba(0,0,0,0.55)",
            fontSize: 11,
            color: "rgba(255,255,255,0.8)",
            lineHeight: 1.6,
          }}
        >
          平台提示：欢迎来到直播间！直播间内禁止未成年人打赏、严禁违法违规、低俗色情、吸烟酗酒等内容。
          <span style={{ color: "#ffb347" }}> 点击查看内容 &gt;</span>
        </div>

        {/* 群公告 */}
        <div style={{ fontSize: 11, color: "rgba(255,255,255,0.75)", lineHeight: 1.7 }}>
          <span style={{ color: "var(--accent)", fontWeight: 600 }}>群公告</span>
          <br />
          1. 画画时间到 🎨
          <br />
          2. 上麦聊天 💬
          <br />
          3. {displayTitle}
        </div>
      </div>

      {/* 礼物飘屏 */}
      {floatingGifts.map((g) => (
        <div
          key={g.id}
          className="gift-float"
          style={{
            position: "absolute",
            bottom: "45%",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 30,
            textAlign: "center",
          }}
        >
          <div style={{ fontSize: 48 }}>{g.emoji}</div>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#fff", textShadow: "0 2px 8px rgba(0,0,0,0.5)" }}>
            {g.name}
          </div>
        </div>
      ))}

      {/* 底部操作栏 */}
      <footer
        style={{
          position: "absolute",
          bottom: 0,
          left: 0,
          right: 0,
          padding: "10px 12px calc(10px + env(safe-area-inset-bottom))",
          display: "flex",
          alignItems: "center",
          gap: 8,
          zIndex: 20,
          background: "linear-gradient(transparent, rgba(0,0,0,0.45))",
        }}
      >
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          placeholder="说点什么..."
          style={{
            flex: 1,
            padding: "10px 16px",
            borderRadius: 22,
            background: "rgba(0,0,0,0.45)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "#fff",
            fontSize: 14,
            outline: "none",
          }}
        />
        <CircleBtn onClick={() => setShowGifts(true)}>🎁</CircleBtn>
        <CircleBtn>🧩</CircleBtn>
        <CircleBtn>🎡</CircleBtn>
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            padding: "8px 14px",
            borderRadius: 20,
            background: "rgba(0,0,0,0.5)",
            color: "#fff",
            fontSize: 13,
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          🎤 上麦
        </button>
      </footer>

      {showGifts && (
        <GiftPanel gifts={GIFTS} onSend={handleSendGift} onClose={() => setShowGifts(false)} />
      )}
    </div>
  );
}

function IconBtn({ children }: { children: React.ReactNode }) {
  return (
    <button
      style={{
        width: 28,
        height: 28,
        borderRadius: "50%",
        background: "rgba(0,0,0,0.4)",
        color: "#fff",
        fontSize: 14,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {children}
    </button>
  );
}

function CircleBtn({ children, onClick }: { children: React.ReactNode; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 36,
        height: 36,
        borderRadius: "50%",
        background: "rgba(0,0,0,0.45)",
        fontSize: 16,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {children}
    </button>
  );
}

function SideAction({ icon, label }: { icon: string; label: string }) {
  return (
    <button style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
      <span
        style={{
          width: 36,
          height: 36,
          borderRadius: "50%",
          background: "rgba(0,0,0,0.4)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 16,
          color: "#fff",
        }}
      >
        {icon}
      </span>
      <span style={{ fontSize: 10, color: "rgba(255,255,255,0.75)" }}>{label}</span>
    </button>
  );
}

function ViewerStack({ count }: { count: number }) {
  const avatars = ["🐱", "🦊", "🐻"];
  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
      <div style={{ position: "relative" }}>
        {avatars.map((a, i) => (
          <span
            key={i}
            style={{
              width: 32,
              height: 32,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #ffecd2, #fcb69f)",
              border: "2px solid rgba(255,255,255,0.3)",
              fontSize: 16,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: i > 0 ? -12 : 0,
              position: "relative",
              zIndex: avatars.length - i,
            }}
          >
            {a}
          </span>
        ))}
      </div>
      <span style={{ fontSize: 10, color: "#fff", background: "rgba(0,0,0,0.4)", padding: "1px 6px", borderRadius: 8 }}>
        {formatViewers(count)}人
      </span>
      <span style={{ fontSize: 9, color: "#ffc966", background: "rgba(0,0,0,0.4)", padding: "1px 6px", borderRadius: 6 }}>
        群主
      </span>
    </div>
  );
}
