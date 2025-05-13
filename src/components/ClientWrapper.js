'use client';

import React, { useState, useEffect } from 'react';
import MobileNavigation from './MobileNavigation';

// ClientWrapper component for functionality that needs to be client-side
const ClientWrapper = ({ children }) => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  
  // Device detection - must be done client-side
  useEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      setIsMobile(width < 768);
    };
    
    // Check network status
    const updateOnlineStatus = () => {
      setIsOffline(!navigator.onLine);
    };
    
    // Initial checks
    checkDevice();
    updateOnlineStatus();
    setIsLoaded(true);
    
    // Add event listeners
    window.addEventListener('resize', checkDevice);
    window.addEventListener('online', updateOnlineStatus);
    window.addEventListener('offline', updateOnlineStatus);
    
    // Cleanup
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('online', updateOnlineStatus);
      window.removeEventListener('offline', updateOnlineStatus);
    };
  }, []);
  
  // Show offline notification if needed
  useEffect(() => {
    if (isOffline) {
      // Try to show notification if we have permission
      if (Notification && Notification.permission === 'granted') {
        try {
          // Create notification
          new Notification('MedShop is offline', {
            body: 'You are browsing in offline mode. Some features may be limited.',
            icon: '/images/logo.png'
          });
        } catch (error) {
          console.error('Error showing notification:', error);
        }
      }
    }
  }, [isOffline]);
  
  // Must wait for client-side load to avoid hydration errors
  if (!isLoaded) {
    return <>{children}</>;
  }
  
  return (
    <>
      {/* Render mobile navigation if on small screen */}
      {isMobile && <MobileNavigation />}
      
      {/* Show offline banner if needed */}
      {isOffline && (
        <div className="offline-banner">
          <i className="fas fa-wifi-slash"></i>
          <span>You're offline. Some features may be limited.</span>
          <button onClick={() => window.location.reload()}>Retry</button>
        </div>
      )}
      
      {/* Page content */}
      <div className={isMobile ? 'mobile-layout' : ''}>
        {children}
      </div>
    </>
  );
};

export default ClientWrapper; 