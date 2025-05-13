/**
 * Utility functions for lazy loading images and optimizing performance
 */

/**
 * Initialize lazy loading for images using Intersection Observer API
 * This significantly improves performance by only loading images when they're about to enter the viewport
 */
export const initLazyLoading = () => {
  // Check if Intersection Observer is supported
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          
          // Replace data-src with actual src
          if (img.dataset.src) {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
          }
          
          // Replace data-srcset with actual srcset
          if (img.dataset.srcset) {
            img.srcset = img.dataset.srcset;
            img.removeAttribute('data-srcset');
          }
          
          // Add loaded class for fade-in effect
          img.classList.add('loaded');
          
          // Stop observing once loaded
          observer.unobserve(img);
        }
      });
    }, {
      // Start loading when image is 10% in view
      rootMargin: '0px 0px 50px 0px',
      threshold: 0.1
    });
    
    // Select all images with data-src attribute
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      imageObserver.observe(img);
    });
  } else {
    // Fallback for browsers that don't support Intersection Observer
    const lazyImages = document.querySelectorAll('img[data-src]');
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
      img.srcset = img.dataset.srcset || '';
      img.classList.add('loaded');
    });
  }
};

/**
 * Convert an image element to use lazy loading
 * Usage: Add this function to your image components
 * @param {string} src - Original image source
 * @param {string} alt - Image alt text
 * @param {string} className - CSS class for the image
 * @param {Object} sizes - Object containing different image sizes for responsive loading
 * @returns {Object} - Props for the image element
 */
export const getLazyImageProps = (src, alt, className = '', sizes = null) => {
  const imageProps = {
    alt,
    className: `lazy-image ${className}`,
    'data-src': src,
    src: 'data:image/svg+xml;charset=utf-8,%3Csvg xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22 viewBox%3D%220 0 300 150%22%2F%3E',
    loading: 'lazy'
  };
  
  // If responsive sizes are provided, add srcset and sizes attributes
  if (sizes) {
    let srcSet = '';
    
    Object.entries(sizes).forEach(([size, url]) => {
      srcSet += `${url} ${size}w, `;
    });
    
    imageProps['data-srcset'] = srcSet.slice(0, -2); // Remove trailing comma and space
    imageProps.sizes = '(max-width: 768px) 100vw, 50vw';
  }
  
  return imageProps;
};

/**
 * Pre-cache critical images for faster initial load
 * @param {Array} urls - Array of image URLs to pre-cache
 */
export const preCacheImages = (urls) => {
  if (!urls || !urls.length) return;
  
  urls.forEach(url => {
    const img = new Image();
    img.src = url;
  });
};

/**
 * Generate image placeholder with dominant color
 * This creates a tiny colored div that matches the image's dominant color
 * while the full image loads, improving perceived load time
 * @param {string} color - Dominant color in hex format
 * @param {number} ratio - Aspect ratio (height/width)
 * @returns {string} - CSS for the placeholder
 */
export const generateColorPlaceholder = (color = '#f1f5f9', ratio = 0.75) => {
  return `
    background-color: ${color};
    padding-bottom: ${ratio * 100}%;
    width: 100%;
    position: relative;
  `;
};

/**
 * Initialize progressive image loading
 * This loads low-quality image placeholders first, then switches to high quality
 */
export const initProgressiveLoading = () => {
  const progressiveImages = document.querySelectorAll('.progressive-image');
  
  progressiveImages.forEach(container => {
    const img = container.querySelector('img');
    const placeholder = container.querySelector('.placeholder');
    
    if (img.complete) {
      placeholder.classList.add('loaded');
    } else {
      img.onload = () => {
        placeholder.classList.add('loaded');
      };
    }
  });
}; 