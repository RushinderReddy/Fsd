import React, { useState, useEffect } from 'react';
import { Feedback } from '../../types';
import { feedbackService } from '../../services/localStorage';
import FeedbackItem from './FeedbackItem';

const FeedbackList: React.FC = () => {
  const [feedbackList, setFeedbackList] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  const loadFeedback = () => {
    try {
      const feedback = feedbackService.getFeedback();
      // Sort feedback by date (newest first)
      setFeedbackList(feedback.sort((a, b) => {
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      }));
    } catch (error) {
      console.error('Error loading feedback:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadFeedback();
  }, []);
  
  if (isLoading) {
    return <div className="p-4 text-center">Loading feedback...</div>;
  }
  
  if (feedbackList.length === 0) {
    return (
      <div className="bg-gray-50 rounded-lg p-6 text-center">
        <p className="text-gray-600">No feedback available yet.</p>
      </div>
    );
  }
  
  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Feedback</h2>
      <div className="space-y-4">
        {feedbackList.map((feedback) => (
          <FeedbackItem 
            key={feedback.id} 
            feedback={feedback} 
            onReply={loadFeedback}
          />
        ))}
      </div>
    </div>
  );
};

export default FeedbackList;