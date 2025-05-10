import React, { useState } from 'react';
import { useFeedback } from '../../context/FeedbackContext';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface FeedbackFormProps {
  onSuccess?: () => void;
}

const FeedbackForm: React.FC<FeedbackFormProps> = ({ onSuccess }) => {
  const { user } = useAuth();
  const { categories, submitFeedback } = useFeedback();
  
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!category) {
      newErrors.category = 'Please select a category';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    } else if (description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate() || !user) return;
    
    setIsSubmitting(true);
    
    try {
      submitFeedback({
        userId: user.id,
        username: user.username,
        title,
        category,
        description,
        status: 'pending',
      });
      
      // Reset form
      setTitle('');
      setCategory('');
      setDescription('');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error submitting feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Brief title for your feedback"
        error={errors.title}
        required
      />
      
      <div className="mb-4">
        <label htmlFor="category" className="label">
          Category
        </label>
        <select
          id="category"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className={`input ${errors.category ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
          required
        >
          <option value="">Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.name}>
              {cat.name}
            </option>
          ))}
        </select>
        {errors.category && (
          <p className="mt-1 text-xs text-error-500">{errors.category}</p>
        )}
      </div>
      
      <div className="mb-4">
        <label htmlFor="description" className="label">
          Description
        </label>
        <textarea
          id="description"
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className={`input ${errors.description ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
          placeholder="Provide details about your feedback or suggestion"
          required
        />
        {errors.description && (
          <p className="mt-1 text-xs text-error-500">{errors.description}</p>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
        </Button>
      </div>
    </form>
  );
};

export default FeedbackForm;