import React from 'react';
import { PenSquare, MessageSquare, CheckSquare } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import DashboardCard from '../../components/user/DashboardCard';

const UserDashboard: React.FC = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar title="User Dashboard" />
      
      <main className="flex-1 bg-gray-50 py-12">
        <div className="container mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Welcome to your Dashboard</h1>
            <p className="mt-2 text-lg text-gray-600">
              Manage your feedback and track product changes.
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <DashboardCard
              title="Give Feedback"
              description="Submit new feedback, suggestions, or report issues"
              icon={<PenSquare className="h-6 w-6 text-white" />}
              path="/user/give-feedback"
              color="bg-primary-500"
            />
            
            <DashboardCard
              title="View My Feedbacks"
              description="Check the status of your submitted feedback"
              icon={<MessageSquare className="h-6 w-6 text-white" />}
              path="/user/my-feedbacks"
              color="bg-secondary-500"
            />
            
            <DashboardCard
              title="Product Changes"
              description="See updates and improvements made from feedback"
              icon={<CheckSquare className="h-6 w-6 text-white" />}
              path="/user/product-changes"
              color="bg-accent-500"
            />
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default UserDashboard;