import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { GENRES, FEATURED_COLLECTIONS } from '../../data/genres';
import { StoryCard } from './StoryCard';
import { GenreId } from '../../types';
import { Search, Sparkles, Filter, X, Compass, Layers } from 'lucide-react';

export const ExploreView: React.FC = () => {
  const { stories, searchQuery, setSearchQuery, selectedGenre, setSelectedGenre, navigateTo } = useApp();
  const [activeCollection, setActiveCollection] = useState<string | null>(null);

  // Filtered stories logic
  const filteredStories = useMemo(() => {
    return stories.filter((story) => {
      const isPublic = story.status === 'approved' || story.status === 'featured';
      if (!isPublic) return false;

      if (selectedGenre !== 'all' && story.genre !== selectedGenre) {
        return false;
      }

      if (activeCollection && story.featuredCollection !== activeCollection) {
        return false;
      }

      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = story.title.toLowerCase().includes(q);
        const matchesHook = story.hook.toLowerCase().includes(q);
        const matchesAuthor = story.authorName.toLowerCase().includes(q);
        const matchesContent = story.content.toLowerCase().includes(q);
        return matchesTitle || matchesHook || matchesAuthor || matchesContent;
      }

      return true;
    });
  }, [stories, selectedGenre, activeCollection, searchQuery]);

  return (
    <div className="min-h-screen px-4 xs:px-6 pt-6 pb-28 max-w-6xl mx-auto w-full overflow-x-hidden">
      {/* Header & Search */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h1 className="text-2xl xs:text-3xl sm:text-4xl font-extrabold font-display text-primary tracking-tight">
              Explore The Feed
            </h1>
            <p className="text-xs sm:text-sm text-primary-muted font-mono mt-0.5">
              Unfiltered thoughts & stories from curious minds across the internet.
            </p>
          </div>
        </div>

        {/* Search input with glowing focus */}
        <div className="relative w-full">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-muted pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search plots, alien rovers, 3 AM glitches..."
            className="w-full pl-11 pr-10 py-3.5 rounded-2xl bg-surface border border-surface-border text-primary placeholder-primary-faint text-sm focus:outline-none focus:border-accent-purple focus:ring-1 focus:ring-accent-purple transition-all shadow-inner"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 p-1 rounded-full text-primary-muted hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Horizontal Scrollable Genre Chips */}
      <div className="mb-6 overflow-x-auto no-scrollbar py-1 flex items-center gap-2">
        <button
          onClick={() => {
            setSelectedGenre('all');
            setActiveCollection(null);
          }}
          className={`flex-shrink-0 px-4 py-2 rounded-2xl text-xs font-mono font-bold tracking-wide transition-all ${
            selectedGenre === 'all' && !activeCollection
              ? 'bg-gradient-to-r from-accent-purple to-accent-pink text-white shadow-glow-purple'
              : 'bg-surface border border-surface-border text-primary-muted hover:text-white hover:bg-surface-elevated'
          }`}
        >
          ✦ All Universes
        </button>

        {GENRES.map((genre) => {
          const isActive = selectedGenre === genre.id;
          return (
            <button
              key={genre.id}
              onClick={() => {
                setSelectedGenre(isActive ? 'all' : genre.id);
                setActiveCollection(null);
              }}
              className={`flex-shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-2xl text-xs font-mono font-bold tracking-wide transition-all ${
                isActive
                  ? `${genre.badgeBg} border shadow-inner ring-1 ring-current`
                  : 'bg-surface border border-surface-border text-primary-muted hover:text-primary hover:bg-surface-elevated'
              }`}
            >
              <span>{genre.icon}</span>
              <span>{genre.label}</span>
            </button>
          );
        })}
      </div>

      {/* Curated Collections Horizontal Ribbon */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-3">
          <Layers className="w-4 h-4 text-accent-purple" />
          <h2 className="text-xs font-mono font-bold uppercase tracking-widest text-primary-muted">
            Curated Playlists & Collections
          </h2>
        </div>

        <div className="overflow-x-auto no-scrollbar py-1 flex items-center gap-3">
          {FEATURED_COLLECTIONS.map((col) => {
            const isSelected = activeCollection === col.id;
            return (
              <div
                key={col.id}
                onClick={() => {
                  setActiveCollection(isSelected ? null : col.id);
                  if (!isSelected) setSelectedGenre('all');
                }}
                className={`flex-shrink-0 w-60 sm:w-64 p-3.5 rounded-2xl border cursor-pointer transition-all ${
                  isSelected
                    ? 'bg-surface-elevated border-accent-purple shadow-glow-purple ring-1 ring-accent-purple'
                    : 'bg-surface border-surface-border hover:border-surface-subtle hover:bg-surface-elevated/70'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <h3 className="text-sm font-bold font-display text-primary truncate">
                    {col.title}
                  </h3>
                  {isSelected && (
                    <span className="w-2 h-2 rounded-full bg-accent-purple animate-pulse" />
                  )}
                </div>
                <p className="text-xs text-primary-muted line-clamp-1">
                  {col.tagline}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Stories Feed Count / Reset Filters */}
      <div className="flex items-center justify-between mb-5 text-xs font-mono text-primary-muted">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-lime inline-block" />
          <span>Showing {filteredStories.length} {filteredStories.length === 1 ? 'story' : 'stories'}</span>
        </div>

        {(selectedGenre !== 'all' || activeCollection || searchQuery) && (
          <button
            onClick={() => {
              setSelectedGenre('all');
              setActiveCollection(null);
              setSearchQuery('');
            }}
            className="text-accent-pink hover:underline font-semibold"
          >
            Clear filters
          </button>
        )}
      </div>

      {/* Stories Grid: 1 col on mobile, 2 cols on tablet, 3 cols on desktop */}
      {filteredStories.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="rounded-3xl p-10 bg-surface/60 border border-surface-border text-center max-w-md mx-auto my-12 flex flex-col items-center">
          <div className="w-14 h-14 rounded-2xl bg-surface-elevated flex items-center justify-center text-accent-purple mb-4 border border-surface-border">
            <Compass className="w-7 h-7" />
          </div>
          <h3 className="text-xl font-bold font-display text-primary mb-2">
            No stories found in this timeline
          </h3>
          <p className="text-sm text-primary-muted mb-6">
            We couldn't find any approved stories matching your current filters. Be the first to drop an idea for this vibe!
          </p>
          <button
            onClick={() => navigateTo('create')}
            className="px-6 py-3 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-pink text-white font-display font-bold text-xs uppercase tracking-wider shadow-glow-purple active:scale-95 transition-all"
          >
            Drop This Story First ↗
          </button>
        </div>
      )}
    </div>
  );
};
