'use client';

import { useState } from 'react';
import Link from 'next/link';
import { PlusIcon, PencilIcon, TrashIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

const mockProducts = [
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
    isActive: true
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
    isActive: true
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
    isActive: true
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
    isActive: true
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
    isActive: true
  },
];

const categories = [
  'All Categories',
  'Pain Relief',
  'Vitamins',
  'Medical Devices',
  'First Aid',
  'Personal Care',
];

export default function ProductsPage() {
  const [products, setProducts] = useState(mockProducts);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All Categories' || 
      product.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      setProducts(products.filter(product => product.id !== id));
    }
  };

  return (
    <div>
      <div className="sm:flex sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Products</h1>
          <p className="mt-2 text-sm text-gray-700">
            Manage your product inventory, pricing, and details
          </p>
        </div>
        <div className="mt-4 sm:mt-0">
          <Link
            href="/dashboard/products/add"
            className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
          >
            <PlusIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
            Add Product
          </Link>
        </div>
      </div>

      {/* Filters */}
      <div className="mt-6 mb-8 sm:flex sm:items-center">
        <div className="sm:flex-1 relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
          </div>
          <input
            type="text"
            placeholder="Search products..."
            className="shadow-sm focus:ring-primary-500 focus:border-primary-500 block w-full sm:text-sm border-gray-300 rounded-md pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-4">
          <label htmlFor="category" className="sr-only">
            Category
          </label>
          <select
            id="category"
            className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-primary-500 focus:border-primary-500 sm:text-sm rounded-md"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products list */}
      <div className="flex flex-col mt-8">
        <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Product
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      SKU
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Category
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Price
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Inventory
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    >
                      <span className="sr-only">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {filteredProducts.map((product) => (
                    <tr key={product.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0">
                            <img
                              className="h-10 w-10 rounded-md object-cover"
                              src={product.images[0]}
                              alt=""
                            />
                          </div>
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{product.name}</div>
                            <div className="text-gray-500 max-w-xs truncate">{product.description}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.sku}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.category}
                        {product.subcategory && <span className="text-xs text-gray-400"> / {product.subcategory}</span>}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        {product.discountedPrice ? (
                          <>
                            <span className="font-medium text-gray-900">${product.discountedPrice.toFixed(2)}</span>
                            <span className="ml-2 text-xs line-through text-gray-400">${product.price.toFixed(2)}</span>
                          </>
                        ) : (
                          <span className="font-medium text-gray-900">${product.price.toFixed(2)}</span>
                        )}
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span className={product.inventory < 50 ? 'text-red-600 font-medium' : ''}>
                          {product.inventory}
                        </span>
                      </td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <div className="flex items-center justify-end space-x-3">
                          <Link
                            href={`/dashboard/products/edit/${product.id}`}
                            className="text-primary-600 hover:text-primary-900"
                          >
                            <PencilIcon className="h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">Edit {product.name}</span>
                          </Link>
                          <button
                            onClick={() => handleDelete(product.id)}
                            className="text-red-600 hover:text-red-900"
                          >
                            <TrashIcon className="h-5 w-5" aria-hidden="true" />
                            <span className="sr-only">Delete {product.name}</span>
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
    </div>
  );
} 