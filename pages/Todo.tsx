
import React, { useState, useEffect, useMemo } from 'react';
import { Plus, Trash2, CheckCircle2, Circle, Calendar, ArrowUpDown, Clock, Filter } from 'lucide-react';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
  targetDate?: string; // ISO string for the specific deadline/time
}

type SortMode = 'CREATED' | 'DATE_ASC' | 'DATE_DESC';

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [sortMode, setSortMode] = useState<SortMode>('CREATED');

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('badtowel-agenda');
    const savedSort = localStorage.getItem('badtowel-agenda-sort');
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse todos', e);
      }
    }
    if (savedSort) {
      setSortMode(savedSort as SortMode);
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('badtowel-agenda', JSON.stringify(todos));
    localStorage.setItem('badtowel-agenda-sort', sortMode);
  }, [todos, sortMode]);

  const addTodo = () => {
    if (!inputValue.trim()) return;
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
      createdAt: Date.now(),
      targetDate: targetDate || undefined
    };
    setTodos([newTodo, ...todos]);
    setInputValue('');
    setTargetDate('');
  };

  const toggleTodo = (id: string) => {
    setTodos(todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const deleteTodo = (id: string) => {
    setTodos(todos.filter(t => t.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') addTodo();
  };

  // Memoized sorted list
  const sortedTodos = useMemo(() => {
    const list = [...todos];
    switch (sortMode) {
      case 'DATE_ASC':
        return list.sort((a, b) => {
          if (!a.targetDate) return 1;
          if (!b.targetDate) return -1;
          return new Date(a.targetDate).getTime() - new Date(b.targetDate).getTime();
        });
      case 'DATE_DESC':
        return list.sort((a, b) => {
          if (!a.targetDate) return 1;
          if (!b.targetDate) return -1;
          return new Date(b.targetDate).getTime() - new Date(a.targetDate).getTime();
        });
      case 'CREATED':
      default:
        return list.sort((a, b) => b.createdAt - a.createdAt);
    }
  }, [todos, sortMode]);

  const formatDate = (dateStr?: string) => {
    if (!dateStr) return null;
    const date = new Date(dateStr);
    return date.toLocaleString('zh-CN', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="animate-in fade-in duration-1000 max-w-3xl mx-auto pb-20">
      {/* Apple-style Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 border-b border-gray-200 pb-8">
        <div>
          <h1 className="text-5xl font-greek font-black text-lapis tracking-tighter mb-2">
            AGENDA
          </h1>
          <p className="font-serif italic text-lg text-verdigris">
            "Your mind is for having ideas, not holding them."
          </p>
        </div>
        
        {/* Sort Controls - Apple Segmented Control Style */}
        <div className="flex bg-gray-100 p-1 rounded-xl border border-gray-200 shadow-inner overflow-x-auto no-scrollbar">
          <button 
            onClick={() => setSortMode('CREATED')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${sortMode === 'CREATED' ? 'bg-white text-lapis shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            最近添加
          </button>
          <button 
            onClick={() => setSortMode('DATE_ASC')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${sortMode === 'DATE_ASC' ? 'bg-white text-lapis shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            时间正序
          </button>
          <button 
            onClick={() => setSortMode('DATE_DESC')}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap ${sortMode === 'DATE_DESC' ? 'bg-white text-lapis shadow-sm' : 'text-gray-500 hover:text-gray-700'}`}
          >
            时间倒序
          </button>
        </div>
      </div>

      {/* Input Section - Apple Notes Inspired */}
      <div className="bg-white/70 backdrop-blur-md border border-gray-200 rounded-2xl p-4 shadow-sm mb-12 ring-1 ring-black/5 hover:ring-lapis/20 transition-all">
        <div className="flex flex-col gap-4">
          <div className="flex items-center gap-3 px-2">
            <Plus size={20} className="text-gray-400" />
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="添加新备忘..."
              className="flex-1 bg-transparent outline-none font-serif text-xl text-ink placeholder-gray-300"
            />
          </div>
          
          <div className="flex items-center justify-between border-t border-gray-100 pt-3 px-2">
            <div className="flex items-center gap-4 text-gray-400">
              <div className="flex items-center gap-2 hover:text-lapis transition-colors relative group">
                <Calendar size={16} />
                <input 
                  type="datetime-local" 
                  value={targetDate}
                  onChange={(e) => setTargetDate(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer"
                />
                <span className="text-xs font-mono font-bold tracking-tight">
                  {targetDate ? formatDate(targetDate) : '选择时间'}
                </span>
              </div>
            </div>
            
            <button
              onClick={addTodo}
              disabled={!inputValue.trim()}
              className={`px-6 py-2 rounded-full font-bold text-sm tracking-wider transition-all shadow-sm ${inputValue.trim() ? 'bg-lapis text-white hover:scale-105 active:scale-95' : 'bg-gray-100 text-gray-300 cursor-not-allowed'}`}
            >
              完成
            </button>
          </div>
        </div>
      </div>

      {/* List Area - Clean Minimalist Style */}
      <div className="space-y-3">
        {sortedTodos.length === 0 ? (
          <div className="text-center py-20 opacity-30 select-none">
            <div className="w-16 h-16 border-2 border-dashed border-gray-400 rounded-full flex items-center justify-center mx-auto mb-4">
              <Plus size={32} />
            </div>
            <p className="font-greek text-2xl text-lapis uppercase tracking-widest">Nothing Planned</p>
            <p className="font-serif italic">享受此刻的清闲</p>
          </div>
        ) : (
          sortedTodos.map(todo => (
            <div 
              key={todo.id} 
              className={`group bg-white border border-gray-100 rounded-2xl p-5 shadow-sm transition-all hover:shadow-md hover:border-gray-200 flex items-start gap-4 ${todo.completed ? 'opacity-50 grayscale-[0.5]' : ''}`}
            >
              {/* Checkbox */}
              <button 
                onClick={() => toggleTodo(todo.id)}
                className={`mt-1 transition-all transform active:scale-75 ${todo.completed ? 'text-verdigris' : 'text-gray-300 hover:text-lapis'}`}
              >
                {todo.completed ? <CheckCircle2 size={24} fill="currentColor" className="text-verdigris" /> : <Circle size={24} strokeWidth={1.5} />}
              </button>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={`font-serif text-lg leading-snug break-words ${todo.completed ? 'line-through text-gray-400 decoration-1' : 'text-ink font-medium'}`}>
                  {todo.text}
                </p>
                
                <div className="flex items-center gap-4 mt-2">
                  {todo.targetDate && (
                    <div className={`flex items-center gap-1 text-[10px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded ${new Date(todo.targetDate).getTime() < Date.now() && !todo.completed ? 'bg-terracotta/10 text-terracotta' : 'bg-lapis/5 text-lapis'}`}>
                      <Clock size={10} />
                      {formatDate(todo.targetDate)}
                    </div>
                  )}
                  <div className="text-[10px] font-mono text-gray-400 uppercase tracking-tighter opacity-0 group-hover:opacity-100 transition-opacity">
                    Created {new Date(todo.createdAt).toLocaleDateString()}
                  </div>
                </div>
              </div>

              {/* Delete Button */}
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all p-1 hover:bg-red-50 rounded-lg"
                title="Delete item"
              >
                <Trash2 size={18} />
              </button>
            </div>
          ))
        )}
      </div>

      {/* Stats Summary */}
      <div className="mt-12 pt-8 border-t border-gray-100 text-center">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-50 rounded-full border border-gray-200">
           <Filter size={12} className="text-gray-400" />
           <p className="font-mono text-[10px] text-gray-500 uppercase tracking-widest">
              {todos.filter(t => !t.completed).length} 待办 / {todos.length} 总计
           </p>
        </div>
      </div>
    </div>
  );
};

export default Todo;
