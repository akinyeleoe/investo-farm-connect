
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ChevronDown } from 'lucide-react';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header 
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled ? 'py-3 glass-morph' : 'py-5 bg-transparent'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <span className="text-2xl font-bold text-farm-primary">Farmly.ng</span>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link 
              to="/" 
              className={`text-sm font-medium transition-colors hover:text-farm-primary ${
                location.pathname === '/' ? 'text-farm-primary' : 'text-foreground'
              }`}
            >
              Home
            </Link>
            <a 
              href="#investment-plans" 
              className="text-sm font-medium text-foreground transition-colors hover:text-farm-primary"
            >
              Investment Plans
            </a>
            <a 
              href="#how-it-works" 
              className="text-sm font-medium text-foreground transition-colors hover:text-farm-primary"
            >
              How It Works
            </a>
            <a 
              href="#faq" 
              className="text-sm font-medium text-foreground transition-colors hover:text-farm-primary"
            >
              FAQ
            </a>
          </nav>
          
          <div className="hidden md:flex items-center space-x-4">
            <Link to="/login">
              <Button variant="outline" className="rounded-full px-6">
                Login
              </Button>
            </Link>
            <Link to="/register">
              <Button className="rounded-full px-6 bg-farm-primary hover:bg-farm-primary/90">
                Get Started
              </Button>
            </Link>
          </div>
          
          <button 
            className="md:hidden text-foreground"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden glass-morph mt-3 mx-4 rounded-xl overflow-hidden animate-fade-in">
          <nav className="flex flex-col py-4">
            <Link 
              to="/" 
              className="px-6 py-3 text-foreground hover:bg-farm-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <a 
              href="#investment-plans" 
              className="px-6 py-3 text-foreground hover:bg-farm-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Investment Plans
            </a>
            <a 
              href="#how-it-works" 
              className="px-6 py-3 text-foreground hover:bg-farm-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              How It Works
            </a>
            <a 
              href="#faq" 
              className="px-6 py-3 text-foreground hover:bg-farm-muted transition-colors"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              FAQ
            </a>
            <div className="border-t border-border mt-2 pt-2 px-6 py-3 flex flex-col space-y-3">
              <Link 
                to="/login"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button variant="outline" className="w-full rounded-full">
                  Login
                </Button>
              </Link>
              <Link 
                to="/register"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Button className="w-full rounded-full bg-farm-primary hover:bg-farm-primary/90">
                  Get Started
                </Button>
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;
