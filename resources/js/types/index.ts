export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  category: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'user' | 'admin';
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  paymentMethod: string;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
}
