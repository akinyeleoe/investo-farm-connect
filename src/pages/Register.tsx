
import React from 'react';
import { Link, Navigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import AuthForm from '@/components/AuthForm';

const Register = () => {
  const { user } = useAuth();
  const [searchParams] = useSearchParams();
  const referralCode = searchParams.get('ref');

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
            <h1 className="text-3xl font-bold mb-2">Create your account</h1>
            <p className="text-muted-foreground">Start your investment journey with Farmly</p>
            
            {referralCode && (
              <div className="mt-4 p-3 bg-farm-primary/10 rounded-md">
                <p className="text-sm font-medium">
                  You've been referred with code: <span className="font-mono">{referralCode}</span>
                </p>
              </div>
            )}
          </div>
          
          <AuthForm type="register" referralCode={referralCode} />
          
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-farm-primary font-medium hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
