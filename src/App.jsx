import { useState } from "react";
import Sidebar from "./components/Sidebar";
import { ToastContainer } from "./components/Toast";
import DashboardPage  from "./pages/DashboardPage";
import EmployeesPage  from "./pages/EmployeesPage";
import AttendancePage from "./pages/AttendancePage";

export default function App() {
  const [page, setPage] = useState("dashboard");

  return (
    <div className="app-shell">
      <ToastContainer />
      <Sidebar activePage={page} onNavigate={setPage} />
      <main className="main-content">
        {page === "dashboard"  && <DashboardPage  onNavigate={setPage} />}
        {page === "employees"  && <EmployeesPage  />}
        {page === "attendance" && <AttendancePage />}
      </main>
    </div>
  );
}
