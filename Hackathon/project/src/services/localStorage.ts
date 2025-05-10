import { User, Product, Feedback } from '../types';
import { mockUsers, mockProducts, mockFeedback } from '../utils/mockData';

// Initialize local storage with mock data if empty
const initializeLocalStorage = () => {
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(mockUsers));
  }
  
  if (!localStorage.getItem('products')) {
    localStorage.setItem('products', JSON.stringify(mockProducts));
  }
  
  if (!localStorage.getItem('feedback')) {
    localStorage.setItem('feedback', JSON.stringify(mockFeedback));
  }
};

// Auth service
export const authService = {
  login: (username: string, password: string): User | null => {
    initializeLocalStorage();
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    
    // For simplicity, we're not checking passwords in this demo
    // In a real app, you'd hash passwords and compare them
    const user = users.find((u: User) => u.username === username);
    
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    }
    
    return null;
  },
  
  logout: () => {
    localStorage.removeItem('currentUser');
  },
  
  getCurrentUser: (): User | null => {
    const userStr = localStorage.getItem('currentUser');
    if (!userStr) return null;
    return JSON.parse(userStr);
  }
};

// Product service
export const productService = {
  getProducts: (): Product[] => {
    initializeLocalStorage();
    return JSON.parse(localStorage.getItem('products') || '[]');
  },
  
  addProduct: (product: Omit<Product, 'id' | 'createdAt'>): Product => {
    const products = productService.getProducts();
    
    const newProduct: Product = {
      ...product,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('products', JSON.stringify([...products, newProduct]));
    return newProduct;
  }
};

// Feedback service
export const feedbackService = {
  getFeedback: (): Feedback[] => {
    initializeLocalStorage();
    return JSON.parse(localStorage.getItem('feedback') || '[]');
  },
  
  addFeedback: (feedback: Omit<Feedback, 'id' | 'createdAt'>): Feedback => {
    const feedbackList = feedbackService.getFeedback();
    
    const newFeedback: Feedback = {
      ...feedback,
      id: Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    
    localStorage.setItem('feedback', JSON.stringify([...feedbackList, newFeedback]));
    return newFeedback;
  },
  
  addReply: (feedbackId: string, replyText: string): Feedback | null => {
    const feedbackList = feedbackService.getFeedback();
    const feedbackIndex = feedbackList.findIndex(f => f.id === feedbackId);
    
    if (feedbackIndex === -1) return null;
    
    const updatedFeedback = {
      ...feedbackList[feedbackIndex],
      reply: {
        text: replyText,
        createdAt: new Date().toISOString()
      }
    };
    
    feedbackList[feedbackIndex] = updatedFeedback;
    localStorage.setItem('feedback', JSON.stringify(feedbackList));
    
    return updatedFeedback;
  }
};