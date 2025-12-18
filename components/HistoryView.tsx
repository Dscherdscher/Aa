
import React from 'react';
import { ResponsiveContainer, AreaChart, Area, XAxis, Tooltip, CartesianGrid } from 'recharts';
import { WorkoutLog } from '../types';

interface Props {
  history: WorkoutLog[];
}

const HistoryView: React.FC<Props> = ({ history }) => {
  const data = [...history].reverse().map(h => ({
    date: new Date(h.date).toLocaleDateString('de-DE', {day:'2-digit', month:'2-digit'}),
    vol: h.totalVolume
  }));

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {history.length > 0 && (
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 card-shadow h-64">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={data}>
              <defs>
                <linearGradient id="colorVol" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" fontSize={10} axisLine={false} tickLine={false} tick={{fill: '#94a3b8'}} />
              <Tooltip 
                contentStyle={{borderRadius: '16px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)'}} 
                labelStyle={{fontWeight: 'bold'}}
              />
              <Area type="monotone" dataKey="vol" stroke="#6366f1" fill="url(#colorVol)" strokeWidth={3} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}

      <div className="space-y-4">
        {history.length === 0 ? (
          <p className="text-center text-slate-400 font-medium py-10">Noch keine Trainings absolviert.</p>
        ) : (
          history.map(h => (
            <div key={h.id} className="bg-white p-6 rounded-3xl border border-slate-100 card-shadow flex justify-between items-center">
              <div>
                <h4 className="font-bold text-slate-800">{h.planName}</h4>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                  {new Date(h.date).toLocaleDateString('de-DE', {dateStyle:'medium'})}
                </p>
              </div>
              <div className="text-right">
                <p className="text-xl font-black text-indigo-600 leading-none">{h.totalVolume.toLocaleString()}</p>
                <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">kg Vol.</p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default HistoryView;
