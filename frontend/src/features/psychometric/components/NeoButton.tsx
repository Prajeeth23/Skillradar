import React from 'react';
import { ChevronRight } from 'lucide-react';

interface NeoButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: 'primary' | 'indigo' | 'amber' | 'secondary' | 'rose' | 'slate';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export const NeoButton: React.FC<NeoButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const sizeClasses = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3.5 text-sm',
    lg: 'px-8 py-4 text-base',
  }[size];

  const baseClasses =
    'group relative border transition-all duration-300 active:scale-[0.98] overflow-hidden text-left flex items-center justify-between rounded-xl font-label-mono tracking-wider font-semibold disabled:opacity-40 disabled:pointer-events-none disabled:cursor-not-allowed cursor-pointer';

  let variantClasses = '';
  let textClasses = '';
  let glowColor = '';

  if (variant === 'primary' || variant === 'indigo') {
    variantClasses = 'border-cyan-500/40 bg-slate-950/80 hover:border-cyan-400 hover:bg-cyan-500/10 shadow-[0_0_15px_rgba(0,219,231,0.15)]';
    textClasses = 'text-cyan-300 group-hover:text-cyan-200 drop-shadow-[0_0_8px_rgba(0,219,231,0.5)]';
    glowColor = 'via-cyan-400/10';
  } else if (variant === 'amber') {
    variantClasses = 'border-amber-500/40 bg-slate-950/80 hover:border-amber-400 hover:bg-amber-500/10 shadow-[0_0_15px_rgba(245,158,11,0.15)]';
    textClasses = 'text-amber-300 group-hover:text-amber-200 drop-shadow-[0_0_8px_rgba(245,158,11,0.5)]';
    glowColor = 'via-amber-400/10';
  } else if (variant === 'rose') {
    variantClasses = 'border-pink-500/40 bg-slate-950/80 hover:border-pink-400 hover:bg-pink-500/10 shadow-[0_0_15px_rgba(236,72,153,0.15)]';
    textClasses = 'text-pink-300 group-hover:text-pink-200 drop-shadow-[0_0_8px_rgba(236,72,153,0.5)]';
    glowColor = 'via-pink-400/10';
  } else {
    variantClasses = 'border-slate-800 bg-slate-900/60 hover:border-slate-700 text-slate-400';
    textClasses = 'text-slate-400';
    glowColor = 'via-white/5';
  }

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      {...props}
    >
      <span className={`relative z-10 uppercase flex items-center gap-2 ${textClasses}`}>
        {children}
      </span>
      <ChevronRight
        size={18}
        className={`relative z-10 transition-transform duration-300 group-hover:translate-x-1 ${textClasses}`}
      />
      {/* Sweeping sheen */}
      <div
        className={`absolute inset-0 bg-gradient-to-r from-transparent ${glowColor} to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 pointer-events-none`}
      />
    </button>
  );
};

export default NeoButton;
