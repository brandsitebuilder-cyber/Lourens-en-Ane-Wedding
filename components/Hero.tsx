import React, { useState, useEffect } from 'react';

interface HeroProps {
  onRsvpClick: () => void;
}

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

export const Hero: React.FC<HeroProps> = ({ onRsvpClick }) => {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const targetDate = new Date('2026-11-21T00:00:00').getTime();

    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = targetDate - now;

      if (distance < 0) {
        clearInterval(interval);
        return;
      }

      setTimeLeft({
        days: Math.floor(distance / (1000 * 60 * 60 * 24)),
        hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
        seconds: Math.floor((distance % (1000 * 60)) / 1000),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div id="home" className="relative w-full h-screen flex flex-col md:flex-row overflow-hidden">
      
      {/* Left Section - Olive */}
      <div className="w-full md:w-[45%] bg-wedding-olive h-1/2 md:h-full flex flex-col justify-end p-8 md:p-16 relative">
        {/* Texture overlay effect */}
        <div className="absolute inset-0 bg-noise opacity-10 pointer-events-none"></div>

        <div className="mb-8 md:mb-16 z-10 text-white">
          <p className="text-sm md:text-base tracking-[0.2em] mb-4 md:mb-8 font-sans opacity-80">
            11.21.2026
          </p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-8">
            Lourens &<br />
            Ané
          </h1>
          
          <div className="flex gap-4 md:gap-8 font-sans text-center">
            <div>
              <span className="text-2xl md:text-3xl font-light block">{timeLeft.days}</span>
              <span className="text-[10px] uppercase tracking-widest opacity-60">Days</span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-light block">{timeLeft.hours}</span>
              <span className="text-[10px] uppercase tracking-widest opacity-60">Hrs</span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-light block">{timeLeft.minutes}</span>
              <span className="text-[10px] uppercase tracking-widest opacity-60">Mins</span>
            </div>
            <div>
              <span className="text-2xl md:text-3xl font-light block">{timeLeft.seconds}</span>
              <span className="text-[10px] uppercase tracking-widest opacity-60">Secs</span>
            </div>
          </div>
        </div>
      </div>

      {/* Right Section - Image */}
      <div className="w-full md:w-[55%] h-1/2 md:h-full relative">
        <img 
          src="https://drive.google.com/thumbnail?id=1BHGQjL4BlWjcKhQ5cK0fg7X4OnLkeSrz&sz=w2000" 
          alt="Lourens and Ané" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {/* Floating RSVP Button - Centered on split line */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30">
        <button
          onClick={onRsvpClick}
          className="group relative w-32 h-32 md:w-40 md:h-40 rounded-full border border-white/40 bg-white/10 backdrop-blur-sm 
                     flex items-center justify-center transition-all duration-500 hover:scale-105 hover:bg-wedding-olive hover:border-wedding-olive"
        >
          <span className="text-white font-serif text-lg md:text-xl tracking-widest group-hover:tracking-[0.2em] transition-all duration-300">
            RSVP
          </span>
          {/* Animated rings */}
          <div className="absolute inset-0 rounded-full border border-white/20 animate-ping opacity-20 duration-[3s]"></div>
        </button>
      </div>
    </div>
  );
};