export const DEPT_COLORS = {
  "Engineering":     { bg: "rgba(79,142,247,0.12)",  fg: "#4f8ef7" },
  "Design":          { bg: "rgba(168,85,247,0.12)",  fg: "#a855f7" },
  "Human Resources": { bg: "rgba(34,197,94,0.12)",   fg: "#22c55e" },
  "Finance":         { bg: "rgba(245,158,11,0.12)",  fg: "#f59e0b" },
  "Marketing":       { bg: "rgba(236,72,153,0.12)",  fg: "#ec4899" },
  "Operations":      { bg: "rgba(20,184,166,0.12)",  fg: "#14b8a6" },
  "Sales":           { bg: "rgba(239,68,68,0.12)",   fg: "#ef4444" },
  "Legal":           { bg: "rgba(99,102,241,0.12)",  fg: "#6366f1" },
};

export const DEPARTMENTS = Object.keys(DEPT_COLORS);

export const deptColor = (dept) =>
  DEPT_COLORS[dept] || { bg: "rgba(148,163,184,0.12)", fg: "#94a3b8" };

const AVATAR_COLORS = [
  "#4f8ef7", "#a855f7", "#22c55e", "#f59e0b",
  "#ec4899", "#14b8a6", "#6366f1", "#ef4444",
];

export const avatarBg = (name) => {
  let hash = 0;
  for (const ch of name) hash = (hash * 31 + ch.charCodeAt(0)) & 0xffffffff;
  return AVATAR_COLORS[Math.abs(hash) % AVATAR_COLORS.length];
};

export const initials = (name) =>
  name.split(" ").map((w) => w[0]).join("").slice(0, 2).toUpperCase();

export const fmtDate = (d) =>
  new Date(d + "T00:00:00").toLocaleDateString("en-IN", {
    day: "2-digit", month: "short", year: "numeric",
  });

export const today = () => new Date().toISOString().split("T")[0];

export const emailRe = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const errMsg = (e) =>
  e?.detail || e?.message || "An unexpected error occurred";
