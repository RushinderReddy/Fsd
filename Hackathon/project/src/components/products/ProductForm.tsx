import React, { useState } from 'react';
import Input from '../common/Input';
import TextArea from '../common/TextArea';
import Button from '../common/Button';
import { productService } from '../../services/localStorage';

interface ProductFormProps {
  onSuccess: () => void;
}

const ProductForm: React.FC<ProductFormProps> = ({ onSuccess }) => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [errors, setErrors] = useState<{ name?: string; description?: string; imageUrl?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const validate = () => {
    const newErrors: { name?: string; description?: string; imageUrl?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = 'Product name is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (!imageUrl.trim()) {
      newErrors.imageUrl = 'Image URL is required';
    } else if (!isValidUrl(imageUrl)) {
      newErrors.imageUrl = 'Please enter a valid URL';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const isValidUrl = (url: string) => {
    try {
      new URL(url);
      return true;
    } catch (e) {
      return false;
    }
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      productService.addProduct({
        name,
        description,
        imageUrl
      });
      
      setName('');
      setDescription('');
      setImageUrl('');
      setIsSuccess(true);
      onSuccess();
      
      // Reset success message after 3 seconds
      setTimeout(() => {
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Error adding product:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Add New Product</h2>
      
      {isSuccess && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
          Product added successfully!
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <Input
          label="Product Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={errors.name}
          fullWidth
          placeholder="Enter product name"
        />
        
        <TextArea
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          error={errors.description}
          fullWidth
          rows={3}
          placeholder="Enter product description"
        />
        
        <Input
          label="Image URL"
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          error={errors.imageUrl}
          fullWidth
          placeholder="Enter image URL"
        />
        
        <div className="mt-6">
          <Button
            type="submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Adding Product...' : 'Add Product'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;