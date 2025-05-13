import React, { ReactNode, useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Image,
  Settings,
  DollarSign,
  LogOut,
  Menu,
  X,
  Calendar,
  MessageSquare,
  Users,
  LayoutDashboard
} from 'lucide-react';
import { AuthContext } from '../../App';

interface SidebarLinkProps {
  to: string;
  icon: ReactNode;
  label: string;
  active: boolean;
}

const SidebarLink = ({ to, icon, label, active }: SidebarLinkProps) => (
  <Link
    to={to}
    className={`flex items-center space-x-3 rounded-md p-2 ${
      active
        ? 'bg-primary text-white'
        : 'text-foreground hover:bg-primary/10'
    }`}
  >
    <span className="flex h-6 w-6 items-center justify-center">{icon}</span>
    <span>{label}</span>
  </Link>
);

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navigationItems = [
    { to: '/admin', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { to: '/admin/gallery', icon: <Image size={20} />, label: 'Gallery' },
    { to: '/admin/bookings', icon: <Calendar size={20} />, label: 'Bookings' },
    { to: '/admin/pricing', icon: <DollarSign size={20} />, label: 'Pricing' },
    { to: '/admin/testimonials', icon: <MessageSquare size={20} />, label: 'Testimonials' },
    { to: '/admin/users', icon: <Users size={20} />, label: 'Users' },
    { to: '/admin/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/50 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-20 w-64 transform bg-card shadow-lg transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-16 items-center justify-between border-b px-4">
          <div className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-primary">KBN Admin</span>
          </div>
          <button
            onClick={toggleSidebar}
            className="rounded-md p-2 text-foreground hover:bg-muted lg:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <div className="space-y-4 px-4 py-6">
          <div className="space-y-1">
            {navigationItems.map((item) => (
              <SidebarLink
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                active={location.pathname === item.to}
              />
            ))}
          </div>

          <div className="pt-6">
            <button 
              onClick={handleLogout}
              className="flex w-full items-center space-x-3 rounded-md p-2 text-red-500 hover:bg-red-500/10"
            >
              <span className="flex h-6 w-6 items-center justify-center">
                <LogOut size={20} />
              </span>
              <span>Logout</span>
            </button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top navbar */}
        <header className="h-16 border-b bg-card shadow-sm">
          <div className="flex h-full items-center justify-between px-4">
            <button
              onClick={toggleSidebar}
              className="rounded-md p-2 text-foreground hover:bg-muted lg:hidden"
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-primary text-white flex items-center justify-center">
                  <span className="text-sm font-semibold">A</span>
                </div>
                <span className="text-sm font-medium">Admin User</span>
              </div>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
} 