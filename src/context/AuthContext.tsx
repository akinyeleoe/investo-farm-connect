
import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/components/ui/use-toast';

interface User {
  id: string;
  email: string;
  name: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoggedIn: boolean;
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
  },
  {
    id: '2',
    email: 'investor@example.com',
    name: 'Demo Investor',
    password: 'password123',
    isAdmin: false,
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
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
    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API request delay
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        const foundUser = mockUsers.find(
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

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    // Simulate API request delay
    setLoading(true);
    return new Promise((resolve) => {
      setTimeout(() => {
        // Check if user with email already exists
        const existingUser = mockUsers.find((u) => u.email === email);
        
        if (existingUser) {
          toast({
            title: 'Registration failed',
            description: 'An account with this email already exists',
            variant: 'destructive',
          });
          
          setLoading(false);
          resolve(false);
        } else {
          // In a real app, you would send this data to your API
          // For this demo, we'll just simulate a successful registration
          const newUser = {
            id: `user_${Date.now()}`,
            email,
            name,
            isAdmin: false,
          };
          
          setUser(newUser);
          localStorage.setItem('farmly_user', JSON.stringify(newUser));
          
          toast({
            title: 'Registration successful',
            description: 'Your account has been created',
          });
          
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

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        register,
        logout,
        isLoggedIn: !!user,
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
