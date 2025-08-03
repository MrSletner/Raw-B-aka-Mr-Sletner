import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Palette, Rocket, Shield, Heart, Star } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Blazing fast performance that will leave you amazed',
    color: 'from-yellow-400 to-orange-500'
  },
  {
    icon: Palette,
    title: 'Beautiful Design',
    description: 'Stunning visuals that captivate and inspire',
    color: 'from-pink-400 to-purple-500'
  },
  {
    icon: Rocket,
    title: 'Innovative',
    description: 'Cutting-edge technology for the modern world',
    color: 'from-blue-400 to-cyan-500'
  },
  {
    icon: Shield,
    title: 'Secure',
    description: 'Enterprise-grade security you can trust',
    color: 'from-green-400 to-emerald-500'
  },
  {
    icon: Heart,
    title: 'User-Centric',
    description: 'Built with love and attention to user experience',
    color: 'from-red-400 to-pink-500'
  },
  {
    icon: Star,
    title: 'Premium Quality',
    description: 'Excellence in every detail and interaction',
    color: 'from-indigo-400 to-purple-500'
  }
];

const FeatureCards: React.FC = () => {
  return (
    <div className="py-20 px-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-gray-900 mb-4">
            Why Choose <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">Excellence</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the features that make us stand out from the crowd
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="group hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border-0 bg-white">
              <CardContent className="p-8 text-center">
                <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-r ${feature.color} flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;