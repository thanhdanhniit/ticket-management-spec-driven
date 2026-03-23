import {
  LayoutDashboard,
  AlertTriangle,
  Bell,
  Server,
  Calendar,
  BookOpen,
  FileText,
  BarChart2,
  Settings,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useSidebarStore } from '../../store/sidebarStore';
import { useAuthStore } from '../../store/authStore';
import clsx from 'clsx';

const navItems = [
  { label: 'Dashboard', icon: LayoutDashboard, path: '/dashboard' },
  { label: 'Incidents', icon: AlertTriangle, path: '/incidents' },
  { label: 'Escalation Policies', icon: Bell, path: '/escalation-policies' },
  { label: 'Services', icon: Server, path: '/services' },
  { label: 'Schedules', icon: Calendar, path: '/schedules' },
  { label: 'Runbooks', icon: BookOpen, path: '/runbooks' },
  { label: 'Postmortems', icon: FileText, path: '/postmortems' },
  { label: 'Analytics', icon: BarChart2, path: '/analytics' },
  { label: 'Settings', icon: Settings, path: '/settings' },
];

export default function GlobalSidebar() {
  const { isCollapsed, toggle } = useSidebarStore();
  const { user } = useAuthStore();

  const initials = user?.fullName
    ? user.fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  return (
    <aside
      className={clsx(
        'flex flex-col bg-sidebar-bg text-sidebar-text h-screen fixed left-0 top-0 z-30 transition-all duration-200',
        isCollapsed ? 'w-16' : 'w-60'
      )}
    >
      {/* Top: Workspace + User */}
      <div className="flex items-center gap-3 px-4 py-4 border-b border-slate-700">
        <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-xs font-bold shrink-0">
          {initials}
        </div>
        {!isCollapsed && (
          <div className="overflow-hidden">
            <p className="text-sidebar-textActive text-sm font-semibold truncate">{user?.fullName ?? 'User'}</p>
            <p className="text-sidebar-text text-xs truncate">{user?.email ?? ''}</p>
          </div>
        )}
      </div>

      {/* Middle: Nav Links */}
      <nav className="flex-1 overflow-y-auto px-2 py-3 space-y-0.5">
        {navItems.map(({ label, icon: Icon, path }) => (
          <NavLink
            key={path}
            to={path}
            title={isCollapsed ? label : undefined}
            className={({ isActive }) =>
              clsx('nav-link', isActive && 'active', isCollapsed && 'justify-center px-2')
            }
          >
            <Icon size={18} className="shrink-0" />
            {!isCollapsed && <span>{label}</span>}
          </NavLink>
        ))}
      </nav>

      {/* Bottom: Branding + Collapse */}
      <div className="border-t border-slate-700 px-2 py-3 space-y-2">
        {!isCollapsed && (
          <p className="text-xs text-slate-600 px-3">© Squadcast Inc. 2017-2026</p>
        )}
        <button
          onClick={toggle}
          className="nav-link w-full"
          title={isCollapsed ? 'Expand' : 'Collapse'}
        >
          {isCollapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
          {!isCollapsed && <span>Collapse</span>}
        </button>
      </div>
    </aside>
  );
}
