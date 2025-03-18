
import React from 'react';
import { Card, CardHeader, CardDescription, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface SummaryCardsProps {
  balance: number;
  investments: { amount: number }[];
  referralCode?: string;
}

const SummaryCards = ({ balance, investments, referralCode }: SummaryCardsProps) => {
  const { toast } = useToast();
  
  const copyReferralLink = () => {
    navigator.clipboard.writeText(`${window.location.origin}/register?ref=${referralCode}`);
    toast({
      title: "Copied",
      description: "Referral link copied to clipboard",
    });
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Available Balance</CardDescription>
          <CardTitle className="text-3xl font-bold">
            {balance.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
          </CardTitle>
        </CardHeader>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>Total Investments</CardDescription>
          <CardTitle className="text-3xl font-bold">
            {investments.reduce((total, inv) => total + inv.amount, 0).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
          </CardTitle>
        </CardHeader>
      </Card>
      
      <Card>
        <CardHeader className="pb-2">
          <CardDescription>My Referral Code</CardDescription>
          <CardTitle className="text-lg font-mono">
            {referralCode}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Button variant="outline" size="sm" className="w-full" onClick={copyReferralLink}>
            Copy Referral Link
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default SummaryCards;
