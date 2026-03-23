import { Outlet } from 'react-router-dom';
import SettingsSidebar from '../components/layout/SettingsSidebar';

export default function SettingsLayout() {
  return (
    <div className="flex h-screen bg-surface overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <SettingsSidebar />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
