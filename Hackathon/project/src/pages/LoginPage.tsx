import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoginForm from '../components/auth/LoginForm';
import Header from '../components/layout/Header';

const LoginPage: React.FC = () => {
  const { isAuthenticated } = useAuth();
  
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-blue-100">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center">
          <LoginForm />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;