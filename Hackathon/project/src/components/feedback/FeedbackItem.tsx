import React, { useState } from 'react';
import { Feedback } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { feedbackService } from '../../services/localStorage';
import StarRating from '../common/StarRating';
import Button from '../common/Button';
import TextArea from '../common/TextArea';

interface FeedbackItemProps {
  feedback: Feedback;
  onReply: () => void;
}

const FeedbackItem: React.FC<FeedbackItemProps> = ({ feedback, onReply }) => {
  const [isReplying, setIsReplying] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const { isAdmin } = useAuth();
  
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };
  
  const handleReplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!replyText.trim()) {
      setError('Reply cannot be empty');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      feedbackService.addReply(feedback.id, replyText);
      setReplyText('');
      setIsReplying(false);
      onReply();
    } catch (error) {
      console.error('Error submitting reply:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="bg-white rounded-lg shadow-md p-5 mb-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-medium text-lg text-gray-800">
            {feedback.productName}
          </h3>
          <div className="flex items-center mt-1">
            <StarRating value={feedback.rating} readOnly size="sm" />
            <span className="ml-2 text-sm text-gray-600">
              by {feedback.username}
            </span>
          </div>
        </div>
        <span className="text-sm text-gray-500">
          {formatDate(feedback.createdAt)}
        </span>
      </div>
      
      <div className="mt-2 text-gray-700">{feedback.comment}</div>
      
      {feedback.reply && (
        <div className="mt-4 pl-4 border-l-4 border-blue-200 bg-blue-50 p-3 rounded">
          <div className="text-sm font-medium text-blue-700 mb-1">
            Admin reply:
          </div>
          <div className="text-gray-700">{feedback.reply.text}</div>
          <div className="mt-1 text-xs text-gray-500">
            {formatDate(feedback.reply.createdAt)}
          </div>
        </div>
      )}
      
      {isAdmin && !feedback.reply && !isReplying && (
        <div className="mt-4">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => setIsReplying(true)}
          >
            Reply
          </Button>
        </div>
      )}
      
      {isReplying && (
        <form onSubmit={handleReplySubmit} className="mt-4">
          <TextArea
            label="Your Reply"
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            error={error}
            fullWidth
            rows={3}
            placeholder="Write your reply here"
          />
          
          <div className="flex space-x-2 mt-2">
            <Button 
              type="submit" 
              size="sm" 
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Reply'}
            </Button>
            <Button 
              variant="secondary" 
              size="sm" 
              onClick={() => {
                setIsReplying(false);
                setReplyText('');
                setError('');
              }}
            >
              Cancel
            </Button>
          </div>
        </form>
      )}
    </div>
  );
};

export default FeedbackItem;