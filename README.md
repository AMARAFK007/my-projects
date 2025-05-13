# MediShield Pharmacy E-commerce Website

A modern e-commerce platform for a pharmacy business with features including:

- Modern UI with responsive design
- Authentication system
- Product catalog
- Order tracking
- Admin dashboard
- Contact page with EmailJS integration
- PWA capabilities

## Technologies Used

- React/TypeScript
- Next.js
- Tailwind CSS
- Shadcn UI
- Framer Motion
- EmailJS
- Netlify for deployment

## Features

- **Modern UI**: Sleek design with animations and responsive layout
- **Authentication**: Secure login/registration system
- **Product Management**: Browse and manage pharmacy products
- **Order Tracking**: Visual timeline for order status
- **Admin Dashboard**: Sales analytics and product management
- **Contact Form**: EmailJS integration for customer inquiries
- **PWA Support**: Offline capabilities and mobile optimization

## Contact

Amarjit Pradhan  
Angul, India  
Phone: +918260258997  
Email: amarjitpradhan007@gmail.com

# MedShop E-Commerce

MedShop is a modern e-commerce platform for healthcare products built with Next.js.

*Last updated: May 11, 2025*

## Features

- **Product Catalog:** Browse a wide range of healthcare products
- **Product Details:** Detailed product information, reviews, and related products
- **Shopping Cart:** Add/remove items with quantity adjustment and persistent storage
- **User Authentication:** Login/registration with form validation
- **Checkout Process:** Multi-step checkout with shipping and payment options
- **Admin Panel:** Complete product, order, and customer management
- **Offline Support:** Service worker for offline access
- **SEO Optimized:** Structured data and meta tags for better search engine visibility
- **Performance Optimized:** Lazy loading images and component chunking

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/your-username/medshop-ecommerce.git
   cd medshop-ecommerce
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Run the development server:
   ```
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the site

### Building for Production

```
npm run build
```

The optimized production build will be created in the `dist` directory.

### Deployment

The project is configured for deployment on Netlify:

1. Push your code to a Git repository
2. Connect the repository to Netlify
3. Set the build command to `npm run build`
4. Set the publish directory to `dist`

## Project Structure

```
medshop-ecommerce/
├── public/             # Static assets and service worker
├── src/
│   ├── components/     # Reusable UI components
│   ├── pages/          # Page components and routes
│   │   └── Admin/      # Admin panel pages
│   ├── layout/         # Layout components
│   ├── lib/            # Utility libraries
│   ├── utils/          # Helper functions
│   └── styles/         # CSS and style files
├── scripts/            # Build and deployment scripts
└── package.json        # Project dependencies and scripts
```

## Custom Landing Page

For better SEO and performance, the project includes a custom HTML landing page located at `scripts/custom-index.html`. This page can be deployed as a static entry point for the application.

## API Integration

The application is designed to work with a backend API. In the current implementation, API calls are mocked with sample data, but can be easily connected to a real backend by updating the API service in `src/lib/api.js`.

## Performance Optimizations

- **Lazy Loading:** Images and components are lazy loaded for faster initial page loads
- **Code Splitting:** Components are split into smaller chunks loaded on demand
- **Service Worker:** Caches static assets and API responses for offline use
- **SEO Optimization:** Structured data and meta tags for better search ranking

## Admin Features

The admin panel includes:

- Dashboard with sales analytics
- Product management (add, edit, delete)
- Order processing and tracking
- Customer management
- User permissions and roles

## Mobile Experience

The application has been enhanced with mobile-specific features and optimizations:

### Mobile Responsive Design
- Responsive layouts for all screen sizes (mobile, tablet, desktop)
- Mobile-specific navigation with bottom bar and drawer menu
- Touch-optimized interactions for mobile users
- Landscape mode optimizations

### Touch Interactions
- Swipe gestures for product cards (swipe to reveal quick actions)
- Pull-to-refresh functionality 
- Bottom sheets for mobile-friendly dialogs
- Haptic feedback for touch interactions (vibration API)

### Progressive Web App (PWA)
- Offline capabilities with service worker caching
- Installable on home screen with web app manifest
- Offline fallback page
- Background sync for cart operations
- Push notifications support

### Performance Optimizations
- Mobile-optimized images
- Lazy loading for faster initial page load
- Reduced bundle size for mobile networks
- Client-side responsive rendering

To utilize these features, the following files have been implemented:
- `src/styles/mobile.css` - Mobile-specific styles
- `src/components/layout/MobileNavigation.js` - Mobile navigation component
- `src/components/layout/ClientWrapper.js` - Device detection wrapper
- `public/sw.js` - Service worker for offline capabilities
- `public/manifest.json` - Web app manifest for PWA
- `public/offline.html` - Offline fallback page

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgments

- Font Awesome for icons
- Google Fonts for typography
- AOS for scroll animations

# MedShop Admin Panel

## Overview

The MedShop Admin Panel is a comprehensive management dashboard for the MedShop e-commerce platform. It provides a powerful interface for administrators to manage products, orders, customers, and overall business operations.

## Features

### Dashboard
- Real-time sales analytics
- Order statistics
- Inventory management
- Customer growth metrics

### Product Management
- Add, edit, and delete products
- Bulk import/export functionality
- Inventory tracking
- Category and tag management
- Product variants and attributes

### Order Management
- Order processing workflow
- Payment status tracking
- Shipping management
- Invoice generation
- Returns and refunds processing

### Customer Management
- Customer profiles and histories
- Communication tools
- Account management
- Segmentation capabilities

## Technology Stack

- **Framework**: Next.js 14
- **UI**: Tailwind CSS
- **Database**: MongoDB with Prisma ORM
- **Authentication**: NextAuth.js
- **Deployment**: Netlify

## Development

### Prerequisites

- Node.js 18 or later
- MongoDB database (local or Atlas)

### Installation

```bash
# Clone the repository
git clone https://github.com/AMARAFK007/medshop-admin.git

# Navigate to the project directory
cd medshop-admin

# Install dependencies
npm install

# Create a .env.local file with the following variables:
# DATABASE_URL="mongodb+srv://username:password@cluster0.mongodb.net/medshop"
# NEXTAUTH_URL="http://localhost:3000"
# NEXTAUTH_SECRET="your-nextauth-secret-key"

# Start the development server
npm run dev
```

## Deployment to Netlify

### Automatic Deployment (recommended)
1. Push your code to GitHub
2. Connect your GitHub repository to Netlify
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `out`
4. Add environment variables in Netlify settings:
   - DATABASE_URL
   - NEXTAUTH_URL
   - NEXTAUTH_SECRET

### Manual Deployment
```bash
# Install Netlify CLI
npm install -g netlify-cli

# Build the project
npm run build

# Deploy to Netlify
netlify deploy --prod
```

## Troubleshooting Deployment Issues

If you encounter deployment failures:

1. Verify your environment variables are correctly set in Netlify
2. Check that your MongoDB connection string is correct
3. Make sure your site is using the static export configuration in next.config.js
4. Review Netlify deploy logs for specific error messages

## License

[MIT](LICENSE) 