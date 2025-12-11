import React from 'react';
import { Bot, Zap } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 md:px-8 border-b border-slate-800/50 flex justify-between items-center bg-slate-950/50 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <div className="relative">
          <Bot size={32} className="text-emerald-400" />
          <Zap size={14} className="absolute -top-1 -right-1 text-yellow-400 animate-pulse" fill="currentColor" />
        </div>
        <div>
          <h1 className="text-xl font-bold tracking-tight text-white">Hustle<span className="text-emerald-400">GPT</span></h1>
          <p className="text-[10px] text-slate-400 uppercase tracking-widest leading-none">Lazy Money Architect</p>
        </div>
      </div>
      <div className="hidden md:flex items-center gap-4">
        <span className="text-xs text-slate-500 font-mono">v2.5.0-flash</span>
        <div className="h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]"></div>
      </div>
    </header>
  );
};