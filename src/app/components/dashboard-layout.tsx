import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, ListChecks, LogOut, Building2, FileSpreadsheet } from 'lucide-react';
import { OfflineStatusBar } from './offline-status-bar';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export function DashboardLayout({ children, onLogout }: DashboardLayoutProps) {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/create-invoice', label: 'Create Invoice', icon: FileText },
    { path: '/invoices', label: 'Invoice List', icon: ListChecks },
    { path: '/annex-c', label: 'Annex-C Report', icon: FileSpreadsheet },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Fixed Header */}
      <header className="bg-[#1e3a5f] text-white h-16 flex items-center justify-between px-4 lg:px-6 fixed top-0 left-0 right-0 z-10 shadow-md">
        <div className="flex items-center gap-3">
          <Building2 className="w-6 h-6 lg:w-7 lg:h-7" />
          <div>
            <h1 className="text-base lg:text-lg tracking-tight">FBR Digital Invoice System</h1>
            <p className="text-xs text-slate-300 hidden lg:block">ABC Enterprises (Pvt) Ltd</p>
          </div>
        </div>
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="text-right hidden md:block">
            <p className="text-sm">Admin User</p>
            <p className="text-xs text-slate-300">accountant@abcent.com</p>
          </div>
          <button
            onClick={onLogout}
            className="p-2 hover:bg-[#2d5280] rounded-sm transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Offline Status Bar */}
      <div className="fixed top-16 left-0 right-0 z-10">
        <OfflineStatusBar />
      </div>

      <div className="flex pt-16">
        {/* Sidebar */}
        <aside className="w-48 xl:w-56 bg-white border-r border-slate-200 h-screen fixed left-0 top-16 hidden md:block mt-10">
          <nav className="p-3 xl:p-4">
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2.5 rounded-sm transition-colors ${isActive
                        ? 'bg-[#1e3a5f] text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                        }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span className="text-sm">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:ml-48 xl:ml-56 p-4 lg:p-6 xl:p-8 mt-10">
          {children}
        </main>
      </div>
    </div>
  );
}