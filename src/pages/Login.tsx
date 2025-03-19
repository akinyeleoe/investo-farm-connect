
import React from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AuthForm from '@/components/AuthForm';
import { Button } from '@/components/ui/button';

const Login = () => {
  const { user } = useAuth();

  // If user is already logged in, redirect to dashboard
  if (user) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="py-4 px-6">
        <Link to="/" className="text-farm-primary font-semibold hover:text-farm-primary/90">
          ← Back to Home
        </Link>
      </div>
      
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Welcome back</h1>
            <p className="text-muted-foreground">Sign in to your Farmly account</p>
          </div>
          
          <AuthForm type="login" />
          
          <div className="mt-4 text-center">
            <Link 
              to="/password-reset" 
              className="text-sm text-muted-foreground hover:text-farm-primary hover:underline"
            >
              Forgot your password?
            </Link>
          </div>
          
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Don't have an account?{' '}
              <Link to="/register" className="text-farm-primary font-medium hover:underline">
                Create one
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
