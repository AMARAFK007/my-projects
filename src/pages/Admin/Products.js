import React, { useState, useEffect } from 'react';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [filter, setFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState('asc');
  
  // Add/Edit product form state
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    price: '',
    description: '',
    stock: '',
    featured: false,
    imageUrl: ''
  });
  
  // Mock categories
  const categories = [
    'Pain Relief',
    'Vitamins & Supplements',
    'First Aid',
    'Medical Devices',
    'Personal Care',
    'Skin Care',
    'Cold & Flu',
    'Digestion'
  ];
  
  // Load products on mount
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProducts([
        {
          id: 'p1',
          name: 'Paracetamol 500mg',
          category: 'Pain Relief',
          price: 5.99,
          description: 'Paracetamol for pain relief and fever reduction.',
          stock: 50,
          featured: true,
          imageUrl: '/images/product1.jpg'
        },
        {
          id: 'p2',
          name: 'Digital Blood Pressure Monitor',
          category: 'Medical Devices',
          price: 49.99,
          description: 'Accurate blood pressure monitoring device for home use.',
          stock: 15,
          featured: true,
          imageUrl: '/images/product2.jpg'
        },
        {
          id: 'p3',
          name: 'Vitamin C 1000mg',
          category: 'Vitamins & Supplements',
          price: 12.99,
          description: 'High strength vitamin C supplements for immune support.',
          stock: 100,
          featured: true,
          imageUrl: '/images/product3.jpg'
        },
        {
          id: 'p4',
          name: 'First Aid Kit',
          category: 'First Aid',
          price: 24.99,
          description: 'Comprehensive first aid kit for emergencies.',
          stock: 35,
          featured: false,
          imageUrl: '/images/product4.jpg'
        },
        {
          id: 'p5',
          name: 'Ibuprofen 200mg',
          category: 'Pain Relief',
          price: 6.99,
          description: 'Anti-inflammatory pain relief medication.',
          stock: 45,
          featured: false,
          imageUrl: '/images/product5.jpg'
        },
        {
          id: 'p6',
          name: 'Hand Sanitizer 500ml',
          category: 'Personal Care',
          price: 4.99,
          description: 'Alcohol-based hand sanitizer for effective cleaning.',
          stock: 200,
          featured: true,
          imageUrl: '/images/product6.jpg'
        },
        {
          id: 'p7',
          name: 'Digital Thermometer',
          category: 'Medical Devices',
          price: 15.99,
          description: 'Fast reading digital thermometer for temperature measurement.',
          stock: 30,
          featured: false,
          imageUrl: '/images/product7.jpg'
        },
        {
          id: 'p8',
          name: 'Multivitamin Tablets',
          category: 'Vitamins & Supplements',
          price: 14.99,
          description: 'Daily multivitamin tablets for overall health.',
          stock: 80,
          featured: false,
          imageUrl: '/images/product8.jpg'
        }
      ]);
      setLoading(false);
    }, 800);
  }, []);
  
  // Handle search filter change
  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };
  
  // Handle category filter change
  const handleCategoryFilterChange = (e) => {
    setCategoryFilter(e.target.value);
  };
  
  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  // Toggle sort order
  const toggleSortOrder = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };
  
  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      // Filter by search term
      const searchMatch = product.name.toLowerCase().includes(filter.toLowerCase()) ||
                         product.description.toLowerCase().includes(filter.toLowerCase());
      
      // Filter by category
      const categoryMatch = categoryFilter === 'all' || product.category === categoryFilter;
      
      return searchMatch && categoryMatch;
    })
    .sort((a, b) => {
      // Sort by selected field
      let comparison = 0;
      
      if (sortBy === 'name') {
        comparison = a.name.localeCompare(b.name);
      } else if (sortBy === 'price') {
        comparison = a.price - b.price;
      } else if (sortBy === 'stock') {
        comparison = a.stock - b.stock;
      } else if (sortBy === 'category') {
        comparison = a.category.localeCompare(b.category);
      }
      
      // Apply sort order
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  
  // Open add product modal
  const openAddModal = () => {
    // Reset form data
    setFormData({
      id: '',
      name: '',
      category: categories[0],
      price: '',
      description: '',
      stock: '',
      featured: false,
      imageUrl: ''
    });
    setShowAddModal(true);
  };
  
  // Open edit product modal
  const openEditModal = (product) => {
    setCurrentProduct(product);
    setFormData({
      id: product.id,
      name: product.name,
      category: product.category,
      price: product.price,
      description: product.description,
      stock: product.stock,
      featured: product.featured,
      imageUrl: product.imageUrl
    });
    setShowEditModal(true);
  };
  
  // Close modals
  const closeModals = () => {
    setShowAddModal(false);
    setShowEditModal(false);
    setCurrentProduct(null);
  };
  
  // Handle form input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };
  
  // Handle add product submit
  const handleAddProduct = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.price || !formData.stock) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Create new product object
    const newProduct = {
      id: `p${Date.now()}`, // Generate unique ID
      name: formData.name,
      category: formData.category,
      price: parseFloat(formData.price),
      description: formData.description,
      stock: parseInt(formData.stock),
      featured: formData.featured,
      imageUrl: formData.imageUrl || '/images/product-placeholder.jpg'
    };
    
    // Add to products array
    setProducts([...products, newProduct]);
    
    // Close modal
    closeModals();
    
    // Show success message
    alert('Product added successfully!');
  };
  
  // Handle edit product submit
  const handleEditProduct = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!formData.name || !formData.price || !formData.stock) {
      alert('Please fill in all required fields');
      return;
    }
    
    // Update product
    const updatedProducts = products.map(product => {
      if (product.id === currentProduct.id) {
        return {
          ...product,
          name: formData.name,
          category: formData.category,
          price: parseFloat(formData.price),
          description: formData.description,
          stock: parseInt(formData.stock),
          featured: formData.featured,
          imageUrl: formData.imageUrl
        };
      }
      return product;
    });
    
    setProducts(updatedProducts);
    
    // Close modal
    closeModals();
    
    // Show success message
    alert('Product updated successfully!');
  };
  
  // Handle delete product
  const handleDeleteProduct = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(product => product.id !== id);
      setProducts(updatedProducts);
      
      // Show success message
      alert('Product deleted successfully!');
    }
  };
  
  // Toggle featured status
  const toggleFeatured = (id) => {
    const updatedProducts = products.map(product => {
      if (product.id === id) {
        return {
          ...product,
          featured: !product.featured
        };
      }
      return product;
    });
    
    setProducts(updatedProducts);
  };
  
  if (loading) {
    return (
      <div className="admin-loading">
        <div className="loading-spinner"></div>
        <p>Loading products...</p>
      </div>
    );
  }
  
  return (
    <div className="admin-products">
      <div className="admin-header">
        <h1>Products</h1>
        <button className="add-product-btn" onClick={openAddModal}>
          <i className="fas fa-plus"></i> Add Product
        </button>
      </div>
      
      <div className="products-controls">
        <div className="search-filter">
          <input
            type="text"
            placeholder="Search products..."
            value={filter}
            onChange={handleFilterChange}
          />
        </div>
        
        <div className="category-filter">
          <select value={categoryFilter} onChange={handleCategoryFilterChange}>
            <option value="all">All Categories</option>
            {categories.map((category, index) => (
              <option key={index} value={category}>{category}</option>
            ))}
          </select>
        </div>
        
        <div className="sort-controls">
          <select value={sortBy} onChange={handleSortChange}>
            <option value="name">Name</option>
            <option value="price">Price</option>
            <option value="stock">Stock</option>
            <option value="category">Category</option>
          </select>
          <button className="sort-order-btn" onClick={toggleSortOrder}>
            <i className={`fas fa-sort-${sortOrder === 'asc' ? 'up' : 'down'}`}></i>
          </button>
        </div>
      </div>
      
      <div className="products-table-container">
        <table className="products-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Category</th>
              <th>Price</th>
              <th>Stock</th>
              <th>Featured</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((product) => (
              <tr key={product.id}>
                <td>
                  <div className="product-image">
                    <i className="fas fa-prescription-bottle-alt"></i>
                  </div>
                </td>
                <td>{product.name}</td>
                <td>{product.category}</td>
                <td>${product.price.toFixed(2)}</td>
                <td>
                  <span className={`stock-badge ${product.stock < 10 ? 'low' : ''}`}>
                    {product.stock}
                  </span>
                </td>
                <td>
                  <button 
                    className={`featured-toggle ${product.featured ? 'active' : ''}`}
                    onClick={() => toggleFeatured(product.id)}
                  >
                    <i className={`fas fa-${product.featured ? 'star' : 'star-half-alt'}`}></i>
                  </button>
                </td>
                <td>
                  <div className="product-actions">
                    <button className="action-btn edit" onClick={() => openEditModal(product)}>
                      <i className="fas fa-edit"></i>
                    </button>
                    <button className="action-btn delete" onClick={() => handleDeleteProduct(product.id)}>
                      <i className="fas fa-trash"></i>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Add Product Modal */}
      {showAddModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Add New Product</h2>
              <button className="close-modal" onClick={closeModals}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleAddProduct} className="product-form">
                <div className="form-group">
                  <label htmlFor="name">Product Name *</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="category">Category *</label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="price">Price ($) *</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="stock">Stock *</label>
                    <input
                      type="number"
                      id="stock"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="imageUrl">Image URL</label>
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                    placeholder="Enter image URL or upload"
                  />
                  <div className="upload-btn-wrapper">
                    <button className="upload-btn" type="button">
                      <i className="fas fa-upload"></i> Upload Image
                    </button>
                    <input type="file" name="imageFile" />
                  </div>
                </div>
                
                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="featured">Feature this product</label>
                </div>
                
                <div className="form-buttons">
                  <button type="button" className="btn-secondary" onClick={closeModals}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Add Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Edit Product Modal */}
      {showEditModal && (
        <div className="modal">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Edit Product</h2>
              <button className="close-modal" onClick={closeModals}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleEditProduct} className="product-form">
                <div className="form-group">
                  <label htmlFor="edit-name">Product Name *</label>
                  <input
                    type="text"
                    id="edit-name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="form-group">
                  <label htmlFor="edit-category">Category *</label>
                  <select
                    id="edit-category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    required
                  >
                    {categories.map((category, index) => (
                      <option key={index} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="edit-price">Price ($) *</label>
                    <input
                      type="number"
                      id="edit-price"
                      name="price"
                      value={formData.price}
                      onChange={handleInputChange}
                      step="0.01"
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="form-group">
                    <label htmlFor="edit-stock">Stock *</label>
                    <input
                      type="number"
                      id="edit-stock"
                      name="stock"
                      value={formData.stock}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>
                </div>
                
                <div className="form-group">
                  <label htmlFor="edit-description">Description</label>
                  <textarea
                    id="edit-description"
                    name="description"
                    value={formData.description}
                    onChange={handleInputChange}
                    rows="4"
                  ></textarea>
                </div>
                
                <div className="form-group">
                  <label htmlFor="edit-imageUrl">Image URL</label>
                  <input
                    type="text"
                    id="edit-imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleInputChange}
                  />
                  <div className="upload-btn-wrapper">
                    <button className="upload-btn" type="button">
                      <i className="fas fa-upload"></i> Upload Image
                    </button>
                    <input type="file" name="imageFile" />
                  </div>
                </div>
                
                <div className="form-group checkbox-group">
                  <input
                    type="checkbox"
                    id="edit-featured"
                    name="featured"
                    checked={formData.featured}
                    onChange={handleInputChange}
                  />
                  <label htmlFor="edit-featured">Feature this product</label>
                </div>
                
                <div className="form-buttons">
                  <button type="button" className="btn-secondary" onClick={closeModals}>
                    Cancel
                  </button>
                  <button type="submit" className="btn-primary">
                    Update Product
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts; 