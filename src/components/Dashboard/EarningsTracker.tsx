
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Line,
  LineChart,
} from 'recharts';

export interface Investment {
  id: string;
  plan: 'short' | 'medium' | 'long';
  amount: number;
  startDate: string;
  endDate: string;
  interestRate: number;
  exitBonus?: number;
  monthlyReturn?: number;
  totalReturn?: number;
  nextPayout?: string;
}

export interface EarningsTrackerProps {
  investments: Investment[];
}

// Generate mock earnings data
const generateEarningsData = (investments: Investment[]) => {
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
const generateCumulativeData = (earningsData: any[]) => {
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

const EarningsTracker = ({ investments }: EarningsTrackerProps) => {
  // Default to empty array if investments is undefined
  const investmentsData = investments || [];
  
  const earningsData = generateEarningsData(investmentsData);
  const cumulativeData = generateCumulativeData(earningsData);
  
  const [chartType, setChartType] = useState<'monthly' | 'cumulative'>('monthly');
  
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-3">
          <div className="flex justify-between items-center">
            <CardTitle>Earnings Tracker</CardTitle>
            <div className="flex gap-2">
              <button
                onClick={() => setChartType('monthly')}
                className={`px-3 py-1 rounded-full text-sm ${
                  chartType === 'monthly'
                    ? 'bg-farm-primary text-white'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setChartType('cumulative')}
                className={`px-3 py-1 rounded-full text-sm ${
                  chartType === 'cumulative'
                    ? 'bg-farm-primary text-white'
                    : 'bg-secondary text-muted-foreground'
                }`}
              >
                Cumulative
              </button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[400px] w-full">
            {chartType === 'monthly' ? (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={earningsData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₦${value.toLocaleString()}`}
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <Tooltip
                    formatter={(value: number) => [`₦${value.toLocaleString()}`, 'Earnings']}
                    labelStyle={{ color: '#000' }}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #ddd' }}
                  />
                  <Bar
                    dataKey="amount"
                    fill="hsl(var(--farm-primary))"
                    radius={[4, 4, 0, 0]}
                    fillOpacity={0.9}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={cumulativeData}>
                  <XAxis
                    dataKey="name"
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                  />
                  <YAxis
                    stroke="#888888"
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => `₦${value.toLocaleString()}`}
                  />
                  <CartesianGrid strokeDasharray="3 3" />
                  <Tooltip
                    formatter={(value: number) => [`₦${value.toLocaleString()}`, 'Cumulative Earnings']}
                    labelStyle={{ color: '#000' }}
                    contentStyle={{ backgroundColor: 'white', borderRadius: '8px', border: '1px solid #ddd' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="cumulative"
                    stroke="hsl(var(--farm-primary))"
                    strokeWidth={2}
                    dot={{ fill: 'hsl(var(--farm-primary))', strokeWidth: 2, r: 4 }}
                    activeDot={{ r: 6, fill: 'hsl(var(--farm-accent))' }}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Earnings Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="border rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted">
                  <tr>
                    <th className="px-4 py-3 text-left font-medium text-sm">Month</th>
                    <th className="px-4 py-3 text-right font-medium text-sm">Earnings</th>
                    <th className="px-4 py-3 text-center font-medium text-sm">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {earningsData.map((entry, index) => (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-muted/30'}>
                      <td className="px-4 py-3 text-sm">{entry.name}</td>
                      <td className="px-4 py-3 text-sm text-right">
                        ₦{entry.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-center">
                        {entry.paid ? (
                          <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                            Paid
                          </span>
                        ) : (
                          <span className="inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800">
                            Pending
                          </span>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default EarningsTracker;
