'use client';

import React, { useState } from 'react';
import { 
  PlusIcon, 
  PencilIcon, 
  TrashIcon, 
  MagnifyingGlassIcon,
  ArrowDownTrayIcon,
  ArrowUpTrayIcon,
  FilterIcon,
} from '@heroicons/react/24/outline';
import AdminLayout from '@/components/layout/AdminLayout';
import { Product } from '@/types';

// Mock data - In a real app, this would come from an API call
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Pain Relief Tablets',
    description: 'Fast-acting pain relief for headaches and muscle pain',
    price: 19.99,
    category: 'Pain Relief',
    subcategory: 'Tablets',
    images: ['https://placehold.co/600x400'],
    inventory: 145,
    sku: 'PR-001',
    manufacturer: 'MedCorp',
    featured: true,
    isActive: true,
    createdAt: '2023-01-15T00:00:00Z',
    updatedAt: '2023-04-20T00:00:00Z',
  },
  {
    id: '2',
    name: 'Vitamin C Supplement',
    description: 'Boost your immune system with daily Vitamin C',
    price: 24.99,
    category: 'Vitamins',
    subcategory: 'Immune Support',
    images: ['https://placehold.co/600x400'],
    inventory: 89,
    sku: 'VC-002',
    manufacturer: 'VitaPlus',
    featured: false,
    isActive: true,
    createdAt: '2023-02-10T00:00:00Z',
    updatedAt: '2023-04-18T00:00:00Z',
  },
  {
    id: '3',
    name: 'Digital Thermometer',
    description: 'Accurate digital thermometer with LCD display',
    price: 15.99,
    category: 'Medical Devices',
    subcategory: 'Thermometers',
    images: ['https://placehold.co/600x400'],
    inventory: 54,
    sku: 'DT-003',
    manufacturer: 'MedTech',
    featured: true,
    isActive: true,
    createdAt: '2023-03-05T00:00:00Z',
    updatedAt: '2023-04-10T00:00:00Z',
  },
  {
    id: '4',
    name: 'First Aid Kit',
    description: 'Complete first aid kit for emergency situations',
    price: 34.99,
    category: 'First Aid',
    subcategory: 'Kits',
    images: ['https://placehold.co/600x400'],
    inventory: 32,
    sku: 'FA-004',
    manufacturer: 'SafetyFirst',
    featured: false,
    isActive: true,
    createdAt: '2023-03-12T00:00:00Z',
    updatedAt: '2023-04-15T00:00:00Z',
  },
  {
    id: '5',
    name: 'Hand Sanitizer',
    description: '99.9% effective against germs and bacteria',
    price: 8.99,
    discountedPrice: 6.99,
    category: 'Personal Care',
    subcategory: 'Sanitizers',
    images: ['https://placehold.co/600x400'],
    inventory: 210,
    sku: 'HS-005',
    manufacturer: 'CleanCo',
    featured: true,
    isActive: true,
    createdAt: '2023-03-18T00:00:00Z',
    updatedAt: '2023-04-05T00:00:00Z',
  },
];

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = products.filter(product => 
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <AdminLayout>
      <div className="pb-5 mb-6 border-b border-gray-200 sm:flex sm:items-center sm:justify-between">
        <h1 className="text-2xl font-bold text-gray-900">Products</h1>
        <div className="flex mt-3 sm:mt-0">
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-primary-600 border border-transparent rounded-md shadow-sm hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusIcon className="w-5 h-5 mr-2 -ml-1" aria-hidden="true" />
            Add Product
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <ArrowDownTrayIcon className="w-5 h-5 mr-2 -ml-1 text-gray-500" aria-hidden="true" />
            Export
          </button>
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <ArrowUpTrayIcon className="w-5 h-5 mr-2 -ml-1 text-gray-500" aria-hidden="true" />
            Import
          </button>
        </div>
      </div>
      
      {/* Filters */}
      <div className="flex flex-col mb-5 space-y-3 sm:flex-row sm:space-y-0 sm:space-x-4">
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="block w-full py-2 pl-10 pr-3 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex space-x-3">
          <select className="block py-2 pl-3 pr-10 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All Categories</option>
            <option value="pain-relief">Pain Relief</option>
            <option value="vitamins">Vitamins</option>
            <option value="medical-devices">Medical Devices</option>
            <option value="first-aid">First Aid</option>
            <option value="personal-care">Personal Care</option>
          </select>
          
          <select className="block py-2 pl-3 pr-10 text-sm border-gray-300 rounded-md focus:outline-none focus:ring-primary-500 focus:border-primary-500">
            <option value="">All Status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
          
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <FilterIcon className="w-5 h-5 mr-2 -ml-1 text-gray-500" aria-hidden="true" />
            More Filters
          </button>
        </div>
      </div>
      
      {/* Products table */}
      <div className="flex flex-col mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6">
                      Product
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      SKU
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Category
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Price
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Inventory
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 w-10 h-10">
                            <img className="w-10 h-10 rounded-md" src={product.images[0]} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-gray-500 truncate max-w-xs">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {product.sku}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {product.category}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        {product.discountedPrice ? (
                          <div>
                            <span className="font-medium text-gray-900">${product.discountedPrice}</span>
                            <span className="ml-2 text-sm text-gray-500 line-through">${product.price}</span>
                          </div>
                        ) : (
                          <span className="font-medium text-gray-900">${product.price}</span>
                        )}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        <span className={`${product.inventory < 50 ? 'text-red-600 font-medium' : ''}`}>
                          {product.inventory}
                        </span>
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-500">
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          product.isActive 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {product.isActive ? 'Active' : 'Inactive'}
                        </span>
                        {product.featured && (
                          <span className="inline-flex items-center ml-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                            Featured
                          </span>
                        )}
                      </td>
                      <td className="relative py-4 pl-3 pr-4 text-sm font-medium text-right sm:pr-6">
                        <div className="flex justify-end space-x-2">
                          <button
                            type="button"
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <PencilIcon className="w-5 h-5" aria-hidden="true" />
                            <span className="sr-only">Edit</span>
                          </button>
                          <button
                            type="button"
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="w-5 h-5" aria-hidden="true" />
                            <span className="sr-only">Delete</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
      
      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-3 mt-5 bg-white border border-gray-200 sm:px-6 rounded-md">
        <div className="flex justify-between flex-1 sm:hidden">
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Previous
          </a>
          <a
            href="#"
            className="relative inline-flex items-center px-4 py-2 ml-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
          >
            Next
          </a>
        </div>
        <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
          <div>
            <p className="text-sm text-gray-700">
              Showing <span className="font-medium">1</span> to <span className="font-medium">5</span> of{' '}
              <span className="font-medium">5</span> results
            </p>
          </div>
          <div>
            <nav className="inline-flex -space-x-px rounded-md shadow-sm isolate" aria-label="Pagination">
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-l-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Previous</span>
                <PencilIcon className="w-5 h-5" aria-hidden="true" />
              </a>
              <a
                href="#"
                aria-current="page"
                className="relative z-10 inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-primary-600 focus:z-20 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
              >
                1
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                2
              </a>
              <a
                href="#"
                className="relative hidden items-center px-4 py-2 text-sm font-semibold text-gray-900 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0 md:inline-flex"
              >
                3
              </a>
              <a
                href="#"
                className="relative inline-flex items-center px-2 py-2 text-gray-400 rounded-r-md ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:z-20 focus:outline-offset-0"
              >
                <span className="sr-only">Next</span>
                <PencilIcon className="w-5 h-5" aria-hidden="true" />
              </a>
            </nav>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 