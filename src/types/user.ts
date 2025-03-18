export interface Investment {
  id: string;
  name: string;
  amount: number;
  date: string;
  roi: number;
  term: number;
  monthlyReturns?: { month: string; amount: number }[];
}

export interface PendingInvestment {
  id: string;
  planId: string;
  planName: string;
  amount: number;
  referenceCode: string;
  date: string;
  status: 'pending' | 'completed' | 'cancelled';
}

export interface User {
  id: string;
  name: string;
  email: string;
  isAdmin: boolean;
  referralCode: string;
  referredBy: string | null;
  balance: number;
  investments: Investment[];
  pendingInvestments?: PendingInvestment[];
}

export interface UserWithPassword extends User {
  password: string;
}
