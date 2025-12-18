
import React, { useState, useEffect } from 'react';
import { BrainCircuit, Sparkles, RefreshCcw } from 'lucide-react';
import { WorkoutLog } from '../types';
import { getWorkoutAnalysis } from '../services/geminiService';

interface Props {
  history: WorkoutLog[];
}

const AIInsights: React.FC<Props> = ({ history }) => {
  const [insight, setInsight] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const analyze = async () => {
    setLoading(true);
    const result = await getWorkoutAnalysis(history);
    setInsight(result || '');
    setLoading(false);
  };

  useEffect(() => {
    if (history.length > 0) analyze();
  }, [history]);

  return (
    <div className="space-y-6 animate-in slide-in-from-bottom-5 duration-700">
      <div className="btn-primary p-8 rounded-[2.5rem] text-white card-shadow relative overflow-hidden">
        <Sparkles className="absolute -right-4 -top-4 w-32 h-32 opacity-10 rotate-12" />
        <h2 className="text-2xl font-black mb-1">Dein KI Coach</h2>
        <p className="text-indigo-100 text-sm opacity-80">Persönliche Einblicke basierend auf deiner Leistung.</p>
      </div>

      <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 card-shadow min-h-[300px] flex flex-col items-center justify-center text-center relative">
        {loading ? (
          <div className="space-y-4 flex flex-col items-center">
            <div className="animate-spin text-indigo-500"><BrainCircuit size={48}/></div>
            <p className="text-slate-400 font-bold uppercase text-[10px] tracking-widest">Analysiere Fortschritt...</p>
          </div>
        ) : insight ? (
          <div className="text-left space-y-4 w-full">
            <div className="prose prose-sm text-slate-600 leading-relaxed font-medium whitespace-pre-wrap">
              {insight}
            </div>
            <button onClick={analyze} className="flex items-center gap-2 text-[10px] font-bold text-indigo-500 uppercase tracking-widest mt-6">
              <RefreshCcw size={12} /> Neu generieren
            </button>
          </div>
        ) : (
          <div className="opacity-30 flex flex-col items-center">
            <BrainCircuit size={64} className="mb-4 text-slate-300" />
            <p className="text-sm font-bold uppercase tracking-widest">Keine Daten verfügbar</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AIInsights;
