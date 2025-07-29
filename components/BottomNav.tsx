import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const BottomNav = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Home', icon: '🏠' },
    { path: '/music', label: 'Music', icon: '🎵' },
    { path: '/remix', label: 'Remix', icon: '🎛️' },
    { path: '/media', label: 'Media', icon: '📺' },
    { path: '/support', label: 'Support', icon: '💝' }
  ];

  return (
    <nav className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-lg bg-brand-bg border-t border-white/10 px-4 py-2">
      <div className="flex justify-around">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
              location.pathname === item.path
                ? 'text-brand-blue bg-white/10'
                : 'text-brand-light/70 hover:text-brand-light'
            }`}
          >
            <span className="text-lg mb-1">{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
};

export default BottomNav;