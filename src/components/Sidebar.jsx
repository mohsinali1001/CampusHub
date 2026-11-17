
// Sidebar.jsx - Functional navigation sidebar for CampusHub

const navigationItems = [
  { id: 'dashboard', icon: '📊', label: 'Dashboard' },
  { id: 'students', icon: '🎓', label: 'Students' },
  { id: 'courses', icon: '📚', label: 'Courses' },
  { id: 'attendance', icon: '📋', label: 'Attendance' },
  { id: 'settings', icon: '⚙️', label: 'Settings' },
];

function Sidebar({
  isCollapsed,
  onToggle,
  activePage,
  onNavigate,
  isOnline,
}) {
  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>

      {/* University Branding */}
      <div className="sidebar-brand">
        <span className="brand-icon">🏛️</span>

        <div className="brand-text">
          <span className="brand-title">CampusHub</span>
          <span className="brand-subtitle">University Portal</span>
        </div>
      </div>

      {/* Collapse Button */}
      <button
        type="button"
        className="sidebar-toggle"
        onClick={onToggle}
        aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
      >
        {isCollapsed ? '»' : '«'}
      </button>

      {/* Navigation Menu */}
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {navigationItems.map((item) => (
            <li
              key={item.id}
              className={`nav-item ${
                activePage === item.id ? 'active' : ''
              }`}
              onClick={() => onNavigate(item.id)}
              role="button"
              tabIndex={0}
              aria-current={activePage === item.id ? 'page' : undefined}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault();
                  onNavigate(item.id);
                }
              }}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </li>
          ))}
        </ul>
      </nav>

      {/* Sidebar Footer */}
      <div className="sidebar-footer">
        <div className="system-status">
          <span
            className="status-dot"
            style={{
              backgroundColor: isOnline ? '#10b981' : '#ef4444',
            }}
          />

          <span className="status-text">
            {isOnline ? 'System Online' : 'System Offline'}
          </span>
        </div>

        <p className="system-version">
          CampusHub v1.0 • Fall 2026
        </p>
      </div>

    </aside>
  );
}

export default Sidebar;
