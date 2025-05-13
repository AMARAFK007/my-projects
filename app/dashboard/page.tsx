'use client';

import { useState } from 'react';
import Link from 'next/link';

// Mock data
const dashboardStats = {
  totalSales: 128420,
  totalOrders: 1643,
  totalProducts: 284,
  totalCustomers: 12904,
  recentOrders: [
    { id: '1', orderNumber: '34562', customer: 'John Smith', date: '2 hours ago', amount: 129.00, status: 'completed' },
    { id: '2', orderNumber: '34561', customer: 'Maria Rodriguez', date: '5 hours ago', amount: 89.00, status: 'processing' },
    { id: '3', orderNumber: '34560', customer: 'David Johnson', date: '1 day ago', amount: 152.50, status: 'completed' },
  ],
  topProducts: [
    { id: '1', name: 'Pain Relief Tablets', sales: 324, price: 19.99 },
    { id: '2', name: 'Vitamin C Supplement', sales: 289, price: 24.99 },
    { id: '3', name: 'Digital Thermometer', sales: 245, price: 15.99 },
  ]
};

export default function DashboardPage() {
  const [stats, setStats] = useState(dashboardStats);

  return (
    <div>
      <div className="pb-5 border-b border-gray-200">
        <h1 className="text-2xl font-bold leading-tight text-gray-900">Dashboard</h1>
      </div>

      {/* Stats overview */}
      <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Sales</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">${stats.totalSales.toLocaleString()}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Orders</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalOrders.toLocaleString()}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Products</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalProducts.toLocaleString()}</dd>
          </div>
        </div>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <dt className="text-sm font-medium text-gray-500 truncate">Total Customers</dt>
            <dd className="mt-1 text-3xl font-semibold text-gray-900">{stats.totalCustomers.toLocaleString()}</dd>
          </div>
        </div>
      </div>

      {/* Recent activity section */}
      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Recent orders */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Recent Orders
            </h3>
          </div>
          <div className="px-4 py-3 sm:px-6">
            <ul className="divide-y divide-gray-200">
              {stats.recentOrders.map((order) => (
                <li key={order.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        Order #{order.orderNumber}
                      </p>
                      <p className="text-sm text-gray-500 truncate">{order.customer}</p>
                    </div>
                    <div className="text-sm text-gray-500">{order.date}</div>
                    <div className="text-sm font-medium text-gray-900">${order.amount.toFixed(2)}</div>
                    <span
                      className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        order.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </li>
              ))}
            </ul>
            <div className="py-4 text-center border-t border-gray-200">
              <Link href="/dashboard/orders" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                View all orders
              </Link>
            </div>
          </div>
        </div>

        {/* Top products */}
        <div className="bg-white shadow rounded-lg">
          <div className="px-4 py-5 border-b border-gray-200 sm:px-6">
            <h3 className="text-lg leading-6 font-medium text-gray-900">
              Top Selling Products
            </h3>
          </div>
          <div className="px-4 py-3 sm:px-6">
            <ul className="divide-y divide-gray-200">
              {stats.topProducts.map((product) => (
                <li key={product.id} className="py-4">
                  <div className="flex items-center space-x-4">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-200 rounded-md"></div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {product.name}
                      </p>
                      <p className="text-sm text-gray-500 truncate">{product.sales} sold</p>
                    </div>
                    <div className="text-sm font-medium text-gray-900">${product.price.toFixed(2)}</div>
                  </div>
                </li>
              ))}
            </ul>
            <div className="py-4 text-center border-t border-gray-200">
              <Link href="/dashboard/products" className="text-sm font-medium text-primary-600 hover:text-primary-500">
                View all products
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 