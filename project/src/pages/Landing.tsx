import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MessageSquare } from 'lucide-react';
import Button from '../components/ui/Button';
import Footer from '../components/layout/Footer';

const Landing: React.FC = () => {
  const navigate = useNavigate();
  
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex flex-1 flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100 px-4 py-16 text-center sm:px-6 lg:px-8">
        <div className="animate-fade-in max-w-md">
          <div className="mb-8 flex justify-center">
            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary-500 text-white shadow-lg">
              <MessageSquare size={48} />
            </div>
          </div>
          
          <h1 className="mb-6 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
            Feedback Management System
          </h1>
          
          <p className="mb-10 text-xl text-gray-600">
            A simple and effective way to collect, manage, and respond to user feedback.
          </p>
          
          <Button 
            size="lg" 
            onClick={() => navigate('/login')}
            className="animate-pulse px-8 py-3 text-lg"
          >
            Get Started
          </Button>
          
          <p className="mt-4 text-sm text-gray-500">
            Already have an account? <a href="/login" className="font-medium text-primary-600 hover:text-primary-500">Log in</a>
          </p>
        </div>
      </main>
      
      <section className="bg-white py-16">
        <div className="container mx-auto px-4">
          <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">How It Works</h2>
          
          <div className="grid gap-8 md:grid-cols-3">
            <div className="slide-up-animation flex flex-col items-center text-center">
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary-100 text-primary-600">
                <span className="text-2xl font-bold">1</span>
              </div>
              <h3 className="mb-2 text-xl font-medium">Submit Feedback</h3>
              <p className="text-gray-600">Share your ideas, report issues, or suggest improvements.</p>
            </div>
            
            <div className="slide-up-animation flex flex-col items-center text-center" style={{ animationDelay: '100ms' }}>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary-100 text-secondary-600">
                <span className="text-2xl font-bold">2</span>
              </div>
              <h3 className="mb-2 text-xl font-medium">Track Progress</h3>
              <p className="text-gray-600">Follow the status of your submitted feedback.</p>
            </div>
            
            <div className="slide-up-animation flex flex-col items-center text-center" style={{ animationDelay: '200ms' }}>
              <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-accent-100 text-accent-600">
                <span className="text-2xl font-bold">3</span>
              </div>
              <h3 className="mb-2 text-xl font-medium">See Results</h3>
              <p className="text-gray-600">View product changes implemented based on your feedback.</p>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Landing;