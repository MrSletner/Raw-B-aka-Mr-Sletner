import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-navy via-blue to-light-blue overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-blue rounded-full mix-blend-multiply filter blur-xl opacity-40 animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-silver rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-navy rounded-full mix-blend-multiply filter blur-xl opacity-50 animate-pulse animation-delay-4000"></div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="w-8 h-8 text-silver mr-2 animate-spin" />
          <span className="text-silver font-body text-lg">Welcome to Raw B</span>
        </div>
        
        <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 leading-tight font-heading drop-shadow-2xl">
          Make Your
          <span className="bg-gradient-to-r from-light-blue via-silver to-white bg-clip-text text-transparent"> Dreams </span>
          Reality
        </h1>
        
        <p className="text-xl md:text-2xl text-light-blue mb-10 leading-relaxed font-body">
          Experience the next generation of music, art, and creative expression with stunning visuals, 
          seamless interactions, and boundless possibilities.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-gradient-to-r from-navy to-blue hover:from-blue hover:to-navy text-white px-8 py-4 text-lg font-body rounded-full transform hover:scale-105 transition-all duration-300 shadow-2xl">
            Get Started
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white hover:text-navy px-8 py-4 text-lg font-body rounded-full transform hover:scale-105 transition-all duration-300">
            Learn More
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Hero;