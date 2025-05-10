import React from 'react';
import { ArrowLeft, CheckCircle } from 'lucide-react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useFeedback } from '../../context/FeedbackContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import FeedbackCard from '../../components/feedback/FeedbackCard';
import ResponseForm from '../../components/admin/ResponseForm';
import Card from '../../components/ui/Card';

const RespondToFeedback: React.FC = () => {
  const { feedbackId } = useParams<{ feedbackId: string }>();
  const { feedbacks } = useFeedback();
  const navigate = useNavigate();
  const [responseSubmitted, setResponseSubmitted] = React.useState(false);
  
  // Find the feedback to respond to
  const feedback = feedbacks.find((f) => f.id === feedbackId);
  
  const handleSuccess = () => {
    setResponseSubmitted(true);
    
    // Redirect back to feedbacks list after a delay
    setTimeout(() => {
      navigate('/admin/feedbacks');
    }, 2000);
  };

  if (!feedback) {
    return (
      <div className="flex min-h-screen flex-col">
        <Navbar title="Respond to Feedback" />
        
        <main className="flex-1 bg-gray-50 py-12">
          <div className="container mx-auto max-w-3xl px-4 text-center">
            <p className="text-lg text-gray-700">Feedback not found.</p>
            <Link to="/admin/feedbacks" className="mt-4 inline-block text-primary-600 hover:underline">
              Back to All Feedbacks
            </Link>
          </div>
        </main>
        
        <Footer />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar title="Respond to Feedback" />
      
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-8">
            <Link
              to="/admin/feedbacks"
              className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to All Feedbacks
            </Link>
            
            <h1 className="text-3xl font-bold text-gray-900">Respond to Feedback</h1>
            <p className="mt-2 text-lg text-gray-600">
              Provide a response to the user's feedback.
            </p>
          </div>
          
          <div className="space-y-6">
            <FeedbackCard feedback={feedback} />
            
            {responseSubmitted ? (
              <Card className="bg-success-50 p-6 text-center">
                <div className="mb-4 flex justify-center">
                  <CheckCircle className="h-12 w-12 text-success-500" />
                </div>
                <h2 className="text-xl font-semibold text-success-700">Response Submitted!</h2>
                <p className="mt-2 text-success-600">
                  Your response has been sent successfully.
                </p>
              </Card>
            ) : (
              <Card>
                <h2 className="mb-4 text-xl font-semibold text-gray-800">Your Response</h2>
                <ResponseForm feedback={feedback} onSuccess={handleSuccess} />
              </Card>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default RespondToFeedback;