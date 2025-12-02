import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, Info, ShieldAlert } from 'lucide-react';

export interface AlertProps {
  id: string;
  title: string;
  message: string;
  type?: 'info' | 'warning' | 'error';
  x: number;
  y: number;
  onClose: (id: string) => void;
}

export const SystemAlert: React.FC<AlertProps> = ({ id, title, message, type = 'info', x, y, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => onClose(id), 300);
  };

  const getColors = () => {
    switch (type) {
      case 'error': return 'bg-red-50 text-red-900 border-red-200';
      case 'warning': return 'bg-amber-50 text-amber-900 border-amber-200';
      default: return 'bg-white/90 text-slate-800 border-white/60';
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'error': return <ShieldAlert size={24} className="text-red-500" />;
      case 'warning': return <AlertTriangle size={24} className="text-amber-500" />;
      default: return <Info size={24} className="text-lapis" />;
    }
  };

  // Ensure initial render happens before animation starts for maximum smoothness
  if (!isMounted) return null;

  return (
    <div
      className={`fixed z-[9999] w-80 backdrop-blur-xl rounded-2xl shadow-2xl border flex flex-col font-sans overflow-hidden ${getColors()} ${isClosing ? 'animate-pop-out' : 'animate-pop-in'}`}
      style={{ left: x, top: y }}
    >
      {/* Header */}
      <div className="flex justify-between items-center px-4 py-3 border-b border-black/5 bg-black/5">
        <span className="font-bold text-xs tracking-wider uppercase opacity-70">{title}</span>
        <button onClick={handleClose} className="hover:bg-black/10 p-1 rounded-full transition-colors">
          <X size={14} />
        </button>
      </div>

      {/* Body */}
      <div className="p-5 flex gap-4 items-start">
        <div className="flex-shrink-0 mt-0.5">
          {getIcon()}
        </div>
        <p className="text-sm font-medium leading-relaxed opacity-90 text-justify">{message}</p>
      </div>

      {/* Footer */}
      <div className="p-3 bg-black/5 flex justify-end">
        <button
          onClick={handleClose}
          className="bg-white border border-black/10 shadow-sm px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-50 active:scale-95 transition-all text-gray-700"
        >
          关闭
        </button>
      </div>
    </div>
  );
};