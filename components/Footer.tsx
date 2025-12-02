import React, { useEffect, useState } from 'react';
import { FORTUNES } from '../constants';

export const Footer: React.FC = () => {
  const [quote, setQuote] = useState<{sign: string, from: string}>({ sign: '', from: '' });

  useEffect(() => {
    const random = FORTUNES[Math.floor(Math.random() * FORTUNES.length)];
    setQuote({ sign: random.sign, from: random.title });
  }, []);

  const handleCopyrightClick = () => {
     const event = new CustomEvent('badtowel-os-alert', { 
       detail: { 
         title: '法律声明', 
         message: '在矩阵中侵犯版权在技术上是不可能的，因为所有数据都是虚幻的。', 
         type: 'warning' 
       } 
     });
     window.dispatchEvent(event);
  };

  return (
    <footer className="w-full border-t-2 border-lapis mt-24 bg-parchment text-center relative">
      {/* Decorative Border */}
      <div className="h-4 w-full bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Greek_key_pattern_border.svg/1200px-Greek_key_pattern_border.svg.png')] bg-contain opacity-10"></div>
      
      <div className="py-12 px-6 max-w-4xl mx-auto">
        <div className="font-old italic text-xl text-ink mb-10">
          {quote.sign}
        </div>

        <div className="flex justify-center items-center gap-4 text-xs font-greek text-lapis/60 cursor-default select-none">
           <span>BAD TOWEL CHRONICLE</span>
           <span>•</span>
           <span onClick={handleCopyrightClick} className="hover:text-terracotta cursor-help transition-colors">COPYRIGHT &copy; {new Date().getFullYear()}</span>
           <span>•</span>
           <span>ALL RIGHTS RESERVED</span>
        </div>
      </div>
    </footer>
  );
};