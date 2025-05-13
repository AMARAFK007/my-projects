import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon,
  ShoppingBagIcon,
  UsersIcon,
  CubeIcon,
  ChartBarIcon,
  CogIcon,
  TagIcon,
  ShoppingCartIcon,
  UserCircleIcon,
  ArrowLeftOnRectangleIcon,
} from '@heroicons/react/24/outline';

type NavItem = {
  name: string;
  href: string;
  icon: React.ForwardRefExoticComponent<React.SVGProps<SVGSVGElement>>;
};

const navigation: NavItem[] = [
  { name: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { name: 'Products', href: '/products', icon: CubeIcon },
  { name: 'Orders', href: '/orders', icon: ShoppingCartIcon },
  { name: 'Customers', href: '/customers', icon: UsersIcon },
  { name: 'Categories', href: '/categories', icon: TagIcon },
  { name: 'Analytics', href: '/analytics', icon: ChartBarIcon },
  { name: 'Marketing', href: '/marketing', icon: ShoppingBagIcon },
  { name: 'Settings', href: '/settings', icon: CogIcon },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="flex flex-col h-full px-3 py-4 overflow-y-auto bg-white border-r border-gray-200">
      <div className="flex items-center justify-center h-16 mb-5">
        <Link 
          href="/dashboard" 
          className="flex items-center justify-center"
        >
          <span className="self-center text-xl font-semibold text-primary-600">
            MedShop Admin
          </span>
        </Link>
      </div>
      <div className="flex flex-col justify-between flex-1">
        <nav className="flex-1 space-y-1">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname?.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`flex items-center px-4 py-3 text-sm font-medium rounded-md group ${
                  isActive 
                    ? 'bg-primary-50 text-primary-600' 
                    : 'text-gray-700 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <item.icon
                  className={`flex-shrink-0 w-5 h-5 mr-3 ${
                    isActive ? 'text-primary-600' : 'text-gray-400 group-hover:text-gray-500'
                  }`}
                  aria-hidden="true"
                />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>
        <div className="pt-4 mt-6 border-t border-gray-200">
          <Link
            href="/profile"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900"
          >
            <UserCircleIcon className="flex-shrink-0 w-5 h-5 mr-3 text-gray-400" />
            <span>Your Profile</span>
          </Link>
          <Link
            href="/logout"
            className="flex items-center px-4 py-3 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-50 hover:text-gray-900"
          >
            <ArrowLeftOnRectangleIcon className="flex-shrink-0 w-5 h-5 mr-3 text-gray-400" />
            <span>Sign out</span>
          </Link>
        </div>
      </div>
    </div>
  );
} 