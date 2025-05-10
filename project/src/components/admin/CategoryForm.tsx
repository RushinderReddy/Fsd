import React, { useState } from 'react';
import { useFeedback } from '../../context/FeedbackContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface CategoryFormProps {
  onSuccess?: () => void;
}

const CategoryForm: React.FC<CategoryFormProps> = ({ onSuccess }) => {
  const { addCategory } = useFeedback();
  
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      addCategory({
        name,
        description,
      });
      
      // Reset form
      setName('');
      setDescription('');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error adding category:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Category Name"
        id="name"
        type="text"
        value={name}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
        placeholder="E.g., UI/UX, Feature Request, Bug Report"
        error={errors.name}
        required
      />
      
      <div className="mb-4">
        <label htmlFor="description" className="label">
          Description
        </label>
        <textarea
          id="description"
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`input ${errors.description ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
          placeholder="Brief description of this category"
          required
        />
        {errors.description && (
          <p className="mt-1 text-xs text-error-500">{errors.description}</p>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Category'}
        </Button>
      </div>
    </form>
  );
};

export default CategoryForm;