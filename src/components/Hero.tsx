
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative py-24 md:py-32 overflow-hidden">
      {/* Abstract background elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
        <div className="absolute -top-16 -right-16 w-64 h-64 bg-farm-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute top-1/3 -left-24 w-72 h-72 bg-farm-accent/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 w-52 h-52 bg-farm-secondary/10 rounded-full blur-3xl"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="flex-1 max-w-2xl reveal-animation">
            <div className="inline-block bg-farm-primary/10 px-4 py-1.5 rounded-full text-farm-primary font-medium text-sm mb-5 animate-slide-up">
              Secure Agricultural Investments
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-balance mb-6">
              Grow Your Wealth with
              <span className="text-farm-primary"> Agricultural</span> Investments
            </h1>
            <p className="text-lg text-muted-foreground mb-8 max-w-xl">
              Invest in agriculture projects with fixed annual returns. Get monthly payouts and enjoy up to 36% ROI per annum with Farmly.ng.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to="/register">
                <Button className="rounded-full px-8 py-6 bg-farm-primary hover:bg-farm-primary/90 text-white">
                  Start Investing
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <a href="#investment-plans">
                <Button variant="outline" className="rounded-full px-8 py-6">
                  View Investment Plans
                </Button>
              </a>
            </div>
            
            <div className="mt-10 grid grid-cols-2 md:grid-cols-3 gap-8">
              <div className="flex flex-col">
                <div className="text-3xl font-bold text-farm-primary">36%</div>
                <div className="text-sm text-muted-foreground">Short-term ROI</div>
              </div>
              <div className="flex flex-col">
                <div className="text-3xl font-bold text-farm-primary">50%</div>
                <div className="text-sm text-muted-foreground">Long-term ROI</div>
              </div>
              <div className="flex flex-col">
                <div className="text-3xl font-bold text-farm-primary">Monthly</div>
                <div className="text-sm text-muted-foreground">Payouts</div>
              </div>
            </div>
          </div>
          
          <div className="flex-1 w-full max-w-lg">
            <div className="relative">
              <div className="absolute -z-10 inset-0 bg-farm-primary/20 rounded-3xl blur-2xl transform rotate-6"></div>
              <div className="glass-morph rounded-3xl overflow-hidden shadow-xl p-6 image-fade-in">
                <img 
                  src="https://images.unsplash.com/photo-1590682300936-a609d3313091?q=80&w=1000&auto=format&fit=crop" 
                  alt="Modern agricultural farm" 
                  className="w-full h-80 object-cover rounded-xl"
                  loading="lazy"
                />
                <div className="mt-6 p-2">
                  <h3 className="text-xl font-bold">Invest in Modern Farming</h3>
                  <p className="text-muted-foreground mt-2">
                    Our agricultural projects use advanced technology for sustainable, high-yield farming.
                  </p>
                  <div className="mt-4 flex justify-between items-center">
                    <div className="flex flex-col">
                      <span className="text-xs text-muted-foreground">Starting from</span>
                      <span className="text-xl font-bold">₦100,000</span>
                    </div>
                    <a href="#investment-plans">
                      <Button variant="outline" size="sm" className="rounded-full">
                        Learn More
                      </Button>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
