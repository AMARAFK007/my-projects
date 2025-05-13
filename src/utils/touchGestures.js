/**
 * Utility functions for handling touch gestures on mobile devices
 */

/**
 * Constants for gesture detection
 */
export const DIRECTIONS = {
  LEFT: 'left',
  RIGHT: 'right',
  UP: 'up',
  DOWN: 'down'
};

/**
 * Handles swipe gestures
 * @param {HTMLElement} element - The element to attach swipe detection to
 * @param {Object} options - Configuration options
 * @param {number} options.threshold - Minimum distance required for a swipe (px)
 * @param {number} options.restraint - Maximum perpendicular movement allowed (px)
 * @param {number} options.allowedTime - Maximum time allowed for the swipe (ms)
 * @param {Function} options.onSwipeLeft - Callback for left swipe
 * @param {Function} options.onSwipeRight - Callback for right swipe
 * @param {Function} options.onSwipeUp - Callback for up swipe
 * @param {Function} options.onSwipeDown - Callback for down swipe
 * @returns {Object} - Functions to remove event listeners
 */
export const detectSwipe = (element, options = {}) => {
  const settings = {
    threshold: 150,  // Required min distance traveled
    restraint: 100,  // Maximum perpendicular movement
    allowedTime: 300, // Maximum time allowed for the swipe
    ...options
  };
  
  let startX, startY, startTime;
  let distX, distY, elapsedTime;
  
  // Handle touch start
  const handleTouchStart = (e) => {
    const touchObj = e.changedTouches[0];
    startX = touchObj.pageX;
    startY = touchObj.pageY;
    startTime = new Date().getTime(); // Record time when finger first makes contact
  };
  
  // Handle touch end
  const handleTouchEnd = (e) => {
    const touchObj = e.changedTouches[0];
    distX = touchObj.pageX - startX; // Get horizontal distance traveled
    distY = touchObj.pageY - startY; // Get vertical distance traveled
    elapsedTime = new Date().getTime() - startTime; // Get time elapsed
    
    // Check that elapsed time is within allowed range
    if (elapsedTime <= settings.allowedTime) { 
      // Horizontal swipe detection
      if (Math.abs(distX) >= settings.threshold && Math.abs(distY) <= settings.restraint) {
        // If distance traveled is negative, it's a left swipe
        if (distX < 0) {
          if (settings.onSwipeLeft) settings.onSwipeLeft(e);
        } else {
          // It's a right swipe
          if (settings.onSwipeRight) settings.onSwipeRight(e);
        }
      }
      // Vertical swipe detection
      else if (Math.abs(distY) >= settings.threshold && Math.abs(distX) <= settings.restraint) {
        // If distance traveled is negative, it's an upward swipe
        if (distY < 0) {
          if (settings.onSwipeUp) settings.onSwipeUp(e);
        } else {
          // It's a downward swipe
          if (settings.onSwipeDown) settings.onSwipeDown(e);
        }
      }
    }
  };
  
  // Prevent scrolling when handling swipes if specified
  const handleTouchMove = (e) => {
    if (settings.preventScroll) {
      e.preventDefault();
    }
  };
  
  // Add event listeners
  element.addEventListener('touchstart', handleTouchStart, false);
  element.addEventListener('touchend', handleTouchEnd, false);
  
  if (settings.preventScroll) {
    element.addEventListener('touchmove', handleTouchMove, { passive: false });
  }
  
  // Return a function to remove the event listeners
  return {
    remove: () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchend', handleTouchEnd);
      
      if (settings.preventScroll) {
        element.removeEventListener('touchmove', handleTouchMove);
      }
    }
  };
};

/**
 * Creates a swipeable product card with actions
 * @param {HTMLElement} card - The product card element
 * @param {Object} options - Configuration options
 * @param {Function} options.onAddToCart - Callback when add to cart action is triggered
 * @param {Function} options.onAddToWishlist - Callback when add to wishlist action is triggered
 * @returns {Object} - Functions to remove event listeners
 */
export const createSwipeableCard = (card, options = {}) => {
  const swipeContainer = card.querySelector('.swipe-container');
  const content = card.querySelector('.swipe-content');
  const actions = card.querySelector('.swipe-actions');
  
  if (!swipeContainer || !content || !actions) {
    console.error('Swipeable card is missing required elements');
    return { remove: () => {} };
  }
  
  let startX, currentX, isDragging = false;
  const actionsWidth = 100; // Width of the actions in pixels
  
  // Touch start handler
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    startX = touch.clientX;
    isDragging = true;
    
    // Reset any existing transitions
    content.style.transition = 'none';
  };
  
  // Touch move handler
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    currentX = touch.clientX;
    const diffX = currentX - startX;
    
    // Only allow swiping left (negative diffX)
    if (diffX < 0) {
      // Limit the swipe to the width of the actions
      const translateX = Math.max(diffX, -actionsWidth);
      content.style.transform = `translateX(${translateX}px)`;
    }
  };
  
  // Touch end handler
  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    isDragging = false;
    content.style.transition = 'transform 0.3s ease';
    
    // Calculate how far the user swiped
    const diffX = currentX - startX;
    
    // If user swiped more than halfway, show actions
    if (diffX < -actionsWidth / 2) {
      content.style.transform = `translateX(-${actionsWidth}px)`;
    } else {
      // Otherwise snap back
      content.style.transform = 'translateX(0)';
    }
  };
  
  // Add event listeners
  swipeContainer.addEventListener('touchstart', handleTouchStart);
  swipeContainer.addEventListener('touchmove', handleTouchMove);
  swipeContainer.addEventListener('touchend', handleTouchEnd);
  
  // Add click handlers for actions
  const addToCartBtn = actions.querySelector('.swipe-action.add');
  const wishlistBtn = actions.querySelector('.swipe-action.wishlist');
  
  if (addToCartBtn && options.onAddToCart) {
    addToCartBtn.addEventListener('click', options.onAddToCart);
  }
  
  if (wishlistBtn && options.onAddToWishlist) {
    wishlistBtn.addEventListener('click', options.onAddToWishlist);
  }
  
  // Reset on tap outside
  document.addEventListener('click', (e) => {
    if (!swipeContainer.contains(e.target)) {
      content.style.transition = 'transform 0.3s ease';
      content.style.transform = 'translateX(0)';
    }
  });
  
  // Return a function to remove the event listeners
  return {
    remove: () => {
      swipeContainer.removeEventListener('touchstart', handleTouchStart);
      swipeContainer.removeEventListener('touchmove', handleTouchMove);
      swipeContainer.removeEventListener('touchend', handleTouchEnd);
      
      if (addToCartBtn && options.onAddToCart) {
        addToCartBtn.removeEventListener('click', options.onAddToCart);
      }
      
      if (wishlistBtn && options.onAddToWishlist) {
        wishlistBtn.removeEventListener('click', options.onAddToWishlist);
      }
    }
  };
};

/**
 * Implements pull-to-refresh functionality
 * @param {HTMLElement} element - The scrollable element to attach pull-to-refresh to
 * @param {Object} options - Configuration options
 * @param {Function} options.onRefresh - Callback when refresh is triggered
 * @param {number} options.threshold - Distance required to trigger refresh (px)
 * @param {string} options.indicator - HTML for the loading indicator
 * @returns {Object} - Functions to remove event listeners
 */
export const pullToRefresh = (element, options = {}) => {
  const settings = {
    threshold: 60, // Required pull distance
    indicator: '<div class="ptr-indicator"><i class="fas fa-spinner fa-spin"></i> Refreshing...</div>',
    onRefresh: () => {},
    ...options
  };
  
  let startY, currentY, isRefreshing = false;
  
  // Create indicator element
  const indicatorEl = document.createElement('div');
  indicatorEl.classList.add('ptr-wrapper');
  indicatorEl.style.height = '0px';
  indicatorEl.style.overflow = 'hidden';
  indicatorEl.style.transition = 'height 0.3s ease';
  indicatorEl.innerHTML = settings.indicator;
  
  // Insert at the top of the element
  element.insertBefore(indicatorEl, element.firstChild);
  
  // Touch start handler
  const handleTouchStart = (e) => {
    // Only trigger if at the top of the element
    if (element.scrollTop <= 0) {
      const touch = e.touches[0];
      startY = touch.clientY;
    }
  };
  
  // Touch move handler
  const handleTouchMove = (e) => {
    if (isRefreshing || !startY) return;
    
    const touch = e.touches[0];
    currentY = touch.clientY;
    const diffY = currentY - startY;
    
    // Only allow pulling down
    if (diffY > 0 && element.scrollTop <= 0) {
      // Resistance effect - pull distance is sqrt of actual distance
      const pullDistance = Math.sqrt(diffY) * 3;
      
      indicatorEl.style.height = `${pullDistance}px`;
      
      // Prevent default to disable page scrolling
      e.preventDefault();
    }
  };
  
  // Touch end handler
  const handleTouchEnd = () => {
    if (!startY) return;
    
    // If pulled far enough, trigger refresh
    if (parseFloat(indicatorEl.style.height) >= settings.threshold) {
      isRefreshing = true;
      indicatorEl.style.height = '40px'; // Show indicator at fixed height
      
      // Call onRefresh and wait for it to complete
      Promise.resolve(settings.onRefresh())
        .finally(() => {
          // Hide indicator and reset state
          setTimeout(() => {
            indicatorEl.style.height = '0px';
            isRefreshing = false;
          }, 1000); // Give user time to see "Refreshed!" message
        });
    } else {
      // Reset if not pulled far enough
      indicatorEl.style.height = '0px';
    }
    
    // Reset state
    startY = null;
  };
  
  // Add event listeners
  element.addEventListener('touchstart', handleTouchStart);
  element.addEventListener('touchmove', handleTouchMove, { passive: false });
  element.addEventListener('touchend', handleTouchEnd);
  
  // Return a function to remove the event listeners
  return {
    remove: () => {
      element.removeEventListener('touchstart', handleTouchStart);
      element.removeEventListener('touchmove', handleTouchMove);
      element.removeEventListener('touchend', handleTouchEnd);
      
      if (indicatorEl.parentNode) {
        indicatorEl.parentNode.removeChild(indicatorEl);
      }
    }
  };
};

/**
 * Creates a bottom sheet component
 * @param {string} id - ID for the bottom sheet
 * @param {Object} options - Configuration options
 * @param {string} options.content - HTML content for the sheet
 * @param {boolean} options.closeOnClickOutside - Whether to close the sheet when clicking outside
 * @param {Function} options.onOpen - Callback when sheet opens
 * @param {Function} options.onClose - Callback when sheet closes
 * @returns {Object} - Sheet control functions
 */
export const createBottomSheet = (id, options = {}) => {
  const existingSheet = document.getElementById(id);
  if (existingSheet) {
    existingSheet.parentNode.removeChild(existingSheet);
  }
  
  const settings = {
    content: '',
    closeOnClickOutside: true,
    onOpen: () => {},
    onClose: () => {},
    ...options
  };
  
  // Create sheet element
  const sheet = document.createElement('div');
  sheet.id = id;
  sheet.className = 'bottom-sheet';
  sheet.innerHTML = `
    <div class="sheet-handle"></div>
    <div class="sheet-content">${settings.content}</div>
  `;
  
  // Add to document
  document.body.appendChild(sheet);
  
  // Create overlay element
  const overlay = document.createElement('div');
  overlay.className = 'drawer-overlay';
  document.body.appendChild(overlay);
  
  // Touch handling for the handle
  const handle = sheet.querySelector('.sheet-handle');
  let startY, currentY, isDragging = false;
  
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    startY = touch.clientY;
    isDragging = true;
    sheet.style.transition = 'none';
  };
  
  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const touch = e.touches[0];
    currentY = touch.clientY;
    const diffY = currentY - startY;
    
    // Only allow dragging down (positive diffY)
    if (diffY > 0) {
      sheet.style.transform = `translateY(${diffY}px)`;
    }
  };
  
  const handleTouchEnd = () => {
    if (!isDragging) return;
    
    isDragging = false;
    sheet.style.transition = 'transform 0.3s ease';
    
    // If dragged more than 30% of sheet height, close it
    const sheetHeight = sheet.offsetHeight;
    const diffY = currentY - startY;
    
    if (diffY > sheetHeight * 0.3) {
      close();
    } else {
      // Otherwise snap back
      sheet.style.transform = '';
    }
  };
  
  // Add event listeners for dragging
  handle.addEventListener('touchstart', handleTouchStart);
  handle.addEventListener('touchmove', handleTouchMove);
  handle.addEventListener('touchend', handleTouchEnd);
  
  // Close on click outside if enabled
  if (settings.closeOnClickOutside) {
    overlay.addEventListener('click', close);
  }
  
  // Open the sheet
  function open() {
    overlay.classList.add('open');
    sheet.classList.add('open');
    
    if (typeof settings.onOpen === 'function') {
      settings.onOpen();
    }
  }
  
  // Close the sheet
  function close() {
    overlay.classList.remove('open');
    sheet.classList.remove('open');
    
    if (typeof settings.onClose === 'function') {
      settings.onClose();
    }
  }
  
  // Update content
  function updateContent(html) {
    const contentEl = sheet.querySelector('.sheet-content');
    contentEl.innerHTML = html;
  }
  
  // Return control functions
  return {
    open,
    close,
    updateContent,
    destroy: () => {
      handle.removeEventListener('touchstart', handleTouchStart);
      handle.removeEventListener('touchmove', handleTouchMove);
      handle.removeEventListener('touchend', handleTouchEnd);
      
      if (settings.closeOnClickOutside) {
        overlay.removeEventListener('click', close);
      }
      
      // Remove elements
      if (sheet.parentNode) {
        sheet.parentNode.removeChild(sheet);
      }
      
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }
  };
}; 