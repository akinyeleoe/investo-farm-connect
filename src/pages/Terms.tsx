
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow py-16 px-4">
        <div className="container mx-auto max-w-4xl animate-fade-in">
          <div className="mb-8">
            <Link to="/" className="text-farm-primary hover:underline flex items-center">
              ← Back to Home
            </Link>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold mb-8">Terms of Service</h1>
          
          <div className="prose prose-lg max-w-none">
            <h2>1. Introduction</h2>
            <p>
              Welcome to Farmly.ng. By accessing or using our website and services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
            
            <h2>2. Definitions</h2>
            <p>
              "Farmly.ng," "we," "us," and "our" refer to Farmly.ng and its subsidiaries or affiliates.
              "You" and "your" refer to the user or viewer of our website.
              "Services" refers to the investment platform and related services provided by Farmly.ng.
              "Investment" refers to funds provided by you to be used in agricultural projects as specified.
            </p>
            
            <h2>3. Account Registration</h2>
            <p>
              To use certain features of the Services, you must register for an account. You agree to provide accurate, current, and complete information during the registration process and to update such information to keep it accurate, current, and complete.
            </p>
            
            <h2>4. Investment Terms</h2>
            <p>
              All investments are subject to the terms specified in your chosen investment plan. Returns are fixed as stated in the plan description at the time of investment. Investments cannot be withdrawn before the end of the contract term. Monthly payouts are processed based on cumulative interest as per the plan terms.
            </p>
            
            <h2>5. Risk Disclosure</h2>
            <p>
              All investments carry risk. While Farmly.ng takes measures to mitigate risks through insurance and expert farm management, agricultural investments are subject to various factors including but not limited to weather conditions, market fluctuations, and operational challenges.
            </p>
            
            <h2>6. Taxation</h2>
            <p>
              Withholding Tax (WHT) is deducted from your profits as required by Nigerian regulations. Farmly.ng is not responsible for any additional tax obligations you may have.
            </p>
            
            <h2>7. Referral Program</h2>
            <p>
              You may earn a 5% bonus for every new investor you refer. The bonus is credited to your account based on their initial investment. Referral bonuses are subject to the same terms as regular earnings.
            </p>
            
            <h2>8. Limitation of Liability</h2>
            <p>
              To the maximum extent permitted by law, Farmly.ng shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses, resulting from your use or inability to use the service.
            </p>
            
            <h2>9. Modifications to Terms</h2>
            <p>
              We may modify these terms at any time. It is your responsibility to review these terms periodically. Your continued use of the Services after any modifications indicates your acceptance of the modified terms.
            </p>
            
            <h2>10. Governing Law</h2>
            <p>
              These terms shall be governed by and construed in accordance with the laws of Nigeria, without regard to its conflict of law provisions.
            </p>
            
            <h2>11. Contact Information</h2>
            <p>
              If you have any questions about these Terms, please contact us at invest@farmly.ng.
            </p>
            
            <p className="text-sm text-muted-foreground mt-8">
              Last updated: June 1, 2023
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Terms;
