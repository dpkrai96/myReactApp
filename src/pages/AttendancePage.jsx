import { useState, useEffect, useCallback } from "react";
import {
  Avatar, DeptBadge, StatusBadge, Skeleton, Button, EmptyState, ErrorBanner,
} from "../components/UI";
import MarkAttendanceModal from "../components/MarkAttendanceModal";
import { IcCalendar, IcCheck, IcFilter, IcX } from "../components/Icons";
import { fmtDate, errMsg } from "../utils";
import api from "../api";
import { toast } from "../components/Toast";

export default function AttendancePage() {
  const [records,    setRecords]    = useState([]);
  const [employees,  setEmployees]  = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [markOpen,   setMarkOpen]   = useState(false);
  const [filterEmp,  setFilterEmp]  = useState("");
  const [filterDate, setFilterDate] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [records, employees] = await Promise.all([
        api.getAttendance(filterEmp || null, filterDate || null),
        api.getEmployees(),
      ]);
      setRecords(records);
      setEmployees(employees);
    } catch (err) {
      setError(errMsg(err));
    } finally {
      setLoading(false);
    }
  }, [filterEmp, filterDate]);

  useEffect(() => { load(); }, [load]);

  const clearFilters = () => {
    setFilterEmp("");
    setFilterDate("");
  };

  const hasFilters = filterEmp || filterDate;

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-header__title">Attendance</h1>
        <p className="page-header__subtitle">
          Track and review daily attendance records
        </p>
      </div>

      {/* Error */}
      {error && <ErrorBanner message={error} />}

      {/* Toolbar */}
      <div className="toolbar">
        {/* Filters */}
        <div className="filter-bar">
          <span className="filter-bar__label">
            <IcFilter sz={13} />
            Filter:
          </span>

          <select
            className={`select select--sm ${filterEmp ? "" : ""}`}
            style={{ width: "auto", color: filterEmp ? "var(--text)" : "var(--text-2)" }}
            value={filterEmp}
            onChange={(e) => setFilterEmp(e.target.value)}
          >
            <option value="">All Employees</option>
            {employees.map((e) => (
              <option key={e.id} value={e.id}>{e.name}</option>
            ))}
          </select>

          <input
            type="date"
            className={`date-input ${filterDate ? "date-input--filled" : ""}`}
            value={filterDate}
            onChange={(e) => setFilterDate(e.target.value)}
          />

          {hasFilters && (
            <button className="filter-bar__clear" onClick={clearFilters}>
              <IcX sz={12} />
              Clear
            </button>
          )}
        </div>

        <Button onClick={() => setMarkOpen(true)}>
          <IcCheck sz={14} />
          Mark Attendance
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="table-wrap skeleton-list">
          {[1, 2, 3, 4, 5].map((i) => <Skeleton key={i} height={52} />)}
        </div>
      ) : records.length === 0 ? (
        <EmptyState
          icon={<IcCalendar sz={24} />}
          title={hasFilters ? "No records match filters" : "No records yet"}
          subtitle={
            hasFilters
              ? "Try adjusting your filters"
              : "Start marking attendance for your team"
          }
          action={
            !hasFilters ? (
              <Button onClick={() => setMarkOpen(true)}>
                <IcCheck sz={14} />
                Mark Attendance
              </Button>
            ) : null
          }
        />
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                {["Employee", "Department", "Date", "Status"].map((h) => (
                  <th key={h}>{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {records.map((r) => {
                const emp = employees.find((e) => e.id === r.employee_id);
                return (
                  <tr key={r.id}>
                    <td>
                      <div className="emp-cell">
                        <Avatar name={r.employee_name} size={34} />
                        <div className="emp-cell__info">
                          <p className="emp-cell__name">{r.employee_name}</p>
                          <p className="emp-cell__id">{r.employee_id}</p>
                        </div>
                      </div>
                    </td>
                    <td>
                      <DeptBadge dept={emp?.department || "—"} />
                    </td>
                    <td style={{ color: "var(--text-2)", fontSize: 13 }}>
                      {fmtDate(r.date)}
                    </td>
                    <td>
                      <StatusBadge status={r.status} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="table-footer">
            <span className="table-footer__count">
              {records.length} record{records.length !== 1 ? "s" : ""}
              {hasFilters ? " (filtered)" : ""}
            </span>
          </div>
        </div>
      )}

      {/* Modal */}
      <MarkAttendanceModal
        open={markOpen}
        onClose={() => setMarkOpen(false)}
        employees={employees}
        onSuccess={(rec) => setRecords((prev) => [rec, ...prev])}
      />
    </div>
  );
}
