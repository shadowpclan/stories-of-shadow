import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StoryCard } from '../explore/StoryCard';
import { StoryTrackingCard } from './StoryTrackingCard';
import { 
  User, Sparkles, Instagram, Bookmark, PenTool, 
  Clock, CheckCircle2, AlertCircle, Film, Shield, ArrowLeft, 
  LogOut, Edit3, Search, ExternalLink 
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { 
    currentUser, 
    viewingProfile, 
    stories, 
    currentView, 
    navigateTo, 
    goBack, 
    signOut, 
    setIsAuthModalOpen,
    openCreatorProfile 
  } = useApp();

  const [activeTab, setActiveTab] = useState<'tracking' | 'stories' | 'saved'>('tracking');
  const [trackSearchId, setTrackSearchId] = useState('');

  // Determine which profile is being displayed:
  const isViewingOther = currentView === 'creator-profile' && !!viewingProfile;
  const profile = isViewingOther ? viewingProfile : currentUser;

  // Filter stories for this profile
  const authorStories = profile 
    ? stories.filter((s) => s.authorHandle === profile.handle || profile.submittedStoryIds?.includes(s.id))
    : [];

  const savedStories = profile
    ? stories.filter((s) => profile.savedStoryIds?.includes(s.id))
    : [];

  // Stories to track:
  const userTrackedStories = profile
    ? stories.filter((s) => profile.submittedStoryIds?.includes(s.id) || s.authorHandle === profile.handle)
    : [];

  // Live aggregated stats
  const totalLiveReads = authorStories.reduce((acc, curr) => acc + curr.views, 0);
  const totalApproved = authorStories.filter((s) => s.status === 'approved' || s.status === 'featured').length;
  const totalAdapted = authorStories.filter((s) => s.isAdapted).length;

  // If visitor is viewing their own profile but isn't signed in yet:
  if (!isViewingOther && !currentUser) {
    return (
      <div className="min-h-screen px-4 xs:px-6 pt-10 pb-28 max-w-xl mx-auto flex flex-col items-center justify-center text-center">
        <div className="w-20 h-20 rounded-3xl bg-gradient-to-tr from-accent-purple via-accent-pink to-accent-lime p-0.5 shadow-glow-purple mb-6">
          <div className="w-full h-full bg-void rounded-[22px] flex items-center justify-center text-accent-pink">
            <Instagram className="w-10 h-10" />
          </div>
        </div>

        <span className="text-xs font-mono font-bold uppercase tracking-wider text-accent-pink mb-2">
          CREATOR PASSPORT ✦
        </span>

        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-primary tracking-tight mb-3">
          Claim Your Story Universe
        </h1>

        <p className="text-sm text-primary-muted font-normal max-w-md mx-auto leading-relaxed mb-8">
          Sign in with your Instagram handle so you can track your submissions through editorial review, watch live reader analytics, and get credited when your story gets animated.
        </p>

        <div className="w-full space-y-3">
          <button
            onClick={() => setIsAuthModalOpen(true)}
            className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-purple via-accent-pink to-accent-lime text-white font-display font-extrabold text-base tracking-wide shadow-glow-purple active:scale-95 transition-all flex items-center justify-center gap-2"
          >
            <Instagram className="w-5 h-5" />
            <span>Connect With Instagram</span>
          </button>

          <button
            onClick={() => navigateTo('explore')}
            className="w-full py-3.5 rounded-2xl bg-surface-elevated hover:bg-surface-subtle border border-surface-border text-primary font-display font-medium text-xs transition-colors"
          >
            Browse Community Stories First
          </button>
        </div>

        {/* Quick Anonymous Story Tracker */}
        <div className="mt-12 p-5 rounded-2xl bg-surface border border-surface-border w-full text-left">
          <span className="text-xs font-mono uppercase font-bold text-accent-purple block mb-2">
            Have a Submission ID already?
          </span>
          <div className="flex gap-2">
            <input
              type="text"
              value={trackSearchId}
              onChange={(e) => setTrackSearchId(e.target.value)}
              placeholder="e.g. story-1 or story-1732..."
              className="flex-1 px-3 py-2 rounded-xl bg-void border border-surface-border text-xs font-mono text-primary placeholder-primary-faint focus:outline-none focus:border-accent-purple"
            />
            <button
              onClick={() => {
                const found = stories.find((s) => s.id === trackSearchId.trim());
                if (found) {
                  navigateTo('reader', found.id);
                } else {
                  alert('Submission ID not found in current timeline');
                }
              }}
              className="px-4 py-2 rounded-xl bg-accent-purple text-white text-xs font-mono font-bold"
            >
              Track
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!profile) return null;

  return (
    <div className="min-h-screen px-4 xs:px-6 pt-6 pb-28 max-w-4xl mx-auto w-full overflow-x-hidden">
      {/* If viewing another creator, show back button */}
      {isViewingOther && (
        <button
          onClick={goBack}
          className="inline-flex items-center gap-1.5 text-xs font-mono text-primary-muted hover:text-white mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back</span>
        </button>
      )}

      {/* Profile Header Card */}
      <div className="relative rounded-3xl bg-surface border border-surface-border p-5 sm:p-8 mb-8 overflow-hidden shadow-card-elevated">
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-r from-accent-purple/30 via-accent-pink/20 to-accent-blue/30" />

        <div className="relative z-10 pt-10 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-5 text-center sm:text-left">
          {/* Avatar & Core Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-shrink-0 w-24 h-24">
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-surface shadow-xl flex-shrink-0"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-accent-lime border-2 border-surface flex items-center justify-center text-[10px] text-black font-bold">
                ✓
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-primary">
                {profile.name}
              </h1>
              <p className="text-xs sm:text-sm font-mono text-accent-purple font-medium">
                {profile.handle}
              </p>
              {profile.instagramHandle && (
                <a
                  href={`https://instagram.com/${profile.instagramHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-accent-pink hover:underline mt-1 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>{profile.instagramHandle}</span>
                  <ExternalLink className="w-3 h-3 ml-0.5" />
                </a>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
            {!isViewingOther ? (
              <>
                <button
                  onClick={() => navigateTo('create')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-pink text-white font-display font-bold text-xs uppercase tracking-wider shadow-glow-purple active:scale-95 transition-all"
                >
                  <PenTool className="w-3.5 h-3.5" />
                  <span>Drop Story</span>
                </button>

                <button
                  onClick={() => navigateTo('admin')}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-2xl bg-surface-elevated hover:bg-surface-subtle border border-surface-border text-xs font-mono text-primary-muted hover:text-white transition-colors"
                  title="Editorial Moderation"
                >
                  <Shield className="w-3.5 h-3.5 text-accent-lime" />
                  <span>Editorial</span>
                </button>

                <button
                  onClick={signOut}
                  className="p-2.5 rounded-2xl bg-surface-elevated hover:bg-surface-subtle border border-surface-border text-xs text-primary-muted hover:text-red-400 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <a
                href={`https://instagram.com/${profile.instagramHandle.replace('@', '')}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-pink text-white font-display font-bold text-xs uppercase tracking-wider shadow-glow-purple active:scale-95 transition-all"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Follow On Instagram</span>
              </a>
            )}
          </div>
        </div>

        {/* Bio */}
        <p className="relative z-10 text-sm text-primary-muted mt-5 max-w-xl">
          {profile.bio}
        </p>

        {/* Badges Ribbon */}
        <div className="relative z-10 flex flex-wrap gap-2 mt-5">
          {profile.badges.map((badge, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-void/80 border border-white/10 text-xs font-mono text-primary font-medium shadow-inner"
            >
              <Sparkles className="w-3 h-3 text-accent-lime" />
              <span>{badge}</span>
            </span>
          ))}
        </div>

        {/* Creator Stats Cards */}
        <div className="relative z-10 grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6 pt-6 border-t border-surface-border">
          <div className="p-3 rounded-2xl bg-void/50 border border-surface-border text-center">
            <p className="text-xl font-bold font-display text-primary">
              {authorStories.length || profile.stats.storiesSubmitted}
            </p>
            <p className="text-[10px] font-mono text-primary-muted uppercase mt-0.5">Submitted</p>
          </div>
          <div className="p-3 rounded-2xl bg-void/50 border border-surface-border text-center">
            <p className="text-xl font-bold font-display text-accent-lime">
              {totalApproved || profile.stats.storiesApproved}
            </p>
            <p className="text-[10px] font-mono text-primary-muted uppercase mt-0.5">Approved</p>
          </div>
          <div className="p-3 rounded-2xl bg-void/50 border border-surface-border text-center">
            <p className="text-xl font-bold font-display text-accent-pink">
              {totalAdapted || profile.stats.storiesAdapted}
            </p>
            <p className="text-[10px] font-mono text-primary-muted uppercase mt-0.5">Animated 🎬</p>
          </div>
          <div className="p-3 rounded-2xl bg-void/50 border border-surface-border text-center">
            <p className="text-xl font-bold font-display text-accent-purple">
              {totalLiveReads.toLocaleString()}
            </p>
            <p className="text-[10px] font-mono text-primary-muted uppercase mt-0.5">Total Reads</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-4 mb-6 border-b border-surface-border pb-3 overflow-x-auto no-scrollbar">
        {!isViewingOther && (
          <button
            onClick={() => setActiveTab('tracking')}
            className={`flex items-center gap-2 pb-2 text-sm font-display font-bold transition-all relative whitespace-nowrap ${
              activeTab === 'tracking'
                ? 'text-primary'
                : 'text-primary-muted hover:text-white'
            }`}
          >
            <Clock className="w-4 h-4 text-accent-lime" />
            <span>Live Tracking & Pipeline ({userTrackedStories.length})</span>
            {activeTab === 'tracking' && (
              <span className="absolute bottom-[-13px] inset-x-0 h-0.5 bg-accent-lime rounded-full" />
            )}
          </button>
        )}

        <button
          onClick={() => setActiveTab('stories')}
          className={`flex items-center gap-2 pb-2 text-sm font-display font-bold transition-all relative whitespace-nowrap ${
            activeTab === 'stories' || (isViewingOther && activeTab === 'tracking')
              ? 'text-primary'
              : 'text-primary-muted hover:text-white'
          }`}
        >
          <PenTool className="w-4 h-4 text-accent-purple" />
          <span>Published Stories ({authorStories.length})</span>
          {(activeTab === 'stories' || (isViewingOther && activeTab === 'tracking')) && (
            <span className="absolute bottom-[-13px] inset-x-0 h-0.5 bg-accent-purple rounded-full" />
          )}
        </button>

        {!isViewingOther && (
          <button
            onClick={() => setActiveTab('saved')}
            className={`flex items-center gap-2 pb-2 text-sm font-display font-bold transition-all relative whitespace-nowrap ${
              activeTab === 'saved'
                ? 'text-primary'
                : 'text-primary-muted hover:text-white'
            }`}
          >
            <Bookmark className="w-4 h-4 text-accent-pink" />
            <span>Saved Stash ({savedStories.length})</span>
            {activeTab === 'saved' && (
              <span className="absolute bottom-[-13px] inset-x-0 h-0.5 bg-accent-pink rounded-full" />
            )}
          </button>
        )}
      </div>

      {/* Tab Content */}
      {activeTab === 'tracking' && !isViewingOther && (
        <div className="space-y-6">
          <div className="flex items-center justify-between text-xs font-mono text-primary-muted">
            <span>Real-time submission journey & analytics</span>
            <span className="text-accent-lime">● Auto-updating</span>
          </div>

          {userTrackedStories.length > 0 ? (
            userTrackedStories.map((story) => (
              <StoryTrackingCard key={story.id} story={story} />
            ))
          ) : (
            <div className="p-8 rounded-3xl bg-surface border border-surface-border text-center space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-surface-elevated text-accent-purple flex items-center justify-center mx-auto">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="text-lg font-bold font-display text-primary">No submissions yet</h3>
              <p className="text-xs text-primary-muted max-w-sm mx-auto">
                Drop your first random shower thought, weird dream, or crazy plot twist. You'll be able to track every stage here!
              </p>
              <button
                onClick={() => navigateTo('create')}
                className="px-6 py-3 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-pink text-white font-display font-bold text-xs uppercase tracking-wider shadow-glow-purple active:scale-95 transition-all"
              >
                Drop A Story Now ↗
              </button>
            </div>
          )}
        </div>
      )}

      {(activeTab === 'stories' || (isViewingOther && activeTab === 'tracking')) && (
        <div className="space-y-4">
          {authorStories.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {authorStories.map((story) => (
                <StoryCard key={story.id} story={story} />
              ))}
            </div>
          ) : (
            <div className="p-8 rounded-3xl bg-surface text-center">
              <p className="text-sm text-primary-muted">No published stories yet under this profile.</p>
            </div>
          )}
        </div>
      )}

      {activeTab === 'saved' && !isViewingOther && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {savedStories.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
};
