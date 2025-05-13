/**
 * SEO utilities for improving search engine optimization
 */

/**
 * Updates page meta tags for SEO optimization
 * @param {Object} seoData - Object containing SEO data
 * @param {string} seoData.title - Page title
 * @param {string} seoData.description - Page description
 * @param {string} seoData.keywords - Comma-separated keywords
 * @param {string} seoData.canonical - Canonical URL
 * @param {string} seoData.ogImage - Open Graph image URL
 * @param {string} seoData.ogType - Open Graph type (website, article, etc.)
 * @param {string} seoData.twitterCard - Twitter card type
 */
export const updateMetaTags = ({
  title,
  description,
  keywords,
  canonical,
  ogImage,
  ogType = 'website',
  twitterCard = 'summary_large_image',
}) => {
  // Update document title
  if (title) {
    document.title = title;
    updateOrCreateMetaTag('property', 'og:title', title);
    updateOrCreateMetaTag('name', 'twitter:title', title);
  }
  
  // Update meta description
  if (description) {
    updateOrCreateMetaTag('name', 'description', description);
    updateOrCreateMetaTag('property', 'og:description', description);
    updateOrCreateMetaTag('name', 'twitter:description', description);
  }
  
  // Update keywords
  if (keywords) {
    updateOrCreateMetaTag('name', 'keywords', keywords);
  }
  
  // Update canonical link
  if (canonical) {
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (canonicalLink) {
      canonicalLink.href = canonical;
    } else {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      canonicalLink.href = canonical;
      document.head.appendChild(canonicalLink);
    }
    
    updateOrCreateMetaTag('property', 'og:url', canonical);
  }
  
  // Update Open Graph image
  if (ogImage) {
    updateOrCreateMetaTag('property', 'og:image', ogImage);
    updateOrCreateMetaTag('name', 'twitter:image', ogImage);
  }
  
  // Set Open Graph type
  updateOrCreateMetaTag('property', 'og:type', ogType);
  
  // Set Twitter card type
  updateOrCreateMetaTag('name', 'twitter:card', twitterCard);
};

/**
 * Creates or updates a meta tag
 * @param {string} attributeType - 'name' or 'property'
 * @param {string} attributeName - Attribute name/value
 * @param {string} content - Content value
 */
const updateOrCreateMetaTag = (attributeType, attributeName, content) => {
  let metaTag = document.querySelector(`meta[${attributeType}="${attributeName}"]`);
  
  if (metaTag) {
    metaTag.content = content;
  } else {
    metaTag = document.createElement('meta');
    metaTag.setAttribute(attributeType, attributeName);
    metaTag.content = content;
    document.head.appendChild(metaTag);
  }
};

/**
 * Generates JSON-LD structured data for product pages
 * @param {Object} product - Product data
 * @returns {string} - JSON-LD script content
 */
export const generateProductJsonLd = (product) => {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description,
    image: product.imageUrl,
    sku: `MED-${product.id}`,
    brand: {
      '@type': 'Brand',
      name: 'MedShop'
    },
    offers: {
      '@type': 'Offer',
      price: product.price,
      priceCurrency: 'USD',
      availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: window.location.href
    }
  };
  
  // Add reviews if available
  if (product.reviews && product.reviews.length > 0) {
    const reviews = product.reviews.map(review => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: '5'
      },
      author: {
        '@type': 'Person',
        name: review.user
      },
      reviewBody: review.comment
    }));
    
    // Calculate average rating
    const totalRating = product.reviews.reduce((sum, review) => sum + review.rating, 0);
    const averageRating = totalRating / product.reviews.length;
    
    // Add aggregate rating
    jsonLd.aggregateRating = {
      '@type': 'AggregateRating',
      ratingValue: averageRating.toFixed(1),
      reviewCount: product.reviews.length
    };
    
    // Add reviews array
    jsonLd.review = reviews;
  }
  
  return JSON.stringify(jsonLd);
};

/**
 * Injects JSON-LD structured data into the document head
 * @param {string} type - Type of JSON-LD (product, breadcrumb, etc.)
 * @param {Object} data - JSON-LD data
 */
export const injectJsonLd = (type, data) => {
  // Remove existing JSON-LD of the same type
  const existingScript = document.querySelector(`script[data-type="${type}"]`);
  if (existingScript) {
    existingScript.remove();
  }
  
  let jsonLdContent = '';
  
  switch (type) {
    case 'product':
      jsonLdContent = generateProductJsonLd(data);
      break;
    case 'breadcrumb':
      // Implement breadcrumb generator if needed
      break;
    case 'organization':
      // Implement organization generator if needed
      break;
    default:
      // Just use the data as-is if it's already formatted
      jsonLdContent = typeof data === 'string' ? data : JSON.stringify(data);
  }
  
  // Create and inject the script
  const script = document.createElement('script');
  script.type = 'application/ld+json';
  script.setAttribute('data-type', type);
  script.textContent = jsonLdContent;
  document.head.appendChild(script);
}; 