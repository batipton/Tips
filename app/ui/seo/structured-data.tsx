'use client';

import { useEffect, useState } from 'react';

interface StructuredDataProps {
  data: any;
}

export default function StructuredData({ data }: StructuredDataProps) {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    // Mark as hydrated first
    setIsHydrated(true);
    
    // Delay DOM manipulation until after hydration is complete
    const timer = setTimeout(() => {
      // Create script element
      const script = document.createElement('script');
      script.type = 'application/ld+json';
      script.textContent = JSON.stringify(data);
      script.id = 'structured-data';
      
      // Remove existing structured data if any
      const existing = document.getElementById('structured-data');
      if (existing) {
        existing.remove();
      }
      
      // Add new structured data
      document.head.appendChild(script);
    }, 0);
    
    // Cleanup on unmount
    return () => {
      clearTimeout(timer);
      const scriptToRemove = document.getElementById('structured-data');
      if (scriptToRemove) {
        scriptToRemove.remove();
      }
    };
  }, [data]);

  return null;
}
