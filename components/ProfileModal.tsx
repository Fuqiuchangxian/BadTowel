import React, { useState } from 'react';
import { X, Minimize, Maximize, UserCircle, Star } from 'lucide-react';
import { FRIENDS } from '../constants';

interface ProfileModalProps {
  profileId: string;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ profileId, onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const profile = FRIENDS.find(f => f.id === profileId);

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(onClose, 300);
  };

  if (!profile) return null;

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/20 backdrop-blur-sm p-4 ${isClosing ? 'animate-out fade-out duration-300' : 'animate-in fade-in duration-300'}`}>
       
       {/* Window Frame */}
       <div className={`w-full max-w-lg bg-white/90 backdrop-blur-xl rounded-xl shadow-2xl border border-white/50 overflow-hidden flex flex-col transform transition-all ${isClosing ? 'animate-pop-out' : 'animate-pop-in'}`}>
          
          {/* Title Bar */}
          <div className="h-10 bg-gray-50/80 border-b border-gray-200 flex items-center justify-between px-4 select-none">
             <div className="flex items-center gap-2">
                <UserCircle size={14} className="text-lapis" />
                <span className="font-mono text-xs font-bold text-gray-600 tracking-wide">
                  PROFILE_VIEWER :: {profile.id.toUpperCase()}
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

          {/* Window Content */}
          <div className="p-8 relative overflow-hidden">
             {/* Background Decor */}
             <div className="absolute top-0 right-0 w-32 h-32 bg-lapis/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
             
             <div className="relative z-10 flex flex-col items-center">
                
                {/* Avatar */}
                <div className="w-24 h-24 bg-gradient-to-br from-lapis to-verdigris rounded-full flex items-center justify-center text-4xl text-white font-serif font-bold shadow-lg mb-4 ring-4 ring-white">
                   {profile.avatar}
                </div>

                {/* Name & Title */}
                <h2 className="text-3xl font-greek font-bold text-ink mb-1">{profile.name}</h2>
                <p className="font-mono text-xs text-terracotta bg-terracotta/10 px-3 py-1 rounded-full mb-6">
                   {profile.role}
                </p>

                {/* Stats Grid */}
                <div className="w-full grid grid-cols-2 gap-4 mb-8">
                   <div className="bg-white/60 p-3 rounded-lg border border-gray-100 text-center">
                      <span className="block font-mono text-[10px] text-gray-400 uppercase">Power Level</span>
                      <span className="font-bold text-lapis flex items-center justify-center gap-1">
                         <Star size={12} fill="currentColor" /> {profile.power}
                      </span>
                   </div>
                   <div className="bg-white/60 p-3 rounded-lg border border-gray-100 text-center">
                      <span className="block font-mono text-[10px] text-gray-400 uppercase">Status</span>
                      <span className="font-bold text-verdigris">ACTIVE</span>
                   </div>
                </div>

                {/* Description */}
                <div className="bg-white/80 p-5 rounded-lg border border-gray-200 text-sm font-serif text-gray-700 leading-relaxed text-justify shadow-sm w-full">
                   {profile.description}
                </div>

                {/* Footer Actions */}
                <div className="mt-8 flex gap-3 w-full">
                   <button 
                      onClick={handleClose}
                      className="flex-1 py-2 bg-gray-100 hover:bg-gray-200 text-gray-600 rounded-md font-mono text-xs font-bold transition-colors"
                   >
                      CLOSE
                   </button>
                </div>

             </div>
          </div>

       </div>
    </div>
  );
};