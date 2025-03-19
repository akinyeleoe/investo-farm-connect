
import React from 'react';
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface EarningsMonthlyChartProps {
  data: {
    month: string;
    amount: number;
  }[];
}

const EarningsMonthlyChart = ({ data }: EarningsMonthlyChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data}>
        <XAxis
          dataKey="month"
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
  );
};

export default EarningsMonthlyChart;
