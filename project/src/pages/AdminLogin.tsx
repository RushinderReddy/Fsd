import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { MessageSquare, AlertCircle, ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';
import Footer from '../components/layout/Footer';

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const { login, user } = useAuth();
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Redirect if already logged in
  React.useEffect(() => {
    if (user) {
      navigate(user.isAdmin ? '/admin/dashboard' : '/user/dashboard');
    }
  }, [user, navigate]);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!username || !password) {
      setError('Please enter both username and password');
      return;
    }
    
    setIsLoading(true);
    
    try {
      await login(username, password, true);
      // Navigation will happen in the useEffect above
    } catch (error) {
      setError('Invalid admin credentials');
      setIsLoading(false);
    }
  };
  
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md">
          <div className="text-center">
            <div className="mb-5 flex justify-center">
              <div className="relative">
                <MessageSquare className="h-12 w-12 text-primary-500" />
                <ShieldCheck className="absolute -bottom-1 -right-1 h-6 w-6 text-secondary-500" />
              </div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900">Admin Login</h2>
            <p className="mt-2 text-sm text-gray-600">
              <Link to="/login" className="font-medium text-primary-600 hover:text-primary-500">
                Back to user login
              </Link>
            </p>
          </div>
          
          <div className="mt-8">
            {error && (
              <div className="mb-4 rounded-md bg-error-50 p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertCircle className="h-5 w-5 text-error-500" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-error-700">{error}</p>
                  </div>
                </div>
              </div>
            )}
            
            <div className="rounded-lg bg-white py-8 px-4 shadow sm:px-10">
              <form className="space-y-6" onSubmit={handleSubmit}>
                <Input
                  label="Admin Username"
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  required
                />
                
                <Input
                  label="Password"
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />
                
                <div>
                  <Button
                    type="submit"
                    variant="secondary"
                    fullWidth
                    disabled={isLoading}
                  >
                    {isLoading ? 'Logging in...' : 'Admin Login'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AdminLogin;