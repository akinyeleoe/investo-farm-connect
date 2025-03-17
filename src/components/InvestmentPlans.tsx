
import { Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { AspectRatio } from '@/components/ui/aspect-ratio';

const investmentPlans = [
  {
    id: 'short-term',
    title: 'Short-Term Plan',
    description: 'Perfect for investors looking for quick returns.',
    roi: '36%',
    period: '1 Year',
    minInvestment: '₦100,000',
    image: '/lovable-uploads/bf25be4c-d553-4fb8-b602-cc79f4966c8f.png',
    benefits: [
      '36% return per annum',
      'Monthly interest payouts',
      'Principal returned at maturity',
      'No exit bonus',
      'Minimum investment: ₦100,000',
    ],
    popular: false,
    color: 'bg-blue-50 dark:bg-blue-900/20',
    borderColor: 'border-blue-200 dark:border-blue-800',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 'medium-term',
    title: 'Medium-Term Plan',
    description: 'Balanced investment with added exit bonus.',
    roi: '36% + 10%',
    period: '2 Years',
    minInvestment: '₦200,000',
    image: '/lovable-uploads/bf25be4c-d553-4fb8-b602-cc79f4966c8f.png',
    benefits: [
      '36% return per annum',
      'Monthly interest payouts',
      '10% exit bonus on principal',
      'Principal returned at maturity',
      'Minimum investment: ₦200,000',
    ],
    popular: true,
    color: 'bg-farm-primary/10 dark:bg-farm-primary/20',
    borderColor: 'border-farm-primary dark:border-farm-primary/70',
    iconColor: 'text-farm-primary dark:text-farm-primary/90',
    gradientBg: 'bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20',
  },
  {
    id: 'long-term',
    title: 'Long-Term Plan',
    description: 'Pension-focused plan with increased returns over time.',
    roi: '25% to 50%',
    period: '3+ Years',
    minInvestment: '₦300,000',
    image: '/lovable-uploads/bf25be4c-d553-4fb8-b602-cc79f4966c8f.png',
    benefits: [
      '25% return per annum (years 1-3)',
      '50% return per annum (year 4+)',
      'Monthly interest payouts',
      'Principal returned at maturity',
      'Minimum investment: ₦300,000',
    ],
    popular: false,
    color: 'bg-orange-50 dark:bg-orange-900/20',
    borderColor: 'border-orange-200 dark:border-orange-800',
    iconColor: 'text-orange-600 dark:text-orange-400',
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
            <Card
              key={plan.id}
              className={`relative transition-all duration-300 overflow-visible ${
                hoveredPlan === plan.id ? 'scale-[1.02]' : ''
              } ${plan.popular 
                ? `${plan.gradientBg || ''} ${plan.borderColor} border-2 shadow-lg`
                : `${plan.color} ${plan.borderColor} border shadow`
              }`}
              onMouseEnter={() => setHoveredPlan(plan.id)}
              onMouseLeave={() => setHoveredPlan(null)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-farm-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </div>
              )}
              
              <CardHeader className="text-center">
                <CardTitle className="text-xl font-bold">{plan.title}</CardTitle>
                <CardDescription className="mb-4">{plan.description}</CardDescription>
                
                <div className="flex items-center justify-center gap-1">
                  <span className="text-4xl font-bold">{plan.roi}</span>
                  <span className="text-muted-foreground mb-1">per annum</span>
                </div>
                <div className="text-sm text-muted-foreground mt-1">{plan.period}</div>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3 mb-8">
                  {plan.benefits.map((benefit, index) => (
                    <div key={index} className="flex items-start gap-2">
                      <Check className={`h-5 w-5 ${plan.iconColor} shrink-0 mt-0.5`} />
                      <span className="text-sm">{benefit}</span>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-center pb-6">
                <Link to="/register" className="w-full">
                  <Button 
                    className={`w-full rounded-full ${
                      plan.popular 
                        ? 'bg-farm-primary hover:bg-farm-primary/90 text-white' 
                        : 'bg-white hover:bg-slate-50 text-foreground border border-slate-200'
                    }`}
                  >
                    Start Investing
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
              </CardFooter>
            </Card>
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
