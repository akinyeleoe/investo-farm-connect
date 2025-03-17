
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  TrendingUp,
  DollarSign,
  Calendar,
  Users,
  Bell,
  Settings,
} from 'lucide-react';
import EarningsTracker from './EarningsTracker';
import PayoutRequests from './PayoutRequests';
import ReferralSystem from './ReferralSystem';

// Mock investment data
const mockInvestments = [
  {
    id: 'inv-001',
    type: 'Short-Term Plan',
    amount: 500000,
    startDate: '2023-12-01',
    endDate: '2024-12-01',
    status: 'active',
    monthlyReturn: 15000,
    totalReturn: 180000,
    nextPayout: '2024-03-01',
  },
  {
    id: 'inv-002',
    type: 'Medium-Term Plan',
    amount: 300000,
    startDate: '2023-09-15',
    endDate: '2025-09-15',
    status: 'active',
    monthlyReturn: 9000,
    totalReturn: 216000,
    nextPayout: '2024-03-15',
  },
];

const InvestorDashboard = () => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  // Calculate total investment
  const totalInvestment = mockInvestments.reduce((acc, inv) => acc + inv.amount, 0);
  
  // Calculate earnings to date (30% of the way through for demo purposes)
  const earningsToDate = mockInvestments.reduce(
    (acc, inv) => acc + (inv.monthlyReturn * 3), 0
  );
  
  // Calculate next payout amount
  const nextPayoutAmount = mockInvestments.reduce(
    (acc, inv) => acc + inv.monthlyReturn, 0
  );

  return (
    <div className="space-y-8 animate-fade-in">
      <div className="flex flex-col">
        <h2 className="text-3xl font-bold mb-2">Welcome, {user?.name}</h2>
        <p className="text-muted-foreground">
          Here's an overview of your investments and earnings.
        </p>
      </div>

      <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-5 h-auto">
          <TabsTrigger value="overview" className="py-2.5">Overview</TabsTrigger>
          <TabsTrigger value="earnings">Earnings</TabsTrigger>
          <TabsTrigger value="payouts">Payouts</TabsTrigger>
          <TabsTrigger value="referrals">Referrals</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6 mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="hover-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Total Investment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <DollarSign className="w-4 h-4 text-farm-primary mr-2" />
                  <span className="text-2xl font-bold">
                    ₦{totalInvestment.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Earnings to Date
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <TrendingUp className="w-4 h-4 text-farm-primary mr-2" />
                  <span className="text-2xl font-bold">
                    ₦{earningsToDate.toLocaleString()}
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="hover-card">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  Next Payout
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-farm-primary mr-2" />
                  <span className="text-2xl font-bold">
                    ₦{nextPayoutAmount.toLocaleString()}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Expected on March 1, 2024
                </p>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Your Investments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockInvestments.map((investment) => (
                  <div
                    key={investment.id}
                    className="border rounded-lg p-4 hover:border-farm-primary transition-colors"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-semibold">{investment.type}</h3>
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full uppercase">
                        {investment.status}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div>
                        <p className="text-muted-foreground">Investment Amount</p>
                        <p className="font-medium">₦{investment.amount.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Monthly Return</p>
                        <p className="font-medium">₦{investment.monthlyReturn.toLocaleString()}</p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">Start Date</p>
                        <p className="font-medium">
                          {new Date(investment.startDate).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-muted-foreground">End Date</p>
                        <p className="font-medium">
                          {new Date(investment.endDate).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Activities</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-start gap-4">
                    <div className="bg-farm-primary/10 p-2 rounded-full">
                      <DollarSign className="h-4 w-4 text-farm-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Monthly Interest Paid</p>
                      <p className="text-muted-foreground text-sm">
                        You received ₦24,000 in your account
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Feb 1, 2024 • 10:45 AM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-farm-primary/10 p-2 rounded-full">
                      <Bell className="h-4 w-4 text-farm-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Upcoming Payout Reminder</p>
                      <p className="text-muted-foreground text-sm">
                        Your next payout of ₦24,000 is scheduled
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Feb 28, 2024 • 9:15 AM
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-farm-primary/10 p-2 rounded-full">
                      <Users className="h-4 w-4 text-farm-primary" />
                    </div>
                    <div>
                      <p className="font-medium">New Referral</p>
                      <p className="text-muted-foreground text-sm">
                        John Doe registered using your referral code
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Feb 15, 2024 • 2:30 PM
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Investment Summary</CardTitle>
              </CardHeader>
              <CardContent className="px-2">
                <div className="space-y-4">
                  <div className="flex justify-between items-center px-2">
                    <span className="text-muted-foreground">Total Invested</span>
                    <span className="font-medium">₦800,000</span>
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <span className="text-muted-foreground">Expected Annual Return</span>
                    <span className="font-medium">₦288,000</span>
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <span className="text-muted-foreground">Expected Monthly Return</span>
                    <span className="font-medium">₦24,000</span>
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <span className="text-muted-foreground">Earnings to Date</span>
                    <span className="font-medium">₦72,000</span>
                  </div>
                  <div className="flex justify-between items-center px-2">
                    <span className="text-muted-foreground">Referral Earnings</span>
                    <span className="font-medium">₦0</span>
                  </div>

                  <div className="border-t pt-4 mt-4 px-2">
                    <div className="flex justify-between items-center font-semibold">
                      <span>Total Earnings</span>
                      <span className="text-farm-primary">₦72,000</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="earnings" className="mt-6">
          <EarningsTracker investments={mockInvestments} />
        </TabsContent>

        <TabsContent value="payouts" className="mt-6">
          <PayoutRequests />
        </TabsContent>

        <TabsContent value="referrals" className="mt-6">
          <ReferralSystem />
        </TabsContent>

        <TabsContent value="settings" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Account Settings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Account settings functionality will be implemented in the next phase.
              </p>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default InvestorDashboard;
