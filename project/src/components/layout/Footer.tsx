import React from 'react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-50 py-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center md:flex-row md:justify-between">
          <p className="mb-4 text-sm text-gray-600 md:mb-0">
            © {currentYear} Feedback Management System. All rights reserved.
          </p>
          <div className="flex space-x-4">
            <a href="#" className="text-sm text-gray-600 hover:text-primary-500 transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-primary-500 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-sm text-gray-600 hover:text-primary-500 transition-colors">
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;