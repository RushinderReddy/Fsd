export interface User {
  id: string;
  username: string;
  role: 'admin' | 'user';
}

export interface Product {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  createdAt: string;
}

export interface Feedback {
  id: string;
  userId: string;
  username: string;
  productId: string;
  productName: string;
  rating: number;
  comment: string;
  createdAt: string;
  reply?: {
    text: string;
    createdAt: string;
  };
}

export interface LoginCredentials {
  username: string;
  password: string;
}