import React from 'react';
import { MessageCircle, FileText, Send, CodeSquare } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import DashboardCard from '../../components/user/DashboardCard';

const AdminDashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar title="Admin Dashboard" />
      
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="mt-2 text-lg text-gray-600">
              Manage feedback and product updates.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <DashboardCard
              title="View All Feedbacks"
              description="See all user feedback submissions"
              icon={<MessageCircle className="h-6 w-6 text-white" />}
              path="/admin/feedbacks"
              color="bg-primary-500"
            />
            
            <DashboardCard
              title="Add New Category"
              description="Create new feedback categories"
              icon={<FileText className="h-6 w-6 text-white" />}
              path="/admin/categories"
              color="bg-secondary-500"
            />
            
            <DashboardCard
              title="Respond to Feedback"
              description="Reply to user feedback submissions"
              icon={<Send className="h-6 w-6 text-white" />}
              path="/admin/respond"
              color="bg-accent-500"
            />
            
            <DashboardCard
              title="Manage Product Changes"
              description="Track and update product improvements"
              icon={<CodeSquare className="h-6 w-6 text-white" />}
              path="/admin/product-changes"
              color="bg-warning-500"
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default AdminDashboard;