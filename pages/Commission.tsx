import React from 'react';
import { BadgePercent, Video, Music, Mic2, AlertCircle, HeartHandshake, Mail, MessageSquare } from 'lucide-react';

const Commission: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-1000">
      
      {/* Header */}
      <div className="border-b-4 border-double border-lapis pb-6 mb-12">
        <h1 className="text-4xl md:text-6xl font-greek font-black text-lapis tracking-tighter mb-4">
          COMMISSION RATES
        </h1>
        <p className="font-serif italic text-xl text-verdigris flex items-center gap-2">
          <span className="h-px w-8 bg-verdigris inline-block"></span>
          Exchange of Value
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Intro & Terms */}
        <div className="lg:col-span-4 space-y-8">
          
          {/* Intro Text */}
          <div className="prose prose-lg font-serif text-ink text-justify leading-relaxed">
             <p className="first-letter:text-5xl first-letter:font-greek first-letter:text-lapis first-letter:float-left first-letter:mr-2 first-letter:mt-[-0.2rem]">
               你好，这个页面展示我的大致委托价位。
             </p>
             <p>
               以下价位主要适用于<span className="font-bold text-lapis">唱歌假人（Vocaloid/SynthV等）</span>相关项目。如果是真人（含VTuber）项目，费用会根据具体情况向上浮动。
             </p>
             <p>
               当然，如果你是我列表or关注的老师，随时欢迎来合作。
             </p>
          </div>

          {/* Contact Box */}
          <div className="bg-lapis/5 border border-lapis/10 p-6 rounded-lg">
             <h3 className="font-greek font-bold text-lapis text-lg mb-4 flex items-center gap-2">
               <Mail size={20} /> CONTACT ME
             </h3>
             <div className="space-y-4">
                <a href="mailto:lilunjinzhi@outlook.com" className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-md hover:border-lapis hover:text-lapis transition-colors group">
                   <Mail size={18} className="text-gray-400 group-hover:text-lapis" />
                   <div className="overflow-hidden">
                      <span className="block text-xs font-mono text-gray-500 uppercase">Email</span>
                      <span className="font-serif font-bold text-sm truncate w-full block">lilunjinzhi@outlook.com</span>
                   </div>
                </a>
                <a href="https://message.bilibili.com/#/whisper/mid450125093" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-md hover:border-pink-400 hover:text-pink-500 transition-colors group">
                   <MessageSquare size={18} className="text-gray-400 group-hover:text-pink-400" />
                   <div>
                      <span className="block text-xs font-mono text-gray-500 uppercase">Bilibili</span>
                      <span className="font-serif font-bold text-sm">私信 (UID: 450125093)</span>
                   </div>
                </a>
             </div>
          </div>

          {/* Policy Box: Student Discount */}
          <div className="bg-terracotta/5 border border-terracotta/20 p-6 rounded-lg relative overflow-hidden group">
             <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity transform rotate-12">
                <BadgePercent size={80} className="text-terracotta" />
             </div>
             <h3 className="font-greek font-bold text-terracotta text-lg mb-2 flex items-center gap-2">
               <HeartHandshake size={20} /> STUDENT GRANT
             </h3>
             <p className="font-serif text-sm text-ink/80 leading-relaxed">
               因为自己在初高中的时候受到了很多人的帮助，所以如果你是<span className="font-bold underline decoration-terracotta decoration-2 underline-offset-2">中学生</span>，所有稿价均可<span className="font-bold text-terracotta">减半</span>。
             </p>
          </div>

          {/* Policy Box: No Free Work */}
          <div className="bg-gray-100 p-6 rounded-lg border-l-4 border-gray-400">
             <h3 className="font-greek font-bold text-gray-600 text-lg mb-2 flex items-center gap-2">
                <AlertCircle size={20} /> PRO BONO POLICY
             </h3>
             <p className="font-serif text-sm text-gray-600 leading-relaxed">
                不接无偿。确实遇到了一些神人，所以收费的目的是做一个过滤。希望你能理解这份对时间和精力的尊重。
             </p>
          </div>

          {/* Delivery Terms */}
          <div className="font-mono text-xs text-gray-500 pt-6 border-t border-gray-200">
             <p className="mb-2 font-bold uppercase tracking-wider">Terms of Service:</p>
             <ul className="list-disc pl-4 space-y-1">
               <li>PV交付: 1080p 30fps .mp4</li>
               <li>音频交付: 高质量 .wav</li>
               <li>修改: 大改x1, 小改x3</li>
               <li>版权: 默认不可商用 (商用请私信)</li>
               <li>其余类别(词曲编等)暂仅对亲友开放</li>
             </ul>
          </div>

        </div>

        {/* Right Column: Pricing Cards */}
        <div className="lg:col-span-8 space-y-8">
           
           {/* Section 1: Visual Arts */}
           <div>
              <div className="flex items-center gap-3 mb-6">
                 <Video size={24} className="text-lapis" />
                 <h2 className="font-greek text-2xl font-bold text-lapis tracking-wide">VISUAL PRODUCTION (PV)</h2>
                 <span className="h-px flex-grow bg-lapis/20"></span>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Card 1 */}
                 <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-verdigris"></div>
                    <h3 className="font-serif font-bold text-xl text-ink mb-2">简单一图流</h3>
                    <p className="text-xs text-gray-500 mb-6 font-mono h-8">基础动效，适合注重音乐本身的展示。</p>
                    
                    <div className="flex items-baseline gap-1">
                       <span className="text-3xl font-greek font-bold text-lapis">30-50</span>
                       <span className="text-xs font-mono text-gray-500">CNY / min</span>
                    </div>
                 </div>

                 {/* Card 2 */}
                 <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-terracotta"></div>
                    <h3 className="font-serif font-bold text-xl text-ink mb-2">进阶 PV</h3>
                    <p className="text-xs text-gray-500 mb-6 font-mono h-8">含多张曲绘切换、人物动态效果、复杂排版。</p>
                    
                    <div className="flex items-baseline gap-1">
                       <span className="text-3xl font-greek font-bold text-lapis">40-130</span>
                       <span className="text-xs font-mono text-gray-500">CNY / min</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Section 2: Audio Engineering */}
           <div>
              <div className="flex items-center gap-3 mb-6">
                 <Music size={24} className="text-lapis" />
                 <h2 className="font-greek text-2xl font-bold text-lapis tracking-wide">AUDIO ENGINEERING</h2>
                 <span className="h-px flex-grow bg-lapis/20"></span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Card 3 */}
                 <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-lapis"></div>
                    <div className="flex justify-between items-start">
                       <h3 className="font-serif font-bold text-xl text-ink mb-2">混音 Mixing</h3>
                       <span className="px-2 py-0.5 bg-gray-100 text-[10px] font-bold text-gray-500 rounded">10轨以内</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-6 font-mono h-8">人声修整、混响、均衡、母带处理。</p>
                    
                    <div className="flex items-baseline gap-1">
                       <span className="text-3xl font-greek font-bold text-lapis">50-100</span>
                       <span className="text-xs font-mono text-gray-500">CNY / Song</span>
                    </div>
                 </div>

                 {/* Card 4 */}
                 <div className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                    <div className="absolute top-0 left-0 w-1 h-full bg-purple-600"></div>
                     <div className="flex justify-between items-start">
                       <h3 className="font-serif font-bold text-xl text-ink mb-2">ACE 语调校</h3>
                       <Mic2 size={16} className="text-purple-600" />
                    </div>
                    <p className="text-xs text-gray-500 mb-6 font-mono h-8">让虚拟歌手唱出更真实的情感与技巧。</p>
                    
                    <div className="flex items-baseline gap-1">
                       <span className="text-3xl font-greek font-bold text-lapis">5-25</span>
                       <span className="text-xs font-mono text-gray-500">CNY / 10s</span>
                    </div>
                 </div>
              </div>
           </div>

           {/* Decorative Element */}
           <div className="border border-lapis/20 bg-lapis/5 p-8 text-center rounded-lg mt-8">
              <p className="font-greek font-bold text-lapis/40 text-4xl mb-2">Ω</p>
              <p className="font-serif text-sm italic text-gray-600">
                "Quality is not an act, it is a habit."
              </p>
           </div>

        </div>
      </div>
    </div>
  );
};

export default Commission;