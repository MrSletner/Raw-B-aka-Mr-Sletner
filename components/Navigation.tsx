import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Music, Palette, Video, Disc, HelpCircle } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: null },
    { path: '/music', label: 'Music', icon: Music },
    { path: '/art', label: 'Art', icon: Palette },
    { path: '/videos', label: 'Videos', icon: Video },
    { path: '/remix-center', label: 'Remix Center', icon: Disc },
    { path: '/support', label: 'Support', icon: HelpCircle },
  ];

  return (
    <nav className="bg-white/95 backdrop-blur-sm border-b-2 border-navy/20 sticky top-0 z-50 shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-3xl font-bold text-navy font-heading drop-shadow-sm">
            Raw B
          </Link>
          
          <div className="hidden md:flex space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              
              return (
                <Button
                  key={item.path}
                  variant={isActive ? "default" : "ghost"}
                  asChild
                  className={`font-body ${isActive ? 'bg-navy text-white shadow-md' : 'text-blue hover:bg-light-blue hover:text-navy'}`}
                >
                  <Link to={item.path} className="flex items-center gap-2">
                    {Icon && <Icon size={18} />}
                    {item.label}
                  </Link>
                </Button>
              );
            })}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;