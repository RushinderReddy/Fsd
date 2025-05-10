import React, { useState } from 'react';
import { useFeedback } from '../../context/FeedbackContext';
import { Feedback } from '../../types';
import Button from '../ui/Button';

interface ResponseFormProps {
  feedback: Feedback;
  onSuccess?: () => void;
}

const ResponseForm: React.FC<ResponseFormProps> = ({ feedback, onSuccess }) => {
  const { respondToFeedback } = useFeedback();
  
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!response.trim()) {
      setError('Response is required');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      respondToFeedback({
        feedbackId: feedback.id,
        response,
      });
      
      // Reset form
      setResponse('');
      setError('');
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (error) {
      console.error('Error responding to feedback:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div className="mb-4">
        <label htmlFor="response" className="label">
          Response
        </label>
        <textarea
          id="response"
          rows={4}
          value={response}
          onChange={(e) => setResponse(e.target.value)}
          className={`input ${error ? 'border-error-500 focus:border-error-500 focus:ring-error-500' : ''}`}
          placeholder="Enter your response to this feedback"
          required
        />
        {error && <p className="mt-1 text-xs text-error-500">{error}</p>}
      </div>
      
      <div className="flex justify-end">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit Response'}
        </Button>
      </div>
    </form>
  );
};

export default ResponseForm;