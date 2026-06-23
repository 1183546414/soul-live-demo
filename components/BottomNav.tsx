"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function BottomNav() {
  const pathname = usePathname();
  const hideOnRoom = pathname.startsWith("/room/");

  if (hideOnRoom) return null;

  const isFeed = pathname.startsWith("/feed");
  const isLive = pathname === "/";
  const isGoLive = pathname.startsWith("/go-live");

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: "50%",
        transform: "translateX(-50%)",
        width: "100%",
        maxWidth: 430,
        height: "calc(56px + var(--safe-bottom))",
        paddingBottom: "var(--safe-bottom)",
        background: "#fff",
        borderTop: "1px solid var(--border)",
        display: "flex",
        alignItems: "flex-end",
        justifyContent: "space-around",
        paddingTop: 6,
        zIndex: 100,
        boxShadow: "0 -2px 12px rgba(0,0,0,0.04)",
      }}
    >
      <NavItem href="#" label="星球" active={false} icon={<PlanetIcon />} />
      <NavItem
        href="/feed"
        label="广场"
        active={isFeed}
        badge={7}
        icon={<SquareIcon active={isFeed} />}
      />

      <Link
        href="/go-live"
        style={{
          position: "relative",
          top: -18,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <div
          style={{
            width: 64,
            height: 64,
            borderRadius: "50%",
            background: isGoLive ? "var(--accent-dark)" : "var(--accent)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#fff",
            fontSize: 13,
            fontWeight: 600,
            lineHeight: 1.2,
            textAlign: "center",
            boxShadow: "0 4px 16px var(--accent-glow)",
          }}
        >
          开播
        </div>
      </Link>

      <NavItem
        href="/"
        label="直播"
        active={isLive}
        icon={<LiveIcon active={isLive} />}
        showLivePulse={!isLive}
      />
      <NavItem
        href="#"
        label="自己"
        active={false}
        icon={
          <div
            style={{
              width: 26,
              height: 26,
              borderRadius: "50%",
              background: "linear-gradient(135deg, #ffd89b, #ff9a9e)",
              border: "1.5px solid #ddd",
            }}
          />
        }
      />
    </nav>
  );
}

function NavItem({
  href,
  label,
  active,
  icon,
  badge,
  showLivePulse,
}: {
  href: string;
  label: string;
  active: boolean;
  icon: React.ReactNode;
  badge?: number;
  showLivePulse?: boolean;
}) {
  return (
    <Link
      href={href}
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 3,
        fontSize: 10,
        color: active ? "var(--accent)" : "var(--text-muted)",
        minWidth: 48,
        position: "relative",
        paddingBottom: 4,
      }}
    >
      <span style={{ position: "relative", display: "flex" }}>
        {icon}
        {badge !== undefined && (
          <span
            style={{
              position: "absolute",
              top: -4,
              right: -10,
              minWidth: 16,
              height: 16,
              borderRadius: 8,
              background: "var(--badge-red)",
              color: "#fff",
              fontSize: 10,
              fontWeight: 600,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "0 4px",
            }}
          >
            {badge}
          </span>
        )}
        {showLivePulse && (
          <span
            className="live-ring"
            style={{
              position: "absolute",
              inset: -3,
              borderRadius: "50%",
              border: "1.5px solid var(--live-red)",
              pointerEvents: "none",
            }}
          />
        )}
      </span>
      {label}
    </Link>
  );
}

function PlanetIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="8" stroke="#999" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="12" ry="4" stroke="#999" strokeWidth="1.2" transform="rotate(-20 12 12)" />
    </svg>
  );
}

function SquareIcon({ active }: { active: boolean }) {
  const c = active ? "var(--accent)" : "#999";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <rect x="4" y="4" width="16" height="16" rx="3" stroke={c} strokeWidth="1.5" />
      <line x1="8" y1="9" x2="16" y2="9" stroke={c} strokeWidth="1.2" />
      <line x1="8" y1="13" x2="14" y2="13" stroke={c} strokeWidth="1.2" />
    </svg>
  );
}

function LiveIcon({ active }: { active: boolean }) {
  const c = active ? "var(--accent)" : "#999";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="3" fill={c} />
      <path d="M12 5a7 7 0 0 1 7 7M12 19a7 7 0 0 0 7-7M5 12a7 7 0 0 1 7-7M5 12a7 7 0 0 0 7 7" stroke={c} strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
}
