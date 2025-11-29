import React, { useState } from 'react';
import UserNavbar from '../../Components/UserComponents/UserNavbar';
import { Outlet } from 'react-router-dom';
import SidebarDrawer from '../../Components/UserComponents/SidebarDrawer';

const UserLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Toggle button (mobile) */}
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden fixed top-4 left-4 z-50 p-2 bg-background/90 text-text rounded-lg shadow hover:opacity-95"
        aria-label="Open sidebar"
      >
        ☰
      </button>

      <div className="flex">
        {/* Desktop sidebar */}
        <div className="hidden md:block md:w-64">
          <SidebarDrawer />
        </div>

        {/* Mobile slide-over sidebar */}
        {sidebarOpen && (
          <>
            <div
              className="fixed inset-0 z-40 bg-black/40"
              onClick={() => setSidebarOpen(false)}
              aria-hidden
            />

            <aside className="fixed inset-y-0 left-0 z-50 w-64 bg-background/95 border-r border-text/5 shadow-lg p-4 overflow-auto">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-text">Paper Insight</h3>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 rounded hover:bg-text/5"
                  aria-label="Close sidebar"
                >
                  ✕
                </button>
              </div>
              <SidebarDrawer />
            </aside>
          </>
        )}

        {/* Main content area */}
        <main className="flex-1">
          <UserNavbar />
          <div className="p-4 shadow-sm">
            
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}

export default UserLayout;
