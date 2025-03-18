
export interface Investment {
  id: string;
  plan: 'short' | 'medium' | 'long';
  amount: number;
  startDate: string;
  endDate: string;
  interestRate: number;
  exitBonus?: number;
  monthlyReturn?: number;
  totalReturn?: number;
  nextPayout?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  referralCode?: string;
  referredBy?: string | null;
  balance: number;
  investments: Investment[];
}

export interface UserWithPassword extends User {
  password: string;
}
