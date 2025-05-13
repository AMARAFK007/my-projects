import React, { useState, useEffect, createContext, useContext, ReactNode, useLayoutEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from './lib/firebase';
import { lazy, Suspense } from 'react';
import './styles/admin.css';
import './styles/mobile.css';

// Layouts
const MobileLayout = lazy(() => import('./layout/MobileLayout'));
const AdminLayout = lazy(() => import('./layout/AdminLayout'));

// Pages
import Login from './pages/Login';

// Lazy load components for better performance
const Home = lazy(() => import('./pages/Home'));
const ProductDetail = lazy(() => import('./pages/ProductDetail'));
const Checkout = lazy(() => import('./pages/Checkout'));
const AdminDashboard = lazy(() => import('./pages/Admin/Dashboard'));
const AdminProducts = lazy(() => import('./pages/Admin/Products'));
const GalleryManager = lazy(() => import('./pages/GalleryManager'));

// Auth context
interface AuthContextType {
  isAuthenticated: boolean;
  login: () => void;
  logout: () => void;
}

// Device context
interface DeviceContextType {
  isMobile: boolean;
  isTablet: boolean;
  isDesktop: boolean;
  isLandscape: boolean;
  isOffline: boolean;
}

const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: () => {},
  logout: () => {},
});

const DeviceContext = createContext<DeviceContextType>({
  isMobile: false,
  isTablet: false,
  isDesktop: true,
  isLandscape: false,
  isOffline: false
});

// Protected route component
const ProtectedRoute = ({ children }: { children: ReactNode }) => {
  const { isAuthenticated } = useContext(AuthContext);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};

// Layout wrapper that shows mobile layout on mobile devices
const LayoutWrapper = ({ children }: { children: ReactNode }) => {
  const { isMobile } = useContext(DeviceContext);
  
  if (isMobile) {
    return <MobileLayout>{children}</MobileLayout>;
  }
  
  return <>{children}</>;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  
  // Device detection state
  const [deviceState, setDeviceState] = useState({
    isMobile: false,
    isTablet: false, 
    isDesktop: true,
    isLandscape: false,
    isOffline: false
  });
  
  // Check device type and orientation on mount and resize
  useLayoutEffect(() => {
    const checkDevice = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      setDeviceState({
        isMobile: width < 768,
        isTablet: width >= 768 && width < 1024,
        isDesktop: width >= 1024,
        isLandscape: width > height,
        isOffline: !navigator.onLine
      });
    };
    
    // Initial check
    checkDevice();
    
    // Listen for window resize
    window.addEventListener('resize', checkDevice);
    
    // Listen for online/offline events
    window.addEventListener('online', () => {
      setDeviceState(prevState => ({ ...prevState, isOffline: false }));
    });
    
    window.addEventListener('offline', () => {
      setDeviceState(prevState => ({ ...prevState, isOffline: true }));
    });
    
    return () => {
      window.removeEventListener('resize', checkDevice);
      window.removeEventListener('online', () => {});
      window.removeEventListener('offline', () => {});
    };
  }, []);
  
  // Register service worker
  useEffect(() => {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('/sw.js')
          .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch(error => {
            console.error('Service Worker registration failed:', error);
          });
      });
    }
  }, []);
  
  // Check Firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });
    
    // Cleanup subscription
    return () => unsubscribe();
  }, []);
  
  // Also check localStorage as a fallback
  useEffect(() => {
    const storedAuth = localStorage.getItem('isAuthenticated');
    if (storedAuth === 'true') {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);
  
  const login = () => {
    localStorage.setItem('isAuthenticated', 'true');
    setIsAuthenticated(true);
  };
  
  const logout = () => {
    auth.signOut();
    localStorage.removeItem('isAuthenticated');
    setIsAuthenticated(false);
  };
  
  // Offline notification
  useEffect(() => {
    if (deviceState.isOffline) {
      const showOfflineNotification = async () => {
        try {
          // Try to show notification if permission granted
          if (Notification.permission === 'granted') {
            new Notification('MedShop is offline', {
              body: 'You are currently browsing in offline mode',
              icon: '/images/logo.png'
            });
          } 
          // Otherwise show a simple alert
          else if (Notification.permission !== 'denied') {
            alert('You are currently offline. Some features may be limited.');
          }
        } catch (error) {
          console.error('Error showing offline notification:', error);
        }
      };
      
      showOfflineNotification();
    }
  }, [deviceState.isOffline]);
  
  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="text-center">
          <div className="mb-4 h-12 w-12 animate-spin rounded-full border-t-2 border-b-2 border-primary mx-auto"></div>
          <p className="text-lg text-foreground/70">Loading...</p>
        </div>
      </div>
    );
  }
  
  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      <DeviceContext.Provider value={deviceState}>
        <Router>
          <Suspense fallback={
            <div className={deviceState.isMobile ? "mobile-spinner" : "loading-spinner"}></div>
          }>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={
                <LayoutWrapper>
                  <Home />
                </LayoutWrapper>
              } />
              <Route path="/product/:id" element={
                <LayoutWrapper>
                  <ProductDetail />
                </LayoutWrapper>
              } />
              <Route path="/checkout" element={
                <LayoutWrapper>
                  <Checkout />
                </LayoutWrapper>
              } />
              
              {/* Login route */}
              <Route path="/login" element={<Login />} />
              
              {/* Admin Routes */}
              <Route path="/admin" element={
                <AdminLayout>
                  <AdminDashboard />
                </AdminLayout>
              } />
              <Route path="/admin/products" element={
                <AdminLayout>
                  <AdminProducts />
                </AdminLayout>
              } />
              
              {/* Protected Routes */}
              <Route
                path="/admin/gallery"
                element={
                  <ProtectedRoute>
                    <AdminLayout>
                      <GalleryManager />
                    </AdminLayout>
                  </ProtectedRoute>
                }
              />
              
              {/* Offline fallback route */}
              <Route path="/offline" element={
                <div className="offline-fallback">
                  <h1>You are offline</h1>
                  <p>Please check your internet connection and try again.</p>
                </div>
              } />
              
              {/* Redirect to login if not authenticated, otherwise to admin dashboard */}
              <Route 
                path="*" 
                element={
                  isAuthenticated ? 
                    <Navigate to="/admin" replace /> : 
                    <Navigate to="/login" replace />
                } 
              />
            </Routes>
          </Suspense>
        </Router>
      </DeviceContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
export { AuthContext, DeviceContext }; 