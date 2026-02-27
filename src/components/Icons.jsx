const ic = (path, opts = {}) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={opts.w || 2}
    strokeLinecap="round"
    strokeLinejoin="round"
    style={{ width: opts.sz || 16, height: opts.sz || 16, flexShrink: 0 }}
  >
    {path}
  </svg>
);

export const IcDashboard = ({ sz = 16 }) =>
  ic(
    <>
      <rect x="3"  y="3"  width="7" height="7" rx="1" />
      <rect x="14" y="3"  width="7" height="7" rx="1" />
      <rect x="14" y="14" width="7" height="7" rx="1" />
      <rect x="3"  y="14" width="7" height="7" rx="1" />
    </>,
    { sz }
  );

export const IcPeople = ({ sz = 16 }) =>
  ic(
    <>
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </>,
    { sz }
  );

export const IcCalendar = ({ sz = 16 }) =>
  ic(
    <>
      <rect x="3" y="4" width="18" height="18" rx="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8"  y1="2" x2="8"  y2="6" />
      <line x1="3"  y1="10" x2="21" y2="10" />
    </>,
    { sz }
  );

export const IcPlus = ({ sz = 16 }) =>
  ic(
    <>
      <line x1="12" y1="5"  x2="12" y2="19" />
      <line x1="5"  y1="12" x2="19" y2="12" />
    </>,
    { sz, w: 2.5 }
  );

export const IcTrash = ({ sz = 16 }) =>
  ic(
    <>
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6l-1 14H6L5 6" />
      <path d="M10 11v6" />
      <path d="M14 11v6" />
      <path d="M9 6V4h6v2" />
    </>,
    { sz }
  );

export const IcX = ({ sz = 16 }) =>
  ic(
    <>
      <line x1="18" y1="6"  x2="6"  y2="18" />
      <line x1="6"  y1="6"  x2="18" y2="18" />
    </>,
    { sz, w: 2.5 }
  );

export const IcCheck = ({ sz = 16 }) =>
  ic(<polyline points="20 6 9 17 4 12" />, { sz, w: 2.5 });

export const IcAlert = ({ sz = 16 }) =>
  ic(
    <>
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="8"     x2="12"   y2="12" />
      <line x1="12" y1="16"    x2="12.01" y2="16" />
    </>,
    { sz }
  );

export const IcFilter = ({ sz = 16 }) =>
  ic(
    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />,
    { sz }
  );

export const IcSearch = ({ sz = 16 }) =>
  ic(
    <>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </>,
    { sz }
  );
