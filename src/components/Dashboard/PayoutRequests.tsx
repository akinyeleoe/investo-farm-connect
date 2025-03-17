
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/components/ui/use-toast';
import { PlusCircle, Loader2 } from 'lucide-react';

// Mock payout history data
const mockPayoutHistory = [
  {
    id: 'payout-001',
    amount: 24000,
    date: '2024-02-01',
    status: 'completed',
    reference: 'REF-24-02-001',
  },
  {
    id: 'payout-002',
    amount: 24000,
    date: '2024-01-01',
    status: 'completed',
    reference: 'REF-24-01-001',
  },
  {
    id: 'payout-003',
    amount: 24000,
    date: '2023-12-01',
    status: 'completed',
    reference: 'REF-23-12-001',
  },
];

const PayoutRequests = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [bankName, setBankName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');
  const [amount, setAmount] = useState('24000');
  const { toast } = useToast();

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!bankName || !accountNumber || !accountName || !amount) {
      toast({
        title: 'Error',
        description: 'Please fill out all fields',
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API request
    setTimeout(() => {
      toast({
        title: 'Payout Request Submitted',
        description: 'Your payout request has been submitted and is being processed.',
      });
      
      setIsSubmitting(false);
      setIsDialogOpen(false);
      
      // Reset form
      setBankName('');
      setAccountNumber('');
      setAccountName('');
      setAmount('24000');
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Payout Requests</h2>
          <p className="text-muted-foreground">
            Request payouts for your investment earnings
          </p>
        </div>
        
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="bg-farm-primary hover:bg-farm-primary/90">
              <PlusCircle className="h-4 w-4 mr-2" />
              Request Payout
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Request Payout</DialogTitle>
              <DialogDescription>
                Enter your bank details to receive your payout.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmitRequest}>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="bank-name">Bank Name</Label>
                  <Input
                    id="bank-name"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    placeholder="Enter your bank name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-number">Account Number</Label>
                  <Input
                    id="account-number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    placeholder="Enter your account number"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-name">Account Name</Label>
                  <Input
                    id="account-name"
                    value={accountName}
                    onChange={(e) => setAccountName(e.target.value)}
                    placeholder="Enter your account name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (₦)</Label>
                  <Input
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="Enter the amount"
                  />
                  <p className="text-xs text-muted-foreground">
                    Available balance: ₦24,000
                  </p>
                </div>
              </div>
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => setIsDialogOpen(false)}
                  disabled={isSubmitting}
                >
                  Cancel
                </Button>
                <Button 
                  type="submit" 
                  className="bg-farm-primary hover:bg-farm-primary/90"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    'Submit Request'
                  )}
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Payout History</CardTitle>
        </CardHeader>
        <CardContent>
          {mockPayoutHistory.length > 0 ? (
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-sm">Date</th>
                    <th className="px-4 py-3 text-right font-medium text-sm">Amount</th>
                    <th className="px-4 py-3 text-center font-medium text-sm">Status</th>
                    <th className="px-4 py-3 text-left font-medium text-sm">Reference</th>
                  </tr>
                </thead>
                <tbody>
                  {mockPayoutHistory.map((payout) => (
                    <tr key={payout.id} className="border-t">
                      <td className="px-4 py-3 text-sm">
                        {new Date(payout.date).toLocaleDateString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-right">
                        ₦{payout.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-center">
                        <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                          {payout.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm">{payout.reference}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No payout history available yet.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Payouts</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="border rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h3 className="font-semibold">March 2024 Payout</h3>
                <p className="text-sm text-muted-foreground">
                  Scheduled for March 1, 2024
                </p>
              </div>
              <div className="text-xl font-bold">₦24,000</div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-muted-foreground">
                Your next payout will be processed automatically. Make sure your bank details are up to date.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PayoutRequests;
