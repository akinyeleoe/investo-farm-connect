
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import EarningsTracker from './EarningsTracker';
import PayoutRequests from './PayoutRequests';
import ReferralSystem from './ReferralSystem';
import InvestmentPurchase from './InvestmentPurchase';
import { Investment } from '@/types/user';

interface DashboardTabsProps {
  investments: Investment[];
}

const DashboardTabs = ({ investments }: DashboardTabsProps) => {
  return (
    <Tabs defaultValue="earnings" className="w-full">
      <TabsList className="grid grid-cols-4 mb-4">
        <TabsTrigger value="earnings">Earnings</TabsTrigger>
        <TabsTrigger value="invest">Invest</TabsTrigger>
        <TabsTrigger value="payouts">Payouts</TabsTrigger>
        <TabsTrigger value="referrals">Referrals</TabsTrigger>
      </TabsList>
      
      <TabsContent value="earnings" className="space-y-4">
        <EarningsTracker investments={investments} />
      </TabsContent>
      
      <TabsContent value="invest" className="space-y-4">
        <InvestmentPurchase />
      </TabsContent>
      
      <TabsContent value="payouts" className="space-y-4">
        <PayoutRequests />
      </TabsContent>
      
      <TabsContent value="referrals" className="space-y-4">
        <ReferralSystem />
      </TabsContent>
    </Tabs>
  );
};

export default DashboardTabs;
