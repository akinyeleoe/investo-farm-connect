
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { Loader2 } from 'lucide-react';

const PasswordReset = () => {
  const [email, setEmail] = useState('');
  const [resetSent, setResetSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !/\S+@\S+\.\S+/.test(email)) {
      toast({
        title: 'Invalid email',
        description: 'Please enter a valid email address',
        variant: 'destructive',
      });
      return;
    }

    setSubmitting(true);
    
    // Simulating password reset email
    setTimeout(() => {
      setResetSent(true);
      setSubmitting(false);
      toast({
        title: 'Reset link sent',
        description: 'If an account exists with this email, you will receive password reset instructions.',
      });
    }, 1500);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="py-4 px-6">
        <Link to="/login" className="text-farm-primary font-semibold hover:text-farm-primary/90">
          ← Back to Login
        </Link>
      </div>
      
      <div className="flex-grow flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold mb-2">Reset Password</h1>
            <p className="text-muted-foreground">
              {resetSent 
                ? 'Check your email for reset instructions' 
                : 'Enter your email to receive a password reset link'}
            </p>
          </div>
          
          {!resetSent ? (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  required
                />
              </div>
              
              <Button 
                type="submit" 
                className="w-full rounded-full bg-farm-primary hover:bg-farm-primary/90"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending reset link...
                  </>
                ) : (
                  'Send Reset Link'
                )}
              </Button>
            </form>
          ) : (
            <div className="text-center space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4 text-green-800">
                <p>We've sent a password reset link to <strong>{email}</strong></p>
                <p className="text-sm mt-2">Don't see it? Check your spam folder.</p>
              </div>
              
              <Button 
                onClick={() => setResetSent(false)}
                variant="outline" 
                className="mt-4"
              >
                Try another email
              </Button>
            </div>
          )}
          
          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Remember your password?{' '}
              <Link to="/login" className="text-farm-primary font-medium hover:underline">
                Back to login
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PasswordReset;
