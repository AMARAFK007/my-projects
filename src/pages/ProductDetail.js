import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

// Product Detail Page Component
const ProductDetail = () => {
  const { id } = useParams(); // Get the id parameter from the URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('description');
  
  // Mock product data (in a real app, would fetch from API)
  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setProduct({
        id: id || 'p1',
        name: 'Paracetamol 500mg',
        category: 'Pain Relief',
        price: 5.99,
        description: 'Paracetamol is a commonly used medicine that can help treat pain and reduce a high temperature (fever). It's typically used to relieve mild or moderate pain, such as headaches, toothache or sprains, and reduce fevers caused by illnesses such as colds and flu.',
        usage: 'Adults and children aged 16 years and over: 1-2 tablets every 4-6 hours when necessary, up to a maximum of 8 tablets in 24 hours.',
        ingredients: 'Each tablet contains Paracetamol 500mg. Also contains Maize Starch, Potassium Sorbate (E 202), Purified Talc, Stearic Acid, Povidone, Hypromellose, Triacetin.',
        reviews: [
          { id: 1, user: 'John D.', rating: 5, comment: 'Works great for headaches!', date: '2023-05-15' },
          { id: 2, user: 'Sarah M.', rating: 4, comment: 'Good quality medicine, fast acting.', date: '2023-04-22' },
          { id: 3, user: 'Robert P.', rating: 5, comment: 'Always keep this in my medicine cabinet.', date: '2023-03-10' }
        ],
        related: ['p2', 'p5', 'p8'],
        stock: 50,
        imageUrl: '/images/product1.jpg'
      });
      setLoading(false);
    }, 800);
  }, [id]); // Use id from URL params

  const handleAddToCart = () => {
    // Get existing cart
    const savedCart = localStorage.getItem('medshopCart');
    let cart = savedCart ? JSON.parse(savedCart) : [];
    
    // Check if product already in cart
    const existingItem = cart.find(item => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: quantity
      });
    }
    
    // Save to localStorage
    localStorage.setItem('medshopCart', JSON.stringify(cart));
    
    // Show notification
    alert(`${product.name} added to cart!`);
  };

  if (loading) {
    return (
      <div className="product-loading">
        <div className="loading-spinner"></div>
        <p>Loading product details...</p>
      </div>
    );
  }

  return (
    <div className="product-detail-container">
      <div className="breadcrumb">
        <a href="/">Home</a> / 
        <a href="/products">Products</a> / 
        <span>{product.category}</span> / 
        <span className="current">{product.name}</span>
      </div>
      
      <div className="product-detail">
        <div className="product-image">
          <img src={product.imageUrl} alt={product.name} />
        </div>
        
        <div className="product-info">
          <span className="product-category">{product.category}</span>
          <h1 className="product-name">{product.name}</h1>
          
          <div className="product-rating">
            <div className="stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <i 
                  key={star} 
                  className={`fas fa-star ${star <= 4.7 ? 'filled' : ''}`}
                ></i>
              ))}
            </div>
            <span className="rating-count">(14 reviews)</span>
          </div>
          
          <div className="product-price">${product.price.toFixed(2)}</div>
          
          <div className="product-stock">
            <i className="fas fa-check-circle"></i> 
            <span>In Stock ({product.stock} available)</span>
          </div>
          
          <div className="short-description">
            <p>{product.description.substring(0, 150)}...</p>
          </div>
          
          <div className="product-actions">
            <div className="quantity-selector">
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(prev => (prev > 1 ? prev - 1 : prev))}
              >
                <i className="fas fa-minus"></i>
              </button>
              <input 
                type="number" 
                value={quantity} 
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)} 
                min="1" 
                max={product.stock}
              />
              <button 
                className="quantity-btn"
                onClick={() => setQuantity(prev => (prev < product.stock ? prev + 1 : prev))}
              >
                <i className="fas fa-plus"></i>
              </button>
            </div>
            
            <button className="add-to-cart-btn" onClick={handleAddToCart}>
              <i className="fas fa-shopping-cart"></i>
              Add to Cart
            </button>
            
            <button className="wishlist-btn">
              <i className="far fa-heart"></i>
            </button>
          </div>
          
          <div className="product-meta">
            <div className="meta-item">
              <span className="meta-label">SKU:</span>
              <span className="meta-value">MED-PR-{product.id}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Category:</span>
              <span className="meta-value">{product.category}</span>
            </div>
            <div className="meta-item">
              <span className="meta-label">Tags:</span>
              <span className="meta-value">pain relief, headache, fever</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="product-tabs">
        <div className="tabs-header">
          <button 
            className={`tab-btn ${activeTab === 'description' ? 'active' : ''}`}
            onClick={() => setActiveTab('description')}
          >
            Description
          </button>
          <button 
            className={`tab-btn ${activeTab === 'usage' ? 'active' : ''}`}
            onClick={() => setActiveTab('usage')}
          >
            How to Use
          </button>
          <button 
            className={`tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
            onClick={() => setActiveTab('ingredients')}
          >
            Ingredients
          </button>
          <button 
            className={`tab-btn ${activeTab === 'reviews' ? 'active' : ''}`}
            onClick={() => setActiveTab('reviews')}
          >
            Reviews (3)
          </button>
        </div>
        
        <div className="tab-content">
          {activeTab === 'description' && (
            <div className="description-tab">
              <p>{product.description}</p>
            </div>
          )}
          
          {activeTab === 'usage' && (
            <div className="usage-tab">
              <h3>Recommended Dosage</h3>
              <p>{product.usage}</p>
              
              <div className="warning">
                <h4>Warning</h4>
                <p>Do not exceed the stated dose. If symptoms persist for more than 3 days, consult your doctor. Keep out of reach of children.</p>
              </div>
            </div>
          )}
          
          {activeTab === 'ingredients' && (
            <div className="ingredients-tab">
              <h3>Active Ingredients</h3>
              <p>{product.ingredients}</p>
            </div>
          )}
          
          {activeTab === 'reviews' && (
            <div className="reviews-tab">
              <div className="reviews-summary">
                <div className="average-rating">
                  <h3>4.7</h3>
                  <div className="stars">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <i 
                        key={star} 
                        className={`fas fa-star ${star <= 4.7 ? 'filled' : ''}`}
                      ></i>
                    ))}
                  </div>
                  <p>Based on 3 reviews</p>
                </div>
                
                <div className="rating-breakdown">
                  {[5, 4, 3, 2, 1].map((rating) => (
                    <div className="rating-row" key={rating}>
                      <span>{rating} star</span>
                      <div className="progress-bar">
                        <div 
                          className="progress" 
                          style={{ 
                            width: `${rating === 5 ? '66%' : rating === 4 ? '33%' : '0%'}` 
                          }}
                        ></div>
                      </div>
                      <span>{rating === 5 ? '2' : rating === 4 ? '1' : '0'}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="review-list">
                {product.reviews.map((review) => (
                  <div className="review-item" key={review.id}>
                    <div className="review-header">
                      <div className="review-user">
                        <div className="user-avatar">
                          <i className="fas fa-user"></i>
                        </div>
                        <div className="user-info">
                          <h4>{review.user}</h4>
                          <span className="review-date">{review.date}</span>
                        </div>
                      </div>
                      <div className="review-rating">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <i 
                            key={star} 
                            className={`fas fa-star ${star <= review.rating ? 'filled' : ''}`}
                          ></i>
                        ))}
                      </div>
                    </div>
                    <div className="review-content">
                      <p>{review.comment}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="write-review">
                <h3>Write a Review</h3>
                <form className="review-form">
                  <div className="form-group">
                    <label>Your Rating</label>
                    <div className="rating-selector">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <i key={star} className="far fa-star"></i>
                      ))}
                    </div>
                  </div>
                  
                  <div className="form-group">
                    <label>Your Review</label>
                    <textarea rows="5" placeholder="Write your review here..."></textarea>
                  </div>
                  
                  <button type="submit" className="submit-review-btn">
                    Submit Review
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="related-products">
        <h2>Related Products</h2>
        <div className="product-grid">
          {/* Related products would be rendered here */}
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 