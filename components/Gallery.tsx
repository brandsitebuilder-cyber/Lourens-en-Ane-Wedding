import React from 'react';

export const Gallery: React.FC = () => {
  const images = [
    "https://drive.google.com/thumbnail?id=1lAaXPIuubHzn2qGRX4MP8QYZqNa6ws7A&sz=w1000",
    "https://drive.google.com/thumbnail?id=1ak-NjDMcuz9eP4kqjRg3M7kcRi4TSZhn&sz=w1000",
    "https://drive.google.com/thumbnail?id=1HApcWXxx4pKC0PD1B4mULe7YFiI5wqPe&sz=w1000",
    "https://drive.google.com/thumbnail?id=1s-OHq7f05yDeWFcDVhoT2mNL-HNUBuAi&sz=w1000",
  ];

  return (
    <section id="gallery" className="py-20 px-8 bg-wedding-cream">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-wedding-olive text-xs uppercase tracking-[0.2em] mb-4">Our Moments</p>
          <h2 className="font-serif text-4xl md:text-5xl text-wedding-oliveDark">Gallery</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {images.map((src, index) => (
            <div key={index} className={`relative overflow-hidden group ${index % 2 === 0 ? 'md:mt-8' : ''}`}>
               <div className="aspect-[3/4] overflow-hidden">
                <img 
                  src={src} 
                  alt={`Gallery ${index}`} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0"
                />
               </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};