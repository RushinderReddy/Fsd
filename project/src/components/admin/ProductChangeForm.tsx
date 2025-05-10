import React, { useState } from 'react';
import { useFeedback } from '../../context/FeedbackContext';
import { Feedback } from '../../types';
import Button from '../ui/Button';
import Input from '../ui/Input';

interface ProductChangeFormProps {
  feedbacks?: Feedback[];
  onSuccess?: () => void;
}

const ProductChangeForm: React.FC<ProductChangeFormProps> = ({ 
  feedbacks = [], 
  onSuccess 
}) => {
  const { addProductChange } = useFeedback();
  
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [selectedFeedbacks, setSelectedFeedbacks] = useState<string[]>([]);
  const [status, setStatus] = useState<'planned' | 'in-progress' | 'completed'>('planned');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!title.trim()) {
      newErrors.title = 'Title is required';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    if (selectedFeedbacks.length === 0) {
      newErrors.feedbacks = 'Please select at least one feedback';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;
    
    setIsSubmitting(true);
    
    try {
      addProductChange({
        title,
        description,
        feedbackIds: selectedFeedbacks,
        status,
      });
      
      // Reset form
      setTitle('');
      setDescription('');
      setSelectedFeedbacks([]);
      setStatus('planned');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error adding product change:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleFeedback = (id: string) => {
    setSelectedFeedbacks((prev) =>
      prev.includes(id)
        ? prev.filter((feedbackId) => feedbackId !== id)
        : [...prev, id]
    );
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        label="Title"
        id="title"
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title for the product change"
        error={errors.title}
        required
      />
      
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
          placeholder="Describe the changes to be implemented"
          required
        />
        {errors.description && (
          <p className="mt-1 text-xs text-error-500">{errors.description}</p>
        )}
      </div>
      
      <div className="mb-4">
        <label htmlFor="status" className="label">
          Status
        </label>
        <select
          id="status"
          value={status}
          onChange={(e) => setStatus(e.target.value as any)}
          className="input"
          required
        >
          <option value="planned">Planned</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
      </div>
      
      <div className="mb-4">
        <label className="label">
          Related Feedbacks
        </label>
        {feedbacks.length > 0 ? (
          <div className="space-y-2">
            {feedbacks.map((feedback) => (
              <div key={feedback.id} className="flex items-center">
                <input
                  type="checkbox"
                  id={`feedback-${feedback.id}`}
                  checked={selectedFeedbacks.includes(feedback.id)}
                  onChange={() => toggleFeedback(feedback.id)}
                  className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label
                  htmlFor={`feedback-${feedback.id}`}
                  className="ml-2 text-sm text-gray-700"
                >
                  {feedback.title}
                </label>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-sm text-gray-500">No feedbacks available to select</p>
        )}
        {errors.feedbacks && (
          <p className="mt-1 text-xs text-error-500">{errors.feedbacks}</p>
        )}
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Adding...' : 'Add Product Change'}
        </Button>
      </div>
    </form>
  );
};

export default ProductChangeForm;