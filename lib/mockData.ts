export type LiveMode = "avatar" | "real" | "voice";

export interface LiveRoom {
  id: string;
  hostName: string;
  hostAvatar: string;
  title: string;
  tags: string[];
  mode: LiveMode;
  viewers: number;
  matchScore?: number;
  isFollowing?: boolean;
  isFriend?: boolean;
  gradient: string;
  emoji: string;
}

export interface Gift {
  id: string;
  name: string;
  emoji: string;
  price: number;
  tier: "free" | "mid" | "premium";
  description: string;
}

export const LIVE_ROOMS: LiveRoom[] = [
  {
    id: "1",
    hostName: "元气甜心",
    hostAvatar: "🎨",
    title: "深夜治愈电台 · 吉他弹唱",
    tags: ["#民谣", "#治愈"],
    mode: "avatar",
    viewers: 1284,
    matchScore: 92,
    isFollowing: true,
    gradient: "linear-gradient(135deg, #a8edea 0%, #25d4d0 100%)",
    emoji: "🎸",
  },
  {
    id: "2",
    hostName: "云画画小李",
    hostAvatar: "🖌️",
    title: "云画画 · 线上画室",
    tags: ["#绘画", "#同好"],
    mode: "real",
    viewers: 856,
    matchScore: 87,
    isFriend: true,
    gradient: "linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)",
    emoji: "🎨",
  },
  {
    id: "3",
    hostName: "狼人杀小张",
    hostAvatar: "🐺",
    title: "狼人杀声音直播 · 观众上麦",
    tags: ["#狼人杀", "#派对"],
    mode: "voice",
    viewers: 2341,
    matchScore: 78,
    gradient: "linear-gradient(135deg, #89f7fe 0%, #66a6ff 100%)",
    emoji: "🎙️",
  },
  {
    id: "4",
    hostName: "哲学夜话",
    hostAvatar: "🌙",
    title: "凌晨一点的灵魂对话",
    tags: ["#哲学", "#深夜"],
    mode: "voice",
    viewers: 432,
    matchScore: 95,
    isFollowing: true,
    gradient: "linear-gradient(135deg, #e0c3fc 0%, #8ec5fc 100%)",
    emoji: "💭",
  },
  {
    id: "5",
    hostName: "SSR捏脸师",
    hostAvatar: "✨",
    title: "3D虚拟形象首秀",
    tags: ["#Avatar", "#捏脸"],
    mode: "avatar",
    viewers: 3102,
    matchScore: 88,
    gradient: "linear-gradient(135deg, #fed6e3 0%, #a8edea 100%)",
    emoji: "👾",
  },
];

export const GIFTS: Gift[] = [
  { id: "heart", name: "小心心", emoji: "💜", price: 1, tier: "free", description: "灵魂补给" },
  { id: "like", name: "点赞", emoji: "👍", price: 0, tier: "free", description: "免费任务" },
  { id: "guitar", name: "同频吉他", emoji: "🎸", price: 10, tier: "mid", description: "共鸣礼物" },
  { id: "spark", name: "思维火花", emoji: "✨", price: 20, tier: "mid", description: "触发灵魂共鸣" },
  { id: "boat", name: "灵魂纸船", emoji: "⛵", price: 30, tier: "mid", description: "共鸣礼物" },
  { id: "star", name: "星际穿越门票", emoji: "🌌", price: 99, tier: "premium", description: "守护礼物" },
  { id: "wand", name: "灵魂重塑魔杖", emoji: "🪄", price: 199, tier: "premium", description: "+10 Soulmate亲密度" },
];

export const MODE_OPTIONS = [
  {
    id: "avatar" as LiveMode,
    title: "虚拟形象模式",
    subtitle: "Avatar Mode",
    description: "3D捏脸形象出镜，保护隐私，零容貌焦虑",
    emoji: "👾",
    highlight: true,
  },
  {
    id: "real" as LiveMode,
    title: "真人模式",
    subtitle: "Real Mode",
    description: "美颜滤镜，展示真实才艺与表情",
    emoji: "📷",
    highlight: false,
  },
  {
    id: "voice" as LiveMode,
    title: "语音直播",
    subtitle: "Voice Mode",
    description: "静态封面 + 声波动效，支持多人连麦",
    emoji: "🎙️",
    highlight: false,
  },
];

export const FEED_POSTS = [
  { id: "p1", author: "深夜旅人", content: "今晚的月亮好圆，有人一起聊聊吗？", avatar: "🌙" },
  { id: "p2", author: "咖啡爱好者", content: "推荐一家超棒的独立咖啡馆", avatar: "☕" },
  { id: "p3", author: "跑步达人", content: "晨跑5公里打卡！", avatar: "🏃" },
];

export function formatViewers(n: number): string {
  if (n >= 10000) return `${(n / 10000).toFixed(1)}万`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(n);
}

export function getRoomById(id: string): LiveRoom | undefined {
  return LIVE_ROOMS.find((r) => r.id === id);
}
