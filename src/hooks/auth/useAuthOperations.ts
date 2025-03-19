
import { User, UserWithPassword, PendingInvestment } from '@/types/user';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

export const useAuthOperations = (
  user: User | null,
  setUser: React.Dispatch<React.SetStateAction<User | null>>,
  allUsers: UserWithPassword[],
  setAllUsers: React.Dispatch<React.SetStateAction<UserWithPassword[]>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
) => {
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const logout = () => {
    setUser(null);
    localStorage.removeItem('farmly_user');
    navigate('/');
    
    toast({
      title: 'Logged out',
      description: 'You have been successfully logged out',
    });
  };

  return {
    login,
    register,
    logout
  };
};
