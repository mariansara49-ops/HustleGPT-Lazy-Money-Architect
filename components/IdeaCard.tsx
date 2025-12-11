import React from 'react';
import { BusinessIdea } from '../types';
import { Battery, DollarSign, Clock, Hash } from 'lucide-react';

interface IdeaCardProps {
  idea: BusinessIdea;
  onGeneratePlan: () => void;
  isGeneratingPlan: boolean;
}

export const IdeaCard: React.FC<IdeaCardProps> = ({ idea, onGeneratePlan, isGeneratingPlan }) => {
  const effortColor = idea.effortLevel === 'Low' ? 'text-emerald-400' : idea.effortLevel === 'Medium' ? 'text-yellow-400' : 'text-red-400';

  return (
    <div className="w-full max-w-2xl mx-auto glass-panel p-8 rounded-2xl shadow-2xl border-t border-emerald-500/20 animate-fade-in relative overflow-hidden group">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>
      
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-4">
          <h2 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-emerald-300 to-cyan-300">
            {idea.title}
          </h2>
          <span className={`px-3 py-1 rounded-full text-xs font-mono border border-slate-700 bg-slate-900 ${effortColor} flex items-center gap-1`}>
            <Battery size={12} className={idea.effortLevel === 'Low' ? 'fill-emerald-400' : ''} />
            {idea.effortLevel} Effort
          </span>
        </div>
        
        <p className="text-slate-300 text-lg mb-8 leading-relaxed">
          {idea.description}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center">
            <DollarSign className="text-emerald-400 mb-2" size={24} />
            <span className="text-slate-400 text-xs uppercase tracking-wider">Revenue Potential</span>
            <span className="text-xl font-bold text-slate-100">{idea.potentialRevenue}</span>
          </div>
          <div className="bg-slate-900/50 p-4 rounded-xl border border-slate-800 flex flex-col items-center justify-center text-center">
            <Clock className="text-blue-400 mb-2" size={24} />
            <span className="text-slate-400 text-xs uppercase tracking-wider">Setup Time</span>
            <span className="text-xl font-bold text-slate-100">{idea.setupTime}</span>
          </div>
        </div>

        <div className="flex gap-2 mb-8 flex-wrap">
          {idea.tags.map(tag => (
            <span key={tag} className="flex items-center gap-1 text-xs text-slate-400 bg-slate-800/50 px-3 py-1.5 rounded-full">
              <Hash size={10} /> {tag}
            </span>
          ))}
        </div>

        <button
          onClick={onGeneratePlan}
          disabled={isGeneratingPlan}
          className="w-full bg-emerald-600 hover:bg-emerald-500 disabled:bg-slate-700 disabled:cursor-not-allowed text-white font-bold py-4 px-6 rounded-xl transition-all duration-300 shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 group/btn"
        >
          {isGeneratingPlan ? (
            <>
              <span className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></span>
              Constructing Blueprint...
            </>
          ) : (
            <>
              Generate Execution Blueprint
              <span className="group-hover/btn:translate-x-1 transition-transform">→</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};