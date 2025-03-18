
import React, { useState } from 'react';
import { Navigate, Link } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';

const AdminTransfer = () => {
  const { user, loading, allUsers, transferFunds } = useAuth();
  const [selectedUserId, setSelectedUserId] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Redirect non-admin users
  if (!loading && (!user || !user.isAdmin)) {
    return <Navigate to="/dashboard" />;
  }

  // Show loading state while checking auth
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-center">
          <p className="text-xl font-medium text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!selectedUserId) {
      newErrors.user = 'Please select an investor';
    }
    
    if (!amount) {
      newErrors.amount = 'Amount is required';
    } else if (isNaN(Number(amount)) || Number(amount) <= 0) {
      newErrors.amount = 'Amount must be a positive number';
    }
    
    if (!description.trim()) {
      newErrors.description = 'Description is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Convert amount to number
      const numericAmount = Number(amount);
      
      const success = await transferFunds(selectedUserId, numericAmount, description);
      
      if (success) {
        // Reset form
        setSelectedUserId('');
        setAmount('');
        setDescription('');
      }
    } catch (error) {
      console.error('Transfer error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Get only non-admin users for the dropdown
  const investors = allUsers.filter(user => !user.isAdmin);

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <div className="py-4 px-6 flex justify-between items-center">
        <Link to="/dashboard" className="text-farm-primary font-semibold hover:text-farm-primary/90">
          ← Back to Dashboard
        </Link>
        <h1 className="text-xl font-bold">Admin Panel</h1>
      </div>
      
      <div className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Transfer Funds to Investor</CardTitle>
            <CardDescription>
              Add funds to an investor's account after they make a payment.
            </CardDescription>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="user">Select Investor</Label>
                <Select
                  value={selectedUserId}
                  onValueChange={setSelectedUserId}
                >
                  <SelectTrigger id="user" className={errors.user ? 'border-destructive' : ''}>
                    <SelectValue placeholder="Select an investor" />
                  </SelectTrigger>
                  <SelectContent>
                    {investors.map(investor => (
                      <SelectItem key={investor.id} value={investor.id}>
                        {investor.name} ({investor.email})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.user && (
                  <p className="text-destructive text-sm">{errors.user}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="amount">Amount (NGN)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="1"
                  step="1000"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder="Enter amount"
                  className={errors.amount ? 'border-destructive' : ''}
                />
                {errors.amount && (
                  <p className="text-destructive text-sm">{errors.amount}</p>
                )}
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="e.g., Bank Transfer, Cash Deposit"
                  className={errors.description ? 'border-destructive' : ''}
                />
                {errors.description && (
                  <p className="text-destructive text-sm">{errors.description}</p>
                )}
              </div>
            </CardContent>
            
            <CardFooter>
              <Button 
                type="submit" 
                className="w-full bg-farm-primary hover:bg-farm-primary/90"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Transfer...
                  </>
                ) : (
                  'Transfer Funds'
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AdminTransfer;
