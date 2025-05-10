import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (username: string, password: string, isAdmin?: boolean) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock data for demonstration
const MOCK_USERS = [
  { id: '1', username: 'user', email: 'user@example.com', password: 'password', isAdmin: false },
  { id: '2', username: 'admin', email: 'admin@example.com', password: 'password', isAdmin: true },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for existing session on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('fms_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (username: string, password: string, isAdmin = false): Promise<void> => {
    setLoading(true);
    
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const users = isAdmin 
          ? MOCK_USERS.filter(u => u.isAdmin) 
          : MOCK_USERS;
          
        const foundUser = users.find(
          (u) => u.username === username && u.password === password
        );

        if (foundUser) {
          // Remove password before storing user data
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem('fms_user', JSON.stringify(userWithoutPassword));
          setLoading(false);
          resolve();
        } else {
          setLoading(false);
          reject(new Error('Invalid credentials'));
        }
      }, 500);
    });
  };

  const signup = async (username: string, email: string, password: string): Promise<void> => {
    setLoading(true);
    
    // Simulate API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        // Check if user already exists
        const userExists = MOCK_USERS.some(
          (u) => u.username === username || u.email === email
        );

        if (userExists) {
          setLoading(false);
          reject(new Error('Username or email already exists'));
        } else {
          // Create new user
          const newUser = {
            id: `${MOCK_USERS.length + 1}`,
            username,
            email,
            isAdmin: false,
          };
          
          // Add to mock users (in a real app, this would save to a database)
          // Note: In production, we wouldn't mutate MOCK_USERS this way
          MOCK_USERS.push({ ...newUser, password });
          
          setUser(newUser);
          localStorage.setItem('fms_user', JSON.stringify(newUser));
          setLoading(false);
          resolve();
        }
      }, 500);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('fms_user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, signup, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};