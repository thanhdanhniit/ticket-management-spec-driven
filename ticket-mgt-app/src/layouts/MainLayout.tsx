import { Outlet } from 'react-router-dom';
import GlobalSidebar from '../components/layout/GlobalSidebar';
import TopNavBar from '../components/layout/TopNavBar';
import { useSidebarStore } from '../store/sidebarStore';
import clsx from 'clsx';

export default function MainLayout() {
  const { isCollapsed } = useSidebarStore();

  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      <GlobalSidebar />

      {/* Content area shifts based on sidebar width */}
      <div
        className={clsx(
          'flex flex-col flex-1 transition-all duration-200 overflow-hidden',
          isCollapsed ? 'ml-16' : 'ml-60'
        )}
      >
        <TopNavBar />
        <main className="flex-1 overflow-y-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
