
import { User, UserWithPassword, PendingInvestment } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';

export const useFinancialOperations = (
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  allUsers: UserWithPassword[],
  setAllUsers: React.Dispatch<React.SetStateAction<UserWithPassword[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();

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

  return {
    transferFunds,
    addPendingInvestment
  };
};
