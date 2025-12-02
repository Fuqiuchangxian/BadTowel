import React, { useState } from 'react';
import { SONGS } from '../constants';
import { PlayCircle, FileText, ChevronDown, Info } from 'lucide-react';

const Music: React.FC = () => {
  const [sortDesc, setSortDesc] = useState(true);
  const [expandedLyricsId, setExpandedLyricsId] = useState<string | null>(null);

  const sortedSongs = [...SONGS].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortDesc ? dateB - dateA : dateA - dateB;
  });

  const toggleLyrics = (id: string) => {
    if (expandedLyricsId === id) {
      setExpandedLyricsId(null);
    } else {
      setExpandedLyricsId(id);
    }
  };

  return (
    <div className="animate-in slide-in-from-bottom-4 duration-700 relative">
      
      {/* Header */}
      <div className="flex items-end justify-between border-b border-lapis/20 pb-4 mb-4">
        <div>
          <h1 className="text-3xl font-greek font-bold text-lapis">
             MUSIC LIBRARY
          </h1>
          <p className="font-mono text-xs text-gray-500 mt-1">
             /home/music/audio_files
          </p>
        </div>
        <button 
           onClick={() => setSortDesc(!sortDesc)}
           className="font-mono text-[10px] text-lapis border border-lapis/20 px-3 py-1 rounded hover:bg-lapis hover:text-white transition-colors"
         >
           SORT: {sortDesc ? 'DESC' : 'ASC'}
         </button>
      </div>

      {/* Disclaimer */}
      <div className="flex items-start gap-2 mb-8 bg-lapis/5 p-3 rounded-lg border border-lapis/10 text-xs font-serif text-lapis/80">
         <Info size={14} className="flex-shrink-0 mt-0.5" />
         <p>这个页面仅收录作词作曲均由我主导参与的作品，更多合作作品移步B站。</p>
      </div>

      {/* Song List Grid */}
      <div className="grid grid-cols-1 gap-4">
        {sortedSongs.map((song, idx) => (
          <div 
            key={song.id} 
            className={`group relative bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 cursor-pointer ${expandedLyricsId === song.id ? 'ring-2 ring-lapis/10 shadow-lg' : ''}`}
            onClick={() => toggleLyrics(song.id)}
          >
            {/* Main Row Content */}
            <div className="p-5 flex items-center justify-between gap-4">
               {/* Left: Song Info */}
               <div className="flex items-center gap-5 min-w-0 flex-1">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-full flex items-center justify-center transition-colors ${expandedLyricsId === song.id ? 'bg-lapis text-white' : 'bg-gray-50 text-gray-400 group-hover:bg-lapis/10 group-hover:text-lapis'}`}>
                    <span className="font-mono text-sm font-bold">{String(idx + 1).padStart(2, '0')}</span>
                  </div>
                  <div className="min-w-0">
                    <h2 className="font-serif font-bold text-xl text-ink group-hover:text-lapis transition-colors truncate pr-4">{song.title}</h2>
                    <div className="flex gap-2 text-xs text-gray-500 font-mono mt-1.5 items-center flex-wrap">
                       <span>{song.date}</span>
                       <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                       <span className={`font-bold ${song.status === '未发布' ? 'text-gray-400' : 'text-terracotta'}`}>{song.status}</span>
                       <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
                       <span className="opacity-70 truncate">{song.tags.join(', ')}</span>
                    </div>
                  </div>
               </div>

               {/* Right: Actions (Fixed Alignment) */}
               <div className="flex items-center gap-2 flex-shrink-0">
                 {/* Play Button Slot (Fixed Width) */}
                 <div className="w-10 flex justify-center">
                   {song.url ? (
                     <a 
                       href={song.url}
                       target="_blank"
                       rel="noopener noreferrer"
                       onClick={(e) => e.stopPropagation()} // Prevent expansion when clicking play
                       className="p-2.5 bg-lapis text-white rounded-full hover:bg-terracotta hover:scale-110 active:scale-95 transition-all shadow-md flex items-center justify-center"
                       title="Play on Bilibili/Netease"
                     >
                       <PlayCircle size={20} fill="currentColor" />
                     </a>
                   ) : (
                     <div className="w-10 h-10"></div> /* Placeholder for alignment */
                   )}
                 </div>

                 {/* Chevron Slot (Fixed Width) */}
                 <div className="w-8 flex justify-center">
                   {song.lyrics && (
                     <div 
                       className={`transition-transform duration-300 text-gray-400 group-hover:text-lapis ${expandedLyricsId === song.id ? 'rotate-180' : ''}`}
                     >
                       <ChevronDown size={20} />
                     </div>
                   )}
                 </div>
               </div>
            </div>

            {/* Expandable Lyrics Section */}
            <div 
              className={`grid transition-all duration-500 ease-in-out ${expandedLyricsId === song.id ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <div className="p-6 pt-0">
                  <div className="bg-gray-50 rounded-lg p-8 border border-gray-100 relative">
                     {/* Decorative Note Elements */}
                     <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lapis/20 to-transparent"></div>
                     
                     <div className="flex justify-between items-start mb-6 border-b border-gray-200 pb-4">
                        <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">Lyrics Sheet</span>
                        <FileText size={16} className="text-gray-300" />
                     </div>
                     
                     <div className="font-serif text-ink whitespace-pre-line leading-loose text-center text-lg max-w-2xl mx-auto">
                        {song.lyrics}
                     </div>

                     <div className="mt-8 pt-4 border-t border-gray-200 text-center">
                        <span className="font-greek text-[10px] text-lapis font-bold tracking-[0.2em] opacity-50">BAD TOWEL ORIGINALS</span>
                     </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Music;