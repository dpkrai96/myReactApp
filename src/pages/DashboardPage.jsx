import { useState, useEffect } from "react";
import { Avatar, DeptBadge, StatusBadge, Skeleton } from "../components/UI";
import { fmtDate } from "../utils";
import api from "../api";

const STAT_CARDS = [
  { key: "total_employees",   label: "Total Employees", color: "var(--accent)"  },
  { key: "present_today",     label: "Present Today",   color: "var(--green)"   },
  { key: "absent_today",      label: "Absent Today",    color: "var(--red)"     },
  { key: "total_departments", label: "Departments",     color: "var(--purple)"  },
];

export default function DashboardPage({ onNavigate }) {
  const [stats,     setStats]     = useState(null);
  const [recent,    setRecent]    = useState([]);
  const [employees, setEmployees] = useState([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const [s, r, e] = await Promise.all([
          api.getDashboard(),
          api.getAttendance(null, null),
          api.getEmployees(),
        ]);
        setStats(s);
        setRecent(r.slice(0, 5));
        setEmployees(e);
      } catch {
        // silently fail — dashboard is non-critical
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const topPerformers = [...employees]
    .sort((a, b) => b.present_days - a.present_days)
    .slice(0, 4);

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-header__title">Dashboard</h1>
        <p className="page-header__subtitle">
          {new Date().toLocaleDateString("en-IN", {
            weekday: "long", day: "numeric", month: "long", year: "numeric",
          })}
        </p>
      </div>

      {/* Stat cards */}
      <div className="stats-grid">
        {STAT_CARDS.map(({ key, label, color }) => (
          <div key={key} className="stat-card">
            <div className="stat-card__header">
              <p className="stat-card__label">{label}</p>
              <div
                className="stat-card__dot"
                style={{ background: color, boxShadow: `0 0 7px ${color}` }}
              />
            </div>
            {loading ? (
              <Skeleton height={40} width={70} />
            ) : (
              <p className="stat-card__value" style={{ color }}>
                {stats?.[key] ?? "—"}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Summary row */}
      <div className="summary-grid">
        {/* Attendance rate */}
        <div className="rate-card">
          <p className="rate-card__section-label">Today's Attendance Rate</p>
          {loading ? (
            <Skeleton height={22} />
          ) : (
            <>
              <div className="rate-card__number">
                <span className="rate-card__big">
                  {stats?.attendance_rate ?? 0}
                </span>
                <span className="rate-card__pct">%</span>
              </div>
              <div className="rate-card__bar-track">
                <div
                  className="rate-card__bar-fill"
                  style={{ width: `${stats?.attendance_rate || 0}%` }}
                />
              </div>
              <p className="rate-card__caption">
                {stats?.present_today} of {stats?.total_employees} employees present
              </p>
            </>
          )}
        </div>

        {/* Top performers */}
        <div className="performers-card">
          <p className="performers-card__section-label">Top Attendance Performers</p>
          {loading ? (
            <Skeleton height={90} />
          ) : (
            <div className="performers-list">
              {topPerformers.map((emp) => (
                <div key={emp.id} className="performer-row">
                  <Avatar name={emp.name} size={28} />
                  <div className="performer-row__info">
                    <p className="performer-row__name">{emp.name}</p>
                    <div className="performer-row__bar-track">
                      <div
                        className="performer-row__bar-fill"
                        style={{
                          width: `${Math.min((emp.present_days / 25) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                  <span className="performer-row__score">
                    {emp.present_days}d
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Recent attendance */}
      <div className="recent-panel">
        <div className="recent-panel__header">
          <span className="recent-panel__title">Recent Attendance</span>
          <button
            className="recent-panel__link"
            onClick={() => onNavigate("attendance")}
          >
            View all →
          </button>
        </div>

        {loading ? (
          <div className="skeleton-list">
            {[1, 2, 3].map((i) => <Skeleton key={i} height={44} />)}
          </div>
        ) : recent.length === 0 ? (
          <p className="recent-panel__empty">No attendance records yet</p>
        ) : (
          <table className="data-table">
            <thead>
              <tr>
                {["Employee", "Date", "Status"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {recent.map((r) => (
                <tr key={r.id}>
                  <td>
                    <div className="emp-cell">
                      <Avatar name={r.employee_name} size={30} />
                      <div>
                        <p className="emp-cell__name">{r.employee_name}</p>
                        <p className="emp-cell__id">{r.employee_id}</p>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: "var(--text-2)", fontSize: 13 }}>
                    {fmtDate(r.date)}
                  </td>
                  <td>
                    <StatusBadge status={r.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
