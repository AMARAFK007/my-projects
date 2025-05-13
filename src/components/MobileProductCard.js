'use client';

import React, { useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MobileProductCard = ({ product, onAddToCart, onAddToWishlist }) => {
  const cardRef = useRef(null);
  
  // Handle touch events for swipe
  useEffect(() => {
    if (!cardRef.current) return;
    
    const card = cardRef.current;
    const content = card.querySelector('.swipe-content');
    
    if (!content) return;
    
    let startX, currentX;
    let isDragging = false;
    const actionsWidth = 100; // Width of the swipe actions
    
    const handleTouchStart = (e) => {
      startX = e.touches[0].clientX;
      isDragging = true;
      content.style.transition = 'none';
    };
    
    const handleTouchMove = (e) => {
      if (!isDragging) return;
      
      currentX = e.touches[0].clientX;
      const diffX = currentX - startX;
      
      // Only allow swiping left
      if (diffX < 0) {
        const translateX = Math.max(diffX, -actionsWidth);
        content.style.transform = `translateX(${translateX}px)`;
      }
    };
    
    const handleTouchEnd = () => {
      if (!isDragging) return;
      
      isDragging = false;
      content.style.transition = 'transform 0.3s ease';
      
      if (startX - currentX > actionsWidth / 2) {
        // If swiped more than halfway, reveal actions
        content.style.transform = `translateX(-${actionsWidth}px)`;
      } else {
        // Otherwise, snap back
        content.style.transform = 'translateX(0)';
      }
    };
    
    // Add event listeners
    card.addEventListener('touchstart', handleTouchStart);
    card.addEventListener('touchmove', handleTouchMove);
    card.addEventListener('touchend', handleTouchEnd);
    
    // Click outside to close
    const handleOutsideClick = (e) => {
      if (!card.contains(e.target)) {
        content.style.transition = 'transform 0.3s ease';
        content.style.transform = 'translateX(0)';
      }
    };
    
    document.addEventListener('click', handleOutsideClick);
    
    // Cleanup
    return () => {
      card.removeEventListener('touchstart', handleTouchStart);
      card.removeEventListener('touchmove', handleTouchMove);
      card.removeEventListener('touchend', handleTouchEnd);
      document.removeEventListener('click', handleOutsideClick);
    };
  }, []);
  
  // Format price
  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };
  
  // Handle add to cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Show tactile feedback on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate(50);
    }
    
    onAddToCart(product);
  };
  
  // Handle add to wishlist
  const handleAddToWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Show tactile feedback on mobile
    if ('vibrate' in navigator) {
      navigator.vibrate([50, 50, 50]);
    }
    
    onAddToWishlist(product);
  };
  
  // Check if item is on sale
  const isOnSale = product.originalPrice && product.originalPrice > product.price;
  
  return (
    <div className="product-card" ref={cardRef}>
      <div className="swipe-container">
        <div className="swipe-content">
          <Link href={`/product/${product.id}`} className="product-card-link">
            <div className="product-card-image-container">
              <Image 
                src={product.imageUrl} 
                alt={product.name}
                width={300}
                height={300}
                className="product-card-image"
                loading="lazy"
                sizes="(max-width: 768px) 100vw, 300px"
              />
              {isOnSale && (
                <span className="sale-badge">Sale</span>
              )}
              {product.stock < 5 && (
                <span className="stock-badge">Low Stock</span>
              )}
            </div>
            
            <div className="product-card-info">
              <h3 className="product-card-title">{product.name}</h3>
              <p className="product-card-category">{product.category}</p>
              <div className="product-card-footer">
                <div className="product-card-price">
                  {isOnSale && (
                    <span className="original-price">{formatPrice(product.originalPrice)}</span>
                  )}
                  <span className="current-price">{formatPrice(product.price)}</span>
                </div>
                
                {product.rating && (
                  <div className="product-card-rating">
                    <i className="fas fa-star"></i>
                    <span>{product.rating}</span>
                  </div>
                )}
              </div>
            </div>
          </Link>
        </div>
        
        <div className="swipe-actions">
          <button 
            className="swipe-action add" 
            onClick={handleAddToCart}
            aria-label="Add to cart"
          >
            <i className="fas fa-cart-plus"></i>
          </button>
          <button 
            className="swipe-action wishlist" 
            onClick={handleAddToWishlist}
            aria-label="Add to wishlist"
          >
            <i className="fas fa-heart"></i>
          </button>
        </div>
      </div>
      
      <div className="quick-actions">
        <button 
          className="quick-action-btn" 
          onClick={handleAddToCart}
          aria-label="Add to cart"
        >
          <i className="fas fa-cart-plus"></i>
        </button>
        <button 
          className="quick-action-btn" 
          onClick={handleAddToWishlist}
          aria-label="Add to wishlist"
        >
          <i className="fas fa-heart"></i>
        </button>
      </div>
    </div>
  );
};

export default MobileProductCard; 