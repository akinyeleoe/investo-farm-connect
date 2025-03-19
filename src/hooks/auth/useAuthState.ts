
import { useState, useEffect } from 'react';
import { User, UserWithPassword } from '@/types/user';
import { mockUsers } from '@/data/mockUsers';

export const useAuthState = () => {
  const [user, setUser] = useState<User | null>(null);
  const [allUsers, setAllUsers] = useState<UserWithPassword[]>(mockUsers);
  const [loading, setLoading] = useState(true);

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

  return {
    user,
    setUser,
    allUsers,
    setAllUsers,
    loading,
    setLoading
  };
};
