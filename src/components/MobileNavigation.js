'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const MobileNavigation = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const pathname = usePathname();
  
  // Check if current route is active
  const isActive = (path) => {
    return pathname === path || pathname.startsWith(path + '/');
  };
  
  // Load cart count from localStorage (client-side only)
  useEffect(() => {
    const loadCartCount = () => {
      try {
        const savedCart = localStorage.getItem('medshopCart');
        if (savedCart) {
          const cart = JSON.parse(savedCart);
          const count = cart.reduce((total, item) => total + item.quantity, 0);
          setCartCount(count);
        }
      } catch (error) {
        console.error('Error loading cart data:', error);
      }
    };
    
    // Load on mount
    loadCartCount();
    
    // Listen for storage changes to update cart badge
    const handleStorageChange = (e) => {
      if (e.key === 'medshopCart') {
        loadCartCount();
      }
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    // Custom event for cart updates within the same tab
    window.addEventListener('cartUpdated', loadCartCount);
    
    // Clean up
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('cartUpdated', loadCartCount);
    };
  }, []);
  
  // Toggle drawer
  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };
  
  // Close drawer
  const closeDrawer = () => {
    setDrawerOpen(false);
  };
  
  return (
    <>
      {/* Mobile Header */}
      <header className="mobile-header">
        <button 
          className="mobile-menu-btn" 
          onClick={toggleDrawer}
          aria-label="Menu"
        >
          <i className="fas fa-bars"></i>
        </button>
        
        <Link href="/" className="mobile-logo-link">
          <img 
            src="/images/logo.png" 
            alt="MedShop" 
            className="mobile-logo"
          />
        </Link>
        
        <Link href="/cart" className="mobile-cart-btn">
          <i className="fas fa-shopping-cart"></i>
          {cartCount > 0 && <span className="badge">{cartCount}</span>}
        </Link>
      </header>
      
      {/* Mobile Drawer/Sidebar */}
      <div 
        className={`drawer-overlay ${drawerOpen ? 'open' : ''}`}
        onClick={closeDrawer}
      ></div>
      
      <div className={`mobile-drawer ${drawerOpen ? 'open' : ''}`}>
        <div className="drawer-header">
          <div className="drawer-user">
            <i className="fas fa-user-circle"></i>
            <span>Welcome, Guest</span>
          </div>
          <button className="drawer-close" onClick={closeDrawer}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        
        <div className="drawer-content">
          <ul className="drawer-nav">
            <li className="drawer-nav-item">
              <Link href="/" className="drawer-nav-link" onClick={closeDrawer}>
                <i className="fas fa-home"></i>
                <span>Home</span>
              </Link>
            </li>
            <li className="drawer-nav-item">
              <Link href="/products" className="drawer-nav-link" onClick={closeDrawer}>
                <i className="fas fa-box"></i>
                <span>Products</span>
              </Link>
            </li>
            <li className="drawer-nav-item">
              <Link href="/categories" className="drawer-nav-link" onClick={closeDrawer}>
                <i className="fas fa-tags"></i>
                <span>Categories</span>
              </Link>
            </li>
            <li className="drawer-nav-item">
              <Link href="/cart" className="drawer-nav-link" onClick={closeDrawer}>
                <i className="fas fa-shopping-cart"></i>
                <span>Cart</span>
                {cartCount > 0 && <span className="drawer-badge">{cartCount}</span>}
              </Link>
            </li>
            <li className="drawer-nav-item">
              <Link href="/account" className="drawer-nav-link" onClick={closeDrawer}>
                <i className="fas fa-user"></i>
                <span>Account</span>
              </Link>
            </li>
            <li className="drawer-nav-item">
              <Link href="/orders" className="drawer-nav-link" onClick={closeDrawer}>
                <i className="fas fa-receipt"></i>
                <span>Orders</span>
              </Link>
            </li>
          </ul>
          
          <div className="drawer-divider"></div>
          
          <ul className="drawer-nav">
            <li className="drawer-nav-item">
              <Link href="/contact" className="drawer-nav-link" onClick={closeDrawer}>
                <i className="fas fa-envelope"></i>
                <span>Contact Us</span>
              </Link>
            </li>
            <li className="drawer-nav-item">
              <Link href="/about" className="drawer-nav-link" onClick={closeDrawer}>
                <i className="fas fa-info-circle"></i>
                <span>About</span>
              </Link>
            </li>
            <li className="drawer-nav-item">
              <button className="drawer-nav-link logout-btn" onClick={closeDrawer}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Mobile Bottom Navigation */}
      <nav className="mobile-nav">
        <Link href="/" className={`mobile-nav-item ${isActive('/') ? 'active' : ''}`}>
          <i className="fas fa-home"></i>
          <span>Home</span>
        </Link>
        <Link href="/products" className={`mobile-nav-item ${isActive('/products') ? 'active' : ''}`}>
          <i className="fas fa-box"></i>
          <span>Products</span>
        </Link>
        <Link href="/categories" className={`mobile-nav-item ${isActive('/categories') ? 'active' : ''}`}>
          <i className="fas fa-tags"></i>
          <span>Categories</span>
        </Link>
        <Link href="/cart" className={`mobile-nav-item ${isActive('/cart') ? 'active' : ''}`}>
          <i className="fas fa-shopping-cart"></i>
          <span>Cart</span>
          {cartCount > 0 && <span className="nav-badge">{cartCount}</span>}
        </Link>
        <Link href="/account" className={`mobile-nav-item ${isActive('/account') ? 'active' : ''}`}>
          <i className="fas fa-user"></i>
          <span>Account</span>
        </Link>
      </nav>
    </>
  );
};

export default MobileNavigation; 