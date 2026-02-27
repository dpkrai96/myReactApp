import { useState } from "react";
import { IcAlert } from "./Icons";
import { avatarBg, initials, deptColor } from "../utils";

/* ── Spinner ──────────────────────────────────────────── */
export function Spinner({ size = 14, color = "#fff" }) {
  return (
    <div
      className="spinner"
      style={{
        width:           size,
        height:          size,
        borderTopColor:  color,
      }}
    />
  );
}

/* ── Skeleton ─────────────────────────────────────────── */
export function Skeleton({ height = 16, width = "100%" }) {
  return (
    <div
      className="skeleton"
      style={{ height, width }}
    />
  );
}

/* ── Avatar ───────────────────────────────────────────── */
export function Avatar({ name, size = 36 }) {
  return (
    <div
      className="avatar"
      style={{
        width:      size,
        height:     size,
        background: avatarBg(name),
        fontSize:   size * 0.36,
      }}
    >
      {initials(name)}
    </div>
  );
}

/* ── DeptBadge ────────────────────────────────────────── */
export function DeptBadge({ dept }) {
  const c = deptColor(dept);
  return (
    <span
      className="badge"
      style={{ background: c.bg, color: c.fg }}
    >
      {dept}
    </span>
  );
}

/* ── StatusBadge ──────────────────────────────────────── */
export function StatusBadge({ status }) {
  const isPresent = status === "Present";
  const color     = isPresent ? "var(--green)" : "var(--red)";
  const bg        = isPresent
    ? "rgba(34,197,94,0.12)"
    : "rgba(239,68,68,0.12)";

  return (
    <span
      className="badge badge--status"
      style={{ background: bg, color }}
    >
      <span
        className="badge--status__dot"
        style={{ background: color }}
      />
      {status}
    </span>
  );
}

/* ── Button ───────────────────────────────────────────── */
export function Button({
  children,
  onClick,
  variant = "primary",
  size    = "md",
  disabled,
  loading,
  type    = "button",
  className = "",
}) {
  const spinnerColors = {
    primary: "#fff",
    danger:  "var(--red)",
    ghost:   "var(--text-2)",
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={`btn btn--${variant} btn--${size} ${className}`}
    >
      {loading && (
        <Spinner size={13} color={spinnerColors[variant] || "#fff"} />
      )}
      {children}
    </button>
  );
}

/* ── Field ────────────────────────────────────────────── */
export function Field({ label, error, children }) {
  return (
    <div className="field">
      <label className="field__label">{label}</label>
      {children}
      {error && (
        <div className="field__error">
          <IcAlert sz={11} />
          {error}
        </div>
      )}
    </div>
  );
}

/* ── Input ────────────────────────────────────────────── */
export function Input({ value, onChange, placeholder, type = "text", error }) {
  const [focused, setFocused] = useState(false);

  return (
    <input
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      className={`input ${error ? "input--error" : ""}`}
      style={focused && !error ? { borderColor: "var(--accent)" } : {}}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    />
  );
}

/* ── Select ───────────────────────────────────────────── */
export function Select({ value, onChange, children, error }) {
  const [focused, setFocused] = useState(false);

  return (
    <select
      value={value}
      onChange={onChange}
      className={`select ${error ? "select--error" : ""}`}
      style={focused && !error ? { borderColor: "var(--accent)" } : {}}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
    >
      {children}
    </select>
  );
}

/* ── EmptyState ───────────────────────────────────────── */
export function EmptyState({ icon, title, subtitle, action }) {
  return (
    <div className="empty-state">
      <div className="empty-state__icon">{icon}</div>
      <p className="empty-state__title">{title}</p>
      <p className="empty-state__subtitle">{subtitle}</p>
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  );
}

/* ── ErrorBanner ──────────────────────────────────────── */
export function ErrorBanner({ message, onRetry }) {
  return (
    <div className="error-banner">
      <IcAlert sz={15} />
      {message}
      {onRetry && (
        <button className="error-banner__retry" onClick={onRetry}>
          Retry
        </button>
      )}
    </div>
  );
}
