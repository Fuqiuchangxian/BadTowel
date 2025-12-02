import React from 'react';

interface DesktopPetProps {
  type: 'orange' | 'black';
  direction: 'left' | 'right';
  delay: string;
  bottom: string;
}

export const DesktopPet: React.FC<DesktopPetProps> = ({ type, direction, delay, bottom }) => {
  const animationClass = direction === 'right' ? 'animate-cat-walk-right' : 'animate-cat-walk-left';
  
  // Simple Pixel Art Cat SVG
  const CatSVG = () => (
    <svg width="60" height="40" viewBox="0 0 60 40" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* Tail */}
      <path d="M5 20 Q 0 10 5 5" stroke={type === 'orange' ? '#fb923c' : '#1f2937'} strokeWidth="4" strokeLinecap="round">
         <animate attributeName="d" values="M5 20 Q 0 10 5 5; M5 20 Q 10 10 5 5; M5 20 Q 0 10 5 5" dur="1s" repeatCount="indefinite"/>
      </path>
      {/* Body */}
      <rect x="10" y="15" width="30" height="20" rx="5" fill={type === 'orange' ? '#fb923c' : '#1f2937'} />
      {/* Head */}
      <circle cx="45" cy="18" r="10" fill={type === 'orange' ? '#fb923c' : '#1f2937'} />
      {/* Ears */}
      <path d="M40 10 L38 2 L45 10 Z" fill={type === 'orange' ? '#fb923c' : '#1f2937'} />
      <path d="M50 10 L52 2 L45 10 Z" fill={type === 'orange' ? '#fb923c' : '#1f2937'} />
      {/* Eyes */}
      <circle cx="48" cy="16" r="1.5" fill="white" />
      <circle cx="42" cy="16" r="1.5" fill="white" />
      {/* Legs (Animated) */}
      <rect x="15" y="32" width="4" height="8" rx="2" fill={type === 'orange' ? '#fb923c' : '#1f2937'}>
        <animate attributeName="height" values="8;4;8" dur="0.5s" repeatCount="indefinite" />
      </rect>
      <rect x="30" y="32" width="4" height="8" rx="2" fill={type === 'orange' ? '#fb923c' : '#1f2937'}>
         <animate attributeName="height" values="4;8;4" dur="0.5s" repeatCount="indefinite" />
      </rect>
    </svg>
  );

  return (
    <div 
      className={`fixed z-50 pointer-events-none ${animationClass}`}
      style={{ animationDelay: delay, bottom: bottom, left: direction === 'right' ? '-100px' : 'auto', right: direction === 'left' ? '-100px' : 'auto' }}
    >
      <CatSVG />
    </div>
  );
};