import React, { useState } from 'react';
import { X, Sparkles, RefreshCw, Minimize, Maximize } from 'lucide-react';
import { Fortune } from '../types';

interface FortuneModalProps {
  fortune: Fortune;
  onClose: () => void;
}

export const FortuneModal: React.FC<FortuneModalProps> = ({ fortune, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4 ${isClosing ? 'animate-out fade-out duration-300' : 'animate-in fade-in duration-300'}`}>
      
      {/* Window Frame */}
      <div className={`w-full max-w-md bg-white/95 backdrop-blur-xl rounded-xl shadow-2xl border border-white/50 overflow-hidden flex flex-col transform transition-all ${isClosing ? 'animate-pop-out' : 'animate-pop-in'}`}>
        
        {/* Title Bar */}
        <div className="h-10 bg-gray-50/80 border-b border-gray-200 flex items-center justify-between px-4 select-none">
           <div className="flex items-center gap-2">
              <Sparkles size={14} className="text-terracotta" />
              <span className="font-mono text-xs font-bold text-gray-600 tracking-wide">
                PROPHECY.EXE :: RESULT
              </span>
           </div>
           <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-gray-600"><Minimize size={12} /></button>
              <button className="text-gray-400 hover:text-gray-600"><Maximize size={12} /></button>
              <button 
                onClick={handleClose}
                className="text-gray-400 hover:text-red-500 transition-colors ml-2"
              >
                <X size={16} />
              </button>
           </div>
        </div>

        {/* Content */}
        <div className="p-8 relative">
           {/* Decorative Background */}
           <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-terracotta/10 to-transparent rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

           <div className="text-center relative z-10">
              <div className="inline-block px-4 py-1.5 bg-lapis/10 text-lapis font-greek font-bold text-xs tracking-widest rounded-full mb-6 border border-lapis/10">
                 {fortune.title}
              </div>
              
              <h3 className="font-serif text-2xl md:text-3xl font-bold text-ink mb-8 leading-relaxed">
                 {fortune.sign}
              </h3>
              
              <div className="bg-gray-50 rounded-lg p-5 text-sm font-sans text-gray-600 leading-relaxed border-l-4 border-lapis text-left shadow-inner">
                 <span className="font-bold text-gray-900 block mb-2 uppercase text-xs tracking-wider opacity-70">Interpretation</span>
                 {fortune.interpretation}
              </div>

              <div className="mt-8 border-t border-gray-100 pt-6">
                 <button 
                   onClick={handleClose}
                   className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-mono text-xs font-bold shadow-lg"
                 >
                   <RefreshCw size={14} /> ACKNOWLEDGE & CLOSE
                 </button>
              </div>
           </div>
        </div>

      </div>
    </div>
  );
};
