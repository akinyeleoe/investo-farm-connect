
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EarningsTracker from './EarningsTracker';
import PayoutRequests from './PayoutRequests';
import ReferralSystem from './ReferralSystem';
import { Link } from 'react-router-dom';

const InvestorDashboard = () => {
  const { user, logout } = useAuth();
  
  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome, {user.name}</h1>
          <p className="text-muted-foreground">Manage your investments and payouts</p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          {user.isAdmin && (
            <Button asChild variant="outline">
              <Link to="/admin/transfer">Admin Transfer</Link>
            </Button>
          )}
          <Button variant="outline" onClick={logout}>Sign Out</Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Available Balance</CardDescription>
            <CardTitle className="text-3xl font-bold">
              {user.balance.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Investments</CardDescription>
            <CardTitle className="text-3xl font-bold">
              {user.investments.reduce((total, inv) => total + inv.amount, 0).toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })}
            </CardTitle>
          </CardHeader>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>My Referral Code</CardDescription>
            <CardTitle className="text-lg font-mono">
              {user.referralCode}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button variant="outline" size="sm" className="w-full" onClick={() => {
              navigator.clipboard.writeText(`${window.location.origin}/register?ref=${user.referralCode}`);
              // Show toast notification that the link was copied
            }}>
              Copy Referral Link
            </Button>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="earnings" className="w-full">
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
        </TabsList>
        
        <TabsContent value="earnings" className="space-y-4">
          <EarningsTracker />
        </TabsContent>
        
        <TabsContent value="payouts" className="space-y-4">
          <PayoutRequests />
        </TabsContent>
        
        <TabsContent value="referrals" className="space-y-4">
          <ReferralSystem />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestorDashboard;
