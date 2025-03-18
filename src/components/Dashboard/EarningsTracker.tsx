
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Investment } from '@/types/user';
import { generateEarningsData, generateCumulativeData } from '@/utils/earningsCalculator';
import EarningsMonthlyChart from './EarningsMonthlyChart';
import EarningsCumulativeChart from './EarningsCumulativeChart';
import EarningsBreakdown from './EarningsBreakdown';

export interface EarningsTrackerProps {
  investments: Investment[];
}

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
              <EarningsMonthlyChart data={earningsData} />
            ) : (
              <EarningsCumulativeChart data={cumulativeData} />
            )}
          </div>
        </CardContent>
      </Card>

      <EarningsBreakdown data={earningsData} />
    </div>
  );
};

export default EarningsTracker;
