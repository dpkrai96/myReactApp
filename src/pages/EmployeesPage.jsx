import { useState, useEffect, useCallback } from "react";
import {
  Avatar, DeptBadge, Skeleton, Button, EmptyState, ErrorBanner,
} from "../components/UI";
import { ConfirmModal } from "../components/Modal";
import AddEmployeeModal from "../components/AddEmployeeModal";
import { IcPeople, IcPlus, IcTrash, IcSearch } from "../components/Icons";
import { errMsg, fmtDate } from "../utils";
import api from "../api";
import { toast } from "../components/Toast";

export default function EmployeesPage() {
  const [employees,  setEmployees]  = useState([]);
  const [loading,    setLoading]    = useState(true);
  const [error,      setError]      = useState(null);
  const [addOpen,    setAddOpen]    = useState(false);
  const [delTarget,  setDelTarget]  = useState(null);
  const [delLoading, setDelLoading] = useState(false);
  const [search,     setSearch]     = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      setEmployees(await api.getEmployees());
    } catch (err) {
      setError(errMsg(err));
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { load(); }, [load]);

  const handleDelete = async () => {
    setDelLoading(true);
    try {
      await api.deleteEmployee(delTarget.id);
      setEmployees((prev) => prev.filter((e) => e.id !== delTarget.id));
      toast(`${delTarget.name} deleted`, "success");
      setDelTarget(null);
    } catch (err) {
      toast(errMsg(err), "error");
    } finally {
      setDelLoading(false);
    }
  };

  const filtered = employees.filter((e) => {
    const q = search.toLowerCase();
    return (
      e.name.toLowerCase().includes(q) ||
      e.id.toLowerCase().includes(q) ||
      e.email.toLowerCase().includes(q) ||
      e.department.toLowerCase().includes(q)
    );
  });

  return (
    <div>
      {/* Header */}
      <div className="page-header">
        <h1 className="page-header__title">Employees</h1>
        <p className="page-header__subtitle">
          Manage your organization's employee directory
        </p>
      </div>

      {/* Error */}
      {error && <ErrorBanner message={error} onRetry={load} />}

      {/* Toolbar */}
      <div className="toolbar">
        <div className="search-wrap">
          <span className="search-wrap__icon">
            <IcSearch sz={15} />
          </span>
          <input
            className="input"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search employees…"
            style={{ paddingLeft: 38 }}
            onFocus={(e) => (e.target.style.borderColor = "var(--accent)")}
            onBlur={(e)  => (e.target.style.borderColor = "var(--border)")}
          />
        </div>
        <Button onClick={() => setAddOpen(true)}>
          <IcPlus sz={14} />
          Add Employee
        </Button>
      </div>

      {/* Content */}
      {loading ? (
        <div className="table-wrap skeleton-list">
          {[1, 2, 3, 4].map((i) => <Skeleton key={i} height={52} />)}
        </div>
      ) : filtered.length === 0 ? (
        search ? (
          <EmptyState
            icon={<IcSearch sz={24} />}
            title="No results found"
            subtitle={`No employees match "${search}"`}
          />
        ) : (
          <EmptyState
            icon={<IcPeople sz={24} />}
            title="No employees yet"
            subtitle="Add your first employee to get started"
            action={
              <Button onClick={() => setAddOpen(true)}>
                <IcPlus sz={14} />
                Add Employee
              </Button>
            }
          />
        )
      ) : (
        <div className="table-wrap">
          <table className="data-table">
            <thead>
              <tr>
                {["Employee", "Department", "Email", "Present Days", "Added", ""].map(
                  (h) => <th key={h}>{h}</th>
                )}
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp) => (
                <tr key={emp.id}>
                  {/* Employee */}
                  <td>
                    <div className="emp-cell">
                      <Avatar name={emp.name} size={36} />
                      <div className="emp-cell__info">
                        <p className="emp-cell__name">{emp.name}</p>
                        <p className="emp-cell__id">{emp.id}</p>
                      </div>
                    </div>
                  </td>

                  {/* Department */}
                  <td><DeptBadge dept={emp.department} /></td>

                  {/* Email */}
                  <td style={{ color: "var(--text-2)", fontSize: 13 }}>
                    {emp.email}
                  </td>

                  {/* Present days */}
                  <td>
                    <div className="days-cell">
                      <div className="days-cell__bar-track">
                        <div
                          className="days-cell__bar-fill"
                          style={{
                            width: `${Math.min((emp.present_days / 25) * 100, 100)}%`,
                          }}
                        />
                      </div>
                      <span className="days-cell__value">{emp.present_days}</span>
                    </div>
                  </td>

                  {/* Added date */}
                  <td style={{ color: "var(--text-3)", fontSize: 12 }}>
                    {new Date(emp.created_at).toLocaleDateString("en-IN", {
                      day: "2-digit", month: "short", year: "numeric",
                    })}
                  </td>

                  {/* Actions */}
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => setDelTarget(emp)}
                    >
                      <IcTrash sz={13} />
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="table-footer">
            <span className="table-footer__count">
              {filtered.length} employee{filtered.length !== 1 ? "s" : ""}
              {search ? " matching search" : ""}
            </span>
            {search && (
              <button
                className="table-footer__clear"
                onClick={() => setSearch("")}
              >
                Clear search
              </button>
            )}
          </div>
        </div>
      )}

      {/* Modals */}
      <AddEmployeeModal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        onSuccess={(emp) => setEmployees((prev) => [emp, ...prev])}
      />
      <ConfirmModal
        open={!!delTarget}
        onClose={() => setDelTarget(null)}
        onConfirm={handleDelete}
        loading={delLoading}
        title="Delete Employee"
        message={`Are you sure you want to delete ${delTarget?.name}? This cannot be undone.`}
      />
    </div>
  );
}
