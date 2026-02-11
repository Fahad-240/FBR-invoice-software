import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutDashboard, FileText, ListChecks, LogOut, Building2, FileSpreadsheet, Menu, X } from 'lucide-react';
import { OfflineStatusBar } from './offline-status-bar';

import logo from '../../0833fc58-8a0e-47be-bab1-7b8f4361811f.png';

interface DashboardLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export function DashboardLayout({ children, onLogout }: DashboardLayoutProps) {
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Close mobile menu when screen becomes large
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/create-invoice', label: 'Create Invoice', icon: FileText },
    { path: '/invoices', label: 'Invoice List', icon: ListChecks },
    { path: '/annex-c', label: 'Annex-C Report', icon: FileSpreadsheet },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Fixed Header */}
      <header className="bg-slate-50 h-20 flex items-center justify-between px-4 lg:px-6 fixed top-0 left-0 right-0 z-50 shadow-sm border-b border-slate-200">
        <div className="flex items-center gap-2 md:gap-4">
          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 -ml-2 text-slate-600 hover:bg-slate-100 rounded-sm"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          <img src={logo} alt="Al Aiza Logo" className="h-14 md:h-27 w-auto object-contain" />
          <div className="flex flex-col justify-center">
            <h1 className="text-sm md:text-3xl font-bold tracking-tight text-primary leading-none">Al Aiza Enterprises</h1>
          </div>
        </div>
        <div className="flex items-center gap-3 lg:gap-4">
          <div className="text-right hidden md:block">
            <p className="text-sm font-medium text-slate-700">Admin User</p>
            <p className="text-xs text-slate-500">accountant@abcent.com</p>
          </div>
          <button
            onClick={onLogout}
            className="p-2 text-slate-600 hover:bg-destructive hover:text-white rounded-sm transition-colors"
            title="Logout"
          >
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Offline Status Bar */}
      <div className="fixed top-20 left-0 right-0 z-20">
        <OfflineStatusBar />
      </div>

      <div className="flex pt-20">
        {/* Mobile Overlay */}
        {isMobileMenuOpen && (
          <div
            className="fixed inset-0 bg-black/50 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          />
        )}

        {/* Sidebar */}
        <aside
          className={`
            fixed top-20 left-0 h-[calc(100vh-5rem)] bg-white border-r border-slate-200 z-50 w-64
            transition-transform duration-300 ease-in-out md:translate-x-0 md:w-48 xl:w-56 mt-10
            ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
          `}
        >
          <nav className="p-3 xl:p-4 h-full overflow-y-auto">
            <div className="md:hidden mb-4 px-3 py-2">
              <p className="text-sm font-medium text-slate-700">Admin User</p>
              <p className="text-xs text-slate-500">accountant@abcent.com</p>
            </div>
            <ul className="space-y-1">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.path;
                return (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-2 xl:gap-3 px-3 xl:px-4 py-2.5 rounded-sm transition-colors ${isActive
                        ? 'bg-primary text-white'
                        : 'text-slate-700 hover:bg-slate-100'
                        }`}
                      onClick={() => setIsMobileMenuOpen(false)}
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
        <main className="flex-1 w-full p-4 lg:p-6 xl:p-8 mt-10 md:ml-48 xl:ml-56 overflow-x-hidden">
          {children}
        </main>
      </div>
    </div>
  );
}