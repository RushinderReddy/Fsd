import React from 'react';
import { MessageSquare } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import Button from '../common/Button';
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const navigate = useNavigate();
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <header className="bg-white shadow-sm">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2" onClick={() => navigate('/')} style={{ cursor: 'pointer' }}>
          <MessageSquare className="h-8 w-8 text-blue-600" />
          <h1 className="text-xl font-bold text-gray-900">FeedbackHub</h1>
        </div>
        
        {user ? (
          <div className="flex items-center space-x-4">
            <div className="text-sm text-gray-700">
              Hello, <span className="font-medium">{user.username}</span>
              <span className="ml-2 px-2 py-1 text-xs font-medium rounded-full bg-blue-100 text-blue-800">
                {isAdmin ? 'Admin' : 'User'}
              </span>
            </div>
            <Button variant="outline" size="sm" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        ) : (
          <Button variant="primary" size="sm" onClick={() => navigate('/login')}>
            Login
          </Button>
        )}
      </div>
    </header>
  );
};

export default Header;