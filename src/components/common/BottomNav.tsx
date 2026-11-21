import React from 'react';
import { useApp } from '../../context/AppContext';
import { ActiveTab, ViewMode } from '../../types';
import { Home, Compass, Plus, Bookmark, User } from 'lucide-react';

export const BottomNav: React.FC = () => {
  const { currentView, navigateTo, savedStoryIds } = useApp();

  // Highlight active tab
  const getIsActive = (tab: ActiveTab) => {
    if (tab === 'home' && currentView === 'home') return true;
    if (tab === 'explore' && currentView === 'explore') return true;
    if (tab === 'create' && currentView === 'create') return true;
    if (tab === 'stash' && currentView === 'stash') return true;
    if (tab === 'profile' && currentView === 'profile') return true;
    return false;
  };

  // Don't show bottom nav when in story reader to give 100% distraction-free reading
  if (currentView === 'reader') {
    return null;
  }

  return (
    <nav 
      aria-label="Mobile Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-surface/95 backdrop-blur-xl border-t border-surface-border/80 px-2 py-1.5 pb-safe"
      style={{ paddingBottom: 'max(0.375rem, env(safe-area-inset-bottom))' }}
    >
      <div className="flex items-center justify-around relative">
        {/* 1. Home */}
        <button
          onClick={() => navigateTo('home')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all ${
            getIsActive('home') ? 'text-accent-purple' : 'text-primary-muted hover:text-white'
          }`}
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-mono font-medium">Home</span>
          {getIsActive('home') && (
            <span className="w-1 h-1 rounded-full bg-accent-purple mt-0.5" />
          )}
        </button>

        {/* 2. Explore */}
        <button
          onClick={() => navigateTo('explore')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all ${
            getIsActive('explore') ? 'text-accent-blue' : 'text-primary-muted hover:text-white'
          }`}
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-mono font-medium">Explore</span>
          {getIsActive('explore') && (
            <span className="w-1 h-1 rounded-full bg-accent-blue mt-0.5" />
          )}
        </button>

        {/* 3. Create (Elevated Glow Center Button) */}
        <div className="flex-1 flex items-center justify-center -mt-5">
          <button
            onClick={() => navigateTo('create')}
            aria-label="Drop new story"
            className="w-13 h-13 p-3.5 rounded-full bg-gradient-to-tr from-accent-purple via-accent-pink to-accent-lime text-white shadow-glow-purple border-2 border-void active:scale-90 transition-transform duration-200 flex items-center justify-center hover:brightness-110"
          >
            <Plus className="w-6 h-6 stroke-[2.5]" />
          </button>
        </div>

        {/* 4. Saved / Stash */}
        <button
          onClick={() => navigateTo('stash')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all relative ${
            getIsActive('stash') ? 'text-accent-pink' : 'text-primary-muted hover:text-white'
          }`}
        >
          <div className="relative">
            <Bookmark className="w-5 h-5 mb-0.5" />
            {savedStoryIds.length > 0 && (
              <span className="absolute -top-1 -right-2 px-1 min-w-[14px] h-[14px] rounded-full bg-accent-pink text-white text-[9px] font-mono font-bold flex items-center justify-center">
                {savedStoryIds.length}
              </span>
            )}
          </div>
          <span className="text-[10px] font-mono font-medium">Saved</span>
          {getIsActive('stash') && (
            <span className="w-1 h-1 rounded-full bg-accent-pink mt-0.5" />
          )}
        </button>

        {/* 5. Profile */}
        <button
          onClick={() => navigateTo('profile')}
          className={`flex-1 flex flex-col items-center justify-center py-1 transition-all ${
            getIsActive('profile') ? 'text-accent-lime' : 'text-primary-muted hover:text-white'
          }`}
        >
          <User className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-mono font-medium">Profile</span>
          {getIsActive('profile') && (
            <span className="w-1 h-1 rounded-full bg-accent-lime mt-0.5" />
          )}
        </button>
      </div>
    </nav>
  );
};
