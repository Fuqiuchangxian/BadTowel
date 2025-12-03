import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { NAV_LINKS } from '../constants';
import { Menu, X, Folder, Disc, FileText, Sparkles, User, Home, Coins } from 'lucide-react';

interface NavigationProps {
  isMobile?: boolean;
}

export const Navigation: React.FC<NavigationProps> = ({ isMobile = false }) => {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const getIcon = (path: string) => {
    switch(path) {
      case '/': return <Home size={16} />;
      case '/music': return <Disc size={16} />;
      case '/portfolio': return <Folder size={16} />;
      case '/fortune': return <Sparkles size={16} />;
      case '/commission': return <Coins size={16} />;
      case '/about': return <User size={16} />;
      default: return <FileText size={16} />;
    }
  };

  const handleHealthClick = () => {
    const event = new CustomEvent('badtowel-os-alert', { 
      detail: { 
        title: '系统诊断', 
        message: '系统健康度 100%。情绪稳定性... 尚在正常参数范围内波动。', 
        type: 'info' 
      } 
    });
    window.dispatchEvent(event);
  };

  if (isMobile) {
    return (
      <div className="p-4 border-b border-lapis/20 flex justify-between items-center bg-[#f4f4f5]">
        <Link to="/" className="font-greek font-bold text-lapis hover:text-terracotta transition-colors">BAD TOWEL</Link>
        <button onClick={() => setIsOpen(!isOpen)} className="text-lapis">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
        {isOpen && (
          <div className="fixed inset-0 z-50 bg-parchment/95 flex flex-col items-center justify-center gap-8 animate-in fade-in">
             <button onClick={() => setIsOpen(false)} className="absolute top-6 right-6 text-lapis">
               <X size={32} />
             </button>
             {NAV_LINKS.map((link) => (
               <Link
                 key={link.path}
                 to={link.path}
                 onClick={() => setIsOpen(false)}
                 className="text-2xl font-serif text-lapis"
               >
                 {link.name}
               </Link>
             ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full py-8">
      
      {/* Sidebar Header */}
      <div className="px-6 mb-8">
         <Link to="/" className="block group">
           <h1 className="font-greek font-bold text-xl text-lapis tracking-tight group-hover:text-terracotta transition-colors">BAD TOWEL</h1>
           <p className="text-[10px] font-mono text-gray-400 mt-1 group-hover:text-gray-600 transition-colors">hellllllo！</p>
         </Link>
      </div>

      {/* Navigation List */}
      <nav className="flex-1 px-4 space-y-1">
        <div className="px-2 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-wider">
          Applications
        </div>
        {NAV_LINKS.map((link) => {
          const isActive = location.pathname === link.path;
          return (
            <Link
              key={link.path}
              to={link.path}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-all duration-200 group ${
                isActive 
                  ? 'bg-white shadow-sm text-lapis ring-1 ring-black/5' 
                  : 'text-gray-600 hover:bg-gray-200/50 hover:text-black'
              }`}
            >
              <span className={`opacity-70 ${isActive ? 'text-lapis' : 'group-hover:text-terracotta'}`}>
                {getIcon(link.path)}
              </span>
              <span className={`text-sm font-medium font-serif ${isActive ? 'font-bold' : ''}`}>
                {link.name}
              </span>
            </Link>
          );
        })}
      </nav>

      {/* Bottom Info */}
      <div className="px-6 mt-auto">
        <div 
          onClick={handleHealthClick}
          className="p-3 bg-gray-200/50 rounded-lg border border-gray-200 cursor-help hover:bg-gray-200 hover:shadow-inner transition-all group"
        >
           <div className="flex items-center gap-2 mb-1">
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] font-mono font-bold text-gray-500 group-hover:text-lapis">SYSTEM HEALTH</span>
           </div>
           <div className="h-1 w-full bg-gray-300 rounded-full overflow-hidden">
             <div className="h-full bg-lapis w-[85%]"></div>
           </div>
        </div>
      </div>

    </div>
  );
};
