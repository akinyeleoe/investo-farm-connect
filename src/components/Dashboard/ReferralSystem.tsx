
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Users, Share2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const ReferralSystem = () => {
  const { toast } = useToast();
  const referralCode = 'FARM' + Math.random().toString(36).substring(2, 7).toUpperCase();
  
  const copyToClipboard = () => {
    navigator.clipboard.writeText(`https://farmly.ng/register?ref=${referralCode}`);
    toast({
      title: "Copied to clipboard",
      description: "Referral link has been copied to your clipboard",
    });
  };
  
  // Mock referral data
  const referrals = [
    { id: 1, name: 'John Doe', date: '2024-01-15', status: 'Active', bonus: 2500 },
    { id: 2, name: 'Jane Smith', date: '2024-02-03', status: 'Active', bonus: 2500 },
  ];

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Your Referral Program</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-muted p-4 rounded-lg">
            <h3 className="font-medium mb-2">How it works</h3>
            <p className="text-sm text-muted-foreground">
              Earn 5% of the investment amount when someone signs up using your referral code and makes an investment.
            </p>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium">Your Referral Code:</p>
              <span className="font-mono bg-farm-primary/10 text-farm-primary px-3 py-1 rounded-md">{referralCode}</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Input 
                value={`https://farmly.ng/register?ref=${referralCode}`}
                readOnly
                className="font-mono text-sm"
              />
              <Button 
                variant="outline" 
                size="icon"
                onClick={copyToClipboard}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6">
            <Button className="flex items-center gap-2">
              <Share2 className="h-4 w-4" /> Share via WhatsApp
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Share2 className="h-4 w-4" /> Share via Email
            </Button>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle>Your Referrals</CardTitle>
          <Users className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-8">
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">₦{referrals.reduce((sum, ref) => sum + ref.bonus, 0).toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">Total Referral Bonus</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="text-2xl font-bold">{referrals.length}</div>
                    <p className="text-xs text-muted-foreground">Total Referrals</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          
            {referrals.length > 0 ? (
              <div className="rounded-md border">
                <div className="grid grid-cols-4 p-4 text-xs font-medium text-muted-foreground">
                  <div>Name</div>
                  <div>Date</div>
                  <div>Status</div>
                  <div>Bonus</div>
                </div>
                {referrals.map((referral) => (
                  <div key={referral.id} className="grid grid-cols-4 items-center p-4 text-sm border-t">
                    <div>{referral.name}</div>
                    <div>{new Date(referral.date).toLocaleDateString()}</div>
                    <div>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">{referral.status}</span>
                    </div>
                    <div>₦{referral.bonus.toLocaleString()}</div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <Users className="w-12 h-12 mx-auto mb-3 opacity-20" />
                <p>No referrals yet</p>
                <p className="text-sm">Share your referral code to start earning</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReferralSystem;
