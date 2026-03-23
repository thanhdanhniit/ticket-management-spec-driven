import { NavLink } from 'react-router-dom';
import clsx from 'clsx';

const settingsNav = [
  {
    category: 'Users',
    items: [
      { label: 'Users', path: '/settings/users' },
      { label: 'Permissions', path: '/settings/permissions' },
      { label: 'Teams', path: '/settings/teams' },
      { label: 'Postmortem Templates', path: '/settings/postmortem-templates' },
      { label: 'Audit Logs', path: '/settings/audit-logs' },
    ],
  },
];

export default function SettingsSidebar() {
  return (
    <aside className="w-56 shrink-0 bg-white border-r border-slate-200 h-full overflow-y-auto">
      <div className="px-5 py-5">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Settings</h2>
        {settingsNav.map(({ category, items }) => (
          <div key={category} className="mb-4">
            <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 px-2">
              {category}
            </p>
            <ul className="space-y-0.5">
              {items.map(({ label, path }) => (
                <li key={path}>
                  <NavLink
                    to={path}
                    className={({ isActive }) =>
                      clsx(
                        'block px-3 py-2 text-sm rounded-md transition-colors duration-150',
                        isActive
                          ? 'bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600'
                          : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                      )
                    }
                  >
                    {label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </aside>
  );
}
