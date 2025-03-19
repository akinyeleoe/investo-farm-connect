
import { Investment } from "@/types/user";
import { 
  startOfMonth, 
  addMonths, 
  format, 
  isBefore, 
  parseISO, 
  differenceInMonths 
} from "date-fns";

// Helper function to calculate the current month's earnings
export const calculateMonthlyEarnings = (investments: Investment[]): number => {
  if (!investments || investments.length === 0) return 0;
  
  const now = new Date();
  const currentMonth = format(now, 'yyyy-MM');
  
  return investments.reduce((total, investment) => {
    const monthlyReturns = investment.monthlyReturns || [];
    const currentMonthReturn = monthlyReturns.find(
      (m) => m.month.startsWith(currentMonth)
    );
    
    return total + (currentMonthReturn?.amount || 0);
  }, 0);
};

// Calculate cumulative earnings over time
export const calculateCumulativeEarnings = (investments: Investment[]): { month: string; amount: number }[] => {
  if (!investments || investments.length === 0) return [];
  
  const data: { month: string; amount: number }[] = [];
  const now = new Date();
  const currentMonth = startOfMonth(now);
  
  // For simplicity, show the last 12 months
  for (let i = 11; i >= 0; i--) {
    const monthDate = addMonths(currentMonth, -i);
    const monthKey = format(monthDate, 'yyyy-MM');
    
    const totalForMonth = investments.reduce((total, investment) => {
      const investmentDate = parseISO(investment.date);
      // Skip if the investment didn't exist yet in this month
      if (isBefore(monthDate, investmentDate)) {
        return total;
      }
      
      const monthlyReturns = investment.monthlyReturns || [];
      const monthlyReturn = monthlyReturns.find(m => m.month.startsWith(monthKey));
      
      return total + (monthlyReturn?.amount || 0);
    }, 0);
    
    data.push({
      month: format(monthDate, 'MMM yyyy'),
      amount: totalForMonth
    });
  }
  
  return data;
};

// Calculate total earnings to date
export const calculateTotalEarnings = (investments: Investment[]): number => {
  if (!investments || investments.length === 0) return 0;
  
  return investments.reduce((total, investment) => {
    const monthlyReturns = investment.monthlyReturns || [];
    return total + monthlyReturns.reduce((subTotal, month) => subTotal + month.amount, 0);
  }, 0);
};

// Calculate expected ROI
export const calculateExpectedROI = (investments: Investment[]): number => {
  if (!investments || investments.length === 0) return 0;
  
  return investments.reduce((total, investment) => {
    const months = investment.term;
    const monthlyReturn = (investment.amount * (investment.roi / 100)) / 12;
    return total + (monthlyReturn * months);
  }, 0);
};

// Calculate remaining investment period
export const calculateRemainingPeriod = (investments: Investment[]): number => {
  if (!investments || investments.length === 0) return 0;
  
  const now = new Date();
  let totalRemainingMonths = 0;
  
  investments.forEach(investment => {
    const investmentDate = parseISO(investment.date);
    const monthsElapsed = differenceInMonths(now, investmentDate);
    const remainingMonths = Math.max(0, investment.term - monthsElapsed);
    totalRemainingMonths += remainingMonths;
  });
  
  return totalRemainingMonths;
};

// Calculate earnings breakdown by investment
export const calculateEarningsBreakdown = (investments: Investment[]): { name: string; amount: number }[] => {
  if (!investments || investments.length === 0) return [];
  
  return investments.map(investment => {
    const monthlyReturns = investment.monthlyReturns || [];
    const totalEarnings = monthlyReturns.reduce((total, month) => total + month.amount, 0);
    
    return {
      name: investment.name,
      amount: totalEarnings
    };
  });
};
