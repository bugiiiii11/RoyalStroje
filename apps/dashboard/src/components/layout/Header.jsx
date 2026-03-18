import { Menu, LogOut, User } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export default function Header({ onMenuClick }) {
  const { user, userRole, signOut } = useAuth();

  return (
    <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6">
      {/* Left: menu toggle */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
      >
        <Menu className="w-5 h-5 text-gray-600" />
      </button>

      {/* Spacer for desktop */}
      <div className="hidden lg:block" />

      {/* Right: user info */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2 text-sm">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            <User className="w-4 h-4 text-gray-600" />
          </div>
          <div className="hidden sm:block">
            <p className="font-medium text-gray-700">{user?.email}</p>
            <p className="text-xs text-gray-400 capitalize">{userRole}</p>
          </div>
        </div>

        <button
          onClick={signOut}
          className="p-2 hover:bg-gray-100 rounded-lg text-gray-500 hover:text-red-500 transition-colors"
          title="Odhlásiť sa"
        >
          <LogOut className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
