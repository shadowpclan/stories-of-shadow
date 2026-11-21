import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, PenTool, Search, Bookmark, Shield, User } from 'lucide-react';

export const Header: React.FC = () => {
  const { currentView, navigateTo, savedStoryIds, user } = useApp();

  return (
    <header className="sticky top-0 z-30 bg-void/80 backdrop-blur-xl border-b border-surface-border px-4 xs:px-6 py-3.5 transition-all">
      <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
        
        {/* Brand Logo */}
        <div
          onClick={() => navigateTo('home')}
          className="flex items-center gap-2.5 cursor-pointer select-none group"
        >
          {/* Holographic icon emblem */}
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-accent-purple via-accent-pink to-accent-blue p-0.5 shadow-glow-purple group-hover:rotate-12 transition-transform duration-300">
            <div className="w-full h-full bg-void rounded-[10px] flex items-center justify-center">
              <span className="text-sm font-bold text-transparent bg-clip-text bg-gradient-to-tr from-accent-purple to-accent-pink font-display">
                ✦
              </span>
            </div>
          </div>

          <div className="flex flex-col">
            <span className="text-base sm:text-lg font-black font-display tracking-tight text-primary flex items-center gap-1">
              <span>Stories of Shadow</span>
              <span className="text-accent-lime text-xs font-mono font-bold">.26</span>
            </span>
            <span className="text-[10px] font-mono text-primary-muted -mt-1 hidden xs:block">
              the internet's imagination corner
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-mono font-semibold">
          <button
            onClick={() => navigateTo('explore')}
            className={`transition-colors ${
              currentView === 'explore' ? 'text-accent-purple font-bold' : 'text-primary-muted hover:text-white'
            }`}
          >
            Explore Feed
          </button>

          <button
            onClick={() => navigateTo('challenge')}
            className={`transition-colors flex items-center gap-1 ${
              currentView === 'challenge' ? 'text-accent-pink font-bold' : 'text-primary-muted hover:text-white'
            }`}
          >
            <span>The Plot Drop</span>
            <span className="px-1.5 py-0.2 rounded-full bg-accent-pink/20 text-accent-pink text-[9px]">LIVE</span>
          </button>

          <button
            onClick={() => navigateTo('screen')}
            className={`transition-colors ${
              currentView === 'screen' ? 'text-accent-lime font-bold' : 'text-primary-muted hover:text-white'
            }`}
          >
            Brain To Screen 🎬
          </button>

          <button
            onClick={() => navigateTo('stash')}
            className={`transition-colors flex items-center gap-1 ${
              currentView === 'stash' ? 'text-accent-blue font-bold' : 'text-primary-muted hover:text-white'
            }`}
          >
            <span>Stash</span>
            {savedStoryIds.length > 0 && (
              <span className="px-1.5 py-0.2 rounded-full bg-surface-elevated text-primary text-[10px]">
                {savedStoryIds.length}
              </span>
            )}
          </button>
        </nav>

        {/* Actions / Profile / Drop Story */}
        <div className="flex items-center gap-3">
          {/* Search Button for Mobile */}
          <button
            onClick={() => navigateTo('explore')}
            aria-label="Search stories"
            className="md:hidden p-2 rounded-xl bg-surface border border-surface-border text-primary-muted hover:text-white"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Desktop Drop Story CTA */}
          <button
            onClick={() => navigateTo('create')}
            className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-accent-purple to-accent-pink text-white font-display font-bold text-xs shadow-glow-purple hover:brightness-110 active:scale-95 transition-all"
          >
            <PenTool className="w-3.5 h-3.5" />
            <span>Drop Story ↗</span>
          </button>

          {/* User Profile Mini Trigger */}
          <button
            onClick={() => navigateTo('profile')}
            aria-label="View user profile"
            className="flex items-center gap-2 p-1 pl-1.5 pr-2 rounded-full bg-surface hover:bg-surface-elevated border border-surface-border transition-all active:scale-95"
          >
            <img
              src={user.avatar}
              alt={user.name}
              className="w-6 h-6 rounded-full object-cover border border-accent-purple/40"
            />
            <span className="text-xs font-mono text-primary font-medium hidden sm:inline">
              {user.name.split(' ')[0]}
            </span>
          </button>
        </div>
      </div>
    </header>
  );
};
