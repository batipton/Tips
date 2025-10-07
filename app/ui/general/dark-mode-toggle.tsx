'use client';

import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { setTheme } from '@/app/lib/user-actions';

export default function DarkModeToggle({userDarkMode}:{userDarkMode: boolean}) {
  const [darkMode, setDarkMode] = useState(userDarkMode);
  const [isHydrated, setIsHydrated] = useState(false);

  // Handle hydration
  useEffect(() => {
    setIsHydrated(true);
    
    // Initialize dark mode after hydration
    const initializeDarkMode = () => {
      let shouldBeDark = userDarkMode;
      
      // Only check localStorage and system preference if userDarkMode is undefined/null
      if (userDarkMode === undefined || userDarkMode === null) {
        const storedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        
        if (storedTheme === 'dark') {
          shouldBeDark = true;
        } else if (storedTheme === 'light') {
          shouldBeDark = false;
        } else {
          shouldBeDark = systemPrefersDark;
        }
      }
      
      // Apply theme to DOM
      if (shouldBeDark) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
      
      // Update state only if different from current
      if (shouldBeDark !== darkMode) {
        setDarkMode(shouldBeDark);
      }
    };
    
    initializeDarkMode();
  }, []); // Only run once on mount

  // Update DOM when userDarkMode prop changes (but only after hydration)
  useEffect(() => {
    if (!isHydrated) return;
    
    if (userDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    setDarkMode(userDarkMode);
  }, [userDarkMode, isHydrated]);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    setTheme(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  // Prevent hydration mismatch by not rendering until hydrated
  if (!isHydrated) {
    return (
      <button
        className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
        disabled
      >
        <MoonIcon className="h-5 w-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleDarkMode}
      className="p-2 rounded-full text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-700 transition-colors"
      title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? (
        <SunIcon className="h-5 w-5" />
      ) : (
        <MoonIcon className="h-5 w-5" />
      )}
    </button>
  );
}
