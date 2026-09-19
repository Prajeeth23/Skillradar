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
      <div className={`p-6 bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl text-center ${className}`}>
        <p className="text-sm text-[#6B6B76]">No psychometric assessment data recorded yet.</p>
      </div>
    );
  }

  return (
    <div
      className={`bg-[#FFFFFF] border border-[#E5E5EA] rounded-2xl p-6 shadow-xs relative overflow-hidden ${className}`}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2.5">
          <div className="p-2 rounded-xl bg-[#5B4FE8]/10 border border-[#5B4FE8]/20 text-[#5B4FE8]">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#1A1A1E] tracking-tight font-['Plus_Jakarta_Sans']">
              Behavioral Psychometric Profile
            </h3>
            <p className="text-xs text-[#6B6B76]">
              Evaluated across 4 core cognitive and situational dimensions
            </p>
          </div>
        </div>
        <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-semibold bg-[#22C55E]/10 text-[#16a34a] border border-[#22C55E]/20">
          Verified Results
        </span>
      </div>

      {/* Radar Chart Display */}
      <div className="h-64 w-full my-2">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
            <PolarGrid stroke="#E5E5EA" strokeDasharray="3 3" />
            <PolarAngleAxis
              dataKey="trait"
              tick={{ fill: '#4B4B55', fontSize: 12, fontWeight: 500 }}
            />
            <PolarRadiusAxis
              angle={30}
              domain={[0, 100]}
              tick={{ fill: '#9B9BA5', fontSize: 10 }}
              stroke="#E5E5EA"
            />
            <Radar
              name="Proficiency Score"
              dataKey="score"
              stroke="#5B4FE8"
              strokeWidth={2}
              fill="#5B4FE8"
              fillOpacity={0.25}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const item = payload[0].payload as RadarDataPoint;
                  return (
                    <div className="bg-[#FFFFFF] border border-[#E5E5EA] p-2.5 rounded-xl shadow-lg text-xs">
                      <p className="font-semibold text-[#1A1A1E]">{item.trait}</p>
                      <p className="text-[#5B4FE8] font-bold mt-0.5 font-mono">
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
            className="p-3 bg-[#F1F1F4] border border-[#E5E5EA] rounded-xl flex items-center justify-between"
          >
            <div className="flex items-center gap-2">
              {TRAIT_ICONS[item.trait] || <Sparkles className="w-4 h-4 text-[#5B4FE8]" />}
              <span className="text-xs font-medium text-[#1A1A1E]">
                {item.trait}
              </span>
            </div>
            <span className="text-xs font-bold text-[#5B4FE8] font-mono tabular-nums">
              {item.score}%
            </span>
          </div>
        ))}
      </div>

      {/* Summary Narrative */}
      {summary && (
        <div className="mt-4 p-3.5 bg-[#F4F3FF] border border-[#5B4FE8]/15 rounded-xl text-xs text-[#4B4B55] leading-relaxed">
          <span className="font-semibold text-[#5B4FE8] mr-1">Synthesis:</span>
          {summary}
        </div>
      )}
    </div>
  );
};
