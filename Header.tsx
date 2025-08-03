import React from 'react';

interface HeaderProps {
  title?: string;
  subtitle?: string;
}

const Header: React.FC<HeaderProps> = ({ title = "Robert Sletner", subtitle = "Music & Art" }) => {
  return (
    <header className="bg-brand-bg border-b border-white/10 px-4 py-6 text-center">
      <h1 className="text-2xl font-bold text-brand-light mb-1">{title}</h1>
      {subtitle && (
        <p className="text-brand-light/70 text-sm">{subtitle}</p>
      )}
    </header>
  );
};

export default Header;