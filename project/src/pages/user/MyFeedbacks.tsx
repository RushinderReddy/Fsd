import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useFeedback } from '../../context/FeedbackContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import FeedbackCard from '../../components/feedback/FeedbackCard';
import Button from '../../components/ui/Button';

const MyFeedbacks: React.FC = () => {
  const { user } = useAuth();
  const { getUserFeedbacks } = useFeedback();
  
  const userFeedbacks = user ? getUserFeedbacks(user.id) : [];

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar title="My Feedbacks" />
      
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-8">
            <Link
              to="/user/dashboard"
              className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
            
            <h1 className="text-3xl font-bold text-gray-900">My Feedbacks</h1>
            <p className="mt-2 text-lg text-gray-600">
              Track the status of your submitted feedback.
            </p>
          </div>
          
          <div className="space-y-4">
            {userFeedbacks.length > 0 ? (
              userFeedbacks.map((feedback) => (
                <FeedbackCard 
                  key={feedback.id} 
                  feedback={feedback} 
                  showResponse={true}
                />
              ))
            ) : (
              <div className="rounded-lg bg-white p-8 shadow-lg text-center">
                <p className="mb-4 text-lg font-medium text-gray-700">
                  You haven't submitted any feedback yet.
                </p>
                <Link to="/user/give-feedback">
                  <Button variant="primary">Submit Feedback</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default MyFeedbacks;