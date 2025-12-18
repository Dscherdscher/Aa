
import React, { useState } from 'react';
import { Plus, Trash2, ChevronRight, Dumbbell } from 'lucide-react';
import { WorkoutPlan } from '../types';

interface Props {
  plans: WorkoutPlan[];
  onAdd: (name: string) => void;
  onDelete: (id: string) => void;
  onSelect: (plan: WorkoutPlan) => void;
}

const PlanList: React.FC<Props> = ({ plans, onAdd, onDelete, onSelect }) => {
  const [name, setName] = useState('');
  return (
    <div className="space-y-6 animate-in fade-in duration-500">
      <div className="relative">
        <input 
          value={name} 
          onChange={e => setName(e.target.value)} 
          placeholder="Name des neuen Plans..." 
          className="w-full bg-white border border-slate-200 rounded-2xl px-5 py-4 font-semibold outline-none focus:ring-2 focus:ring-indigo-100 transition-all card-shadow pr-14"
          onKeyDown={e => e.key === 'Enter' && (onAdd(name), setName(''))}
        />
        <button onClick={() => {onAdd(name); setName('')}} className="absolute right-2 top-2 btn-primary text-white p-2.5 rounded-xl active:scale-90 transition-all">
          <Plus size={20}/>
        </button>
      </div>

      <div className="space-y-3">
        {plans.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-3xl border border-dashed border-slate-200 text-slate-400">
            <Dumbbell className="mx-auto mb-3 opacity-20" size={48} />
            <p className="text-sm font-bold uppercase tracking-widest">Keine Pläne vorhanden</p>
          </div>
        ) : (
          plans.map(p => (
            <div key={p.id} className="bg-white p-5 rounded-3xl border border-slate-100 flex items-center justify-between card-shadow active:scale-[0.98] transition-all cursor-pointer" onClick={() => onSelect(p)}>
              <div>
                <h3 className="font-bold text-slate-800 text-lg">{p.name}</h3>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{p.exercises.length} Übungen</p>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={(e) => {e.stopPropagation(); onDelete(p.id)}} className="p-3 text-slate-300 hover:text-red-500 transition-colors">
                  <Trash2 size={18}/>
                </button>
                <ChevronRight size={20} className="text-slate-300" />
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default PlanList;
