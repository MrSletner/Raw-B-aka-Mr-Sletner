import React from 'react';
import { useAppContext } from '@/contexts/AppContext';
import { useIsMobile } from '@/hooks/use-mobile';
import Hero from './Hero';
import FeatureCards from './FeatureCards';
import StatsSection from './StatsSection';
import CallToAction from './CallToAction';

const AppLayout: React.FC = () => {
  const { sidebarOpen, toggleSidebar } = useAppContext();
  const isMobile = useIsMobile();

  return (
    <div className="min-h-screen">
      <Hero />
      <FeatureCards />
      <StatsSection />
      <CallToAction />
    </div>
  );
};

export default AppLayout;