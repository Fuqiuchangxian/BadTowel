import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import { Footer } from './components/Footer';
import { Gamepad2 } from 'lucide-react';
import { GameModal } from './components/GameModal';
import { SystemAlert, AlertProps } from './components/SystemAlert';
import { ProfileModal } from './components/ProfileModal';
import { FortuneModal } from './components/FortuneModal';
import { Fortune } from './types';
import Home from './pages/Home';
import Music from './pages/Music';
import Portfolio from './pages/Portfolio';
import FortunePage from './pages/Fortune';
import About from './pages/About';
import Commission from './pages/Commission';
import Todo from './pages/Todo';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    const mainContent = document.getElementById('main-content-scroll');
    if (mainContent) mainContent.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

// Extracted for animation logic: need useLocation hook
const AnimatedContent = () => {
  const location = useLocation();

  return (
    <div key={location.pathname} className="animate-page-enter flex flex-col min-h-full">
      <Routes location={location}>
        <Route path="/" element={<Home />} />
        <Route path="/music" element={<Music />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/todo" element={<Todo />} />
        <Route path="/fortune" element={<FortunePage />} />
        <Route path="/commission" element={<Commission />} />
        <Route path="/about" element={<About />} />
      </Routes>
      <Footer />
    </div>
  );
};

const App: React.FC = () => {
  const [isGameOpen, setIsGameOpen] = useState(false);
  const [profileId, setProfileId] = useState<string | null>(null);
  const [fortuneResult, setFortuneResult] = useState<Fortune | null>(null);
  const [alerts, setAlerts] = useState<Omit<AlertProps, 'onClose'>[]>([]);

  // System Alert Handler
  const spawnAlert = (title: string, message: string, type: 'info' | 'warning' | 'error' = 'info') => {
    const id = Date.now().toString() + Math.random().toString();
    // Random position near center but scattered
    const x = window.innerWidth / 2 - 150 + (Math.random() * 100 - 50);
    const y = window.innerHeight / 2 - 100 + (Math.random() * 100 - 50);
    
    setAlerts(prev => [...prev, { id, title, message, type, x, y }]);
  };

  const removeAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id));
  };

  useEffect(() => {
    // Listen for custom events from other components
    const handleCustomAlert = (e: any) => {
      const { title, message, type } = e.detail || {};
      if (title && message) {
        spawnAlert(title, message, type);
      }
    };

    const handleOpenProfile = (e: any) => {
      const { id } = e.detail || {};
      if (id) {
        setProfileId(id);
      }
    };

    const handleShowFortune = (e: any) => {
      const { fortune } = e.detail || {};
      if (fortune) {
        setFortuneResult(fortune);
      }
    };

    window.addEventListener('badtowel-os-alert', handleCustomAlert);
    window.addEventListener('badtowel-open-profile', handleOpenProfile);
    window.addEventListener('badtowel-show-fortune', handleShowFortune);
    
    return () => {
      window.removeEventListener('badtowel-os-alert', handleCustomAlert);
      window.removeEventListener('badtowel-open-profile', handleOpenProfile);
      window.removeEventListener('badtowel-show-fortune', handleShowFortune);
    };
  }, []);

  // Easter Egg Click Handlers
  const handleTrafficLight = (color: string) => {
    if (color === 'red') spawnAlert('系统警告', '无法终止核心进程。抵抗是徒劳的。', 'error');
    if (color === 'yellow') spawnAlert('请等待', '正在最小化宇宙... 预计耗时 40 亿年。', 'warning');
    if (color === 'green') spawnAlert('系统消息', '当前元气值已达到最大上限。', 'info');
  };

  const handleTitleClick = () => {
    spawnAlert('进程信息', `PID: ${Math.floor(Math.random() * 9999)} 正在运行 BadTowel_OS kernel v2.1`, 'info');
  };

  const handleMemClick = () => {
    spawnAlert('内存状态', '垃圾回收挂起中... 请勿投喂代码猫。', 'warning');
  };

  const handleVerClick = () => {
    spawnAlert('系统更新', '正在检查更新... \n\n错误：未找到 "未来" 版本。', 'error');
  };

  return (
    <Router>
      <ScrollToTop />
      
      {/* OS Desktop Container - Vibrant Blue-Green "Vitality" Theme */}
      <div className="fixed inset-0 w-full h-full bg-gradient-to-br from-cyan-400 via-teal-500 to-emerald-500 animate-gradient-xy overflow-hidden flex items-center justify-center p-4 md:p-8">
        
        {/* Alerts Layer */}
        {alerts.map(alert => (
          <SystemAlert 
            key={alert.id}
            {...alert}
            onClose={removeAlert}
          />
        ))}

        {/* Mini Game Modal */}
        {isGameOpen && <GameModal onClose={() => setIsGameOpen(false)} />}

        {/* Profile Viewer Modal */}
        {profileId && <ProfileModal profileId={profileId} onClose={() => setProfileId(null)} />}

        {/* Fortune Result Modal */}
        {fortuneResult && <FortuneModal fortune={fortuneResult} onClose={() => setFortuneResult(null)} />}

        {/* The Window Frame */}
        {/* Fixed Width Logic: w-full with max-w ensures it takes available space up to 1400px. 
            Flex-none prevents it from squishing based on content. */}
        <div className="w-full max-w-[1400px] h-full max-h-[900px] bg-parchment rounded-xl shadow-2xl flex flex-col overflow-hidden border border-white/40 ring-1 ring-black/5 animate-pop-in relative z-10 backdrop-blur-sm flex-none">
          
          {/* Window Title Bar */}
          <div className="bg-[#e5e5e5]/90 h-10 flex items-center justify-between px-4 border-b border-gray-300 select-none z-50 backdrop-blur-md flex-none">
            {/* Traffic Lights */}
            <div className="flex gap-2">
              <div onClick={() => handleTrafficLight('red')} className="w-3 h-3 rounded-full bg-[#FF5F57] border border-[#E0443E] shadow-sm hover:scale-110 active:scale-90 transition-transform cursor-pointer"></div>
              <div onClick={() => handleTrafficLight('yellow')} className="w-3 h-3 rounded-full bg-[#FEBC2E] border border-[#D89E24] shadow-sm hover:scale-110 active:scale-90 transition-transform cursor-pointer"></div>
              <div onClick={() => handleTrafficLight('green')} className="w-3 h-3 rounded-full bg-[#28C840] border border-[#1AAB29] shadow-sm hover:scale-110 active:scale-90 transition-transform cursor-pointer"></div>
            </div>

            {/* Title */}
            <div onClick={handleTitleClick} className="font-mono text-xs text-gray-500 font-bold flex items-center gap-2 cursor-help hover:text-lapis transition-colors">
              <span className="w-2 h-2 bg-lapis rounded-sm animate-pulse"></span>
              The_Bad_Towel_Chronicle.app
            </div>

            {/* Empty Right (for balance) */}
            <div className="w-16"></div>
          </div>

          {/* App Body - The "Newspaper" */}
          <div className="flex flex-grow overflow-hidden relative w-full">
             
             {/* Navigation Sidebar */}
             <aside className="hidden md:flex flex-col w-64 lg:w-72 bg-[#f4f4f5] border-r border-gray-300 z-40 flex-none">
                <Navigation />
             </aside>

             {/* Main Content Area */}
             <main id="main-content-scroll" className="flex-grow overflow-y-auto bg-parchment relative w-full">
               {/* Decorative Greek Top Border inside content */}
               <div className="sticky top-0 z-30 w-full h-1 bg-lapis opacity-50"></div>

               <div className="md:hidden">
                 <Navigation isMobile />
               </div>

               <div className="p-6 md:p-12 lg:p-16 max-w-5xl mx-auto min-h-full flex flex-col">
                  {/* Using AnimatedContent to trigger animation on route change */}
                  <AnimatedContent />
               </div>

             </main>
          </div>

          {/* OS Status Bar */}
          <div className="h-8 bg-[#e5e5e5] border-t border-gray-300 text-gray-600 text-[10px] font-mono flex items-center justify-between px-2 z-50 flex-none select-none">
             
             {/* Left: Game Launcher (Start Menu Style) */}
             <div className="flex items-center">
               <button 
                 onClick={() => setIsGameOpen(true)}
                 className={`flex items-center gap-2 px-3 py-1 rounded transition-colors ${isGameOpen ? 'bg-gray-300 text-lapis inner-shadow' : 'hover:bg-gray-200 text-gray-700'}`}
                 title="Launch Ouroboros"
               >
                 <Gamepad2 size={14} className={isGameOpen ? "animate-pulse" : ""} />
                 <span className="font-bold">GAME.EXE</span>
               </button>
               <div className="w-px h-4 bg-gray-400 mx-2"></div>
               <span className="hidden sm:inline opacity-70">READY</span>
             </div>

             {/* Right: System Info */}
             <div className="flex items-center gap-4 cursor-default">
                <span onClick={handleMemClick} className="hover:text-terracotta active:scale-95 cursor-help transition-all">MEM: 64KB OK</span>
                <span onClick={handleVerClick} className="hover:text-terracotta active:scale-95 cursor-help transition-all">V 2.1.0 (VITALITY)</span>
             </div>
          </div>

        </div>
      </div>
    </Router>
  );
};

export default App;
