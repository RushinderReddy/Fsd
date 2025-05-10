import React, { useState } from 'react';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFeedback } from '../../context/FeedbackContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import ProductChangeForm from '../../components/admin/ProductChangeForm';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const ManageProductChanges: React.FC = () => {
  const { productChanges, feedbacks } = useFeedback();
  const [showForm, setShowForm] = useState(false);
  
  // Filter feedbacks that can be associated with product changes
  // (typically accepted or in-review feedbacks)
  const eligibleFeedbacks = feedbacks.filter(
    (feedback) => feedback.status === 'accepted' || feedback.status === 'in-review'
  );

  // Status badge configuration
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'planned':
        return 'bg-gray-100 text-gray-800';
      case 'in-progress':
        return 'bg-secondary-100 text-secondary-800';
      case 'completed':
        return 'bg-accent-100 text-accent-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar title="Manage Product Changes" />
      
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto max-w-3xl px-4">
          <div className="mb-8">
            <Link
              to="/admin/dashboard"
              className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
            
            <div className="flex items-center justify-between">
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Product Changes</h1>
                <p className="mt-2 text-lg text-gray-600">
                  Manage updates and improvements based on user feedback.
                </p>
              </div>
              
              <Button
                onClick={() => setShowForm(!showForm)}
                className="flex items-center space-x-1"
              >
                {showForm ? (
                  <>
                    <X className="h-4 w-4" />
                    <span>Cancel</span>
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" />
                    <span>Add Change</span>
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {showForm && (
            <Card className="mb-6 animate-slide-up">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">Add Product Change</h2>
              <ProductChangeForm 
                feedbacks={eligibleFeedbacks} 
                onSuccess={() => setShowForm(false)} 
              />
            </Card>
          )}
          
          <div className="space-y-4">
            {productChanges.map((change) => {
              const statusClass = getStatusClass(change.status);
              const formattedDate = new Date(change.updatedAt).toLocaleDateString();
              
              return (
                <Card key={change.id} className="overflow-hidden">
                  <div className="flex items-start justify-between">
                    <h3 className="text-lg font-medium text-gray-900">{change.title}</h3>
                    <span className={`rounded-full px-2.5 py-1 text-xs font-medium ${statusClass}`}>
                      {change.status.charAt(0).toUpperCase() + change.status.slice(1).replace('-', ' ')}
                    </span>
                  </div>
                  
                  <p className="mt-3 text-sm text-gray-600">{change.description}</p>
                  
                  <div className="mt-4 flex flex-wrap items-center justify-between text-xs text-gray-500">
                    <span>Last updated: {formattedDate}</span>
                    <span>{change.feedbackIds.length} associated {change.feedbackIds.length === 1 ? 'feedback' : 'feedbacks'}</span>
                  </div>
                </Card>
              );
            })}
            
            {productChanges.length === 0 && (
              <div className="rounded-lg bg-white p-8 shadow-lg text-center">
                <p className="text-lg font-medium text-gray-700">
                  No product changes have been added yet.
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

export default ManageProductChanges;