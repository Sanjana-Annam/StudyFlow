'use client';
// components/analytics/AnalyticsCharts.tsx
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { DailyStats } from '@/lib/types';

const TT = {
  backgroundColor: '#fff',
  border: '1px solid #e0e7ff',
  borderRadius: '12px',
  boxShadow: '0 4px 16px rgba(69,69,229,0.10)',
  fontSize: '12px',
};

export default function AnalyticsCharts({ data }: { data: DailyStats[] }) {
  const chartData = data.map(d => ({
    ...d,
    focusHours: +(d.focusMinutes / 60).toFixed(1),
    distHours:  +(d.distractionMinutes / 60).toFixed(1),
  }));

  return (
    <div className="space-y-5">
      {/* Study vs Distraction */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5">
        <h3 className="font-semibold text-slate-900 mb-4">Study vs Distraction Hours</h3>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} margin={{ top:0, right:8, left:-20, bottom:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
            <XAxis dataKey="date" tick={{ fontSize:11, fill:'#94a3b8' }} axisLine={false} tickLine={false}/>
            <YAxis tick={{ fontSize:11, fill:'#94a3b8' }} axisLine={false} tickLine={false}/>
            <Tooltip contentStyle={TT} cursor={{ fill:'#f0eeff' }}/>
            <Legend iconType="circle" iconSize={8} formatter={v => <span style={{ fontSize:11, color:'#64748b' }}>{v}</span>}/>
            <Bar dataKey="focusHours" name="Focus (h)"   fill="#4545e5" radius={[6,6,0,0]} maxBarSize={30}/>
            <Bar dataKey="distHours"  name="Distraction (h)" fill="#f87171" radius={[6,6,0,0]} maxBarSize={30}/>
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Productivity score */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5">
        <h3 className="font-semibold text-slate-900 mb-4">Productivity Score (0–100)</h3>
        <ResponsiveContainer width="100%" height={180}>
          <LineChart data={chartData} margin={{ top:4, right:8, left:-20, bottom:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
            <XAxis dataKey="date" tick={{ fontSize:11, fill:'#94a3b8' }} axisLine={false} tickLine={false}/>
            <YAxis domain={[0,100]} tick={{ fontSize:11, fill:'#94a3b8' }} axisLine={false} tickLine={false}/>
            <Tooltip contentStyle={TT}/>
            <Line type="monotone" dataKey="productivityScore" name="Score"
              stroke="#00C896" strokeWidth={2.5}
              dot={{ fill:'#00C896', r:4 }}
              activeDot={{ r:6, stroke:'#fff', strokeWidth:2 }}/>
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tasks completed */}
      <div className="bg-white rounded-2xl border border-slate-100 p-5">
        <h3 className="font-semibold text-slate-900 mb-4">Sessions Completed</h3>
        <ResponsiveContainer width="100%" height={150}>
          <BarChart data={chartData} margin={{ top:0, right:8, left:-20, bottom:0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
            <XAxis dataKey="date" tick={{ fontSize:11, fill:'#94a3b8' }} axisLine={false} tickLine={false}/>
            <YAxis allowDecimals={false} tick={{ fontSize:11, fill:'#94a3b8' }} axisLine={false} tickLine={false}/>
            <Tooltip contentStyle={TT} cursor={{ fill:'#f0eeff' }}/>
            <Bar dataKey="tasksCompleted" name="Sessions" fill="#00C896" radius={[6,6,0,0]} maxBarSize={28}/>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
