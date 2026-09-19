import React from 'react';
import { motion } from 'framer-motion';

interface NeoCardProps {
  children: React.ReactNode;
  className?: string;
  interactive?: boolean;
  onClick?: () => void;
  shadow?: string;
}

export const NeoCard: React.FC<NeoCardProps> = ({
  children,
  className = '',
  interactive = false,
  onClick,
  shadow = 'shadow-[0_15px_40px_rgba(0,0,0,0.4)]',
}) => {
  const baseClasses = `glass-card border border-white/10 rounded-2xl p-6 ${shadow}`;
  const interactiveClasses = interactive
    ? 'hover:border-cyan-500/40 hover:bg-slate-900/60 cursor-pointer transition-all duration-300'
    : '';
  const finalClass = `${baseClasses} ${interactiveClasses} ${className}`;

  if (interactive) {
    return (
      <motion.div
        onClick={onClick}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={finalClass}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div className={finalClass} onClick={onClick}>
      {children}
    </div>
  );
};

export default NeoCard;
