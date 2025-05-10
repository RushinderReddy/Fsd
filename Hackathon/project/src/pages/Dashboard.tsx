import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { Product } from '../types';
import { productService } from '../services/localStorage';
import Header from '../components/layout/Header';
import ProductCard from '../components/products/ProductCard';
import ProductForm from '../components/products/ProductForm';
import FeedbackForm from '../components/feedback/FeedbackForm';
import FeedbackList from '../components/feedback/FeedbackList';

const Dashboard: React.FC = () => {
  const { isAdmin } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProductId, setSelectedProductId] = useState<string | undefined>(undefined);
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);
  
  const loadProducts = () => {
    setProducts(productService.getProducts());
  };
  
  useEffect(() => {
    loadProducts();
  }, []);
  
  const handleFeedbackClick = (productId: string) => {
    setSelectedProductId(productId);
    setShowFeedbackForm(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };
  
  const handleFeedbackSuccess = () => {
    setSelectedProductId(undefined);
    setShowFeedbackForm(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8 mb-12">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          {isAdmin ? 'Admin Dashboard' : 'Welcome to FeedbackHub'}
        </h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                {isAdmin ? 'Manage Products' : 'Available Products'}
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {products.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onFeedbackClick={handleFeedbackClick}
                  />
                ))}
              </div>
            </section>
            
            <section>
              <FeedbackList />
            </section>
          </div>
          
          <div className="lg:col-span-1">
            {isAdmin ? (
              <ProductForm onSuccess={loadProducts} />
            ) : (
              <div className="space-y-6">
                {showFeedbackForm && (
                  <FeedbackForm 
                    onSuccess={handleFeedbackSuccess}
                    selectedProductId={selectedProductId}
                  />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;