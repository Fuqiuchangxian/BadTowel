import React, { useState, useEffect, useRef, useCallback } from 'react';
import { X, Play, RefreshCw, Trophy } from 'lucide-react';

interface GameModalProps {
  onClose: () => void;
}

type Point = { x: number; y: number };
type Direction = 'UP' | 'DOWN' | 'LEFT' | 'RIGHT';

const GRID_SIZE = 20;
const SPEED = 100;

export const GameModal: React.FC<GameModalProps> = ({ onClose }) => {
  const [isClosing, setIsClosing] = useState(false);
  const [gameState, setGameState] = useState<'START' | 'PLAYING' | 'GAME_OVER'>('START');
  const [snake, setSnake] = useState<Point[]>([{ x: 10, y: 10 }]);
  const [food, setFood] = useState<Point>({ x: 15, y: 5 });
  const [direction, setDirection] = useState<Direction>('RIGHT');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  
  const boardRef = useRef<HTMLDivElement>(null);
  const directionRef = useRef<Direction>('RIGHT'); 

  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      onClose();
    }, 300); 
  };

  // Initialize Game
  const startGame = () => {
    setSnake([{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }]);
    setScore(0);
    setDirection('RIGHT');
    directionRef.current = 'RIGHT';
    setGameState('PLAYING');
    generateFood();
  };

  const generateFood = () => {
    const x = Math.floor(Math.random() * GRID_SIZE);
    const y = Math.floor(Math.random() * GRID_SIZE);
    setFood({ x, y });
  };

  const moveSnake = useCallback(() => {
    if (gameState !== 'PLAYING') return;

    setSnake(prevSnake => {
      const head = { ...prevSnake[0] };

      switch (directionRef.current) {
        case 'UP': head.y -= 1; break;
        case 'DOWN': head.y += 1; break;
        case 'LEFT': head.x -= 1; break;
        case 'RIGHT': head.x += 1; break;
      }

      // Check collision with walls
      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameState('GAME_OVER');
        return prevSnake;
      }

      // Check collision with self
      if (prevSnake.some(segment => segment.x === head.x && segment.y === head.y)) {
        setGameState('GAME_OVER');
        return prevSnake;
      }

      const newSnake = [head, ...prevSnake];

      // Check food
      if (head.x === food.x && head.y === food.y) {
        setScore(s => {
          const newScore = s + 10;
          if (newScore > highScore) setHighScore(newScore);
          return newScore;
        });
        generateFood();
      } else {
        newSnake.pop(); // Remove tail
      }

      return newSnake;
    });
  }, [food, gameState, highScore]);

  // Game Loop
  useEffect(() => {
    const gameInterval = setInterval(moveSnake, SPEED);
    return () => clearInterval(gameInterval);
  }, [moveSnake]);

  // Keyboard Controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp': 
          if (directionRef.current !== 'DOWN') {
            setDirection('UP');
            directionRef.current = 'UP';
          }
          break;
        case 'ArrowDown': 
          if (directionRef.current !== 'UP') {
            setDirection('DOWN');
            directionRef.current = 'DOWN';
          }
          break;
        case 'ArrowLeft': 
          if (directionRef.current !== 'RIGHT') {
            setDirection('LEFT');
            directionRef.current = 'LEFT';
          }
          break;
        case 'ArrowRight': 
          if (directionRef.current !== 'LEFT') {
            setDirection('RIGHT');
            directionRef.current = 'RIGHT';
          }
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <div className={`fixed inset-0 z-[100] flex items-center justify-center bg-black/30 backdrop-blur-sm p-4 ${isClosing ? 'animate-out fade-out duration-300' : 'animate-in fade-in duration-300'}`}>
      
      {/* Game Window - Modern Style */}
      <div className={`w-full max-w-md bg-white/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/50 overflow-hidden flex flex-col ${isClosing ? 'animate-pop-out' : 'animate-pop-in'}`}>
        
        {/* Title Bar */}
        <div className="h-12 flex items-center justify-between px-4 border-b border-gray-100 bg-gray-50/50 select-none">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-lapis tracking-wider">OUROBOROS.APP</span>
          </div>
          <button onClick={handleClose} className="hover:bg-red-500 hover:text-white p-1 rounded-full transition-colors text-gray-400">
            <X size={16} />
          </button>
        </div>

        {/* Game Area */}
        <div className="p-6 bg-white flex flex-col items-center">
          
          {/* Score Board */}
          <div className="w-full flex justify-between mb-6">
             <div className="flex flex-col">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Score</span>
                <span className="font-mono text-xl font-bold text-gray-800">{score}</span>
             </div>
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest flex items-center gap-1">
                  <Trophy size={10} /> High
                </span>
                <span className="font-mono text-xl font-bold text-terracotta">{highScore}</span>
             </div>
          </div>

          {/* Canvas Board */}
          <div 
            className="relative bg-gray-50 border border-gray-200 rounded-xl overflow-hidden shadow-inner"
            style={{ 
              width: 300, 
              height: 300,
              backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)',
              backgroundSize: '15px 15px'
            }}
          >
             {/* Snake */}
             {snake.map((segment, i) => (
               <div
                 key={i}
                 className="absolute rounded-sm shadow-sm"
                 style={{
                   width: '15px',
                   height: '15px',
                   left: segment.x * 15,
                   top: segment.y * 15,
                   backgroundColor: i === 0 ? '#1e3a8a' : '#059669', // Head Blue, Body Green
                   zIndex: 10,
                   borderRadius: '4px'
                 }}
               />
             ))}

             {/* Food */}
             <div
               className="absolute rounded-full animate-pulse shadow-sm"
               style={{
                  width: '15px',
                  height: '15px',
                  left: food.x * 15,
                  top: food.y * 15,
                  backgroundColor: '#c2410c',
                  zIndex: 5
               }}
             />

             {/* Overlays - Increased z-index to be strictly on top */}
             {gameState === 'START' && (
               <div className="absolute inset-0 bg-white/60 backdrop-blur-sm flex flex-col items-center justify-center text-center z-50">
                  <h2 className="font-greek font-bold text-3xl text-lapis mb-4 drop-shadow-sm">OUROBOROS</h2>
                  <button 
                    onClick={startGame}
                    className="flex items-center gap-2 bg-lapis text-white px-6 py-2.5 rounded-full shadow-lg hover:bg-terracotta hover:scale-105 active:scale-95 transition-all font-bold text-xs relative z-50 cursor-pointer tracking-wider"
                  >
                    <Play size={14} fill="currentColor" /> START GAME
                  </button>
               </div>
             )}

             {gameState === 'GAME_OVER' && (
                <div className="absolute inset-0 bg-red-50/80 backdrop-blur-sm flex flex-col items-center justify-center text-center z-50">
                  <h2 className="font-greek font-bold text-3xl text-red-900 mb-2">GAME OVER</h2>
                  <p className="font-mono text-red-800 text-sm mb-6">FINAL SCORE: {score}</p>
                  <button 
                    onClick={startGame}
                    className="flex items-center gap-2 bg-white text-red-900 border border-red-200 px-6 py-2.5 rounded-full shadow-lg hover:bg-red-50 hover:border-red-300 transition-all font-bold text-xs relative z-50 cursor-pointer tracking-wider"
                  >
                    <RefreshCw size={14} /> PLAY AGAIN
                  </button>
               </div>
             )}
          </div>

          {/* Controls Hint */}
          <div className="mt-6 text-[10px] font-mono text-gray-400 text-center uppercase tracking-widest">
             Use Arrow Keys to Navigate
          </div>
        </div>
      </div>
    </div>
  );
};