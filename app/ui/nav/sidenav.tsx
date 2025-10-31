'use client';

import Link from "next/link";
import NavLinks from "@/app/ui/nav/nav-links";
import Logo from "@/app/ui/general/logo";
import CollapsibleSection from "@/app/ui/general/collapsible-section";
import { PowerIcon, ChevronLeftIcon } from "@heroicons/react/24/outline";

interface SideNavProps {
  isCollapsed?: boolean;
  onToggle?: () => void;
  notifications: number;
  onSignOut: () => void;
}

export default function SideNav({ isCollapsed = false, onToggle, notifications, onSignOut }: SideNavProps) {
  return (
    <div className={`flex h-full flex-col transition-all duration-300 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header with logo and collapse button */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
        <Link
          className={`flex items-center rounded-md p-2 transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 ${
            isCollapsed ? 'w-10 h-10' : 'w-full h-12'
          }`}
          href="/home"
        >
          <div className={`text-gray-900 dark:text-white transition-all duration-300 ${isCollapsed ? 'w-6' : 'w-full'}`}>
            <Logo />
          </div>
        </Link>
        {onToggle && (
          <button
            onClick={onToggle}
            className="hidden lg:block p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700"
          >
            <ChevronLeftIcon className={`h-5 w-5 transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
          </button>
        )}
      </div>

      {/* Navigation content */}
      <div className="flex-1 overflow-y-auto">
        {isCollapsed ? (
          // Collapsed view - only icons
          <div className="p-2 space-y-2">
            <NavLinks notifications={notifications} collapsed={true} />
          </div>
        ) : (
          // Expanded view - full navigation
          <div className="p-4 space-y-4">
            <CollapsibleSection title="Navigation" defaultOpen={true}>
              <NavLinks notifications={notifications} />
            </CollapsibleSection>
            
            <CollapsibleSection title="Quick Actions">
              <div className="space-y-2">
                <Link
                  href="/home/post"
                  className="block p-2 text-sm text-gray-600 dark:text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md"
                >
                  Create Post
                </Link>
                <Link
                  href="/home/followers"
                  className="block p-2 text-sm text-gray-600 dark:text-gray-400 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 rounded-md"
                >
                  Find People
                </Link>
              </div>
            </CollapsibleSection>
          </div>
        )}
      </div>

      {/* Sign out button */}
      <div className="border-t border-gray-200 dark:border-gray-700 p-4">
        <button 
          onClick={onSignOut}
          className={`flex w-full items-center gap-2 rounded-md bg-gray-50 dark:bg-gray-700 p-3 text-sm font-medium hover:bg-sky-100 hover:text-green-500 dark:hover:bg-gray-600 transition-colors ${
            isCollapsed ? 'justify-center' : 'justify-start'
          }`}
          title={isCollapsed ? 'Sign Out' : undefined}
        >
          <PowerIcon className="w-5 h-5" />
          {!isCollapsed && <span>Sign Out</span>}
        </button>
      </div>
    </div>
  );
}
