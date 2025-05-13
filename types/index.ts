export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'staff';
  avatar?: string;
  createdAt: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountedPrice?: number;
  category: string;
  subcategory?: string;
  images: string[];
  inventory: number;
  sku: string;
  manufacturer?: string;
  featured: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: OrderItem[];
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  totalAmount: number;
  paymentStatus: 'pending' | 'paid' | 'failed' | 'refunded';
  paymentMethod: string;
  shippingAddress: Address;
  billingAddress: Address;
  shippingMethod: string;
  shippingCost: number;
  tax: number;
  discount?: number;
  notes?: string;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  discountedPrice?: number;
  totalPrice: number;
}

export interface Address {
  fullName: string;
  line1: string;
  line2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
}

export interface Customer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  addresses: Address[];
  orders: string[]; // Order IDs
  totalSpent: number;
  accountStatus: 'active' | 'inactive' | 'blocked';
  createdAt: string;
}

export interface DashboardStats {
  totalSales: number;
  totalOrders: number;
  totalProducts: number;
  totalCustomers: number;
  recentOrders: Order[];
  topSellingProducts: {
    product: Product;
    soldCount: number;
    revenue: number;
  }[];
  salesByCategory: {
    category: string;
    count: number;
    percentage: number;
  }[];
  salesOverTime: {
    period: string;
    sales: number;
  }[];
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
} 