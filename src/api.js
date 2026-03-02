const API_BASE = import.meta.env.VITE_API_BASE || "https://fastapi-production-065a.up.railway.app:8000";

const http = {
  async get(path) {
    const res = await fetch(`${API_BASE}${path}`);
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  },

  async post(path, body) {
    const res = await fetch(`${API_BASE}${path}`, {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(body),
    });
    const data = await res.json();
    if (!res.ok) throw data;
    return data;
  },

  async del(path) {
    const res = await fetch(`${API_BASE}${path}`, { method: "DELETE" });
    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw data;
    }
  },
};

const api = {
  // Employees
  getEmployees:   ()         => http.get("/api/employees"),
  addEmployee:    (data)     => http.post("/api/employees", data),
  deleteEmployee: (id)       => http.del(`/api/employees/${id}`),

  // Attendance
  getAttendance: (employeeId, dateFilter) => {
    const q = new URLSearchParams();
    if (employeeId)  q.set("employee_id",  employeeId);
    if (dateFilter)  q.set("date_filter",  dateFilter);
    return http.get(`/api/attendance${q.toString() ? "?" + q : ""}`);
  },
  markAttendance: (data) => http.post("/api/attendance", data),

  // Dashboard
  getDashboard: () => http.get("/api/dashboard"),
};

export default api;
