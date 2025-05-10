import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { productService, feedbackService } from '../../services/localStorage';
import { useAuth } from '../../contexts/AuthContext';
import Select from '../common/Select';
import TextArea from '../common/TextArea';
import Button from '../common/Button';
import StarRating from '../common/StarRating';

interface FeedbackFormProps {
  onSuccess: () => void;
  selectedProductId?: string;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSuccess, selectedProductId }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState(selectedProductId || '');
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [errors, setErrors] = useState<{ productId?: string; rating?: string; comment?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const { user } = useAuth();
  
  useEffect(() => {
    setProducts(productService.getProducts());
    if (selectedProductId) {
      setProductId(selectedProductId);
    }
  }, [selectedProductId]);
  
  const validate = () => {
    const newErrors: { productId?: string; rating?: string; comment?: string } = {};
    
    if (!productId) {
      newErrors.productId = 'Please select a product';
    }
    
    if (rating === 0) {
      newErrors.rating = 'Please select a rating';
    }
    
    if (!comment.trim()) {
      newErrors.comment = 'Please enter your feedback';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate() || !user) return;
    
    setIsSubmitting(true);
    
    try {
      const selectedProduct = products.find(p => p.id === productId);
      
      if (selectedProduct) {
        feedbackService.addFeedback({
          userId: user.id,
          username: user.username,
          productId,
          productName: selectedProduct.name,
          rating,
          comment
        });
        
        setProductId('');
        setRating(0);
        setComment('');
        setIsSuccess(true);
        onSuccess();
        
        // Reset success message after 3 seconds
        setTimeout(() => {
          setIsSuccess(false);
        }, 3000);
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Submit Feedback</h2>
      
      {isSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          Thank you for your feedback!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <Select
          label="Select Product"
          options={products.map(product => ({
            value: product.id,
            label: product.name
          }))}
          value={productId}
          onChange={setProductId}
          error={errors.productId}
          fullWidth
          disabled={!!selectedProductId}
        />
        
        <div className="mb-4">
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Rating
          </label>
          <StarRating value={rating} onChange={setRating} size="lg" />
          {errors.rating && <p className="mt-1 text-sm text-red-500">{errors.rating}</p>}
        </div>
        
        <TextArea
          label="Comments"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          error={errors.comment}
          fullWidth
          rows={4}
          placeholder="Share your experience with this product"
        />
        
        <div className="mt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default FeedbackForm;