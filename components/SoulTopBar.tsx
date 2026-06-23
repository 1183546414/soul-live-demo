"use client";

interface SoulTopBarProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
  banner?: string;
}

export default function SoulTopBar({
  tabs,
  activeTab,
  onTabChange,
  banner,
}: SoulTopBarProps) {
  return (
    <header style={{ position: "sticky", top: 0, zIndex: 50, background: "#fff" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 16px 0",
        }}
      >
        <button style={{ padding: 4 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="9" stroke="#666" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="3" fill="#666" />
          </svg>
        </button>
        <div className="soul-top-tabs" style={{ padding: 0, position: "static" }}>
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`soul-top-tab${activeTab === tab ? " active" : ""}`}
              onClick={() => onTabChange(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
        <button style={{ padding: 4 }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
            <circle cx="11" cy="11" r="7" stroke="#666" strokeWidth="1.5" />
            <line x1="16" y1="16" x2="21" y2="21" stroke="#666" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
        </button>
      </div>
      {banner && <div className="soul-banner">{banner}</div>}
    </header>
  );
}
