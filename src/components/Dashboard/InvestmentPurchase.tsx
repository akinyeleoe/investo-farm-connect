import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Check, ArrowRight, Copy, Loader2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const investmentPlans = [
  {
    id: 'short-term',
    title: 'Short-Term Plan',
    description: 'Perfect for investors looking for quick returns.',
    roi: '36%',
    period: '1 Year',
    minInvestment: 100000,
    minInvestmentFormatted: '₦100,000',
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
    minInvestment: 200000,
    minInvestmentFormatted: '₦200,000',
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
    minInvestment: 300000,
    minInvestmentFormatted: '₦300,000',
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

const bankDetails = {
  accountName: 'Agrivest Investment Limited',
  accountNumber: '0013720358',
  bankName: 'Guaranty Tust Bank Plc',
};

interface InvestmentPurchaseProps {
  onPurchase?: () => void;
}

const InvestmentPurchase: React.FC<InvestmentPurchaseProps> = ({ onPurchase }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [selectedPlan, setSelectedPlan] = useState<typeof investmentPlans[0] | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [amount, setAmount] = useState('');
  const [referenceCode, setReferenceCode] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { user, addPendingInvestment } = useAuth();

  const generateReferenceCode = () => {
    const timestamp = Date.now().toString().slice(-6);
    const userInitials = user?.name ? user.name.split(' ').map(n => n[0]).join('') : 'INV';
    return `FAR${userInitials}${timestamp}`;
  };

  const handlePlanSelect = (plan: typeof investmentPlans[0]) => {
    setSelectedPlan(plan);
    setAmount(plan.minInvestment.toString());
    setReferenceCode(generateReferenceCode());
    setIsDialogOpen(true);
  };

  const handleCopyReferenceCode = () => {
    navigator.clipboard.writeText(referenceCode);
    toast({
      title: 'Reference code copied',
      description: 'The reference code has been copied to your clipboard.',
    });
  };

  const handleConfirmPurchase = async () => {
    if (!selectedPlan || !user) return;
    
    const investmentAmount = parseFloat(amount);
    
    if (isNaN(investmentAmount) || investmentAmount < selectedPlan.minInvestment) {
      toast({
        title: 'Invalid amount',
        description: `The minimum investment amount is ${selectedPlan.minInvestmentFormatted}.`,
        variant: 'destructive',
      });
      return;
    }
    
    setIsSubmitting(true);
    
    const success = await addPendingInvestment({
      planId: selectedPlan.id,
      planName: selectedPlan.title,
      amount: investmentAmount,
      referenceCode: referenceCode,
      date: new Date().toISOString(),
      status: 'pending',
    });
    
    setIsSubmitting(false);
    
    if (success) {
      setIsDialogOpen(false);
      
      if (onPurchase) onPurchase();
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Select an Investment Plan</h2>
        <p className="text-muted-foreground">
          Choose the investment plan that best suits your financial goals
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {investmentPlans.map((plan) => (
          <Card
            key={plan.id}
            className={`relative transition-all duration-300 hover:scale-[1.02] ${
              plan.popular 
                ? `${plan.gradientBg || ''} ${plan.borderColor} border-2 shadow-lg` 
                : `${plan.color} ${plan.borderColor} border shadow`
            }`}
          >
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-farm-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                Most Popular
              </div>
            )}
            
            <CardHeader className="text-center">
              <CardTitle className="text-xl font-bold">{plan.title}</CardTitle>
              <CardDescription className="mb-2">{plan.description}</CardDescription>
              
              <div className="flex items-center justify-center gap-1">
                <span className="text-3xl font-bold">{plan.roi}</span>
                <span className="text-muted-foreground mb-1">per annum</span>
              </div>
              <div className="text-sm text-muted-foreground mt-1">{plan.period}</div>
            </CardHeader>
            
            <CardContent>
              <div className="space-y-3 mb-6">
                {plan.benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <Check className={`h-5 w-5 ${plan.iconColor} shrink-0 mt-0.5`} />
                    <span className="text-sm">{benefit}</span>
                  </div>
                ))}
              </div>
            </CardContent>
            
            <CardFooter className="flex justify-center pb-6">
              <Button 
                className={`w-full rounded-full ${
                  plan.popular 
                    ? 'bg-farm-primary hover:bg-farm-primary/90 text-white' 
                    : 'bg-white hover:bg-slate-50 text-foreground border border-slate-200'
                }`}
                onClick={() => handlePlanSelect(plan)}
              >
                Invest Now
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>{selectedPlan?.title} Investment</DialogTitle>
            <DialogDescription>
              Complete your investment by making a bank transfer to our account.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="amount">Investment Amount (₦)</Label>
              <Input
                id="amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                type="number"
              />
              <p className="text-xs text-muted-foreground">
                Minimum investment: {selectedPlan?.minInvestmentFormatted}
              </p>
            </div>
            
            <div className="space-y-3 mt-4 bg-muted p-4 rounded-lg">
              <h3 className="font-semibold">Bank Transfer Details</h3>
              
              <div className="grid grid-cols-2 gap-2">
                <div className="text-sm text-muted-foreground">Bank Name:</div>
                <div className="text-sm font-medium">{bankDetails.bankName}</div>
                
                <div className="text-sm text-muted-foreground">Account Name:</div>
                <div className="text-sm font-medium">{bankDetails.accountName}</div>
                
                <div className="text-sm text-muted-foreground">Account Number:</div>
                <div className="text-sm font-medium">{bankDetails.accountNumber}</div>
                
                <div className="text-sm text-muted-foreground">Reference Code:</div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">{referenceCode}</span>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-6 w-6" 
                    onClick={handleCopyReferenceCode}
                  >
                    <Copy className="h-3 w-3" />
                  </Button>
                </div>
              </div>
              
              <div className="text-sm text-muted-foreground mt-2">
                <strong>Important:</strong> You must include the reference code when making your transfer
                for proper tracking of your investment.
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setIsDialogOpen(false)}
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button 
              className="bg-farm-primary hover:bg-farm-primary/90"
              onClick={handleConfirmPurchase}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Confirm'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default InvestmentPurchase;
