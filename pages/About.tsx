import React from 'react';
import { Users, Folder } from 'lucide-react';
import { FRIENDS } from '../constants';

const About: React.FC = () => {

  const openProfile = (id: string) => {
    const event = new CustomEvent('badtowel-open-profile', { 
      detail: { id } 
    });
    window.dispatchEvent(event);
  };

  return (
    <div className="max-w-3xl mx-auto py-8 relative">
       
       {/* Letter Header */}
       <div className="flex justify-between items-end border-b-2 border-lapis pb-4 mb-12">
          <div>
            <h1 className="text-5xl font-greek font-bold text-lapis">MANIFESTO</h1>
            <p className="font-old text-verdigris mt-2">“Don't let it go, let it flow.”</p>
          </div>
          <div className="text-right font-old text-sm text-gray-500 hidden md:block">
             <p>From the Desk of</p>
             <p className="font-bold text-ink">BAD TOWEL</p>
          </div>
       </div>

       {/* Letter Body */}
       <div className="font-serif text-lg leading-loose text-ink space-y-8 text-justify">
          <div>
            <span className="font-greek font-bold text-2xl text-lapis block mb-6">DEAR VISITOR,</span>
            <p>我们生活在一个噪声时代。数据流、无休止的通知，以及优化生存每一秒的压力。至少我有些不堪其扰。</p>
          </div>
          
          <p>
            在这里，我想建立一个有意思的网站。感谢gemini老师，和他一起搭建并且正在不断优化这个站点。<span className="font-bold text-lapis bg-lapis/5 px-1">似乎找点事情干，就能遮盖一些焦躁和无意义感。</span>先不论这种将“不无聊”当作止痛药的做法长久来看是否合适，但比起被动地信息淹没，<span className="font-bold text-lapis">主动去选择需要的信息</span>似乎已经是我当下能想到的最优解了。
          </p>

          <blockquote className="border-l-4 border-terracotta pl-6 py-4 my-8 bg-gradient-to-r from-terracotta/10 to-transparent italic font-bold text-2xl text-lapis font-old">
            “知之匪艰，行之惟艰。”
          </blockquote>

          <p>
            <span className="border-b-2 border-verdigris/30">至少去做点什么，先去做，然后知。</span>屡试不爽的方法。
          </p>

          <p>
            这个网站加入了一些有意思的功能，如果你能在某个游戏中得分超过300（破纪录后逐步提升）的话，可以直接联系我，请你吃顿饭。当然也可以v你50。
          </p>
          
          <p>
            嗯...不说无限学习这种我做不到的口号，但至少在我情绪正常的时候我希望我能够点亮更多的技能树，找一些感兴趣的升一些等级。
          </p>
          
          <p className="font-bold text-lapis text-xl mt-8">
            让我们一起拥抱这个美丽、庸俗、无趣而又令人兴奋的未来。
          </p>
       </div>

       {/* Signature Section */}
       <div className="mt-16 mb-24 flex justify-end">
          <div className="text-center transform rotate-2">
             <p className="font-old italic mb-4 text-gray-600">Sincerely,</p>
             <div className="font-greek text-5xl text-lapis font-bold border-b-2 border-dashed border-lapis/30 pb-2 inline-block">
               Bad Towel
             </div>
             <p className="font-mono text-xs text-gray-400 mt-2 tracking-widest uppercase">放一段文字用来排版</p>
          </div>
       </div>

       {/* Friends Section - "The Circle" */}
       <div className="border-t-4 border-double border-lapis pt-8 animate-in slide-in-from-bottom-8 duration-700">
          <div className="flex items-center gap-3 mb-4">
             <Users size={24} className="text-terracotta" />
             <h2 className="font-greek text-2xl font-bold text-lapis tracking-widest">THE CIRCLE</h2>
             <span className="h-px flex-grow bg-lapis/20"></span>
          </div>

          <p className="font-serif text-sm text-gray-500 mb-8 italic pl-1">
             应友人要求加入这个板块。如果我的任何一个朋友想要加入这里，可以找我，发我一份你的自我介绍，或者由我来介绍你。
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
             {/* Friend File Folder (Click Trigger) */}
             {FRIENDS.map((friend) => (
                <button 
                  key={friend.id}
                  onClick={() => openProfile(friend.id)}
                  className="flex flex-col items-center group p-4 rounded-xl hover:bg-white/50 hover:shadow-lg transition-all text-center border border-transparent hover:border-lapis/10 active:scale-95"
                >
                   <Folder size={48} className="text-lapis/80 group-hover:text-terracotta transition-colors mb-2 fill-current" />
                   <span className="font-mono text-xs font-bold text-gray-600 group-hover:bg-lapis group-hover:text-white px-2 py-0.5 rounded transition-colors">
                     {friend.name}.profile
                   </span>
                </button>
             ))}

             {/* Placeholder */}
             <div className="flex flex-col items-center justify-center p-4 opacity-40 hover:opacity-60 transition-opacity cursor-not-allowed">
                <div className="w-12 h-12 border-2 border-dashed border-gray-400 rounded-xl flex items-center justify-center mb-2">
                   <span className="text-2xl text-gray-400">+</span>
                </div>
                <span className="font-mono text-[10px] text-gray-500">ADD_NEW...</span>
             </div>
          </div>
       </div>

    </div>
  );
};

export default About;