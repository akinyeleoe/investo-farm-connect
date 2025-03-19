
import { useAuthState } from './auth/useAuthState';
import { useAuthOperations } from './auth/useAuthOperations';
import { useFinancialOperations } from './auth/useFinancialOperations';

export const useAuthProvider = () => {
  const { 
    user, 
    setUser, 
    allUsers, 
    setAllUsers, 
    loading, 
    setLoading 
  } = useAuthState();

  const { 
    login, 
    register, 
    logout,
    resetPassword,
    updatePassword
  } = useAuthOperations(user, setUser, allUsers, setAllUsers, setLoading);

  const { 
    transferFunds, 
    addPendingInvestment 
  } = useFinancialOperations(user, setUser, allUsers, setAllUsers, setLoading);

  const getUsersWithoutPasswords = () => {
    return allUsers.map(({ password, ...rest }) => rest);
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    resetPassword,
    updatePassword,
    isLoggedIn: !!user,
    transferFunds,
    addPendingInvestment,
    allUsers: getUsersWithoutPasswords(),
  };
};
