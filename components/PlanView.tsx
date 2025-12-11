import React, { useState } from 'react';
import { BusinessIdea, BusinessPlan, GeneratedContent } from '../types';
import { CheckCircle2, Copy, Sparkles, Twitter, Mail, Type } from 'lucide-react';
import { generateMarketingContent } from '../services/geminiService';

interface PlanViewProps {
  idea: BusinessIdea;
  plan: BusinessPlan;
  onReset: () => void;
}

export const PlanView: React.FC<PlanViewProps> = ({ idea, plan, onReset }) => {
  const [activeTab, setActiveTab] = useState<'plan' | 'content'>('plan');
  const [content, setContent] = useState<GeneratedContent | null>(null);
  const [isLoadingContent, setIsLoadingContent] = useState(false);

  const handleGenerateContent = async (type: 'Tweet' | 'Ad Copy' | 'Email') => {
    setIsLoadingContent(true);
    try {
      const res = await generateMarketingContent(idea, type);
      setContent(res);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingContent(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto glass-panel rounded-2xl shadow-2xl overflow-hidden animate-fade-in-up">
      {/* Header */}
      <div className="p-8 border-b border-slate-800 bg-slate-900/50 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white mb-1">{idea.title}</h2>
          <p className="text-emerald-400 text-sm font-mono">BLUEPRINT ACTIVATED</p>
        </div>
        <button 
          onClick={onReset}
          className="text-slate-400 hover:text-white text-sm underline underline-offset-4"
        >
          Scrap this, I need a new idea
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-800">
        <button
          onClick={() => setActiveTab('plan')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === 'plan' 
              ? 'bg-emerald-500/10 text-emerald-400 border-b-2 border-emerald-500' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          Execution Plan
        </button>
        <button
          onClick={() => setActiveTab('content')}
          className={`flex-1 py-4 text-center font-medium transition-colors ${
            activeTab === 'content' 
              ? 'bg-purple-500/10 text-purple-400 border-b-2 border-purple-500' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
          }`}
        >
          AI Content Generator
        </button>
      </div>

      <div className="p-8 min-h-[400px]">
        {activeTab === 'plan' && (
          <div className="space-y-8 animate-fade-in">
            <div className="bg-slate-800/50 p-6 rounded-xl border-l-4 border-emerald-500">
              <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
                <Sparkles size={18} className="text-emerald-400" />
                Strategy Summary
              </h3>
              <p className="text-slate-300 leading-relaxed">{plan.summary}</p>
            </div>

            <div className="space-y-6">
              <h3 className="text-xl font-bold text-white">Action Steps</h3>
              {plan.steps.map((step, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <div className="w-8 h-8 rounded-full bg-slate-800 flex items-center justify-center border border-slate-700 text-emerald-400 font-bold font-mono">
                      {idx + 1}
                    </div>
                  </div>
                  <div>
                    <h4 className="text-lg font-medium text-white mb-1">{step.title}</h4>
                    <p className="text-slate-400 text-sm">{step.details}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-purple-900/20 to-blue-900/20 p-6 rounded-xl border border-purple-500/20">
              <h3 className="text-purple-300 font-bold mb-2 text-sm uppercase tracking-widest">Viral Hook</h3>
              <p className="text-white font-medium italic">"{plan.marketingHook}"</p>
            </div>
          </div>
        )}

        {activeTab === 'content' && (
          <div className="animate-fade-in">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <button
                onClick={() => handleGenerateContent('Tweet')}
                className="p-4 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 hover:border-blue-400 transition-all text-left group"
              >
                <Twitter className="mb-2 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="block font-bold text-white">X Thread / Tweet</span>
                <span className="text-xs text-slate-400">Viral launch post</span>
              </button>
              <button
                onClick={() => handleGenerateContent('Ad Copy')}
                className="p-4 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 hover:border-emerald-400 transition-all text-left group"
              >
                <Type className="mb-2 text-emerald-400 group-hover:scale-110 transition-transform" />
                <span className="block font-bold text-white">Ad Copy</span>
                <span className="text-xs text-slate-400">Facebook/Insta Ads</span>
              </button>
              <button
                onClick={() => handleGenerateContent('Email')}
                className="p-4 bg-slate-800 hover:bg-slate-700 rounded-xl border border-slate-700 hover:border-purple-400 transition-all text-left group"
              >
                <Mail className="mb-2 text-purple-400 group-hover:scale-110 transition-transform" />
                <span className="block font-bold text-white">Cold Email</span>
                <span className="text-xs text-slate-400">B2B Outreach</span>
              </button>
            </div>

            {isLoadingContent && (
              <div className="flex flex-col items-center justify-center h-48 space-y-4">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-500"></div>
                <p className="text-slate-400 animate-pulse">Drafting high-converting copy...</p>
              </div>
            )}

            {!isLoadingContent && content && (
              <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 relative group">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button 
                    onClick={() => navigator.clipboard.writeText(content.text)}
                    className="p-2 bg-slate-800 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700 transition-colors"
                    title="Copy to clipboard"
                  >
                    <Copy size={16} />
                  </button>
                </div>
                <div className="flex items-center gap-2 mb-4 text-slate-400 text-sm uppercase tracking-wider font-semibold border-b border-slate-800 pb-2">
                  {content.type === 'Tweet' && <Twitter size={14} />}
                  {content.type === 'Ad Copy' && <Type size={14} />}
                  {content.type === 'Email' && <Mail size={14} />}
                  Generated Output
                </div>
                <pre className="whitespace-pre-wrap font-sans text-slate-200 leading-relaxed text-sm">
                  {content.text}
                </pre>
              </div>
            )}

            {!isLoadingContent && !content && (
              <div className="text-center text-slate-500 py-12">
                Select a content type above to generate marketing assets instantly.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};