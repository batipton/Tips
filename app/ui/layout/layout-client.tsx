'use client';

import { useState, useEffect } from 'react';
import TopNavigation from "@/app/ui/nav/top-navigation";
import { User } from '@/app/lib/definitions';

interface LayoutClientProps {
  sideNav: React.ReactNode;
  mainContent: React.ReactNode;
  recommendations: React.ReactNode;
  tokenWallet: React.ReactNode;
  user?: User;
  notifications: number;
}

export default function LayoutClient({ 
  sideNav, 
  mainContent, 
  recommendations, 
  tokenWallet, 
  user, 
  notifications 
}: LayoutClientProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Close mobile menu when screen gets larger
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMobileMenuOpen(false);
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50 dark:bg-gray-900">
      {/* Top Navigation */}
      <TopNavigation 
        user={user}
        notifications={notifications}
        onMenuToggle={() => setMobileMenuOpen(!mobileMenuOpen)}
      />
      
      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Mobile overlay */}
        {mobileMenuOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setMobileMenuOpen(false)}
          />
        )}
        
        {/* Sidebar */}
        <aside className={`
          fixed lg:relative z-50 lg:z-auto
          transform transition-transform duration-300 ease-in-out
          ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          w-64 h-full bg-white dark:bg-gray-800
        `}>
          <div className="h-full">
            {sideNav}
          </div>
        </aside>
        
        {/* Main content area */}
        <main className="flex-1 flex flex-col overflow-hidden">
          <div className="flex-1 overflow-y-auto">
            <div className="container mx-auto px-4 py-6 lg:px-8">
              {mainContent}
            </div>
          </div>
        </main>
        
        {/* Right sidebar - Recommendations */}
        <aside className="hidden xl:block w-64 bg-white dark:bg-gray-800 border-l border-gray-200 dark:border-gray-700 overflow-y-auto">
          {recommendations}
        </aside>
      </div>
      
      {/* Token Wallet - positioned as overlay */}
      {tokenWallet}
    </div>
  );
}
