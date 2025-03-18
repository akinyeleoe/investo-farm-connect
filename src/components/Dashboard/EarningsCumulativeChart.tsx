
import React from 'react';
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';

interface EarningsCumulativeChartProps {
  data: {
    name: string;
    amount: number;
    paid: boolean;
    cumulative: number;
  }[];
}

const EarningsCumulativeChart = ({ data }: EarningsCumulativeChartProps) => {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
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
  );
};

export default EarningsCumulativeChart;
