import React from 'react';

export const Registry: React.FC = () => {
  return (
    <section id="registry" className="py-24 bg-wedding-oliveDark text-wedding-cream text-center">
      <div className="max-w-2xl mx-auto px-6">
        <p className="text-xs uppercase tracking-[0.2em] mb-6 opacity-70">Gifts</p>
        <h2 className="font-serif text-4xl mb-8">Registry</h2>
        <p className="font-sans mb-12 opacity-80 leading-relaxed">
          Your presence is enough of a present to us! But for those of you who are stubborn, we've put together a wish-list to help you out.
        </p>
        
        <div className="flex flex-col md:flex-row justify-center gap-6">
          <a href="#" className="px-8 py-4 bg-transparent border border-wedding-cream/30 text-wedding-cream uppercase tracking-[0.2em] text-xs hover:bg-wedding-cream hover:text-wedding-oliveDark transition-all">
            Amazon
          </a>
          <a href="#" className="px-8 py-4 bg-transparent border border-wedding-cream/30 text-wedding-cream uppercase tracking-[0.2em] text-xs hover:bg-wedding-cream hover:text-wedding-oliveDark transition-all">
            Crate & Barrel
          </a>
          <a href="#" className="px-8 py-4 bg-transparent border border-wedding-cream/30 text-wedding-cream uppercase tracking-[0.2em] text-xs hover:bg-wedding-cream hover:text-wedding-oliveDark transition-all">
            Honeymoon Fund
          </a>
        </div>
      </div>
    </section>
  );
};