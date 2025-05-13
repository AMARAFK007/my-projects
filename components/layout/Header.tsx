import React from 'react';
import Link from 'next/link';
import { 
  BellIcon, 
  MagnifyingGlassIcon,
  Bars3Icon 
} from '@heroicons/react/24/outline';

type HeaderProps = {
  toggleSidebar: () => void;
};

export default function Header({ toggleSidebar }: HeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex items-center h-16 px-4 bg-white border-b border-gray-200 sm:px-6">
      <button
        type="button"
        className="p-2 text-gray-500 rounded-md lg:hidden hover:text-gray-900 hover:bg-gray-100"
        onClick={toggleSidebar}
      >
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="w-6 h-6" aria-hidden="true" />
      </button>
      
      {/* Search */}
      <div className="flex items-center justify-start flex-1 ml-4 lg:ml-0">
        <div className="w-full max-w-lg lg:max-w-xs">
          <label htmlFor="search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
            </div>
            <input
              id="search"
              name="search"
              className="block w-full py-2 pl-10 pr-3 text-sm placeholder-gray-500 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-primary-500 focus:border-primary-500"
              placeholder="Search..."
              type="search"
            />
          </div>
        </div>
      </div>
      
      {/* Actions */}
      <div className="flex items-center space-x-4">
        <button
          type="button"
          className="p-1 text-gray-400 bg-white rounded-full hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500"
        >
          <span className="sr-only">View notifications</span>
          <BellIcon className="w-6 h-6" aria-hidden="true" />
        </button>
        
        {/* Profile dropdown */}
        <div className="relative flex-shrink-0">
          <div>
            <button
              type="button"
              className="flex text-sm bg-white rounded-full focus:outline-none focus:ring-2 focus:ring-primary-500"
              id="user-menu-button"
              aria-expanded="false"
              aria-haspopup="true"
            >
              <span className="sr-only">Open user menu</span>
              <img
                className="w-8 h-8 rounded-full"
                src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
              />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
} 