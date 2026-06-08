"use client";
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Activity, Shield, HardDrive, LifeBuoy, BarChart, Download, Settings, LogOut } from 'lucide-react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();

  const handleLogout = async () => {
    await fetch('/api/admin/auth', { method: 'DELETE' });
    window.location.href = '/login';
  };

  return (
    <div className="flex h-screen bg-gray-950 text-gray-200 overflow-hidden">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 border-r border-gray-800 flex flex-col h-full">
        <div className="p-6 border-b border-gray-800">
          <h2 className="text-xl font-bold text-indigo-400 flex items-center gap-2">
            <Settings className="w-6 h-6" />
            Super Admin
          </h2>
        </div>
        
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-1">
          <NavLink href="/admin/dashboard" icon={LayoutDashboard} active={pathname === '/admin/dashboard'}>Dashboard</NavLink>
          <NavLink href="/admin/accounts" icon={Users} active={pathname.includes('/admin/accounts')}>Accounts Directory</NavLink>
          <NavLink href="/admin/logs" icon={Activity} active={pathname === '/admin/logs'}>Sync Logs</NavLink>
          <NavLink href="/admin/analytics" icon={BarChart} active={pathname === '/admin/analytics'}>Global Analytics</NavLink>
          <NavLink href="/admin/security" icon={Shield} active={pathname === '/admin/security'}>Security & Access</NavLink>
          <NavLink href="/admin/system" icon={HardDrive} active={pathname === '/admin/system'}>System Health</NavLink>
          <NavLink href="/admin/support" icon={LifeBuoy} active={pathname === '/admin/support'}>Support Tickets</NavLink>
          <NavLink href="/admin/export" icon={Download} active={pathname === '/admin/export'}>Data Export</NavLink>
          <NavLink href="/admin/settings" icon={Settings} active={pathname === '/admin/settings'}>Settings</NavLink>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <button onClick={handleLogout} className="flex w-full items-center gap-3 px-3 py-2 text-gray-400 hover:bg-red-900/30 hover:text-red-400 rounded-md transition-colors">
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto relative">
        <header className="bg-gray-900/80 backdrop-blur border-b border-gray-800 p-4 sticky top-0 z-10 flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-100">Bakery Management Platform</h1>
          <div className="flex items-center gap-3">
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
             <span className="text-sm text-gray-400">System Online</span>
          </div>
        </header>
        <main className="p-8 max-w-7xl mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

function NavLink({ href, icon: Icon, active, children }) {
  return (
    <Link href={href} className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${active ? 'bg-indigo-900/50 text-indigo-300' : 'text-gray-300 hover:bg-gray-800 hover:text-white'}`}>
      <Icon className="w-5 h-5" />
      {children}
    </Link>
  );
}
