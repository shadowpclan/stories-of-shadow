import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Instagram, X, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';

export const InstagramAuthModal: React.FC = () => {
  const { isAuthModalOpen, setIsAuthModalOpen, signInWithInstagram } = useApp();
  
  const [handle, setHandle] = useState('');
  const [name, setName] = useState('');
  const [bio, setBio] = useState('');

  if (!isAuthModalOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!handle.trim()) return;
    signInWithInstagram(handle.trim(), name.trim(), bio.trim());
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-void/80 backdrop-blur-md animate-fade-in">
      <div 
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-md rounded-3xl bg-surface border border-accent-purple/50 p-6 sm:p-8 shadow-glow-purple overflow-hidden"
      >
        {/* Close Button */}
        <button
          onClick={() => setIsAuthModalOpen(false)}
          className="absolute top-4 right-4 p-2 rounded-full text-primary-muted hover:text-white bg-surface-elevated hover:bg-surface-subtle transition-colors"
          aria-label="Close"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-accent-purple via-accent-pink to-accent-lime p-0.5 flex items-center justify-center shadow-glow-pink">
            <div className="w-full h-full bg-void rounded-[14px] flex items-center justify-center text-accent-pink">
              <Instagram className="w-6 h-6" />
            </div>
          </div>
          <div>
            <span className="text-xs font-mono font-bold uppercase text-accent-pink tracking-wider">
              CREATOR PASSPORT ✦
            </span>
            <h2 className="text-xl sm:text-2xl font-extrabold font-display text-primary leading-tight">
              Connect With Instagram
            </h2>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-primary-muted font-normal leading-relaxed mb-6">
          Claim your creator identity to drop stories, track editorial review progress, and get credited on our Reels & YouTube animations.
        </p>

        {/* Sign In Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-primary-muted mb-1.5">
              Instagram Handle *
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-muted font-mono text-sm">
                @
              </span>
              <input
                type="text"
                required
                value={handle}
                onChange={(e) => setHandle(e.target.value.replace('@', ''))}
                placeholder="yourhandle"
                className="w-full pl-9 pr-4 py-3 rounded-2xl bg-void border border-surface-border text-primary placeholder-primary-faint text-sm font-mono focus:outline-none focus:border-accent-purple"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-primary-muted mb-1.5">
              Creator Name (Display Name)
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alex Rivera or Pen Name"
              className="w-full px-4 py-3 rounded-2xl bg-void border border-surface-border text-primary placeholder-primary-faint text-sm focus:outline-none focus:border-accent-purple"
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-primary-muted mb-1.5">
              Bio / Story Vibe
            </label>
            <input
              type="text"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              placeholder="e.g. 3 AM horror thoughts & glitch theories"
              className="w-full px-4 py-3 rounded-2xl bg-void border border-surface-border text-primary placeholder-primary-faint text-sm focus:outline-none focus:border-accent-purple"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={!handle.trim()}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-accent-purple via-accent-pink to-accent-lime text-white font-display font-bold text-sm tracking-wide shadow-glow-purple disabled:opacity-40 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Connect & Enter ↗</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          <div className="flex items-center justify-center gap-1.5 text-[11px] font-mono text-primary-faint pt-1">
            <ShieldCheck className="w-3.5 h-3.5 text-accent-lime" />
            <span>No passwords required. Your identity is saved locally.</span>
          </div>
        </form>
      </div>
    </div>
  );
};
