import React from 'react';
import { Link } from 'react-router-dom';
import { Construction, ArrowUpRight } from 'lucide-react';

const Portfolio: React.FC = () => {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8 border-4 border-dashed border-lapis/20 m-4 bg-white/30 animate-in fade-in duration-700">
      
      <div className="mb-6">
         <Construction size={64} className="text-terracotta mx-auto mb-4 animate-bounce" />
         <h1 className="font-greek text-4xl md:text-5xl font-bold text-lapis mb-2">
           UNDER CONSTRUCTION
         </h1>
         <div className="w-32 h-1 bg-lapis mx-auto"></div>
      </div>
      
      <div className="bg-white/80 backdrop-blur-sm border border-lapis/20 p-8 rounded-xl shadow-lg mb-12 max-w-lg transform rotate-1 transition-transform hover:rotate-0 duration-300">
        <p className="font-serif text-lg mb-6 text-ink leading-relaxed">
           正在建设中。<br/>目前的进度整合在飞书知识库：
        </p>
        <a 
          href="https://ai.feishu.cn/wiki/space/7570313962270310404"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-lapis text-white px-6 py-3 rounded-md font-bold text-sm tracking-wider hover:bg-terracotta transition-colors shadow-md group"
        >
          ACCESS FEISHU WIKI <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
        </a>
      </div>
    </div>
  );
};

export default Portfolio;