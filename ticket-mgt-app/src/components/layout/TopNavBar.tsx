import { useState } from 'react';
import { Search, HelpCircle, X, ChevronDown } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';
import { useNavigate } from 'react-router-dom';


const helpItems = ['API Docs', 'Support Docs', 'Take a Product Tour', 'FAQ', 'Contact Us'];

export default function TopNavBar() {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();
  const [showProfile, setShowProfile] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  const [showBanner, setShowBanner] = useState(true);

  const initials = user?.fullName
    ? user.fullName.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'U';

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="flex flex-col w-full bg-white border-b border-slate-200 z-20">
      {/* Notification Banner */}
      {showBanner && (
        <div className="flex items-center justify-between px-6 py-2 bg-blue-50 border-b border-blue-100 text-blue-700 text-sm">
          <span>Verify your Phone Number to enable Phone and SMS notifications.</span>
          <button onClick={() => setShowBanner(false)} className="ml-4 hover:text-blue-900">
            <X size={14} />
          </button>
        </div>
      )}

      {/* Main bar */}
      <div className="flex items-center justify-between px-6 h-14 gap-4">
        {/* Left: Team Selector */}
        <div className="flex items-center gap-2 text-sm font-medium text-slate-700 cursor-pointer hover:text-slate-900 select-none">
          <span>Default Team</span>
          <ChevronDown size={14} />
        </div>

        {/* Center: Search */}
        <div className="flex-1 max-w-sm">
          <div className="flex items-center gap-2 bg-slate-100 rounded-lg px-3 py-1.5 text-sm text-slate-500">
            <Search size={14} />
            <span>Search...</span>
            <kbd className="ml-auto text-xs bg-white border border-slate-200 rounded px-1">/</kbd>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <span className="text-sm text-slate-500 hidden md:block">On Call: None</span>

          {/* Help */}
          <div className="relative">
            <button
              onClick={() => { setShowHelp(!showHelp); setShowProfile(false); }}
              className="p-1.5 rounded-full hover:bg-slate-100 text-slate-500"
            >
              <HelpCircle size={18} />
            </button>
            {showHelp && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-slate-200 py-1 z-50">
                {helpItems.map((item) => (
                  <button key={item} className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                    {item}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Profile Avatar */}
          <div className="relative">
            <button
              onClick={() => { setShowProfile(!showProfile); setShowHelp(false); }}
              className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-white text-xs font-bold"
            >
              {initials}
            </button>
            {showProfile && (
              <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-xl border border-slate-200 py-1 z-50">
                <div className="px-4 py-3 border-b border-slate-100">
                  <p className="text-sm font-semibold text-slate-800">{user?.fullName}</p>
                  <p className="text-xs text-slate-500 mt-0.5">Account Owner</p>
                </div>
                <button
                  onClick={() => navigate('/profile')}
                  className="block w-full text-left px-4 py-2 text-sm text-slate-700 hover:bg-slate-50"
                >
                  Profile
                </button>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
