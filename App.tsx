import React, { useState, useEffect } from 'react';
import { 
  LayoutGrid, History, Sparkles, Plus, Trash2, 
  ArrowLeft, CheckCircle2, Settings, Dumbbell
} from 'lucide-react';
import { WorkoutPlan, WorkoutLog, View } from './types';
import PlanList from './components/PlanList';
import WorkoutView from './components/WorkoutView';
import HistoryView from './components/HistoryView';
import AIInsights from './components/AIInsights';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<View>('plans');
  const [plans, setPlans] = useState<WorkoutPlan[]>(() => {
    try {
      const saved = localStorage.getItem('dt_plans');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [history, setHistory] = useState<WorkoutLog[]>(() => {
    try {
      const saved = localStorage.getItem('dt_history');
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [activePlan, setActivePlan] = useState<WorkoutPlan | null>(null);

  useEffect(() => {
    localStorage.setItem('dt_plans', JSON.stringify(plans));
  }, [plans]);

  useEffect(() => {
    localStorage.setItem('dt_history', JSON.stringify(history));
  }, [history]);

  const addPlan = (name: string) => {
    if (!name.trim()) return;
    const newPlan: WorkoutPlan = {
      id: crypto.randomUUID(),
      name,
      exercises: []
    };
    setPlans([...plans, newPlan]);
  };

  const deletePlan = (id: string) => {
    if (confirm('Diesen Plan wirklich löschen?')) {
      setPlans(plans.filter(p => p.id !== id));
    }
  };

  const clearHistory = () => {
    if (confirm('Gesamten Verlauf löschen?')) {
      setHistory([]);
    }
  };

  const startWorkout = (plan: WorkoutPlan) => {
    setActivePlan(plan);
    setCurrentView('workout');
  };

  const finishWorkout = (log: WorkoutLog) => {
    setHistory([log, ...history]);
    setCurrentView('history');
    setActivePlan(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] flex flex-col max-w-md mx-auto shadow-2xl border-x border-slate-100 relative overflow-x-hidden antialiased">
      <header className="glass sticky top-0 z-50 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          {currentView !== 'plans' && (
            <button 
              onClick={() => setCurrentView('plans')} 
              className="p-2 bg-slate-100 rounded-xl active:scale-90 transition-all text-slate-600"
              aria-label="Zurück"
            >
              <ArrowLeft size={18} />
            </button>
          )}
          <div className="flex items-center gap-2">
            <div className="p-2 btn-primary rounded-lg text-white shadow-lg shadow-indigo-100">
              <Dumbbell size={16} />
            </div>
            <h1 className="text-lg font-extrabold tracking-tight text-slate-900">
              DenTrack <span className="gradient-text">Pro</span>
            </h1>
          </div>
        </div>
        <button className="p-2 bg-slate-100 rounded-xl text-slate-400 hover:text-slate-600 transition-colors">
          <Settings size={18} />
        </button>
      </header>

      <main className="flex-1 p-6 pb-32 overflow-y-auto">
        <div className="view-transition">
          {currentView === 'plans' && (
            <PlanList plans={plans} onAdd={addPlan} onDelete={deletePlan} onSelect={startWorkout} />
          )}
          {currentView === 'workout' && activePlan && (
            <WorkoutView plan={activePlan} onFinish={finishWorkout} />
          )}
          {currentView === 'history' && (
            <>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Dein Verlauf</h2>
                {history.length > 0 && (
                  <button 
                    onClick={clearHistory} 
                    className="text-[10px] font-bold text-red-500 uppercase tracking-widest px-3 py-1 bg-red-50 rounded-full"
                  >
                    Leeren
                  </button>
                )}
              </div>
              <HistoryView history={history} />
            </>
          )}
          {currentView === 'insights' && <AIInsights history={history} />}
        </div>
      </main>

      <nav className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] max-w-[380px] bg-white/80 backdrop-blur-2xl border border-white/40 rounded-[2.5rem] p-2 flex justify-around shadow-[0_20px_50px_rgba(0,0,0,0.1)] z-50">
        <NavBtn active={currentView === 'plans'} onClick={() => setCurrentView('plans')} icon={<LayoutGrid size={20}/>} label="Pläne" />
        <NavBtn active={currentView === 'history'} onClick={() => setCurrentView('history')} icon={<History size={20}/>} label="Verlauf" />
        <NavBtn active={currentView === 'insights'} onClick={() => setCurrentView('insights')} icon={<Sparkles size={20}/>} label="KI Coach" />
      </nav>
    </div>
  );
};

const NavBtn = ({ active, onClick, icon, label }: any) => (
  <button 
    onClick={onClick} 
    className={`flex-1 flex flex-col items-center py-3 rounded-[1.8rem] transition-all duration-300 ${active ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-200' : 'text-slate-400 hover:text-slate-500'}`}
  >
    {icon}
    <span className="text-[9px] font-extrabold uppercase mt-1 tracking-wider">{label}</span>
  </button>
);

export default App;