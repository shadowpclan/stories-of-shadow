import React from 'react';
import { useApp } from '../../context/AppContext';
import { StoryCard } from '../explore/StoryCard';
import { Flame, ArrowRight } from 'lucide-react';

export const TrendingStories: React.FC = () => {
  const { stories, navigateTo } = useApp();

  // Sort by engagement
  const trending = [...stories]
    .sort((a, b) => {
      const scoreA = a.views + a.reactions.mindblown * 3 + a.saveCount * 5;
      const scoreB = b.views + b.reactions.mindblown * 3 + b.saveCount * 5;
      return scoreB - scoreA;
    })
    .slice(0, 3);

  return (
    <section className="px-4 xs:px-6 py-10 max-w-6xl mx-auto w-full overflow-x-hidden">
      {/* Section Header */}
      <div className="flex items-end justify-between mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-accent-pink uppercase mb-1">
            <Flame className="w-4 h-4 fill-current animate-pulse" />
            <span>REAL-TIME ENGAGEMENT</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-primary tracking-tight">
            THE INTERNET IS READING
          </h2>
        </div>

        <button
          onClick={() => navigateTo('explore')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-accent-purple hover:text-accent-pink font-semibold transition-colors group"
        >
          <span>View all</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>

      {/* Story Cards Grid: 1 col on mobile, 2 on tablet, 3 on desktop */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {trending.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </section>
  );
};
