import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Check, Info } from 'lucide-react';

export const Toast: React.FC = () => {
  const { toast } = useApp();

  if (!toast) return null;

  return (
    <div className="fixed top-16 left-1/2 -translate-x-1/2 z-50 pointer-events-none animate-float-fast transition-all">
      <div className={`px-4 py-2.5 rounded-2xl shadow-card-elevated border flex items-center gap-2.5 backdrop-blur-xl text-xs font-mono font-medium ${
        toast.type === 'purple'
          ? 'bg-surface-elevated/95 text-white border-accent-purple shadow-glow-purple'
          : toast.type === 'info'
          ? 'bg-surface-elevated/95 text-primary border-surface-border'
          : 'bg-surface-elevated/95 text-accent-lime border-accent-lime shadow-glow-lime'
      }`}>
        {toast.type === 'purple' ? (
          <Sparkles className="w-4 h-4 text-accent-pink" />
        ) : toast.type === 'info' ? (
          <Info className="w-4 h-4 text-accent-blue" />
        ) : (
          <Check className="w-4 h-4 text-accent-lime" />
        )}
        <span>{toast.message}</span>
      </div>
    </div>
  );
};
