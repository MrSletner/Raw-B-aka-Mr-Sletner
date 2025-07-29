import React from 'react';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

const CallToAction: React.FC = () => {
  return (
    <div className="relative py-20 px-6 bg-gradient-to-br from-purple-600 via-pink-600 to-red-600 overflow-hidden">
      {/* Animated background shapes */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-bounce"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-bounce animation-delay-2000"></div>
      </div>
      
      <div className="relative z-10 max-w-4xl mx-auto text-center">
        <div className="flex items-center justify-center mb-6">
          <Sparkles className="w-8 h-8 text-yellow-300 mr-2 animate-pulse" />
          <span className="text-yellow-300 font-semibold text-lg">Ready to Begin?</span>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
          Start Your
          <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent"> Amazing </span>
          Journey Today
        </h2>
        
        <p className="text-xl md:text-2xl text-gray-100 mb-10 leading-relaxed max-w-2xl mx-auto">
          Don't wait for tomorrow. Transform your dreams into reality with just one click.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-10 py-4 text-lg font-bold rounded-full transform hover:scale-110 transition-all duration-300 shadow-2xl">
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button variant="outline" size="lg" className="border-2 border-white text-white hover:bg-white/20 px-10 py-4 text-lg font-semibold rounded-full transform hover:scale-110 transition-all duration-300">
            Watch Demo
          </Button>
        </div>
        
        <div className="mt-12 text-gray-200">
          <p className="text-sm">✨ No credit card required • ⚡ Setup in 2 minutes • 🎯 Cancel anytime</p>
        </div>
      </div>
    </div>
  );
};

export default CallToAction;