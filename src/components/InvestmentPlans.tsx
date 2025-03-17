
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const investmentPlans = [
  {
    id: 'short-term',
    title: 'Short-Term Plan',
    description: 'Perfect for investors looking for quick returns.',
    roi: '36%',
    period: '1 Year',
    minInvestment: '₦100,000',
    benefits: [
      '36% return per annum',
      'Monthly interest payouts',
      'Principal returned at maturity',
      'No exit bonus',
      'Minimum investment: ₦100,000',
    ],
    popular: false,
  },
  {
    id: 'medium-term',
    title: 'Medium-Term Plan',
    description: 'Balanced investment with added exit bonus.',
    roi: '36% + 10%',
    period: '2 Years',
    minInvestment: '₦200,000',
    benefits: [
      '36% return per annum',
      'Monthly interest payouts',
      '10% exit bonus on principal',
      'Principal returned at maturity',
      'Minimum investment: ₦200,000',
    ],
    popular: true,
  },
  {
    id: 'long-term',
    title: 'Long-Term Plan',
    description: 'Pension-focused plan with increased returns over time.',
    roi: '25% to 50%',
    period: '3+ Years',
    minInvestment: '₦300,000',
    benefits: [
      '25% return per annum (years 1-3)',
      '50% return per annum (year 4+)',
      'Monthly interest payouts',
      'Principal returned at maturity',
      'Minimum investment: ₦300,000',
    ],
    popular: false,
  },
];

const InvestmentPlans = () => {
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);

  return (
    <section id="investment-plans" className="py-20">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Choose Your Investment Plan</h2>
          <p className="text-muted-foreground text-lg">
            Select the investment plan that best suits your financial goals and preferred investment horizon.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {investmentPlans.map((plan) => (
            <div
              key={plan.id}
              className={`relative glass-morph rounded-2xl p-8 transition-all duration-300 ${
                hoveredPlan === plan.id ? 'scale-[1.02]' : ''
              } ${plan.popular ? 'border-farm-primary border-2' : ''}`}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-farm-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">{plan.title}</h3>
                <p className="text-muted-foreground mb-4">{plan.description}</p>
                <div className="flex items-end justify-center gap-1">
                  <span className="text-4xl font-bold">{plan.roi}</span>
                  <span className="text-muted-foreground mb-1">per annum</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">{plan.period}</div>
              </div>
              
              <div className="space-y-3 mb-8">
                {plan.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className="h-5 w-5 text-farm-primary shrink-0 mt-0.5" />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
              
              <Link to="/register">
                <Button 
                  className={`w-full rounded-full ${
                    plan.popular 
                      ? 'bg-farm-primary hover:bg-farm-primary/90' 
                      : 'bg-white hover:bg-slate-50 text-foreground border border-slate-200'
                  }`}
                >
                  Start Investing
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Not sure which plan is right for you? Contact us for personalized advice.
          </p>
          <Link to="/register">
            <Button variant="outline" className="rounded-full">
              Contact Our Team
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default InvestmentPlans;
