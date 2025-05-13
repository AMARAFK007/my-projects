import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MobileLayout = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const location = useLocation();
  
  // Check if current route is active
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };
  
  // Load cart count from localStorage
  useEffect(() => {
    const loadCartCount = () => {
      const savedCart = localStorage.getItem('medshopCart');
      if (savedCart) {
        const cart = JSON.parse(savedCart);
        const count = cart.reduce((total, item) => total + item.quantity, 0);
        setCartCount(count);
      }
    };
    
    // Load on mount
    loadCartCount();
    
    // Add event listener for cart updates
    window.addEventListener('cartUpdated', loadCartCount);
    
    // Clean up
    return () => {
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
    <div className="mobile-layout">
      {/* Mobile Header */}
      <header className="mobile-header">
        <button 
          className="mobile-menu-btn" 
          onClick={toggleDrawer}
          aria-label="Menu"
        >
          <i className="fas fa-bars"></i>
        </button>
        
        <Link to="/" className="mobile-logo-link">
          <img 
            src="/images/logo.png" 
            alt="MedShop" 
            className="mobile-logo"
          />
        </Link>
        
        <Link to="/cart" className="mobile-cart-btn">
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
              <Link to="/" className="drawer-nav-link" onClick={closeDrawer}>
                <i className="fas fa-home"></i>
                <span>Home</span>
              </Link>
            </li>
            <li className="drawer-nav-item">
              <Link to="/products" className="drawer-nav-link" onClick={closeDrawer}>
                <i className="fas fa-box"></i>
                <span>Products</span>
              </Link>
            </li>
            <li className="drawer-nav-item">
              <Link to="/categories" className="drawer-nav-link" onClick={closeDrawer}>
                <i className="fas fa-tags"></i>
                <span>Categories</span>
              </Link>
            </li>
            <li className="drawer-nav-item">
              <Link to="/cart" className="drawer-nav-link" onClick={closeDrawer}>
                <i className="fas fa-shopping-cart"></i>
                <span>Cart</span>
                {cartCount > 0 && <span className="drawer-badge">{cartCount}</span>}
              </Link>
            </li>
            <li className="drawer-nav-item">
              <Link to="/account" className="drawer-nav-link" onClick={closeDrawer}>
                <i className="fas fa-user"></i>
                <span>Account</span>
              </Link>
            </li>
            <li className="drawer-nav-item">
              <Link to="/orders" className="drawer-nav-link" onClick={closeDrawer}>
                <i className="fas fa-receipt"></i>
                <span>Orders</span>
              </Link>
            </li>
          </ul>
          
          <div className="drawer-divider"></div>
          
          <ul className="drawer-nav">
            <li className="drawer-nav-item">
              <Link to="/contact" className="drawer-nav-link" onClick={closeDrawer}>
                <i className="fas fa-envelope"></i>
                <span>Contact Us</span>
              </Link>
            </li>
            <li className="drawer-nav-item">
              <Link to="/about" className="drawer-nav-link" onClick={closeDrawer}>
                <i className="fas fa-info-circle"></i>
                <span>About</span>
              </Link>
            </li>
            <li className="drawer-nav-item">
              <a href="#" className="drawer-nav-link" onClick={closeDrawer}>
                <i className="fas fa-sign-out-alt"></i>
                <span>Logout</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      
      {/* Main Content */}
      <main className="mobile-main">
        {children}
      </main>
      
      {/* Mobile Bottom Navigation */}
      <nav className="mobile-nav">
        <Link to="/" className={`mobile-nav-item ${isActive('/') ? 'active' : ''}`}>
          <i className="fas fa-home"></i>
          <span>Home</span>
        </Link>
        <Link to="/products" className={`mobile-nav-item ${isActive('/products') ? 'active' : ''}`}>
          <i className="fas fa-box"></i>
          <span>Products</span>
        </Link>
        <Link to="/categories" className={`mobile-nav-item ${isActive('/categories') ? 'active' : ''}`}>
          <i className="fas fa-tags"></i>
          <span>Categories</span>
        </Link>
        <Link to="/cart" className={`mobile-nav-item ${isActive('/cart') ? 'active' : ''}`}>
          <i className="fas fa-shopping-cart"></i>
          <span>Cart</span>
        </Link>
        <Link to="/account" className={`mobile-nav-item ${isActive('/account') ? 'active' : ''}`}>
          <i className="fas fa-user"></i>
          <span>Account</span>
        </Link>
      </nav>
    </div>
  );
};

export default MobileLayout; 