import React, { useState } from 'react';
import { Hero } from './components/Hero';
import { Navigation } from './components/Navigation';
import { Gallery } from './components/Gallery';
import { Registry } from './components/Registry';
import { GuestBookAI } from './components/GuestBookAI';
import { RsvpModal } from './components/RsvpModal';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('home');
  const [isRsvpOpen, setIsRsvpOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full min-h-screen relative">
      <Navigation onNavigate={scrollToSection} activeSection={activeSection} />
      
      <main>
        <Hero onRsvpClick={() => setIsRsvpOpen(true)} />
        <Gallery />
        <GuestBookAI />
        <Registry />
      </main>

      <footer className="bg-wedding-cream py-12 text-center">
        <h2 className="font-serif text-2xl text-wedding-oliveDark mb-2">Lourens & Ane</h2>
        <p className="font-sans text-xs uppercase tracking-widest text-gray-500">October 24, 2025 • Cape Town</p>
      </footer>

      <RsvpModal isOpen={isRsvpOpen} onClose={() => setIsRsvpOpen(false)} />
    </div>
  );
};

export default App;