
import React from 'react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/context/AuthContext';
import { Link } from 'react-router-dom';

interface DashboardHeaderProps {
  userName: string;
  isAdmin: boolean;
  onLogout: () => void;
}

const DashboardHeader = ({ userName, isAdmin, onLogout }: DashboardHeaderProps) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold mb-1">Welcome, {userName}</h1>
        <p className="text-muted-foreground">Manage your investments and payouts</p>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-3">
        {isAdmin && (
          <>
            <Button asChild variant="outline">
              <Link to="/admin/dashboard">Admin Dashboard</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to="/admin/transfer">Admin Transfer</Link>
            </Button>
          </>
        )}
        <Button variant="outline" onClick={onLogout}>Sign Out</Button>
      </div>
    </div>
  );
};

export default DashboardHeader;
