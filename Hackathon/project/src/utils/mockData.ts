import { Product, Feedback, User } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    username: 'admin',
    role: 'admin'
  },
  {
    id: '2',
    username: 'user',
    role: 'user'
  }
];

// Initial mock products
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Premium Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    imageUrl: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: new Date(2023, 5, 15).toISOString()
  },
  {
    id: '2',
    name: 'Smart Watch Pro',
    description: 'Advanced smartwatch with health monitoring and GPS',
    imageUrl: 'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: new Date(2023, 6, 20).toISOString()
  },
  {
    id: '3',
    name: 'Wireless Earbuds',
    description: 'Compact wireless earbuds with amazing sound quality',
    imageUrl: 'https://images.pexels.com/photos/3780681/pexels-photo-3780681.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    createdAt: new Date(2023, 7, 5).toISOString()
  }
];

// Initial mock feedback
export const mockFeedback: Feedback[] = [
  {
    id: '1',
    userId: '2',
    username: 'user',
    productId: '1',
    productName: 'Premium Headphones',
    rating: 4,
    comment: 'Great sound quality, but battery life could be better.',
    createdAt: new Date(2023, 8, 10).toISOString(),
    reply: {
      text: 'Thank you for your feedback! We\'re working on improving battery life in our next model.',
      createdAt: new Date(2023, 8, 11).toISOString()
    }
  },
  {
    id: '2',
    userId: '2',
    username: 'user',
    productId: '2',
    productName: 'Smart Watch Pro',
    rating: 5,
    comment: 'Absolutely love this watch! The health features are amazing.',
    createdAt: new Date(2023, 9, 5).toISOString()
  }
];