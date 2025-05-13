import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const AdminLayout = ({ children }) => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const location = useLocation();
  
  // Check if current route is active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };
  
  return (
    <div className={`admin-layout ${sidebarCollapsed ? 'collapsed' : ''}`}>
      <aside className="admin-sidebar">
        <div className="sidebar-header">
          <div className="logo">
            <i className="fas fa-heartbeat"></i>
            <span className="logo-text">MedShop Admin</span>
          </div>
          <button className="toggle-sidebar" onClick={toggleSidebar}>
            <i className={`fas fa-${sidebarCollapsed ? 'chevron-right' : 'chevron-left'}`}></i>
          </button>
        </div>
        
        <nav className="sidebar-nav">
          <ul>
            <li>
              <Link to="/admin" className={isActive('/admin') ? 'active' : ''}>
                <i className="fas fa-tachometer-alt"></i>
                <span>Dashboard</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/products" className={isActive('/admin/products') ? 'active' : ''}>
                <i className="fas fa-box"></i>
                <span>Products</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/orders" className={isActive('/admin/orders') ? 'active' : ''}>
                <i className="fas fa-shopping-cart"></i>
                <span>Orders</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/customers" className={isActive('/admin/customers') ? 'active' : ''}>
                <i className="fas fa-users"></i>
                <span>Customers</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/categories" className={isActive('/admin/categories') ? 'active' : ''}>
                <i className="fas fa-tags"></i>
                <span>Categories</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/reviews" className={isActive('/admin/reviews') ? 'active' : ''}>
                <i className="fas fa-star"></i>
                <span>Reviews</span>
              </Link>
            </li>
            <li>
              <Link to="/admin/reports" className={isActive('/admin/reports') ? 'active' : ''}>
                <i className="fas fa-chart-bar"></i>
                <span>Reports</span>
              </Link>
            </li>
            <li className="divider"></li>
            <li>
              <Link to="/admin/settings" className={isActive('/admin/settings') ? 'active' : ''}>
                <i className="fas fa-cog"></i>
                <span>Settings</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>
      
      <div className="admin-content">
        <header className="admin-header">
          <div className="search-bar">
            <i className="fas fa-search"></i>
            <input type="text" placeholder="Search..." />
          </div>
          
          <div className="header-actions">
            <div className="notifications">
              <button className="notification-btn">
                <i className="fas fa-bell"></i>
                <span className="badge">3</span>
              </button>
            </div>
            
            <div className="messages">
              <button className="message-btn">
                <i className="fas fa-envelope"></i>
                <span className="badge">5</span>
              </button>
            </div>
            
            <div className="user-profile">
              <div className="profile-info">
                <span className="user-name">Admin User</span>
                <span className="user-role">Administrator</span>
              </div>
              <div className="profile-avatar">
                <i className="fas fa-user-circle"></i>
              </div>
            </div>
          </div>
        </header>
        
        <main className="admin-main">
          {children}
        </main>
        
        <footer className="admin-footer">
          <p>&copy; 2023 MedShop Admin Panel. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default AdminLayout; 