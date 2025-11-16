import React from 'react';
import Navbar from './components/Navbar';
import HeroSection from './components/Herosection';
import CTASection from './components/CTASection';
import Footer from './components/Footer';

const Landing = () => {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <Navbar />
      <main>
        <HeroSection />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
};

export default Landing;
