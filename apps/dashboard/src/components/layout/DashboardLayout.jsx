import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    // The canvas is the tinted plane and the chrome (sidebar, header, cards) is
    // white on top of it. Before, sidebar and canvas were both washed grey and
    // the menu had nothing to separate it from the page.
    <div className="min-h-screen flex bg-gray-100/70">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 p-5 lg:p-7 overflow-auto">
          <div className="animate-page-enter">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
