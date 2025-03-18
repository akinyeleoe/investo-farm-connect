
import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import InvestmentPlans from '@/components/InvestmentPlans';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <main className="flex-grow">
        <Hero />
        <Features />
        <section className="py-16 px-4 bg-gray-50 animate-fade-in">
          <div className="container mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-8">Ready to Start Investing?</h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg" className="px-8 hover-scale">
                <Link to="/register">Create an Account</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 hover-scale">
                <Link to="/login">Sign In</Link>
              </Button>
            </div>
          </div>
        </section>
        <InvestmentPlans />
        <Testimonials />
        <FAQ />
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
