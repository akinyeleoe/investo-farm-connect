
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface EarningsBreakdownProps {
  data: {
    month: string;
    amount: number;
  }[];
}

const EarningsBreakdown = ({ data }: EarningsBreakdownProps) => {
  // Assume all earnings from previous months are paid, current month is pending
  const now = new Date();
  const currentMonth = now.toISOString().substring(0, 7); // Format: YYYY-MM
  
  return (
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
                {data.map((entry, index) => {
                  // Check if this is the current month (for demo purposes)
                  const isPaid = index < data.length - 1;
                  
                  return (
                    <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-muted/30'}>
                      <td className="px-4 py-3 text-sm">{entry.month}</td>
                      <td className="px-4 py-3 text-sm text-right">
                        ₦{entry.amount.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-sm text-center">
                        {isPaid ? (
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
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default EarningsBreakdown;
