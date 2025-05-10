import React from 'react';
import { Product } from '../../types';
import Button from '../common/Button';

interface ProductCardProps {
  product: Product;
  onFeedbackClick: (productId: string) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onFeedbackClick }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    }).format(date);
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1">
      <div className="h-48 overflow-hidden">
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-5">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">Added {formatDate(product.createdAt)}</span>
          <Button 
            variant="primary" 
            size="sm" 
            onClick={() => onFeedbackClick(product.id)}
          >
            Give Feedback
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;