import React, { useState, useEffect } from 'react';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,
    totalProducts: 0
  });
  
  const [recentOrders, setRecentOrders] = useState([]);
  const [topProducts, setTopProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate API call to get dashboard data
    setTimeout(() => {
      setStats({
        totalOrders: 124,
        totalRevenue: 8932.50,
        totalCustomers: 87,
        totalProducts: 42
      });
      
      setRecentOrders([
        { id: 'ORD-9D3A4F', customer: 'John Doe', date: '2023-08-15', total: 78.95, status: 'completed' },
        { id: 'ORD-7B2C9E', customer: 'Sarah Smith', date: '2023-08-14', total: 124.50, status: 'processing' },
        { id: 'ORD-5A8F2D', customer: 'Michael Johnson', date: '2023-08-14', total: 56.20, status: 'completed' },
        { id: 'ORD-3E6B9C', customer: 'Emily Brown', date: '2023-08-13', total: 210.75, status: 'shipped' },
        { id: 'ORD-1D7A3B', customer: 'James Wilson', date: '2023-08-12', total: 45.99, status: 'completed' }
      ]);
      
      setTopProducts([
        { id: 'p3', name: 'Vitamin C 1000mg', sold: 42, revenue: 545.58 },
        { id: 'p1', name: 'Paracetamol 500mg', sold: 38, revenue: 227.62 },
        { id: 'p6', name: 'Hand Sanitizer 500ml', sold: 35, revenue: 174.65 },
        { id: 'p4', name: 'First Aid Kit', sold: 28, revenue: 699.72 }
      ]);
      
      setLoading(false);
    }, 1000);
  }, []);
  
  const getStatusClass = (status) => {
    switch(status) {
      case 'completed':
        return 'status-completed';
      case 'processing':
        return 'status-processing';
      case 'shipped':
        return 'status-shipped';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading dashboard data...</p>
      </div>
    );
  }
  
  return (
    <div className="admin-dashboard">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="date-picker">
          <select defaultValue="last30days">
            <option value="today">Today</option>
            <option value="yesterday">Yesterday</option>
            <option value="last7days">Last 7 Days</option>
            <option value="last30days">Last 30 Days</option>
            <option value="thisMonth">This Month</option>
            <option value="lastMonth">Last Month</option>
          </select>
        </div>
      </div>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-shopping-cart"></i>
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Total Orders</h3>
            <p className="stat-value">{stats.totalOrders}</p>
            <p className="stat-change positive">
              <i className="fas fa-arrow-up"></i> 12.5% from last month
            </p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-dollar-sign"></i>
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Total Revenue</h3>
            <p className="stat-value">${stats.totalRevenue.toFixed(2)}</p>
            <p className="stat-change positive">
              <i className="fas fa-arrow-up"></i> 8.2% from last month
            </p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-users"></i>
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Total Customers</h3>
            <p className="stat-value">{stats.totalCustomers}</p>
            <p className="stat-change positive">
              <i className="fas fa-arrow-up"></i> 5.3% from last month
            </p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">
            <i className="fas fa-box"></i>
          </div>
          <div className="stat-content">
            <h3 className="stat-title">Total Products</h3>
            <p className="stat-value">{stats.totalProducts}</p>
            <p className="stat-change neutral">
              <i className="fas fa-minus"></i> No change from last month
            </p>
          </div>
        </div>
      </div>
      
      <div className="dashboard-widgets">
        <div className="widget revenue-chart">
          <div className="widget-header">
            <h2>Revenue Overview</h2>
            <select defaultValue="monthly">
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          <div className="widget-content">
            {/* In a real app, this would be a chart component */}
            <div className="chart-placeholder">
              <div className="bar" style={{ height: '60%' }}><span>Jan</span></div>
              <div className="bar" style={{ height: '75%' }}><span>Feb</span></div>
              <div className="bar" style={{ height: '45%' }}><span>Mar</span></div>
              <div className="bar" style={{ height: '90%' }}><span>Apr</span></div>
              <div className="bar" style={{ height: '65%' }}><span>May</span></div>
              <div className="bar" style={{ height: '80%' }}><span>Jun</span></div>
              <div className="bar" style={{ height: '95%' }}><span>Jul</span></div>
              <div className="bar highlight" style={{ height: '85%' }}><span>Aug</span></div>
            </div>
          </div>
        </div>
        
        <div className="widget top-products">
          <div className="widget-header">
            <h2>Top Selling Products</h2>
            <button className="view-all-btn">View All</button>
          </div>
          <div className="widget-content">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Sold</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {topProducts.map((product) => (
                  <tr key={product.id}>
                    <td>{product.name}</td>
                    <td>{product.sold} units</td>
                    <td>${product.revenue.toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      
      <div className="recent-orders">
        <div className="widget-header">
          <h2>Recent Orders</h2>
          <button className="view-all-btn">View All Orders</button>
        </div>
        <div className="widget-content">
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Total</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.customer}</td>
                  <td>{order.date}</td>
                  <td>${order.total.toFixed(2)}</td>
                  <td>
                    <span className={`order-status ${getStatusClass(order.status)}`}>
                      {order.status}
                    </span>
                  </td>
                  <td>
                    <button className="action-btn">
                      <i className="fas fa-eye"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard; 