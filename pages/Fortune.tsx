import React, { useState } from 'react';
import { FORTUNES } from '../constants';

const Fortune: React.FC = () => {
  const [isShaking, setIsShaking] = useState(false);

  const handleShake = () => {
    setIsShaking(true);

    // Shake time
    setTimeout(() => {
      const random = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
      
      // Dispatch global event to open the result window
      const event = new CustomEvent('badtowel-show-fortune', { 
        detail: { fortune: random } 
      });
      window.dispatchEvent(event);
      
      setIsShaking(false);
    }, 1200);
  };

  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center">
      
      <div className="mb-12">
        <h1 className="text-4xl md:text-6xl font-greek font-bold text-lapis mb-2">
          THE ORACLE
        </h1>
        <p className="font-mono text-xs tracking-widest text-gray-500 uppercase">
          System.Random.Prophecy()
        </p>
      </div>

      <div className="relative w-full max-w-lg mx-auto flex flex-col items-center">
        
        {/* The Canister (Modern White Card Style) */}
        <div 
          onClick={!isShaking ? handleShake : undefined}
          className={`cursor-pointer transition-transform duration-100 mx-auto w-48 h-72 relative origin-bottom select-none ${isShaking ? 'animate-shake-vigorous' : 'hover:scale-105 transition-transform duration-500'}`}
        >
           {/* SVG Modern Fortune Canister */}
           <svg viewBox="0 0 140 220" className="w-full h-full drop-shadow-xl">
              <defs>
                <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
                  <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
                  <feOffset dx="0" dy="2" result="offsetblur"/>
                  <feComponentTransfer>
                    <feFuncA type="linear" slope="0.2"/>
                  </feComponentTransfer>
                  <feMerge> 
                    <feMergeNode/>
                    <feMergeNode in="SourceGraphic"/> 
                  </feMerge>
                </filter>
                <linearGradient id="stickGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                   <stop offset="0%" stopColor="#fde68a" />
                   <stop offset="100%" stopColor="#d97706" />
                </linearGradient>
              </defs>

              {/* Sticks Group */}
              <g transform={isShaking ? "translate(0, 10)" : "translate(0, 0)"} className="transition-transform">
                 <rect x="45" y="0" width="10" height="80" fill="url(#stickGradient)" transform="rotate(-5 50 80)" />
                 <rect x="65" y="-5" width="10" height="80" fill="url(#stickGradient)" transform="rotate(2 70 80)" />
                 <rect x="85" y="5" width="10" height="80" fill="url(#stickGradient)" transform="rotate(8 90 80)" />
                 {/* Shaking Action Stick */}
                 {isShaking && (
                   <rect x="65" y="-25" width="10" height="90" fill="url(#stickGradient)" className="animate-bounce" />
                 )}
              </g>

              {/* Canister Body - White Rounded Rect */}
              <rect x="20" y="60" width="100" height="150" rx="12" ry="12" fill="#ffffff" filter="url(#shadow)" />
              
              {/* Top Decorations */}
              <rect x="20" y="80" width="100" height="15" fill="#0369a1" /> {/* Blue Stripe */}
              <rect x="20" y="95" width="100" height="4" fill="#fbbf24" /> {/* Gold Line */}

              {/* Bottom Decorations */}
              <rect x="20" y="180" width="100" height="15" fill="#1e3a8a" /> {/* Dark Blue Stripe */}
              <rect x="20" y="176" width="100" height="4" fill="#fbbf24" /> {/* Gold Line */}

              {/* Question Mark */}
              <text x="70" y="155" fontSize="50" textAnchor="middle" fill="#1e3a8a" fontFamily="serif" fontWeight="bold">?</text>
           </svg>

           {/* Click Hint */}
           <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 w-full text-center">
              {!isShaking && (
                <span className="font-mono text-[10px] text-gray-400 bg-white border border-gray-200 px-2 py-1 rounded shadow-sm">
                  [CLICK_TO_SHAKE]
                </span>
              )}
           </div>
        </div>

      </div>
    </div>
  );
};

export default Fortune;
