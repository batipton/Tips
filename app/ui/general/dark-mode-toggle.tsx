'use client';

import { useState, useEffect } from 'react';
import { SunIcon, MoonIcon } from '@heroicons/react/24/outline';
import { setTheme } from '@/app/lib/user-actions';

export default function DarkModeToggle({userDarkMode}:{userDarkMode: boolean}) {
  console.log("userDarkMode: ", userDarkMode);
  const [darkMode, setDarkMode] = useState(userDarkMode);

  useEffect(() => {
    // Apply the user's dark mode preference on mount
    if (userDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    
    // Update state to match the actual DOM state
    setDarkMode(userDarkMode);
  }, [userDarkMode]);

  // Fallback effect for initial load (in case userDarkMode is undefined initially)
  useEffect(() => {
    // Only run if userDarkMode is not explicitly set
    if (userDarkMode === undefined) {
      const isDark = localStorage.getItem('theme') === 'dark' || 
        (!localStorage.getItem('theme') && window.matchMedia('(prefers-color-scheme: dark)').matches);
      
      if (isDark) {
        document.documentElement.classList.add('dark');
        setDarkMode(true);
      }
    }
  }, []); // Only run once on mount

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    setTheme(newDarkMode);
    
    if (newDarkMode) {
      document.documentElement.classList.add('dark');
      // localStorage.theme = 'dark';
    } else {
      document.documentElement.classList.remove('dark');
      // localStorage.theme = 'light';
    }
  };

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
