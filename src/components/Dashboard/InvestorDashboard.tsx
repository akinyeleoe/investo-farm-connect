
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import DashboardHeader from './DashboardHeader';
import SummaryCards from './SummaryCards';
import DashboardTabs from './DashboardTabs';

const InvestorDashboard = () => {
  const { user, logout } = useAuth();
  
  if (!user) {
    return null;
  }

  return (
    <div className="space-y-8">
      <DashboardHeader 
        userName={user.name}
        isAdmin={user.isAdmin}
        onLogout={logout}
      />
      
      <SummaryCards
        balance={user.balance}
        investments={user.investments}
        referralCode={user.referralCode}
      />
      
      <DashboardTabs investments={user.investments} />
    </div>
  );
};

export default InvestorDashboard;
