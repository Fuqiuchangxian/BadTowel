import React, { useState, useEffect } from 'react';
import { Plus, Trash2, CheckSquare, Square, PenTool } from 'lucide-react';

interface TodoItem {
  id: string;
  text: string;
  completed: boolean;
  createdAt: number;
}

const Todo: React.FC = () => {
  const [todos, setTodos] = useState<TodoItem[]>([]);
  const [inputValue, setInputValue] = useState('');

  // Load from LocalStorage
  useEffect(() => {
    const saved = localStorage.getItem('badtowel-agenda');
    if (saved) {
      try {
        setTodos(JSON.parse(saved));
      } catch (e) {
        console.error('Failed to parse todos', e);
      }
    }
  }, []);

  // Save to LocalStorage
  useEffect(() => {
    localStorage.setItem('badtowel-agenda', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (!inputValue.trim()) return;
    const newTodo: TodoItem = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      completed: false,
      createdAt: Date.now()
    };
    setTodos([newTodo, ...todos]); // Add to top
    setInputValue('');
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

  return (
    <div className="animate-in fade-in duration-1000 max-w-3xl mx-auto">
      {/* Header */}
      <div className="border-b-4 border-double border-lapis pb-6 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-4xl md:text-6xl font-greek font-black text-lapis tracking-tighter mb-2">
            AGENDA
          </h1>
          <p className="font-serif italic text-lg text-verdigris">
            "Thinking is the soul talking to itself."
          </p>
        </div>
        <div className="font-mono text-xs text-gray-400 text-right hidden sm:block">
          LOCAL_STORAGE :: PERSISTENT<br/>
          /user/data/todo_list.json
        </div>
      </div>

      {/* Input Area */}
      <div className="bg-white border-2 border-lapis rounded-lg p-2 mb-10 flex gap-2 shadow-sm relative group">
        <div className="absolute -left-3 -top-3 bg-terracotta text-white p-1.5 rounded-full transform -rotate-12 shadow-sm">
           <PenTool size={16} />
        </div>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="What needs to be done?"
          className="flex-1 px-4 py-3 font-serif text-lg outline-none bg-transparent placeholder-gray-400 text-ink"
        />
        <button
          onClick={addTodo}
          className="bg-lapis hover:bg-lapis-dark text-white px-6 rounded-md font-greek font-bold tracking-wider transition-colors flex items-center gap-2"
        >
          <Plus size={18} /> ADD
        </button>
      </div>

      {/* List Area */}
      <div className="bg-[url('https://www.transparenttextures.com/patterns/notebook.png')] bg-white/50 border border-gray-300 min-h-[400px] rounded-lg shadow-inner relative p-8">
         {/* Vertical Red Line (Ledger Style) */}
         <div className="absolute top-0 bottom-0 left-12 w-px bg-red-300/50"></div>
         <div className="absolute top-0 bottom-0 left-14 w-px bg-red-300/50"></div>

         {/* Horizontal Lines Background (CSS repeating gradient usually better for notebook lines) */}
         <div className="absolute inset-0 pointer-events-none opacity-20" style={{ backgroundImage: 'linear-gradient(#94a3b8 1px, transparent 1px)', backgroundSize: '100% 2.5rem', marginTop: '2.4rem' }}></div>

         {todos.length === 0 ? (
           <div className="text-center mt-20 opacity-40">
             <p className="font-greek text-2xl text-lapis mb-2">TABULA RASA</p>
             <p className="font-serif italic text-gray-500">The slate is clean.</p>
           </div>
         ) : (
           <ul className="space-y-0 relative z-10">
             {todos.map(todo => (
               <li 
                 key={todo.id} 
                 className={`group flex items-start gap-4 py-2 border-b border-dashed border-gray-200 hover:bg-white/40 transition-colors pl-2 ${todo.completed ? 'opacity-50' : ''}`}
                 style={{ minHeight: '2.5rem' }}
               >
                  <button 
                    onClick={() => toggleTodo(todo.id)}
                    className={`mt-1 transition-colors ${todo.completed ? 'text-verdigris' : 'text-gray-300 hover:text-lapis'}`}
                  >
                    {todo.completed ? <CheckSquare size={20} /> : <Square size={20} />}
                  </button>
                  
                  <span className={`flex-1 font-serif text-lg pt-0.5 break-all ${todo.completed ? 'line-through decoration-terracotta decoration-2' : 'text-ink'}`}>
                    {todo.text}
                  </span>

                  <button 
                    onClick={() => deleteTodo(todo.id)}
                    className="mt-1 text-gray-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
               </li>
             ))}
           </ul>
         )}
      </div>

      <div className="mt-4 text-center">
         <p className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
            Tasks: {todos.filter(t => !t.completed).length} Pending / {todos.length} Total
         </p>
      </div>

    </div>
  );
};

export default Todo;
