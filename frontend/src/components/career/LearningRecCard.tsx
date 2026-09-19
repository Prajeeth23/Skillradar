import React from 'react';
import { BookOpen, FolderGit2, Users2, Award } from 'lucide-react';
import { Badge } from '../common/Badge';

interface LearningRecCardProps {
  title: string;
  description: string;
  resourceType: string;
  priority: string;
}

export const LearningRecCard: React.FC<LearningRecCardProps> = ({
  title,
  description,
  resourceType,
  priority,
}) => {
  const getResourceIcon = () => {
    switch (resourceType.toUpperCase()) {
      case 'PROJECT':
        return <FolderGit2 className="w-4 h-4 text-emerald-400" />;
      case 'MENTORSHIP':
        return <Users2 className="w-4 h-4 text-purple-400" />;
      case 'CERTIFICATION':
        return <Award className="w-4 h-4 text-amber-400" />;
      default:
        return <BookOpen className="w-4 h-4 text-indigo-400" />;
    }
  };

  const getPriorityVariant = () => {
    switch (priority.toUpperCase()) {
      case 'HIGH':
        return 'danger';
      case 'MEDIUM':
        return 'warning';
      default:
        return 'secondary';
    }
  };

  return (
    <div className="bg-[#FFFFFF] border border-[#E5E5EA] rounded-xl p-4 hover:border-[#5B4FE8]/40 shadow-xs hover:shadow-sm transition-all flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-2">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-[#1A1A1E]">
            {getResourceIcon()}
            <span className="font-mono text-[11px]">{resourceType}</span>
          </div>
          <Badge variant={getPriorityVariant()} size="sm">
            {priority} Priority
          </Badge>
        </div>
        <h5 className="text-sm font-bold text-[#1A1A1E] mb-1 leading-snug font-['Plus_Jakarta_Sans']">{title}</h5>
        <p className="text-xs text-[#6B6B76] leading-relaxed">{description}</p>
      </div>
      <div className="mt-4 pt-3 border-t border-[#E5E5EA] flex items-center justify-between text-[11px]">
        <span className="text-[#5B4FE8] font-semibold hover:underline cursor-pointer">
          Start Learning Track →
        </span>
      </div>
    </div>
  );
};
