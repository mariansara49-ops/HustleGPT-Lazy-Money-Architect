import React, { useState } from 'react';
import { Header } from './components/Header';
import { IdeaCard } from './components/IdeaCard';
import { PlanView } from './components/PlanView';
import { AppState, BusinessIdea, BusinessPlan } from './types';
import { generateLazyIdea, generateExecutionPlan } from './services/geminiService';
import { Sparkles, ArrowRight, Wallet, BrainCircuit, Zap } from 'lucide-react';

const App: React.FC = () => {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [currentIdea, setCurrentIdea] = useState<BusinessIdea | null>(null);
  const [currentPlan, setCurrentPlan] = useState<BusinessPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerateIdea = async () => {
    setAppState(AppState.GENERATING_IDEA);
    setError(null);
    try {
      const idea = await generateLazyIdea();
      setCurrentIdea(idea);
      setAppState(AppState.VIEWING_IDEA);
    } catch (e) {
      console.error(e);
      setError("Failed to generate idea. The AI is sleeping on the job.");
      setAppState(AppState.IDLE);
    }
  };

  const handleGeneratePlan = async () => {
    if (!currentIdea) return;
    setAppState(AppState.GENERATING_PLAN);
    try {
      const plan = await generateExecutionPlan(currentIdea);
      setCurrentPlan(plan);
      setAppState(AppState.VIEWING_PLAN);
    } catch (e) {
      console.error(e);
      setError("Failed to construct blueprint. Try again.");
      setAppState(AppState.VIEWING_IDEA);
    }
  };

  const reset = () => {
    setCurrentIdea(null);
    setCurrentPlan(null);
    setAppState(AppState.IDLE);
  };

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-900 via-slate-950 to-black text-slate-100 font-sans">
      <Header />

      <main className="container mx-auto px-4 py-12 flex flex-col items-center justify-center min-h-[85vh]">
        
        {error && (
          <div className="fixed top-24 right-4 bg-red-500/10 border border-red-500 text-red-200 px-6 py-4 rounded-xl backdrop-blur-md animate-bounce">
            ⚠️ {error}
          </div>
        )}

        {appState === AppState.IDLE && (
          <div className="text-center space-y-8 animate-fade-in max-w-3xl">
            <div className="inline-block p-4 rounded-full bg-emerald-500/5 mb-4 border border-emerald-500/20">
              <BrainCircuit className="w-12 h-12 text-emerald-400 mx-auto" />
            </div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-b from-white to-slate-500">
              Automate Your Income.
            </h1>
            <p className="text-xl text-slate-400 max-w-xl mx-auto leading-relaxed">
              Stop trading time for money. Use AI to generate low-effort, high-yield business ideas and the exact blueprint to execute them.
            </p>
            
            <button
              onClick={handleGenerateIdea}
              className="group relative inline-flex h-16 items-center justify-center overflow-hidden rounded-2xl bg-emerald-600 px-12 font-medium text-white shadow-2xl transition-all duration-300 hover:bg-emerald-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(16,185,129,0.5)] focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2 focus:ring-offset-slate-900"
            >
              <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-100%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(100%)]">
                <div className="relative h-full w-8 bg-white/20"></div>
              </div>
              <span className="flex items-center gap-3 text-lg font-bold">
                <Sparkles size={20} />
                Generate Lazy Money Idea
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
            
            <div className="pt-12 flex justify-center gap-8 text-slate-500 text-sm">
              <div className="flex items-center gap-2">
                <Wallet size={16} /> 100% Free
              </div>
              <div className="flex items-center gap-2">
                <Zap size={16} /> Instant Plans
              </div>
              <div className="flex items-center gap-2">
                <BrainCircuit size={16} /> AI Powered
              </div>
            </div>
          </div>
        )}

        {(appState === AppState.GENERATING_IDEA) && (
          <div className="text-center space-y-6 animate-pulse">
            <div className="w-24 h-24 rounded-full border-4 border-emerald-500/30 border-t-emerald-500 animate-spin mx-auto"></div>
            <h2 className="text-2xl font-bold text-slate-300">Scanning Niche Markets...</h2>
            <p className="text-slate-500">Analyzing trends, arbitrage opportunities, and automation gaps.</p>
          </div>
        )}

        {(appState === AppState.VIEWING_IDEA || appState === AppState.GENERATING_PLAN) && currentIdea && (
          <IdeaCard 
            idea={currentIdea} 
            onGeneratePlan={handleGeneratePlan} 
            isGeneratingPlan={appState === AppState.GENERATING_PLAN} 
          />
        )}

        {appState === AppState.VIEWING_PLAN && currentIdea && currentPlan && (
          <PlanView 
            idea={currentIdea} 
            plan={currentPlan} 
            onReset={reset} 
          />
        )}

      </main>
      
      {/* Background Grid Pattern */}
      <div className="fixed inset-0 z-[-1] pointer-events-none opacity-20" 
           style={{ 
             backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)', 
             backgroundSize: '40px 40px' 
           }}>
      </div>
    </div>
  );
};

export default App;