
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
  referralCode?: string;
  referredBy?: string | null;
  balance: number;
  investments: Investment[];
}

interface Investment {
  id: string;
  plan: 'short' | 'medium' | 'long';
  amount: number;
  startDate: string;
  endDate: string;
  interestRate: number;
  exitBonus?: number;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string, referralCode?: string | null) => Promise<boolean>;
  logout: () => void;
  isLoggedIn: boolean;
  transferFunds: (userId: string, amount: number, description: string) => Promise<boolean>;
  allUsers: User[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock user data for demonstration
const mockUsers = [
  {
    id: '1',
    email: 'admin@farmly.ng',
    name: 'Admin User',
    password: 'password123',
    isAdmin: true,
    referralCode: 'ADMIN001',
    balance: 0,
    investments: [],
  },
  {
    id: '2',
    email: 'investor@example.com',
    name: 'Demo Investor',
    password: 'password123',
    isAdmin: false,
    referralCode: 'INV002',
    balance: 0,
    investments: [],
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<User[]>(mockUsers);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Check for existing user session on load
  useEffect(() => {
    const storedUser = localStorage.getItem('farmly_user');
    if (storedUser) {
      try {
        const parsedUser = JSON.parse(storedUser);
        setUser(parsedUser);
      } catch (error) {
        console.error('Failed to parse stored user', error);
        localStorage.removeItem('farmly_user');
      }
    }
    
    // Load all users from localStorage or use mockUsers
    const storedAllUsers = localStorage.getItem('farmly_all_users');
    if (storedAllUsers) {
      try {
        const parsedAllUsers = JSON.parse(storedAllUsers);
        setAllUsers(parsedAllUsers);
      } catch (error) {
        console.error('Failed to parse stored users', error);
        localStorage.setItem('farmly_all_users', JSON.stringify(mockUsers));
      }
    } else {
      localStorage.setItem('farmly_all_users', JSON.stringify(mockUsers));
    }
    
    setLoading(false);
  }, []);

  // Save all users to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('farmly_all_users', JSON.stringify(allUsers));
  }, [allUsers]);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API request delay
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = allUsers.find(
          (u) => u.email === email && u.password === password
        );

        if (foundUser) {
          // Omit password from stored user object
          const { password, ...userWithoutPassword } = foundUser;
          setUser(userWithoutPassword);
          localStorage.setItem('farmly_user', JSON.stringify(userWithoutPassword));
          
          toast({
            title: 'Login successful',
            description: `Welcome back, ${foundUser.name}!`,
          });
          
          setLoading(false);
          resolve(true);
        } else {
          toast({
            title: 'Login failed',
            description: 'Invalid email or password',
            variant: 'destructive',
          });
          
          setLoading(false);
          resolve(false);
        }
      }, 1000);
    });
  };

  const register = async (
    name: string, 
    email: string, 
    password: string, 
    referralCode?: string | null
  ): Promise<boolean> => {
    // Simulate API request delay
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if user with email already exists
        const existingUser = allUsers.find((u) => u.email === email);
        
        if (existingUser) {
          toast({
            title: 'Registration failed',
            description: 'An account with this email already exists',
            variant: 'destructive',
          });
          
          setLoading(false);
          resolve(false);
        } else {
          // Generate a unique referral code for the new user
          const uniqueReferralCode = `FM${Date.now().toString().slice(-6)}`;
          
          // In a real app, you would send this data to your API
          // For this demo, we'll just simulate a successful registration
          const newUser = {
            id: `user_${Date.now()}`,
            email,
            name,
            password, // In a real app, this would be hashed
            isAdmin: false,
            referralCode: uniqueReferralCode,
            referredBy: referralCode || null,
            balance: 0, // Starting balance is zero
            investments: [],
          };
          
          // Add new user to all users array
          const updatedUsers = [...allUsers, newUser];
          setAllUsers(updatedUsers);
          
          // Omit password from stored user object
          const { password: pwd, ...userWithoutPassword } = newUser;
          setUser(userWithoutPassword);
          localStorage.setItem('farmly_user', JSON.stringify(userWithoutPassword));
          
          // Show different toast if user was referred
          if (referralCode) {
            toast({
              title: 'Registration successful',
              description: 'Your account has been created with a referral code',
            });
          } else {
            toast({
              title: 'Registration successful',
              description: 'Your account has been created',
            });
          }
          
          setLoading(false);
          resolve(true);
        }
      }, 1500);
    });
  };

  const transferFunds = async (userId: string, amount: number, description: string): Promise<boolean> => {
    // Simulate API request delay
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Find the user to transfer funds to
        const userIndex = allUsers.findIndex((u) => u.id === userId);
        
        if (userIndex === -1) {
          toast({
            title: 'Transfer failed',
            description: 'User not found',
            variant: 'destructive',
          });
          
          setLoading(false);
          resolve(false);
          return;
        }
        
        // Create updated users array with the updated balance
        const updatedUsers = [...allUsers];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          balance: updatedUsers[userIndex].balance + amount
        };
        
        setAllUsers(updatedUsers);
        
        // Update current user if they are the recipient
        if (user && user.id === userId) {
          setUser({
            ...user,
            balance: user.balance + amount
          });
          localStorage.setItem('farmly_user', JSON.stringify({
            ...user,
            balance: user.balance + amount
          }));
        }
        
        toast({
          title: 'Transfer successful',
          description: `${amount.toLocaleString('en-NG', { style: 'currency', currency: 'NGN' })} has been transferred to ${updatedUsers[userIndex].name}.`,
        });
        
        setLoading(false);
        resolve(true);
      }, 1000);
    });
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('farmly_user');
    navigate('/');
    
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isLoggedIn: !!user,
        transferFunds,
        allUsers,
      }}
    >
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
