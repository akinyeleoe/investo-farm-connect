
import { Check, Shield, Percent, CalendarClock, TrendingUp, Users } from 'lucide-react';

const featuresList = [
  {
    title: "High Fixed Returns",
    description: "Enjoy up to 36% annual returns on your investments with our short-term plans.",
    icon: <Percent className="h-10 w-10 text-farm-primary p-2 bg-farm-primary/10 rounded-xl" />,
  },
  {
    title: "Monthly Payouts",
    description: "Receive your investment returns monthly directly to your bank account.",
    icon: <CalendarClock className="h-10 w-10 text-farm-primary p-2 bg-farm-primary/10 rounded-xl" />,
  },
  {
    title: "Long-term Growth",
    description: "Our long-term plans offer up to 50% ROI per annum after the third year.",
    icon: <TrendingUp className="h-10 w-10 text-farm-primary p-2 bg-farm-primary/10 rounded-xl" />,
  },
  {
    title: "Referral Bonuses",
    description: "Earn 5% bonus when you refer friends and family to invest with us.",
    icon: <Users className="h-10 w-10 text-farm-primary p-2 bg-farm-primary/10 rounded-xl" />,
  },
  {
    title: "Secure Investments",
    description: "Your investments are secured by real agricultural assets and projects.",
    icon: <Shield className="h-10 w-10 text-farm-primary p-2 bg-farm-primary/10 rounded-xl" />,
  },
  {
    title: "Simple Process",
    description: "Easy registration, investment selection, and tracking through your dashboard.",
    icon: <Check className="h-10 w-10 text-farm-primary p-2 bg-farm-primary/10 rounded-xl" />,
  },
];

const Features = () => {
  return (
    <section id="how-it-works" className="py-20 bg-farm-muted">
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Why Invest with Farmly.ng?</h2>
          <p className="text-muted-foreground text-lg">
            We offer a secure way to invest in agriculture while earning fixed returns on your investment.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuresList.map((feature, index) => (
            <div
              key={index}
              className="glass-card p-8 rounded-xl hover-card"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-20">
          <div className="glass-card rounded-2xl overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="p-8 lg:p-12 flex flex-col justify-center">
                <h3 className="text-2xl md:text-3xl font-bold mb-4">How It Works</h3>
                <div className="space-y-6">
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-farm-primary text-white flex items-center justify-center font-bold shrink-0">1</div>
                    <div>
                      <h4 className="font-bold text-lg">Create an Account</h4>
                      <p className="text-muted-foreground">Register and complete your profile setup in minutes.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-farm-primary text-white flex items-center justify-center font-bold shrink-0">2</div>
                    <div>
                      <h4 className="font-bold text-lg">Choose an Investment Plan</h4>
                      <p className="text-muted-foreground">Select from our short-term, medium-term, or long-term investment plans.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-farm-primary text-white flex items-center justify-center font-bold shrink-0">3</div>
                    <div>
                      <h4 className="font-bold text-lg">Make Your Investment</h4>
                      <p className="text-muted-foreground">Invest a minimum of ₦100,000 through bank transfer or debit card.</p>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-farm-primary text-white flex items-center justify-center font-bold shrink-0">4</div>
                    <div>
                      <h4 className="font-bold text-lg">Track & Receive Returns</h4>
                      <p className="text-muted-foreground">Monitor your investment through your dashboard and receive monthly payouts.</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="relative h-80 lg:h-auto overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1589923188900-85124c9a8807?q=80&w=1000&auto=format&fit=crop" 
                  alt="Modern agriculture" 
                  className="absolute inset-0 w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
