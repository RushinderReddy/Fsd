import React from 'react';
import { ArrowLeft, Clock, CheckCircle, Activity } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFeedback } from '../../context/FeedbackContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import Card from '../../components/ui/Card';

const ProductChanges: React.FC = () => {
  const { productChanges } = useFeedback();
  
  // Status badge configuration
  const statusConfig = {
    planned: {
      icon: <Clock className="h-4 w-4" />,
      text: 'Planned',
      color: 'bg-warning-500 text-white',
    },
    'in-progress': {
      icon: <Activity className="h-4 w-4" />,
      text: 'In Progress',
      color: 'bg-secondary-500 text-white',
    },
    completed: {
      icon: <CheckCircle className="h-4 w-4" />,
      text: 'Completed',
      color: 'bg-accent-500 text-white',
    },
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar title="Product Changes" />
      
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
            
            <h1 className="text-3xl font-bold text-gray-900">Product Changes</h1>
            <p className="mt-2 text-lg text-gray-600">
              View updates and improvements made based on user feedback.
            </p>
          </div>
          
          <div className="space-y-6">
            {productChanges.length > 0 ? (
              productChanges.map((change) => {
                const status = statusConfig[change.status];
                const formattedDate = new Date(change.updatedAt).toLocaleDateString();
                
                return (
                  <Card key={change.id} className="overflow-hidden">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{change.title}</h3>
                        <div className="mt-1 text-xs text-gray-500">
                          Last updated: {formattedDate}
                        </div>
                      </div>
                      <div className={`flex items-center space-x-1 rounded-full px-2.5 py-1 text-xs font-medium ${status.color}`}>
                        {status.icon}
                        <span>{status.text}</span>
                      </div>
                    </div>
                    
                    <p className="mt-3 text-sm text-gray-600">{change.description}</p>
                    
                    {change.feedbackIds.length > 0 && (
                      <div className="mt-4 text-xs text-gray-500">
                        Based on {change.feedbackIds.length} user {change.feedbackIds.length === 1 ? 'feedback' : 'feedbacks'}
                      </div>
                    )}
                  </Card>
                );
              })
            ) : (
              <div className="rounded-lg bg-white p-8 shadow-lg text-center">
                <p className="text-lg font-medium text-gray-700">
                  No product changes available at the moment.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ProductChanges;