import React from 'react';
import { cn } from '../../utils/cn';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'danger' | 'purple' | 'amber';
  size?: 'sm' | 'md';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'secondary',
  size = 'sm',
  className,
}) => {
  const variantStyles = {
    primary: 'bg-[#5B4FE8]/10 text-[#5B4FE8] border-[#5B4FE8]/25',
    secondary: 'bg-[#F1F1F4] text-[#4B4B55] border-[#E5E5EA]',
    success: 'bg-[#22C55E]/10 text-[#16a34a] border-[#22C55E]/25',
    warning: 'bg-amber-500/10 text-amber-700 border-amber-500/25',
    danger: 'bg-rose-500/10 text-rose-600 border-rose-500/25',
    purple: 'bg-[#712AE2]/10 text-[#712AE2] border-[#712AE2]/25',
    amber: 'bg-amber-500/10 text-amber-700 border-amber-500/25',
  };

  const sizeStyles = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-sm px-3 py-1',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 font-medium rounded-full border',
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
    >
      {children}
    </span>
  );
};
