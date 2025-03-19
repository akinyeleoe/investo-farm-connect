
import React, { createContext, useContext } from 'react';
import { useAuthProvider } from '@/hooks/useAuthProvider';
import { User, PendingInvestment } from '@/types/user';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, referralCode?: string | null) => Promise<boolean>;
  logout: () => void;
  resetPassword: (email: string) => Promise<boolean>;
  updatePassword: (email: string, newPassword: string) => Promise<boolean>;
  isLoggedIn: boolean;
  transferFunds: (userId: string, amount: number, description: string) => Promise<boolean>;
  addPendingInvestment: (pendingInvestment: Omit<PendingInvestment, 'id'>) => Promise<boolean>;
  allUsers: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const auth = useAuthProvider();

  return (
    <AuthContext.Provider value={auth}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
