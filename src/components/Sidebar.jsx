import { IcPeople, IcDashboard, IcCalendar } from "./Icons";

const PAGES = [
  { key: "dashboard",  label: "Dashboard",  Icon: IcDashboard },
  { key: "employees",  label: "Employees",  Icon: IcPeople    },
  { key: "attendance", label: "Attendance", Icon: IcCalendar  },
];

export default function Sidebar({ activePage, onNavigate }) {
  return (
    <aside className="sidebar">
      {/* Brand */}
      <div className="sidebar__brand">
        <p className="sidebar__label">Admin Portal</p>
        <div className="sidebar__brand-row">
          <div className="sidebar__logo">
            <IcPeople sz={13} />
          </div>
          <span className="sidebar__title">
            HRMS<span> Lite</span>
          </span>
        </div>
      </div>

      {/* Nav */}
      <nav className="sidebar__nav">
        <span className="nav__group-label">Navigation</span>
        {PAGES.map(({ key, label, Icon }) => {
          const active = activePage === key;
          return (
            <button
              key={key}
              className={`nav__item ${active ? "nav__item--active" : ""}`}
              onClick={() => onNavigate(key)}
            >
              <Icon sz={15} />
              {label}
              {active && <span className="nav__dot" />}
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="sidebar__footer">
        HRMS Lite v1.0
        <br />
        © 2025
      </div>
    </aside>
  );
}
