import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { GENRES } from '../../data/genres';
import { 
  ArrowLeft, Bookmark, Share2, Clock, Sparkles, Film, 
  Flame, Skull, Heart, Rocket, Send, Type, Eye, Check, ExternalLink
} from 'lucide-react';

export const StoryReader: React.FC = () => {
  const { 
    selectedStoryId, 
    stories, 
    goBack, 
    navigateTo, 
    toggleSaveStory, 
    savedStoryIds, 
    reactToStory, 
    comments, 
    addComment,
    showToast,
    openCreatorProfile 
  } = useApp();

  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'huge'>('normal');
  const [fontFamily, setFontFamily] = useState<'sans' | 'serif'>('sans');
  const [readingProgress, setReadingProgress] = useState(0);
  const [newCommentText, setNewCommentText] = useState('');
  const [reactionBurst, setReactionBurst] = useState<string | null>(null);

  const story = stories.find((s) => s.id === selectedStoryId) || stories[0];
  const isSaved = story ? savedStoryIds.includes(story.id) : false;
  const genreMeta = story ? (GENRES.find((g) => g.id === story.genre) || GENRES[0]) : GENRES[0];

  const storyComments = comments.filter((c) => c.storyId === story?.id);

  const relatedStories = stories
    .filter((s) => s.id !== story?.id && (s.genre === story?.genre || s.status === 'featured'))
    .slice(0, 2);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setReadingProgress(progress);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 text-center">
        <div>
          <p className="text-primary-muted mb-4">Story not found.</p>
          <button onClick={goBack} className="px-5 py-2.5 rounded-xl bg-accent-purple text-white">
            Return to Feed
          </button>
        </div>
      </div>
    );
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: story.title,
        text: story.hook,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      showToast('Story link copied to clipboard! 📋', 'success');
    }
  };

  const handleReaction = (type: 'mindblown' | 'spooky' | 'feltThat' | 'unreal') => {
    reactToStory(story.id, type);
    setReactionBurst(type);
    setTimeout(() => setReactionBurst(null), 500);
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCommentText.trim()) return;
    addComment(story.id, newCommentText);
    setNewCommentText('');
  };

  return (
    <div className="min-h-screen bg-void pb-28 text-primary selection:bg-accent-purple selection:text-white">
      {/* Top Fixed Reading Progress Bar */}
      <div className="fixed top-0 inset-x-0 h-1 bg-surface-border z-50">
        <div
          className="h-full bg-gradient-to-r from-accent-purple via-accent-pink to-accent-lime transition-all duration-150 ease-out"
          style={{ width: `${readingProgress}%` }}
        />
      </div>

      {/* Reader Top Controls Toolbar */}
      <nav className="sticky top-0 z-40 bg-void/90 backdrop-blur-md border-b border-surface-border/80 px-4 xs:px-6 py-3 flex items-center justify-between">
        <button
          onClick={goBack}
          className="inline-flex items-center gap-1.5 p-2 -ml-2 rounded-xl text-primary-muted hover:text-white hover:bg-surface-elevated transition-colors"
          title="Go back"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-xs font-mono hidden xs:inline">Back</span>
        </button>

        {/* Reader Customization Toggles */}
        <div className="flex items-center gap-2">
          {/* Serif vs Sans Toggle */}
          <button
            type="button"
            aria-label="Toggle typography serif/sans"
            onClick={() => setFontFamily((f) => (f === 'sans' ? 'serif' : 'sans'))}
            className="px-2.5 py-1.5 rounded-lg bg-surface hover:bg-surface-elevated border border-surface-border text-xs font-mono text-primary-muted hover:text-primary transition-colors flex items-center gap-1"
          >
            <Type className="w-3.5 h-3.5 text-accent-purple" />
            <span>{fontFamily === 'sans' ? 'Sans' : 'Editorial'}</span>
          </button>

          {/* Font Size Toggle */}
          <button
            type="button"
            aria-label="Cycle font size"
            onClick={() => {
              setFontSize((s) => (s === 'normal' ? 'large' : s === 'large' ? 'huge' : 'normal'));
            }}
            className="px-2.5 py-1.5 rounded-lg bg-surface hover:bg-surface-elevated border border-surface-border text-xs font-mono text-primary-muted hover:text-primary transition-colors"
          >
            A{fontSize === 'normal' ? '1' : fontSize === 'large' ? '2' : '3'}
          </button>

          {/* Bookmark */}
          <button
            type="button"
            aria-label="Save story"
            onClick={() => toggleSaveStory(story.id)}
            className={`p-2 rounded-lg border transition-all ${
              isSaved
                ? 'bg-accent-purple text-white border-accent-purple shadow-glow-purple'
                : 'bg-surface text-primary-muted border-surface-border hover:text-white'
            }`}
          >
            <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
          </button>

          {/* Share */}
          <button
            type="button"
            aria-label="Share story"
            onClick={handleShare}
            className="p-2 rounded-lg bg-surface text-primary-muted border border-surface-border hover:text-white transition-colors"
          >
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* Main Article Container */}
      <main className="max-w-2xl mx-auto px-4 xs:px-6 pt-8">
        
        {/* Genre & Meta Pill */}
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${genreMeta.badgeBg}`}>
            <span>{genreMeta.icon}</span>
            <span>{genreMeta.label}</span>
          </span>

          <span className="flex items-center gap-1 text-xs font-mono text-primary-muted">
            <Clock className="w-3.5 h-3.5 text-accent-lime" />
            <span>{story.readingTimeMinutes} min read</span>
          </span>

          <span className="text-primary-faint text-xs font-mono">•</span>
          <span className="text-xs font-mono text-primary-muted">{story.createdAt}</span>
        </div>

        {/* Story Title */}
        <h1 className="text-3xl xs:text-4xl sm:text-5xl font-extrabold font-display text-primary leading-[1.15] tracking-tight mb-4">
          {story.title}
        </h1>

        {/* Hook */}
        <p className="text-base sm:text-lg text-accent-purple font-mono font-medium leading-relaxed mb-6 pb-6 border-b border-surface-border">
          "{story.hook}"
        </p>

        {/* Author Bio Card — Clicking opens THAT author's creator profile! */}
        <div 
          onClick={() => openCreatorProfile(story.authorHandle)}
          className="flex items-center justify-between mb-8 p-3.5 rounded-2xl bg-surface border border-surface-border cursor-pointer hover:border-accent-purple transition-all"
        >
          <div className="flex items-center gap-3">
            <img
              src={story.authorAvatar}
              alt={story.authorName}
              className="w-10 h-10 rounded-full object-cover border border-accent-purple/40"
            />
            <div>
              <p className="text-sm font-bold text-primary hover:text-accent-lime transition-colors">
                {story.authorName}
              </p>
              <p className="text-xs font-mono text-primary-muted">{story.authorHandle}</p>
            </div>
          </div>
          <button
            type="button"
            className="text-xs font-mono text-accent-lime hover:underline font-semibold flex items-center gap-1"
          >
            <span>View Creator Profile</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>

        {/* Adapted Callout Banner if story is animated */}
        {story.isAdapted && (
          <div className="mb-10 p-5 rounded-3xl bg-gradient-to-r from-accent-purple/20 via-surface to-accent-pink/20 border-2 border-accent-pink/50 shadow-glow-pink">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold text-accent-pink uppercase mb-1">
                  <Film className="w-3.5 h-3.5" />
                  <span>COMMUNITY ADAPTATION LIVE</span>
                </div>
                <h2 className="text-lg font-bold font-display text-primary">
                  This story was animated by our studio!
                </h2>
                <p className="text-xs text-primary-muted mt-0.5">
                  Watch the 3D animated video reel with voiceover and spatial audio.
                </p>
              </div>

              <button
                onClick={() => navigateTo('screen')}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-accent-pink text-white font-display font-bold text-xs uppercase tracking-wider shadow-glow-pink active:scale-95 transition-all flex-shrink-0"
              >
                <span>WATCH THIS STORY COME ALIVE 🎬</span>
              </button>
            </div>
          </div>
        )}

        {/* Story Body Content */}
        <div
          className={`story-content transition-all leading-relaxed ${
            fontFamily === 'serif' ? 'font-serif text-slate-100' : 'font-sans text-slate-200'
          } ${
            fontSize === 'normal'
              ? 'text-base sm:text-lg leading-[1.8]'
              : fontSize === 'large'
              ? 'text-lg sm:text-xl leading-[1.85]'
              : 'text-xl sm:text-2xl leading-[1.9]'
          }`}
        >
          {story.content.split('\n\n').map((paragraph, index) => (
            <p key={index} className="mb-6 whitespace-pre-line">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Story Ending Outro Section */}
        <div className="mt-14 pt-10 border-t-2 border-surface-border text-center">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-accent-purple/20 text-accent-purple mb-3">
            <Sparkles className="w-6 h-6 animate-pulse" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-primary mb-2">
            "Okay... that was a ride."
          </h2>

          <p className="text-xs sm:text-sm text-primary-muted font-mono mb-8">
            How did this story leave your brain? Leave your reaction below.
          </p>

          {/* Reaction Picker Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto mb-10">
            <button
              onClick={() => handleReaction('mindblown')}
              className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all active:scale-95 ${
                story.userReactions?.mindblown
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg'
                  : 'bg-surface border-surface-border text-primary-muted hover:text-white hover:bg-surface-elevated'
              }`}
            >
              <Flame className={`w-6 h-6 ${reactionBurst === 'mindblown' ? 'scale-125 text-amber-400' : 'text-amber-500'}`} />
              <span className="text-xs font-bold font-mono">Mindblown</span>
              <span className="text-[11px] text-primary-faint font-mono">{story.reactions.mindblown}</span>
            </button>

            <button
              onClick={() => handleReaction('spooky')}
              className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all active:scale-95 ${
                story.userReactions?.spooky
                  ? 'bg-accent-pink/20 border-accent-pink text-accent-pink shadow-lg'
                  : 'bg-surface border-surface-border text-primary-muted hover:text-white hover:bg-surface-elevated'
              }`}
            >
              <Skull className={`w-6 h-6 ${reactionBurst === 'spooky' ? 'scale-125 text-accent-pink' : 'text-accent-pink'}`} />
              <span className="text-xs font-bold font-mono">Spooky</span>
              <span className="text-[11px] text-primary-faint font-mono">{story.reactions.spooky}</span>
            </button>

            <button
              onClick={() => handleReaction('feltThat')}
              className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all active:scale-95 ${
                story.userReactions?.feltThat
                  ? 'bg-accent-purple/20 border-accent-purple text-accent-purple shadow-lg'
                  : 'bg-surface border-surface-border text-primary-muted hover:text-white hover:bg-surface-elevated'
              }`}
            >
              <Heart className={`w-6 h-6 ${reactionBurst === 'feltThat' ? 'scale-125 text-accent-purple' : 'text-accent-purple'}`} />
              <span className="text-xs font-bold font-mono">Felt That</span>
              <span className="text-[11px] text-primary-faint font-mono">{story.reactions.feltThat}</span>
            </button>

            <button
              onClick={() => handleReaction('unreal')}
              className={`p-3 rounded-2xl border flex flex-col items-center gap-1.5 transition-all active:scale-95 ${
                story.userReactions?.unreal
                  ? 'bg-accent-blue/20 border-accent-blue text-accent-blue shadow-lg'
                  : 'bg-surface border-surface-border text-primary-muted hover:text-white hover:bg-surface-elevated'
              }`}
            >
              <Rocket className={`w-6 h-6 ${reactionBurst === 'unreal' ? 'scale-125 text-accent-blue' : 'text-accent-blue'}`} />
              <span className="text-xs font-bold font-mono">Unreal</span>
              <span className="text-[11px] text-primary-faint font-mono">{story.reactions.unreal}</span>
            </button>
          </div>

          {/* Social Share & Navigation Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-12">
            <button
              onClick={handleShare}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-surface-elevated border border-surface-border text-primary font-display font-semibold text-sm hover:bg-surface-subtle transition-colors"
            >
              <Share2 className="w-4 h-4 text-accent-blue" />
              <span>Share With Friends</span>
            </button>

            <button
              onClick={() => {
                const nextStory = stories.find((s) => s.id !== story.id);
                if (nextStory) {
                  navigateTo('reader', nextStory.id);
                } else {
                  navigateTo('explore');
                }
              }}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-pink text-white font-display font-bold text-sm shadow-glow-purple active:scale-95 transition-all"
            >
              <span>Read Another Story →</span>
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <section className="pt-8 border-t border-surface-border">
          <h2 className="text-xl font-bold font-display text-primary mb-4 flex items-center justify-between">
            <span>Thoughts & Theories</span>
            <span className="text-xs font-mono text-primary-muted font-normal">
              {storyComments.length} {storyComments.length === 1 ? 'comment' : 'comments'}
            </span>
          </h2>

          {/* Comment Form */}
          <form onSubmit={handleCommentSubmit} className="mb-6 flex gap-2">
            <input
              type="text"
              value={newCommentText}
              onChange={(e) => setNewCommentText(e.target.value)}
              placeholder="Drop a theory, plot analysis, or emotional reaction..."
              className="flex-1 px-4 py-3 rounded-2xl bg-surface border border-surface-border text-primary placeholder-primary-faint text-sm focus:outline-none focus:border-accent-purple"
            />
            <button
              type="submit"
              disabled={!newCommentText.trim()}
              className="px-4 py-3 rounded-2xl bg-accent-purple text-white disabled:opacity-40 hover:bg-accent-purple/90 transition-all flex items-center justify-center"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Comments List */}
          <div className="space-y-3">
            {storyComments.map((c) => (
              <div key={c.id} className="p-3.5 rounded-2xl bg-surface/70 border border-surface-border">
                <div className="flex items-center justify-between mb-1.5">
                  <div 
                    onClick={() => openCreatorProfile(c.authorHandle)}
                    className="flex items-center gap-2 cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <img src={c.authorAvatar} alt={c.authorName} className="w-5 h-5 rounded-full object-cover" />
                    <span className="text-xs font-bold text-primary hover:text-accent-lime transition-colors">{c.authorName}</span>
                    <span className="text-[11px] font-mono text-primary-faint">{c.authorHandle}</span>
                  </div>
                  <span className="text-[10px] font-mono text-primary-muted">{c.createdAt}</span>
                </div>
                <p className="text-sm text-primary-muted">{c.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* More Stories from this Universe */}
        {relatedStories.length > 0 && (
          <section className="mt-12 pt-8 border-t border-surface-border">
            <h2 className="text-lg font-bold font-display text-primary mb-4">
              More Stories to Fall Into
            </h2>
            <div className="space-y-3">
              {relatedStories.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => navigateTo('reader', rel.id)}
                  className="p-4 rounded-2xl bg-surface hover:bg-surface-elevated border border-surface-border cursor-pointer transition-all flex items-center justify-between gap-4"
                >
                  <div>
                    <h3 className="text-sm font-bold text-primary mb-1">{rel.title}</h3>
                    <p className="text-xs text-primary-muted line-clamp-1">{rel.hook}</p>
                  </div>
                  <span className="text-xs font-mono text-accent-purple font-semibold flex-shrink-0">
                    Read →
                  </span>
                </div>
              ))}
            </div>
          </section>
        )}

      </main>
    </div>
  );
};
