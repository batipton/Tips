'use client';

import { useState } from 'react';
import { Bars3Icon, BellIcon, UserCircleIcon, CurrencyDollarIcon, SparklesIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';
import DarkModeToggle from '@/app/ui/general/dark-mode-toggle';

interface TopNavigationProps {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  notifications?: number;
  onMenuToggle?: () => void;
}

export default function TopNavigation({ user, notifications = 0, onMenuToggle }: TopNavigationProps) {
  const [showUserMenu, setShowUserMenu] = useState(false);

  return (
    <header className="bg-white dark:bg-gray-800 shadow-sm border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between px-4 py-3">
        {/* Left side - Logo and hamburger menu */}
        <div className="flex items-center space-x-4">
          <button
            onClick={onMenuToggle}
            className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <Bars3Icon className="h-6 w-6" />
          </button>
          
          {/* Logo */}
          <Link
            href="/home"
            className="flex items-center hover:opacity-80 transition-opacity duration-200"
          >
            <span className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
              Tips
            </span>
          </Link>
        </div>

        {/* Right side - Dark mode, Notifications and user menu */}
        <div className="flex items-center space-x-2">
          {/* Dark mode toggle */}
          <DarkModeToggle />
          
          {/* Notifications */}
          <Link
            href="/home/notifications"
            className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <BellIcon className="h-6 w-6" />
            {notifications > 0 && (
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                {notifications > 9 ? '9+' : notifications}
              </span>
            )}
          </Link>

          {/* User menu */}
          <div className="relative">
            <button
              onClick={() => setShowUserMenu(!showUserMenu)}
              className="flex items-center space-x-2 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
            >
              {user?.image ? (
                <Image
                  src={user.image}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <UserCircleIcon className="h-8 w-8 text-gray-600 dark:text-gray-400" />
              )}
              <span className="hidden md:block text-sm font-medium text-gray-700 dark:text-gray-200">
                {user?.name || 'User'}
              </span>
            </button>

            {/* User dropdown */}
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-50 border border-gray-200 dark:border-gray-700">
                <Link
                  href="/home/profile"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setShowUserMenu(false)}
                >
                  Profile
                </Link>
                <Link
                  href="/home/settings"
                  className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => setShowUserMenu(false)}
                >
                  Settings
                </Link>
                <hr className="my-1 border-gray-200 dark:border-gray-700" />
                <button
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  onClick={() => {
                    setShowUserMenu(false);
                    // Sign out functionality would go here
                  }}
                >
                  Sign out
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
