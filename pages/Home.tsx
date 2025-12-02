import React from 'react';
import { ArrowUpRight, BookOpen, Database } from 'lucide-react';
import { EXTERNAL_LINKS, BOOK_RECOMMENDATIONS } from '../constants';

const Home: React.FC = () => {
  return (
    <div className="animate-in fade-in duration-1000 space-y-16">
      
      {/* Masthead */}
      <header className="text-center border-b-4 border-double border-lapis pb-8 mb-12">
        <div className="flex items-center justify-center gap-4 mb-4">
           <div className="h-px bg-lapis w-1/4"></div>
           <p className="font-greek font-bold text-xs tracking-[0.3em] text-lapis">VOL. II &mdash; NO. 1</p>
           <div className="h-px bg-lapis w-1/4"></div>
        </div>
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-greek font-black text-lapis tracking-tighter leading-none mb-2">
          BAD TOWEL
        </h1>
        <p className="font-serif italic text-2xl text-verdigris mt-4">
          -- This text is used for typesetting --
        </p>
        <div className="mt-6 flex justify-center gap-12 font-old text-sm text-ink/70 border-t border-b border-lapis py-2 w-full max-w-2xl mx-auto">
           <span>BEIJING, CUC</span>
           <span>EST. 2025</span>
           <span>PRICE: FREE</span>
        </div>
      </header>

      {/* Main Content Grid */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Intro Text & Main Features */}
        <div className="lg:col-span-8">
          <div className="mb-6">
             <h2 className="font-greek text-4xl font-bold text-ink mb-2">WHO IS BAD TOWEL?</h2>
             <div className="w-12 h-1 bg-terracotta"></div>
          </div>
          
          <div className="prose prose-lg font-serif text-justify text-ink leading-relaxed mb-12">
            <p className="mb-6">
              <span className="drop-cap">你</span>
              好，这里是 Bad Towel。这个网站主要用来整合我的一些相关信息。
              目前在中传学习广告学（计算广告双学士学位复合型人才培养项目）（对的一定要把全称写出来因为当时就冲着这一长串报的）。
            </p>
            <p className="mb-6">
              梦想是成为很厉害的人（什么方面先别管总之要成为很厉害的人）。
              兴趣爱好有很多虽然都不怎么精但总会在莫名其妙的地方用到一些，怎么不算一种精呢？
              好吧其实下一步的目标就是找到很喜欢的一个方向精进一下。
            </p>
            <p className="font-bold text-lapis border-l-2 border-verdigris pl-4 italic my-4">
               虽然专业性谈不上很好但是总之在前进的路上了就不算差对吧！
            </p>
          </div>

          {/* Special Feature: Feishu Knowledge Base */}
          <div className="my-12 bg-gradient-to-br from-lapis/5 to-transparent border border-lapis/20 rounded-lg overflow-hidden shadow-sm relative group">
             <div className="absolute top-0 left-0 w-1 h-full bg-lapis"></div>
             <div className="p-8">
                <div className="flex items-center gap-3 mb-4">
                   <div className="p-2 bg-lapis text-white rounded-md">
                      <Database size={24} />
                   </div>
                   <h3 className="font-greek text-2xl font-bold text-lapis">THE KNOWLEDGE BASE</h3>
                </div>
                
                <div className="font-serif text-ink space-y-4 mb-6 leading-relaxed text-sm md:text-base">
                   <p>
                     <span className="font-bold text-lapis">这个飞书知识库里面是我的数据科学相关的笔记。</span>（其实不只是这些，已经扔了一些其他课程的笔记结课作业知识图谱等等）
                   </p>
                   <p>
                     可以作为一个个人资产的沉淀吧或许，因为脑子不太好使所以偶尔翻出来看看总会有一些新的收获和问题。
                   </p>
                   <p>
                     如果你想入门数据科学或者说想了解一下，可以点击这个入口。因为我觉得笔记就是要让人看懂的而不是教材ultra版所以完全是拿自己当傻子讲给自己听的。
                   </p>
                </div>

                <a 
                  href="https://ai.feishu.cn/wiki/space/7570313962270310404?ccm_open_type=lark_wiki_spaceLink&open_tab_from=wiki_home"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-lapis text-white px-6 py-3 rounded-md font-bold text-sm tracking-wider hover:bg-terracotta transition-colors shadow-md"
                >
                  ACCESS DATABASE <ArrowUpRight size={16} />
                </a>
             </div>
             {/* Decorative Background Icon */}
             <Database className="absolute -bottom-4 -right-4 text-lapis opacity-5 transform rotate-12" size={150} />
          </div>

          {/* Other Links Section */}
          <div className="pt-8 border-t border-lapis">
             <h3 className="font-greek text-2xl text-lapis mb-6 flex items-center">
               <span className="mr-4 text-3xl">☞</span> OTHER LINKS
             </h3>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               {EXTERNAL_LINKS.filter(l => l.title !== '飞书知识库').map((link, i) => (
                 <a 
                   key={i} 
                   href={link.url}
                   target={link.url.startsWith('mailto:') ? undefined : "_blank"}
                   rel="noopener noreferrer"
                   className="block p-6 border border-lapis/30 bg-white hover:bg-lapis hover:text-parchment transition-all group shadow-sm hover:shadow-md rounded-lg"
                 >
                   <div className="flex justify-between items-start mb-2">
                     <h4 className="font-bold font-serif text-lg decoration-verdigris underline decoration-2 underline-offset-4 group-hover:decoration-parchment">
                       {link.title}
                     </h4>
                     <ArrowUpRight size={18} />
                   </div>
                   <p className="text-sm font-serif opacity-80 leading-relaxed truncate">
                     {link.description}
                   </p>
                 </a>
               ))}
             </div>
          </div>
        </div>

        {/* Right Column: Sidebar / Books / Visuals */}
        <div className="lg:col-span-4 space-y-12">
          
          {/* Books Section - Styled as a Library List */}
          <div className="border-4 double border-lapis p-6 bg-white/40 shadow-sm">
             <div className="text-center mb-6">
                <BookOpen className="mx-auto text-verdigris mb-2" size={32} />
                <h3 className="font-greek text-xl font-bold border-b border-lapis inline-block pb-1">
                  THE LIBRARY
                </h3>
             </div>
             <ul className="space-y-4">
               {BOOK_RECOMMENDATIONS.map((book, i) => (
                 <li key={i} className="flex items-start gap-3 border-b border-dashed border-gray-300 pb-2 last:border-0">
                   <span className="font-old text-terracotta italic text-lg">{i+1}.</span>
                   <span className="font-serif text-ink text-sm">{book}</span>
                 </li>
               ))}
             </ul>
             <div className="mt-6 text-center">
               <p className="font-old text-xs italic text-gray-500">
                 "Feel free to share your recommendations."
               </p>
             </div>
          </div>

          {/* Greek Visual Element */}
          <div className="relative border border-lapis p-4 text-center group overflow-hidden bg-lapis/5 rounded-sm">
             <div className="absolute inset-0 bg-lapis opacity-0 group-hover:opacity-10 transition-opacity"></div>
             <div className="border-2 border-lapis p-8">
               <span className="block font-greek text-6xl text-lapis/20 group-hover:text-terracotta transition-colors duration-500">
                 Ω
               </span>
               <p className="mt-4 font-serif font-bold text-lapis">
                 THE BEGINNING &<br/>THE END
               </p>
             </div>
          </div>

        </div>
      </section>

      {/* Skills Footer */}
      <section className="bg-lapis text-parchment p-12 text-center relative overflow-hidden rounded-xl shadow-inner">
         {/* Greek Key Pattern Background */}
         <div className="absolute top-0 left-0 w-full h-4 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Greek_key_pattern_border.svg/1200px-Greek_key_pattern_border.svg.png')] bg-contain opacity-20"></div>
         
         <div className="max-w-2xl mx-auto relative z-10">
            <h3 className="font-greek text-3xl mb-6 text-terracotta">SKILLS & CRAFT</h3>
            <p className="font-serif leading-loose text-lg text-parchment/80">
              除了专业课例如数据相关的一些技能以及音乐相关，我还粗浅地学过 AE、剪映、Blender等。你可以在 B 站见到我的一些产物以外，如果有天你看到 SocialBeta 有条视频结尾署名是毛巾坏的话，那也是我的产物。
            </p>
         </div>

         <div className="absolute bottom-0 left-0 w-full h-4 bg-[url('https://upload.wikimedia.org/wikipedia/commons/thumb/8/80/Greek_key_pattern_border.svg/1200px-Greek_key_pattern_border.svg.png')] bg-contain opacity-20"></div>
      </section>
    </div>
  );
};

export default Home;
