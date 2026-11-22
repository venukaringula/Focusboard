import {
  LayoutDashboard,
  ListChecks,
  Lightbulb,
  Target,
} from "lucide-react";

function Sidebar() {
  return (
    <aside className="sidebar" aria-label="Main navigation">
      <a className="brand" href="#dashboard" aria-label="FocusBoard home">
        <span className="brand-mark">
          <Target size={22} />
        </span>
        <span>
          Focus<span className="brand-accent">Board</span>
        </span>
      </a>

      <div className="sidebar-label">WORKSPACE</div>

      <nav className="sidebar-nav">
        <a className="sidebar-link active" href="#dashboard">
          <LayoutDashboard size={18} />
          <span>Dashboard</span>
        </a>

        <a className="sidebar-link" href="#tasks">
          <ListChecks size={18} />
          <span>My Tasks</span>
        </a>

        <a className="sidebar-link" href="#focus-notes">
          <Lightbulb size={18} />
          <span>Focus Notes</span>
        </a>
      </nav>

      <div className="sidebar-footer">
        <div className="sidebar-footer-icon">
          <Target size={18} />
        </div>
        <div>
          <strong>Stay on track</strong>
          <p>One task at a time.</p>
        </div>
      </div>
    </aside>
  );
}

export default Sidebar;