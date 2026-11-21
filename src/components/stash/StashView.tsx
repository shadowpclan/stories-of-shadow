import React from 'react';
import { useApp } from '../../context/AppContext';
import { StoryCard } from '../explore/StoryCard';
import { Bookmark, Sparkles, Compass } from 'lucide-react';

export const StashView: React.FC = () => {
  const { stories, savedStoryIds, navigateTo } = useApp();

  const savedStories = stories.filter((s) => savedStoryIds.includes(s.id));

  return (
    <div className="min-h-screen px-4 xs:px-6 pt-6 pb-28 max-w-6xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-purple/15 text-accent-purple border border-accent-purple/30 text-xs font-mono font-bold uppercase mb-2">
          <Bookmark className="w-3.5 h-3.5 fill-current" />
          <span>YOUR PERSONAL VAULT</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-primary tracking-tight">
          Your Stash
        </h1>
        <p className="text-xs sm:text-sm text-primary-muted font-mono mt-0.5">
          {savedStories.length} {savedStories.length === 1 ? 'saved story' : 'saved stories'} bookmarked for late-night reading.
        </p>
      </div>

      {savedStories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {savedStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        <div className="rounded-3xl p-10 bg-surface/60 border border-surface-border text-center max-w-md mx-auto my-12 flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-surface-elevated flex items-center justify-center text-primary-muted mb-4 border border-surface-border">
            <Bookmark className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold font-display text-primary mb-2">
            Your Stash is empty
          </h3>
          <p className="text-sm text-primary-muted mb-6">
            Tap the bookmark icon on any story to save it here for offline contemplation or midnight reading.
          </p>
          <button
            onClick={() => navigateTo('explore')}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-pink text-white font-display font-bold text-xs uppercase tracking-wider shadow-glow-purple active:scale-95 transition-all flex items-center gap-2"
          >
            <Compass className="w-4 h-4" />
            <span>Explore The Feed</span>
          </button>
        </div>
      )}
    </div>
  );
};
