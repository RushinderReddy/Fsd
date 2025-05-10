import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import FeedbackForm from '../../components/feedback/FeedbackForm';
import Button from '../../components/ui/Button';

const GiveFeedback: React.FC = () => {
  const [submitted, setSubmitted] = React.useState(false);
  
  const handleSuccess = () => {
    setSubmitted(true);
    
    // Reset the form state after a delay
    setTimeout(() => {
      setSubmitted(false);
    }, 3000);
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar title="Submit Feedback" />
      
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
            
            <h1 className="text-3xl font-bold text-gray-900">Submit Feedback</h1>
            <p className="mt-2 text-lg text-gray-600">
              We value your input. Please share your thoughts or suggestions.
            </p>
          </div>
          
          {submitted ? (
            <div className="rounded-lg bg-success-50 p-6 text-center">
              <h2 className="text-xl font-semibold text-success-700">Feedback Submitted!</h2>
              <p className="mt-2 text-success-600">
                Thank you for your feedback. We'll review it shortly.
              </p>
              <div className="mt-4">
                <Button
                  variant="outline"
                  onClick={() => setSubmitted(false)}
                >
                  Submit Another Feedback
                </Button>
              </div>
            </div>
          ) : (
            <div className="rounded-lg bg-white p-6 shadow-lg">
              <FeedbackForm onSuccess={handleSuccess} />
            </div>
          )}
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default GiveFeedback;