import React, { useState } from 'react';
import { ArrowLeft, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFeedback } from '../../context/FeedbackContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import FeedbackCard from '../../components/feedback/FeedbackCard';
import Button from '../../components/ui/Button';

const AllFeedbacks: React.FC = () => {
  const { feedbacks, categories } = useFeedback();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  
  // Filter feedbacks based on selected filters
  const filteredFeedbacks = feedbacks.filter((feedback) => {
    const categoryMatch = selectedCategory === 'all' || feedback.category === selectedCategory;
    const statusMatch = selectedStatus === 'all' || feedback.status === selectedStatus;
    return categoryMatch && statusMatch;
  });

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar title="All Feedbacks" />
      
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto max-w-4xl px-4">
          <div className="mb-8">
            <Link
              to="/admin/dashboard"
              className="mb-6 inline-flex items-center text-sm font-medium text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Dashboard
            </Link>
            
            <h1 className="text-3xl font-bold text-gray-900">All Feedbacks</h1>
            <p className="mt-2 text-lg text-gray-600">
              Review and manage user feedback submissions.
            </p>
          </div>
          
          <div className="mb-6 rounded-lg bg-white p-4 shadow-md">
            <div className="flex flex-col space-y-4 sm:flex-row sm:items-center sm:space-y-0 sm:space-x-4">
              <div className="flex items-center">
                <Filter className="mr-2 h-4 w-4 text-gray-500" />
                <span className="mr-2 text-sm font-medium text-gray-700">Filters:</span>
              </div>
              
              <div className="flex flex-1 flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
                <select
                  className="input"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="all">All Categories</option>
                  {categories.map((category) => (
                    <option key={category.id} value={category.name}>
                      {category.name}
                    </option>
                  ))}
                </select>
                
                <select
                  className="input"
                  value={selectedStatus}
                  onChange={(e) => setSelectedStatus(e.target.value)}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="in-review">In Review</option>
                  <option value="accepted">Accepted</option>
                  <option value="rejected">Rejected</option>
                  <option value="implemented">Implemented</option>
                </select>
              </div>
            </div>
          </div>
          
          <div className="space-y-4">
            {filteredFeedbacks.length > 0 ? (
              filteredFeedbacks.map((feedback) => (
                <div key={feedback.id} className="relative">
                  <FeedbackCard 
                    feedback={feedback} 
                    showResponse={true}
                  />
                  <div className="absolute right-4 bottom-4">
                    <Link to={`/admin/respond/${feedback.id}`}>
                      <Button variant="outline" size="sm">
                        Respond
                      </Button>
                    </Link>
                  </div>
                </div>
              ))
            ) : (
              <div className="rounded-lg bg-white p-8 shadow-lg text-center">
                <p className="text-lg font-medium text-gray-700">
                  No feedback matches your filters.
                </p>
                <Button 
                  variant="outline" 
                  className="mt-4"
                  onClick={() => {
                    setSelectedCategory('all');
                    setSelectedStatus('all');
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AllFeedbacks;