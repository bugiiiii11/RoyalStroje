import { Menu, LogOut, User, Bell } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Header({ onMenuClick }) {
  const { user, userRole, signOut } = useAuth();

  return (
    <header className="h-14 bg-white/80 backdrop-blur-sm border-b border-gray-100 flex items-center justify-between px-5 lg:px-7 sticky top-0 z-30">
      {/* Left: menu toggle (mobile) */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 hover:bg-gray-50 rounded-lg transition-colors"
      >
        <Menu className="w-5 h-5 text-gray-500" />
      </button>

      {/* Spacer for desktop */}
      <div className="hidden lg:block" />

      {/* Right: actions + user */}
      <div className="flex items-center gap-2">
        {/* Notification bell placeholder */}
        <button className="p-2 hover:bg-gray-50 rounded-lg text-gray-400 hover:text-gray-600 transition-colors relative">
          <Bell className="w-[18px] h-[18px]" />
        </button>

        {/* Divider */}
        <div className="w-px h-6 bg-gray-100 mx-1" />

        {/* User */}
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-br from-royal-100 to-royal-50 rounded-full flex items-center justify-center ring-1 ring-royal-200/50">
            <User className="w-3.5 h-3.5 text-royal-600" />
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-700 leading-tight">{user?.email?.split('@')[0]}</p>
            <p className="text-[10px] text-gray-400 capitalize leading-tight">{userRole}</p>
          </div>
        </div>

        <button
          onClick={signOut}
          className="p-2 hover:bg-red-50 rounded-lg text-gray-300 hover:text-red-500 transition-colors"
          title="Odhlásiť sa"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
