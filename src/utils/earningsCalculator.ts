
import { Investment } from "@/types/user";

// Generate mock earnings data
export const generateEarningsData = (investments: Investment[]) => {
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  
  const earnings = [];
  
  // Generate past earnings (3 months)
  for (let i = 3; i >= 1; i--) {
    let month = currentMonth - i;
    let year = currentYear;
    
    if (month < 0) {
      month += 12;
      year -= 1;
    }
    
    const totalMonthlyReturn = investments.reduce((sum, inv) => {
      const investmentStartDate = new Date(inv.startDate);
      const monthIndex = month;
      const investmentMonthIndex = investmentStartDate.getMonth();
      const investmentYear = investmentStartDate.getFullYear();
      
      // Calculate monthly return for this investment
      const monthlyReturn = inv.monthlyReturn || (inv.amount * inv.interestRate / 12 / 100);
      
      // Only count returns if the investment had started by this month
      if (year > investmentYear || (year === investmentYear && monthIndex >= investmentMonthIndex)) {
        return sum + monthlyReturn;
      }
      return sum;
    }, 0);
    
    earnings.push({
      name: `${months[month]} ${year}`,
      amount: totalMonthlyReturn,
      paid: true,
    });
  }
  
  // Current month
  earnings.push({
    name: `${months[currentMonth]} ${currentYear}`,
    amount: investments.reduce((sum, inv) => {
      const monthlyReturn = inv.monthlyReturn || (inv.amount * inv.interestRate / 12 / 100);
      return sum + monthlyReturn;
    }, 0),
    paid: false,
  });
  
  // Generate future earnings (8 months)
  for (let i = 1; i <= 8; i++) {
    let month = (currentMonth + i) % 12;
    let year = currentYear + Math.floor((currentMonth + i) / 12);
    
    earnings.push({
      name: `${months[month]} ${year}`,
      amount: investments.reduce((sum, inv) => {
        const investmentEndDate = new Date(inv.endDate);
        const monthDate = new Date(year, month, 1);
        
        // Calculate monthly return for this investment
        const monthlyReturn = inv.monthlyReturn || (inv.amount * inv.interestRate / 12 / 100);
        
        // Only count returns if the investment hasn't ended by this month
        if (monthDate <= investmentEndDate) {
          return sum + monthlyReturn;
        }
        return sum;
      }, 0),
      paid: false,
    });
  }
  
  return earnings;
};

// Generate cumulative earnings data
export const generateCumulativeData = (earningsData: any[]) => {
  let cumulative = 0;
  return earningsData.map(entry => {
    if (entry.paid) {
      cumulative += entry.amount;
    }
    return {
      ...entry,
      cumulative,
    };
  });
};
