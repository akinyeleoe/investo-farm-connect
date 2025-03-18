
import { Link } from 'react-router-dom';
import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-farm-dark text-white">
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3 className="text-2xl font-bold mb-6">Farmly.ng</h3>
            <p className="text-gray-300 mb-6">
              Invest in agriculture. Grow your wealth. Transform the future.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <a href="#investment-plans" className="text-gray-300 hover:text-white transition-colors">Investment Plans</a>
              </li>
              <li>
                <a href="#how-it-works" className="text-gray-300 hover:text-white transition-colors">How It Works</a>
              </li>
              <li>
                <a href="#faq" className="text-gray-300 hover:text-white transition-colors">FAQs</a>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
              </li>
              <li>
                <Link to="/register" className="text-gray-300 hover:text-white transition-colors">Register</Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Legal</h4>
            <ul className="space-y-3">
              <li>
                <Link to="/terms" className="text-gray-300 hover:text-white transition-colors">Terms of Service</Link>
              </li>
              <li>
                <Link to="/privacy" className="text-gray-300 hover:text-white transition-colors">Privacy Policy</Link>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Cookie Policy</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white transition-colors">Investment Disclaimer</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-bold mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start">
                <Mail size={18} className="mr-2 text-farm-primary mt-1 flex-shrink-0" />
                <a href="mailto:invest@farmly.ng" className="text-gray-300 hover:text-white transition-colors">
                  invest@farmly.ng
                </a>
              </li>
              <li className="flex items-start">
                <Phone size={18} className="mr-2 text-farm-primary mt-1 flex-shrink-0" />
                <div>
                  <a href="tel:+2348109821224" className="text-gray-300 hover:text-white transition-colors block">
                    +234 810 982 1224 (Nigeria)
                  </a>
                  <a href="tel:+971566707032" className="text-gray-300 hover:text-white transition-colors block mt-1">
                    +971 56 670 7032 (Dubai)
                  </a>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 text-farm-primary mt-1 flex-shrink-0" />
                <div>
                  <p className="text-gray-300">
                    Plot 3, A N Power Line, Sabo, Ikorodu, Lagos, Nigeria
                  </p>
                  <p className="text-gray-300 mt-2">
                    Suite 303, Tecom House, Mall of the Emirates, Dubai, UAE
                  </p>
                </div>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-12 pt-8 text-center text-gray-400">
          <p>&copy; {currentYear} Farmly.ng. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
