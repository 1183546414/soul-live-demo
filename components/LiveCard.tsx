import Link from "next/link";
import type { LiveRoom } from "@/lib/mockData";
import { formatViewers } from "@/lib/mockData";

const MODE_LABEL: Record<string, string> = {
  avatar: "虚拟形象直播",
  real: "才艺直播",
  voice: "语音直播",
};

interface LiveCardProps {
  room: LiveRoom;
  embedded?: boolean;
}

export default function LiveCard({ room, embedded = false }: LiveCardProps) {
  return (
    <article className={embedded ? "soul-card" : ""} style={embedded ? undefined : { marginBottom: 0 }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 10, flex: 1, minWidth: 0 }}>
          <Link href={`/room/${room.id}`}>
            <span
              className={room.isFriend ? "live-ring" : undefined}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: room.gradient,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 22,
                border: room.isFriend ? "2px solid var(--live-red)" : "2px solid #fff",
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
              }}
            >
              {room.hostAvatar}
            </span>
          </Link>
          <div style={{ minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, flexWrap: "wrap" }}>
              <span style={{ fontWeight: 600, fontSize: 15 }}>{room.hostName}</span>
              {room.isFollowing && (
                <span
                  style={{
                    fontSize: 10,
                    padding: "1px 6px",
                    borderRadius: 4,
                    background: "#fff3e0",
                    color: "#ff9800",
                  }}
                >
                  已关注
                </span>
              )}
            </div>
            <div style={{ fontSize: 12, color: "var(--text-muted)", marginTop: 2 }}>
              {MODE_LABEL[room.mode]} · {formatViewers(room.viewers)} 观看
            </div>
          </div>
        </div>
        <button className="btn-outline">关注</button>
      </div>

      <Link href={`/room/${room.id}`}>
        <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 10 }}>
          {room.title}{" "}
          {room.tags.map((tag) => (
            <span key={tag} className="hashtag">
              {tag}
            </span>
          ))}
        </p>

        <div
          style={{
            borderRadius: 12,
            overflow: "hidden",
            position: "relative",
            marginBottom: 10,
          }}
        >
          <div
            style={{
              height: embedded ? 220 : 200,
              background: room.gradient,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "55%",
                height: "75%",
                borderRadius: 12,
                background: "rgba(255,255,255,0.25)",
                backdropFilter: "blur(8px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 56,
                border: "2px solid rgba(255,255,255,0.4)",
              }}
            >
              {room.emoji}
            </div>
            <span
              style={{
                position: "absolute",
                top: 10,
                right: 10,
                background: "var(--live-red)",
                color: "#fff",
                fontSize: 11,
                fontWeight: 700,
                padding: "3px 8px",
                borderRadius: 4,
                letterSpacing: 0.5,
              }}
            >
              LIVE
            </span>
            {room.matchScore && (
              <span
                style={{
                  position: "absolute",
                  top: 10,
                  left: 10,
                  background: "rgba(255,255,255,0.9)",
                  color: "var(--accent-dark)",
                  fontSize: 11,
                  fontWeight: 600,
                  padding: "3px 10px",
                  borderRadius: 12,
                }}
              >
                灵魂匹配 {room.matchScore}%
              </span>
            )}
          </div>
        </div>

        {room.mode === "voice" && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              background: "var(--accent)",
              borderRadius: 24,
              padding: "10px 16px",
              marginBottom: 10,
            }}
          >
            <span style={{ color: "#fff", fontSize: 16 }}>▶</span>
            <div style={{ flex: 1, display: "flex", alignItems: "center", gap: 2, height: 20 }}>
              {Array.from({ length: 30 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 2,
                    height: `${8 + Math.sin(i * 0.8) * 8 + (i % 3) * 2}px`,
                    background: "rgba(255,255,255,0.8)",
                    borderRadius: 1,
                  }}
                />
              ))}
            </div>
            <span style={{ color: "#fff", fontSize: 13 }}>直播中</span>
          </div>
        )}

        <div style={{ display: "flex", gap: 8, marginBottom: 12 }}>
          <span
            style={{
              fontSize: 12,
              padding: "4px 10px",
              borderRadius: 14,
              background: "var(--surface-2)",
              color: "var(--text-secondary)",
            }}
          >
            🎵 {MODE_LABEL[room.mode]}
          </span>
        </div>
      </Link>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingTop: 4,
          borderTop: "1px solid var(--divider)",
        }}
      >
        <button
          style={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            fontSize: 13,
            color: "var(--text-muted)",
          }}
        >
          <span
            style={{
              width: 22,
              height: 22,
              borderRadius: "50%",
              background: "var(--accent-light)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 11,
              color: "var(--accent)",
              fontWeight: 700,
            }}
          >
            Hi
          </span>
          私聊
        </button>
        <div style={{ display: "flex", gap: 20, fontSize: 13, color: "var(--text-muted)" }}>
          <span>❤️ {formatViewers(room.viewers)}</span>
          <span>💬 评论</span>
        </div>
      </div>
    </article>
  );
}
