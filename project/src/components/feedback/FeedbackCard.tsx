import React from 'react';
import { Clock, CheckCircle, XCircle, AlertCircle, CheckSquare } from 'lucide-react';
import { Feedback } from '../../types';
import Card from '../ui/Card';

interface FeedbackCardProps {
  feedback: Feedback;
  showResponse?: boolean;
}

const FeedbackCard: React.FC<FeedbackCardProps> = ({ 
  feedback,
  showResponse = false
}) => {
  const { title, description, category, status, createdAt } = feedback;
  
  // Status badge configuration
  const statusConfig = {
    pending: {
      icon: <Clock className="h-4 w-4" />,
      text: 'Pending',
      color: 'bg-warning-500 text-white',
    },
    'in-review': {
      icon: <AlertCircle className="h-4 w-4" />,
      text: 'In Review',
      color: 'bg-secondary-500 text-white',
    },
    accepted: {
      icon: <CheckCircle className="h-4 w-4" />,
      text: 'Accepted',
      color: 'bg-primary-500 text-white',
    },
    rejected: {
      icon: <XCircle className="h-4 w-4" />,
      text: 'Rejected',
      color: 'bg-error-500 text-white',
    },
    implemented: {
      icon: <CheckSquare className="h-4 w-4" />,
      text: 'Implemented',
      color: 'bg-accent-500 text-white',
    },
  };

  const currentStatus = statusConfig[status];
  const formattedDate = new Date(createdAt).toLocaleDateString();

  return (
    <Card className="mb-4 overflow-hidden hover:border-primary-200 transition-all duration-300">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <div className="mt-1 flex items-center space-x-3">
            <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
              {category}
            </span>
            <span className="text-xs text-gray-500">{formattedDate}</span>
          </div>
        </div>
        <div className={`flex items-center space-x-1 rounded-full px-2.5 py-1 text-xs font-medium ${currentStatus.color}`}>
          {currentStatus.icon}
          <span>{currentStatus.text}</span>
        </div>
      </div>
      
      <p className="mt-3 text-sm text-gray-600">{description}</p>
      
      {showResponse && status !== 'pending' && (
        <div className="mt-4 rounded-md bg-gray-50 p-3">
          <h4 className="text-sm font-medium text-gray-700">Response:</h4>
          <p className="mt-1 text-sm text-gray-600">
            {status === 'accepted' 
              ? 'Your feedback has been accepted and will be implemented soon.' 
              : status === 'rejected'
              ? 'We appreciate your feedback, but we are unable to implement this at the moment.'
              : status === 'in-review'
              ? 'Your feedback is currently under review by our team.'
              : 'Your feedback has been implemented in the latest update.'}
          </p>
        </div>
      )}
    </Card>
  );
};

export default FeedbackCard;