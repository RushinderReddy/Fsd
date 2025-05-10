import React, { useState } from 'react';
import { ArrowLeft, Plus, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFeedback } from '../../context/FeedbackContext';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import CategoryForm from '../../components/admin/CategoryForm';
import Button from '../../components/ui/Button';
import Card from '../../components/ui/Card';

const ManageCategories: React.FC = () => {
  const { categories } = useFeedback();
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar title="Manage Categories" />
      
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
                <h1 className="text-3xl font-bold text-gray-900">Feedback Categories</h1>
                <p className="mt-2 text-lg text-gray-600">
                  Manage the categories users can select when submitting feedback.
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
                    <span>Add Category</span>
                  </>
                )}
              </Button>
            </div>
          </div>
          
          {showForm && (
            <Card className="mb-6 animate-slide-up">
              <h2 className="mb-4 text-xl font-semibold text-gray-800">Add New Category</h2>
              <CategoryForm onSuccess={() => setShowForm(false)} />
            </Card>
          )}
          
          <div className="space-y-4">
            {categories.map((category) => (
              <Card key={category.id} className="overflow-hidden">
                <h3 className="text-lg font-medium text-gray-900">{category.name}</h3>
                <p className="mt-2 text-sm text-gray-600">{category.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ManageCategories;