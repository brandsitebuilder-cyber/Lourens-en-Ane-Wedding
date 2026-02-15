import React from 'react';
import { NavItem } from '../types';

interface NavigationProps {
  onNavigate: (sectionId: string) => void;
  activeSection: string;
}

export const Navigation: React.FC<NavigationProps> = ({ onNavigate, activeSection }) => {
  const navItems: NavItem[] = [
    { label: 'HOME', href: 'home' },
    { label: 'GALLERY', href: 'gallery' },
    { label: 'REGISTRY', href: 'registry' },
    { label: 'GUESTBOOK', href: 'guestbook' },
  ];

  return (
    <nav className="absolute top-0 left-0 w-full z-20 p-8 flex justify-between md:justify-start gap-8 items-center">
      {navItems.map((item) => (
        <button
          key={item.label}
          onClick={() => onNavigate(item.href)}
          className={`text-xs tracking-[0.2em] font-sans font-bold uppercase transition-opacity hover:opacity-100 
            ${activeSection === item.href ? 'text-white opacity-100' : 'text-white/70 hover:text-white'}`}
        >
          {item.label}
        </button>
      ))}
    </nav>
  );
};