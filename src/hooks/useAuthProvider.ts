import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';
import { mockUsers } from '@/data/mockUsers';
import { User, UserWithPassword, PendingInvestment } from '@/types/user';

export const useAuthProvider = () => {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<UserWithPassword[]>(mockUsers);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

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

  useEffect(() => {
    localStorage.setItem('farmly_all_users', JSON.stringify(allUsers));
  }, [allUsers]);

  const login = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = allUsers.find(
          (u) => u.email === email && u.password === password
        );

        if (foundUser) {
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
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
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
          const uniqueReferralCode = `FM${Date.now().toString().slice(-6)}`;
          
          const newUser: UserWithPassword = {
            id: `user_${Date.now()}`,
            email,
            name,
            password,
            isAdmin: false,
            referralCode: uniqueReferralCode,
            referredBy: referralCode || null,
            balance: 0,
            investments: [],
          };
          
          const updatedUsers = [...allUsers, newUser];
          setAllUsers(updatedUsers);
          
          const { password: pwd, ...userWithoutPassword } = newUser;
          setUser(userWithoutPassword);
          localStorage.setItem('farmly_user', JSON.stringify(userWithoutPassword));
          
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
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
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
        
        const updatedUsers = [...allUsers];
        updatedUsers[userIndex] = {
          ...updatedUsers[userIndex],
          balance: updatedUsers[userIndex].balance + amount
        };
        
        setAllUsers(updatedUsers);
        
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

  const addPendingInvestment = async (pendingInvestment: Omit<PendingInvestment, 'id'>): Promise<boolean> => {
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        if (!user) {
          toast({
            title: 'Error',
            description: 'You must be logged in to make an investment',
            variant: 'destructive',
          });
          setLoading(false);
          resolve(false);
          return;
        }
        
        const newPendingInvestment: PendingInvestment = {
          id: `pending_${Date.now()}`,
          ...pendingInvestment,
        };
        
        const updatedUser = {
          ...user,
          pendingInvestments: [...(user.pendingInvestments || []), newPendingInvestment],
        };
        
        setUser(updatedUser);
        localStorage.setItem('farmly_user', JSON.stringify(updatedUser));
        
        const userIndex = allUsers.findIndex((u) => u.id === user.id);
        if (userIndex !== -1) {
          const updatedUsers = [...allUsers];
          updatedUsers[userIndex] = {
            ...updatedUsers[userIndex],
            pendingInvestments: [...(updatedUsers[userIndex].pendingInvestments || []), newPendingInvestment],
          };
          setAllUsers(updatedUsers);
          localStorage.setItem('farmly_all_users', JSON.stringify(updatedUsers));
        }
        
        toast({
          title: 'Investment initiated',
          description: 'Your investment has been recorded. Please complete the bank transfer.',
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

  const getUsersWithoutPasswords = () => {
    return allUsers.map(({ password, ...rest }) => rest);
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isLoggedIn: !!user,
    transferFunds,
    addPendingInvestment,
    allUsers: getUsersWithoutPasswords(),
  };
};
