import { Product, Order } from '../types';

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Wireless Headphones',
    price: 299.99,
    description: 'High-quality wireless headphones with noise cancellation and premium sound quality.',
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    inStock: true,
    rating: 4.8,
    reviews: 1247,
    features: ['Active Noise Cancellation', '30-hour Battery Life', 'Premium Sound Quality', 'Comfortable Design']
  },
  {
    id: '2',
    name: 'Smart Fitness Watch',
    price: 199.99,
    description: 'Advanced fitness tracking with heart rate monitoring and GPS capabilities.',
    image: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    inStock: true,
    rating: 4.6,
    reviews: 892,
    features: ['GPS Tracking', 'Heart Rate Monitor', 'Water Resistant', '7-day Battery']
  },
  {
    id: '3',
    name: 'Minimalist Laptop Stand',
    price: 79.99,
    description: 'Ergonomic aluminum laptop stand for better posture and workspace organization.',
    image: 'https://images.pexels.com/photos/4050320/pexels-photo-4050320.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Accessories',
    inStock: true,
    rating: 4.7,
    reviews: 634,
    features: ['Aluminum Construction', 'Adjustable Height', 'Heat Dissipation', 'Stable Design']
  },
  {
    id: '4',
    name: 'Professional Camera Lens',
    price: 599.99,
    description: 'High-performance 50mm lens for professional photography with exceptional clarity.',
    image: 'https://images.pexels.com/photos/90946/pexels-photo-90946.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Photography',
    inStock: false,
    rating: 4.9,
    reviews: 423,
    features: ['50mm Focal Length', 'f/1.4 Aperture', 'Weather Sealed', 'Professional Grade']
  },
  {
    id: '5',
    name: 'Ergonomic Office Chair',
    price: 449.99,
    description: 'Premium ergonomic chair designed for long hours of comfortable work.',
    image: 'https://images.pexels.com/photos/6707628/pexels-photo-6707628.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Furniture',
    inStock: true,
    rating: 4.5,
    reviews: 756,
    features: ['Lumbar Support', 'Adjustable Height', 'Breathable Mesh', '5-year Warranty']
  },
  {
    id: '6',
    name: 'Wireless Charging Pad',
    price: 49.99,
    description: 'Fast wireless charging pad compatible with all Qi-enabled devices.',
    image: 'https://images.pexels.com/photos/4219654/pexels-photo-4219654.jpeg?auto=compress&cs=tinysrgb&w=800',
    category: 'Electronics',
    inStock: true,
    rating: 4.4,
    reviews: 1089,
    features: ['Fast Charging', 'Universal Compatibility', 'LED Indicator', 'Safety Protection']
  }
];

export const mockOrders: Order[] = [
  {
    id: 'ORD-001',
    userId: '1',
    items: [
      { product: mockProducts[0], quantity: 1 },
      { product: mockProducts[5], quantity: 2 }
    ],
    total: 399.97,
    status: 'delivered',
    createdAt: '2024-01-15T10:30:00Z',
    shippingAddress: {
      street: '123 Main St',
      city: 'New York',
      state: 'NY',
      zipCode: '10001',
      country: 'USA'
    },
    paymentMethod: 'Credit Card'
  },
  {
    id: 'ORD-002',
    userId: '2',
    items: [
      { product: mockProducts[1], quantity: 1 },
      { product: mockProducts[2], quantity: 1 }
    ],
    total: 279.98,
    status: 'processing',
    createdAt: '2024-01-20T14:15:00Z',
    shippingAddress: {
      street: '456 Oak Ave',
      city: 'Los Angeles',
      state: 'CA',
      zipCode: '90210',
      country: 'USA'
    },
    paymentMethod: 'PayPal'
  },
  {
    id: 'ORD-003',
    userId: '1',
    items: [
      { product: mockProducts[4], quantity: 1 }
    ],
    total: 449.99,
    status: 'shipped',
    createdAt: '2024-01-25T09:45:00Z',
    shippingAddress: {
      street: '789 Pine St',
      city: 'Chicago',
      state: 'IL',
      zipCode: '60601',
      country: 'USA'
    },
    paymentMethod: 'Credit Card'
  }
];