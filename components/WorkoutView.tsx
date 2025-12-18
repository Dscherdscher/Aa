
import React, { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Calculator } from 'lucide-react';
import { WorkoutPlan, Exercise, WorkoutLog } from '../types';

interface Props {
  plan: WorkoutPlan;
  onFinish: (log: WorkoutLog) => void;
}

const WorkoutView: React.FC<Props> = ({ plan, onFinish }) => {
  const [exercises, setExercises] = useState<Exercise[]>(plan.exercises.length ? plan.exercises : [{id: '1', name: 'Übung 1', sets: 0, reps: 0, weight: 0}]);
  
  const update = (id: string, field: keyof Exercise, val: any) => {
    setExercises(exercises.map(e => e.id === id ? {...e, [field]: val} : e));
  };

  const add = () => setExercises([...exercises, {id: crypto.randomUUID(), name: `Übung ${exercises.length + 1}`, sets: 0, reps: 0, weight: 0}]);
  
  const totalVol = exercises.reduce((acc, e) => acc + (Number(e.sets) * Number(e.reps) * Number(e.weight)), 0);

  return (
    <div className="space-y-4 animate-in slide-in-from-bottom-5 duration-500 pb-20">
      <h2 className="text-2xl font-black text-slate-800 tracking-tight">{plan.name}</h2>
      
      <div className="space-y-4">
        {exercises.map((ex) => (
          <div key={ex.id} className="bg-white p-5 rounded-3xl border border-slate-100 card-shadow space-y-4">
            <input 
              value={ex.name} 
              onChange={e => update(ex.id, 'name', e.target.value)} 
              className="font-bold text-slate-700 bg-slate-50 px-4 py-2 rounded-xl w-full outline-none focus:ring-2 focus:ring-indigo-100" 
            />
            <div className="grid grid-cols-3 gap-3">
              <WorkoutInput label="Sets" value={ex.sets} onChange={v => update(ex.id, 'sets', v)} />
              <WorkoutInput label="Reps" value={ex.reps} onChange={v => update(ex.id, 'reps', v)} />
              <WorkoutInput label="Kg" value={ex.weight} onChange={v => update(ex.id, 'weight', v)} />
            </div>
          </div>
        ))}
        
        <button onClick={add} className="w-full py-5 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-colors">+ Übung hinzufügen</button>
      </div>

      <div className="bg-indigo-600 rounded-[2.5rem] p-8 text-white card-shadow space-y-6 mt-10">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2 opacity-80">
            <Calculator size={16} />
            <span className="text-xs font-bold uppercase tracking-widest">Volumen</span>
          </div>
          <span className="text-3xl font-black">{totalVol.toLocaleString()} <span className="text-xs">kg</span></span>
        </div>
        <button 
          onClick={() => onFinish({id: crypto.randomUUID(), planId: plan.id, planName: plan.name, date: new Date().toISOString(), totalVolume: totalVol, exercises})} 
          className="w-full bg-white text-indigo-600 py-4 rounded-2xl font-bold shadow-xl flex items-center justify-center gap-2 active:scale-[0.97] transition-all"
        >
          <CheckCircle2 size={20}/> Workout beenden
        </button>
      </div>
    </div>
  );
};

const WorkoutInput = ({ label, value, onChange }: any) => (
  <div className="bg-slate-50 p-2 rounded-2xl text-center">
    <p className="text-[9px] font-bold text-slate-400 uppercase mb-1 tracking-widest">{label}</p>
    <input 
      type="number" 
      value={value || ''} 
      onChange={e => onChange(e.target.value)} 
      className="w-full bg-transparent text-center font-black text-slate-800 text-lg outline-none" 
      placeholder="0" 
    />
  </div>
);

export default WorkoutView;
