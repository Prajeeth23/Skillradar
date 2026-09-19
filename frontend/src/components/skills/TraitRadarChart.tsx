import React from 'react';
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { RadarDataPoint } from '../../types/psychometric';
import { Sparkles, Shield, Compass, Brain, Users } from 'lucide-react';

interface TraitRadarChartProps {
  data: RadarDataPoint[];
  summary?: string;
  className?: string;
}

const TRAIT_ICONS: Record<string, React.ReactNode> = {
  Leadership: <Shield className="w-4 h-4 text-amber-400" />,
  Adaptability: <Compass className="w-4 h-4 text-emerald-400" />,
  'Analytical Thinking': <Brain className="w-4 h-4 text-cyan-400" />,
  Collaboration: <Users className="w-4 h-4 text-indigo-400" />,
};

export const TraitRadarChart: React.FC<TraitRadarChartProps> = ({
  data,
  summary,
  className = '',
}) => {
  if (!data || data.length === 0) {
    return (
      <div className={`p-6 bg-slate-900/60 border border-slate-800 rounded-2xl text-center ${className}`}>
        <p className="text-sm text-slate-400">No psychometric assessment data recorded yet.</p>
      </div>
    );
  }

  return (
    <div
      className={`bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-md relative overflow-hidden ${className}`}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-white tracking-tight">
              Behavioral Psychometric Profile
            </h3>
            <p className="text-xs text-slate-400">
              Evaluated across 4 core cognitive and situational dimensions
            </p>
          </div>
        </div>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
          Verified Results
        </span>
      </div>

      {/* Radar Chart Display */}
      <div className="h-64 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#334155" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="trait"
              tick={{ fill: '#94a3b8', fontSize: 12, fontWeight: 500 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: '#64748b', fontSize: 10 }}
              stroke="#1e293b"
            />
            <Radar
              name="Proficiency Score"
              dataKey="score"
              stroke="#6366f1"
              strokeWidth={2}
              fill="#6366f1"
              fillOpacity={0.4}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as RadarDataPoint;
                  return (
                    <div className="bg-slate-900 border border-slate-700 p-2.5 rounded-xl shadow-lg text-xs">
                      <p className="font-semibold text-slate-200">{item.trait}</p>
                      <p className="text-indigo-400 font-bold mt-0.5">
                        Score: {item.score}%
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Trait Score Breakdown Pills */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 mt-2">
        {data.map((item) => (
          <div
            key={item.trait}
            className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              {TRAIT_ICONS[item.trait] || <Sparkles className="w-4 h-4 text-slate-400" />}
              <span className="text-xs font-medium text-slate-300">
                {item.trait}
              </span>
            </div>
            <span className="text-xs font-bold text-indigo-300">
              {item.score}%
            </span>
          </div>
        ))}
      </div>

      {/* AI Behavioral Summary Quote */}
      {summary && (
        <div className="mt-4 p-3.5 bg-indigo-950/30 border border-indigo-500/20 rounded-xl flex items-start gap-3">
          <Sparkles className="w-4 h-4 text-indigo-400 mt-0.5 shrink-0" />
          <p className="text-xs text-indigo-200/90 leading-relaxed italic">
            "{summary}"
          </p>
        </div>
      )}
    </div>
  );
};
