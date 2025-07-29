import React from 'react';

const stats = [
  { number: '10M+', label: 'Happy Users', color: 'text-purple-600' },
  { number: '99.9%', label: 'Uptime', color: 'text-green-600' },
  { number: '24/7', label: 'Support', color: 'text-blue-600' },
  { number: '150+', label: 'Countries', color: 'text-pink-600' }
];

const StatsSection: React.FC = () => {
  return (
    <div className="py-20 bg-gradient-to-r from-indigo-900 via-purple-900 to-pink-900">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-bold text-white mb-4">
            Trusted by <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">Millions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Join the community that's changing the world, one user at a time
          </p>
        </div>
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 transform group-hover:scale-105 transition-all duration-300 border border-white/20">
                <div className={`text-5xl md:text-6xl font-bold ${stat.color} mb-2 group-hover:animate-pulse`}>
                  {stat.number}
                </div>
                <div className="text-gray-300 text-lg font-medium">
                  {stat.label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StatsSection;