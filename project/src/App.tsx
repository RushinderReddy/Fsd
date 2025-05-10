import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { FeedbackProvider } from './context/FeedbackContext';

// Pages
import Landing from './pages/Landing';
import Login from './pages/Login';
import Signup from './pages/Signup';
import AdminLogin from './pages/AdminLogin';

// User Pages
import UserDashboard from './pages/user/UserDashboard';
import GiveFeedback from './pages/user/GiveFeedback';
import MyFeedbacks from './pages/user/MyFeedbacks';
import ProductChanges from './pages/user/ProductChanges';

// Admin Pages
import AdminDashboard from './pages/admin/AdminDashboard';
import AllFeedbacks from './pages/admin/AllFeedbacks';
import ManageCategories from './pages/admin/ManageCategories';
import RespondToFeedback from './pages/admin/RespondToFeedback';
import ManageProductChanges from './pages/admin/ManageProductChanges';

// Protected route components
const ProtectedRoute: React.FC<{ 
  children: React.ReactNode; 
  requireAdmin?: boolean;
}> = ({ children, requireAdmin = false }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="flex h-screen items-center justify-center">Loading...</div>;
  }
  
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  
  if (requireAdmin && !user.isAdmin) {
    return <Navigate to="/user/dashboard" replace />;
  }
  
  return <>{children}</>;
};

function App() {
  return (
    <AuthProvider>
      <FeedbackProvider>
        <Router>
          <div className="page-transition">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Landing />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/admin/login" element={<AdminLogin />} />
              
              {/* User Routes */}
              <Route
                path="/user/dashboard"
                element={
                  <ProtectedRoute>
                    <UserDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/give-feedback"
                element={
                  <ProtectedRoute>
                    <GiveFeedback />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/my-feedbacks"
                element={
                  <ProtectedRoute>
                    <MyFeedbacks />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/user/product-changes"
                element={
                  <ProtectedRoute>
                    <ProductChanges />
                  </ProtectedRoute>
                }
              />
              
              {/* Admin Routes */}
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute requireAdmin>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/feedbacks"
                element={
                  <ProtectedRoute requireAdmin>
                    <AllFeedbacks />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/categories"
                element={
                  <ProtectedRoute requireAdmin>
                    <ManageCategories />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/respond/:feedbackId"
                element={
                  <ProtectedRoute requireAdmin>
                    <RespondToFeedback />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/product-changes"
                element={
                  <ProtectedRoute requireAdmin>
                    <ManageProductChanges />
                  </ProtectedRoute>
                }
              />
              
              {/* Catch all - redirect to landing */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </Router>
      </FeedbackProvider>
    </AuthProvider>
  );
}

export default App;