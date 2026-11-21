import React, { useState } from 'react';
import { Story } from '../../types';
import { GENRES } from '../../data/genres';
import { useApp } from '../../context/AppContext';
import { Bookmark, Clock, Share2, Film, Flame, Skull, Heart, Rocket } from 'lucide-react';

interface StoryCardProps {
  story: Story;
  layout?: 'standard' | 'compact' | 'featured';
}

export const StoryCard: React.FC<StoryCardProps> = ({ story, layout = 'standard' }) => {
  const { navigateTo, toggleSaveStory, reactToStory, savedStoryIds, showToast } = useApp();
  const [isHovered, setIsHovered] = useState(false);
  const [reactionBurst, setReactionBurst] = useState<string | null>(null);

  const isSaved = savedStoryIds.includes(story.id);
  const genreMeta = GENRES.find((g) => g.id === story.genre) || GENRES[0];

  const handleShare = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: story.hook,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(`${window.location.origin}/#story-${story.id}`);
      showToast('Story link copied to clipboard! 📋', 'success');
    }
  };

  const handleReactionClick = (
    e: React.MouseEvent,
    type: 'mindblown' | 'spooky' | 'feltThat' | 'unreal'
  ) => {
    e.stopPropagation();
    reactToStory(story.id, type);
    setReactionBurst(type);
    setTimeout(() => setReactionBurst(null), 600);
  };

  return (
    <article
      onClick={() => navigateTo('reader', story.id)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex flex-col justify-between rounded-3xl bg-surface border border-surface-border/80 overflow-hidden cursor-pointer transition-all duration-300 hover:border-surface-subtle hover:shadow-card-elevated active:scale-[0.985]"
    >
      {/* Cover Image & Overlays */}
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden bg-surface-elevated">
        <img
          src={story.coverImage}
          alt={story.title}
          loading="lazy"
          className="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        {/* Cinematic gradient vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-surface via-surface/40 to-transparent" />

        {/* Top Badges Row */}
        <div className="absolute top-3 inset-x-3 flex items-center justify-between z-10">
          {/* Genre Badge */}
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md border ${genreMeta.badgeBg}`}>
            <span>{genreMeta.icon}</span>
            <span>{genreMeta.label}</span>
          </span>

          {/* Save / Bookmark Button */}
          <button
            type="button"
            aria-label="Save story"
            onClick={(e) => {
              e.stopPropagation();
              toggleSaveStory(story.id);
            }}
            className={`p-2 rounded-full backdrop-blur-md transition-all duration-200 active:scale-90 ${
              isSaved
                ? 'bg-accent-purple text-white shadow-glow-purple'
                : 'bg-void/60 text-primary-muted hover:text-white hover:bg-void/80 border border-white/10'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>
        </div>

        {/* Adapted to Video Tag if applicable */}
        {story.isAdapted && (
          <div className="absolute bottom-3 left-3 z-10 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent-pink/90 text-white text-[11px] font-bold font-mono shadow-glow-pink backdrop-blur-md">
            <Film className="w-3.5 h-3.5" />
            <span>ANIMATED ON SCREEN 🎬</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Reading Time & Meta */}
          <div className="flex items-center gap-2 text-xs text-primary-muted font-mono mb-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3 h-3 text-accent-lime" />
              <span>{story.readingTimeMinutes} min read</span>
            </span>
            <span>•</span>
            <span>{story.createdAt}</span>
          </div>

          {/* Title */}
          <h3 className="text-lg sm:text-xl font-bold font-display text-primary group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-accent-purple transition-all duration-200 line-clamp-2 leading-snug mb-2">
            {story.title}
          </h3>

          {/* Gripping Hook */}
          <p className="text-sm text-primary-muted font-normal line-clamp-2 leading-relaxed mb-4">
            {story.hook}
          </p>
        </div>

        {/* Card Footer: Author + Reactions */}
        <div className="pt-3 border-t border-surface-border/60 flex items-center justify-between gap-2">
          {/* Author */}
          <div className="flex items-center gap-2 min-w-0">
            <img
              src={story.authorAvatar}
              alt={story.authorName}
              className="w-6 h-6 rounded-full object-cover border border-white/10 flex-shrink-0"
            />
            <span className="text-xs font-medium text-primary truncate">
              {story.authorName}
            </span>
          </div>

          {/* Reaction Buttons */}
          <div className="flex items-center gap-1">
            {/* Mindblown */}
            <button
              type="button"
              onClick={(e) => handleReactionClick(e, 'mindblown')}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono transition-all ${
                story.userReactions?.mindblown
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                  : 'text-primary-faint hover:text-primary hover:bg-surface-elevated'
              }`}
            >
              <Flame className={`w-3.5 h-3.5 ${reactionBurst === 'mindblown' ? 'scale-125 text-amber-400' : ''} transition-transform`} />
              <span>{story.reactions.mindblown}</span>
            </button>

            {/* Spooky */}
            <button
              type="button"
              onClick={(e) => handleReactionClick(e, 'spooky')}
              className={`flex items-center gap-1 px-2 py-1 rounded-lg text-xs font-mono transition-all ${
                story.userReactions?.spooky
                  ? 'bg-accent-pink/20 text-accent-pink border border-accent-pink/40'
                  : 'text-primary-faint hover:text-primary hover:bg-surface-elevated'
              }`}
            >
              <Skull className={`w-3.5 h-3.5 ${reactionBurst === 'spooky' ? 'scale-125 text-accent-pink' : ''} transition-transform`} />
              <span>{story.reactions.spooky}</span>
            </button>

            {/* Share */}
            <button
              type="button"
              aria-label="Share story"
              onClick={handleShare}
              className="p-1.5 rounded-lg text-primary-faint hover:text-white hover:bg-surface-elevated transition-colors"
            >
              <Share2 className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};
