import React from 'react';
import { GitFork, AlertTriangle, ArrowRight, BookOpen } from 'lucide-react';
import { Badge } from '../../components/common/Badge';

export const HRSkillGapsPage: React.FC = () => {
  const gaps = [
    {
      role: 'Product Engineer (Fintech)',
      department: 'Engineering',
      skillDeficit: 'Frontend Component Architecture (React)',
      urgency: 'HIGH',
      impactedEmployees: 4,
      suggestedInitiative: 'Conduct hands-on design system state pair programming sprints.',
    },
    {
      role: 'Platform / DevOps Engineer',
      department: 'Infrastructure',
      skillDeficit: 'Kubernetes Cluster Administration',
      urgency: 'MEDIUM',
      impactedEmployees: 3,
      suggestedInitiative: 'Sponsor internal CKA exam preparation cohort.',
    },
    {
      role: 'Growth & Product Analyst',
      department: 'Product',
      skillDeficit: 'Automated Predictive Cohort Modeling',
      urgency: 'MEDIUM',
      impactedEmployees: 2,
      suggestedInitiative: 'Provide advanced statistical Python curriculum.',
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white tracking-tight">Workforce Skill Deficit Analysis</h2>
        <p className="text-xs text-slate-400 mt-1">
          Strategic overview of talent gaps between open opportunities and existing employee competencies.
        </p>
      </div>

      <div className="space-y-4">
        {gaps.map((gap, idx) => (
          <div
            key={idx}
            className="bg-[#111827] border border-slate-800 rounded-2xl p-6 shadow-md flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          >
            <div className="space-y-1.5 max-w-2xl">
              <div className="flex items-center gap-2">
                <Badge variant={gap.urgency === 'HIGH' ? 'danger' : 'warning'} size="sm">
                  {gap.urgency} Priority Gap
                </Badge>
                <span className="text-xs text-slate-400 font-medium">{gap.department}</span>
              </div>
              <h3 className="text-lg font-bold text-white">{gap.role}</h3>
              <div className="text-xs text-slate-300">
                <span className="text-slate-400">Primary Skill Deficit: </span>
                <span className="font-semibold text-rose-400">{gap.skillDeficit}</span>
              </div>
              <p className="text-xs text-slate-400 italic">
                Strategic initiative: "{gap.suggestedInitiative}"
              </p>
            </div>

            <div className="text-right shrink-0">
              <div className="text-xl font-bold text-white">{gap.impactedEmployees} Potential Candidates</div>
              <p className="text-[11px] text-slate-400">Need delta bridge</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
