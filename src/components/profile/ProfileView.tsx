import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { StoryCard } from '../explore/StoryCard';
import { 
  User, Sparkles, Instagram, Bookmark, PenTool, 
  Clock, CheckCircle2, AlertCircle, Film, Shield, ArrowRight 
} from 'lucide-react';

export const ProfileView: React.FC = () => {
  const { user, stories, navigateTo } = useApp();
  const [activeTab, setActiveTab] = useState<'submissions' | 'saved'>('submissions');

  // Stories submitted by user
  const userSubmissions = stories.filter((s) => user.submittedStoryIds.includes(s.id));
  const userSaved = stories.filter((s) => user.savedStoryIds.includes(s.id));

  return (
    <div className="min-h-screen px-4 xs:px-6 pt-6 pb-28 max-w-4xl mx-auto">
      {/* Profile Header Card */}
      <div className="relative rounded-3xl bg-surface border border-surface-border p-5 sm:p-8 mb-8 overflow-hidden shadow-card-elevated">
        <div className="absolute top-0 inset-x-0 h-28 bg-gradient-to-r from-accent-purple/30 via-accent-pink/20 to-accent-blue/30" />

        <div className="relative z-10 pt-10 flex flex-col sm:flex-row items-center sm:items-end justify-between gap-5 text-center sm:text-left">
          {/* Avatar & Core Info */}
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="relative flex-shrink-0 w-24 h-24">
              <img
                src={user.avatar}
                alt={user.name}
                className="w-24 h-24 rounded-full object-cover border-4 border-surface shadow-xl flex-shrink-0"
              />
              <span className="absolute bottom-1 right-1 w-5 h-5 rounded-full bg-accent-lime border-2 border-surface flex items-center justify-center text-[10px] text-black font-bold">
                ✓
              </span>
            </div>

            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-primary">
                {user.name}
              </h1>
              <p className="text-xs sm:text-sm font-mono text-accent-purple font-medium">
                {user.handle}
              </p>
              {user.instagramHandle && (
                <a
                  href={`https://instagram.com/${user.instagramHandle.replace('@', '')}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-mono text-primary-muted hover:text-accent-pink mt-1 transition-colors"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  <span>{user.instagramHandle}</span>
                </a>
              )}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2 flex-wrap justify-center sm:justify-end">
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
              title="Moderation Console"
            >
              <Shield className="w-3.5 h-3.5 text-accent-lime" />
              <span>Editorial</span>
            </button>
          </div>
        </div>

        {/* Bio */}
        <p className="relative z-10 text-sm text-primary-muted mt-5 max-w-xl">
          {user.bio}
        </p>

        {/* Badges Ribbon */}
        <div className="relative z-10 flex flex-wrap gap-2 mt-5">
          {user.badges.map((badge, idx) => (
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
            <p className="text-xl font-bold font-display text-primary">{user.stats.storiesSubmitted}</p>
            <p className="text-[10px] font-mono text-primary-muted uppercase mt-0.5">Submitted</p>
          </div>
          <div className="p-3 rounded-2xl bg-void/50 border border-surface-border text-center">
            <p className="text-xl font-bold font-display text-accent-lime">{user.stats.storiesApproved}</p>
            <p className="text-[10px] font-mono text-primary-muted uppercase mt-0.5">Approved</p>
          </div>
          <div className="p-3 rounded-2xl bg-void/50 border border-surface-border text-center">
            <p className="text-xl font-bold font-display text-accent-pink">{user.stats.storiesAdapted}</p>
            <p className="text-[10px] font-mono text-primary-muted uppercase mt-0.5">Animated 🎬</p>
          </div>
          <div className="p-3 rounded-2xl bg-void/50 border border-surface-border text-center">
            <p className="text-xl font-bold font-display text-accent-purple">{user.stats.totalReads.toLocaleString()}</p>
            <p className="text-[10px] font-mono text-primary-muted uppercase mt-0.5">Total Reads</p>
          </div>
        </div>
      </div>

      {/* Tabs: My Submissions vs Stash */}
      <div className="flex items-center gap-4 mb-6 border-b border-surface-border pb-3">
        <button
          onClick={() => setActiveTab('submissions')}
          className={`flex items-center gap-2 pb-2 text-sm font-display font-bold transition-all relative ${
            activeTab === 'submissions'
              ? 'text-primary'
              : 'text-primary-muted hover:text-white'
          }`}
        >
          <PenTool className="w-4 h-4 text-accent-purple" />
          <span>My Submissions & Pipeline</span>
          {activeTab === 'submissions' && (
            <span className="absolute bottom-[-13px] inset-x-0 h-0.5 bg-accent-purple rounded-full" />
          )}
        </button>

        <button
          onClick={() => setActiveTab('saved')}
          className={`flex items-center gap-2 pb-2 text-sm font-display font-bold transition-all relative ${
            activeTab === 'saved'
              ? 'text-primary'
              : 'text-primary-muted hover:text-white'
          }`}
        >
          <Bookmark className="w-4 h-4 text-accent-pink" />
          <span>Your Stash ({userSaved.length})</span>
          {activeTab === 'saved' && (
            <span className="absolute bottom-[-13px] inset-x-0 h-0.5 bg-accent-pink rounded-full" />
          )}
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'submissions' ? (
        <div className="space-y-4">
          {userSubmissions.length > 0 ? (
            userSubmissions.map((story) => (
              <div
                key={story.id}
                className="p-5 rounded-3xl bg-surface border border-surface-border flex flex-col md:flex-row md:items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    {story.status === 'pending' && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                        <Clock className="w-3 h-3" />
                        <span>Under Review</span>
                      </span>
                    )}
                    {(story.status === 'approved' || story.status === 'featured') && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-accent-lime/20 text-accent-lime border border-accent-lime/40">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Published</span>
                      </span>
                    )}
                    {story.isAdapted && (
                      <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-mono font-bold bg-accent-pink/20 text-accent-pink border border-accent-pink/40">
                        <Film className="w-3 h-3" />
                        <span>In Animation Pipeline</span>
                      </span>
                    )}
                    <span className="text-xs font-mono text-primary-muted">• {story.createdAt}</span>
                  </div>

                  <h3 className="text-lg font-bold font-display text-primary">{story.title}</h3>
                  <p className="text-xs text-primary-muted line-clamp-1 mt-0.5">{story.hook}</p>
                </div>

                <div className="flex items-center gap-2 flex-shrink-0">
                  <button
                    onClick={() => navigateTo('reader', story.id)}
                    className="px-4 py-2 rounded-xl bg-surface-elevated hover:bg-surface-subtle border border-surface-border text-xs font-mono text-primary font-medium"
                  >
                    View Story →
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 rounded-3xl bg-surface text-center">
              <p className="text-sm text-primary-muted mb-4">You haven't dropped any stories yet.</p>
              <button
                onClick={() => navigateTo('create')}
                className="px-5 py-2.5 rounded-2xl bg-accent-purple text-white text-xs font-display font-bold"
              >
                Drop Your First Story ↗
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
          {userSaved.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      )}
    </div>
  );
};
