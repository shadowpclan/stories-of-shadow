import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Story, GenreId } from '../../types';
import { GENRES } from '../../data/genres';
import { 
  Shield, CheckCircle, XCircle, Star, Film, Eye, 
  Filter, Search, ArrowLeft, Clock, AlertTriangle, Layers 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { stories, updateStoryStatus, navigateTo, goBack, showToast } = useApp();

  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'featured'>('all');
  const [genreFilter, setGenreFilter] = useState<GenreId | 'all'>('all');
  const [search, setSearch] = useState('');
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  // Filtered list
  const filteredStories = stories.filter((s) => {
    if (statusFilter !== 'all' && s.status !== statusFilter) return false;
    if (genreFilter !== 'all' && s.genre !== genreFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        s.authorName.toLowerCase().includes(q) ||
        s.hook.toLowerCase().includes(q)
      );
    }
    return true;
  });

  // Moderation metrics
  const pendingCount = stories.filter((s) => s.status === 'pending').length;
  const approvedCount = stories.filter((s) => s.status === 'approved' || s.status === 'featured').length;
  const adaptedCount = stories.filter((s) => s.isAdapted).length;

  return (
    <div className="min-h-screen px-4 xs:px-6 pt-6 pb-28 max-w-6xl mx-auto">
      {/* Top Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-surface-border">
        <div>
          <button
            onClick={goBack}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-primary-muted hover:text-white mb-2"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Return to Universe</span>
          </button>
          <div className="flex items-center gap-2">
            <Shield className="w-6 h-6 text-accent-lime" />
            <h1 className="text-2xl sm:text-3xl font-extrabold font-display text-primary">
              Editorial Moderation Queue
            </h1>
          </div>
          <p className="text-xs font-mono text-primary-muted mt-1">
            Review community plot submissions, manage permissions, and promote stories to animation.
          </p>
        </div>

        {/* Quick Stats Pills */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
            Pending: <strong>{pendingCount}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-accent-lime/15 border border-accent-lime/30 text-accent-lime">
            Live: <strong>{approvedCount}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-accent-pink/15 border border-accent-pink/30 text-accent-pink">
            In Production: <strong>{adaptedCount}</strong>
          </span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-surface border border-surface-border mb-6 flex flex-col md:flex-row items-stretch md:items-center gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-primary-muted" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Filter by title, writer, or phrase..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-void border border-surface-border text-primary text-xs font-mono focus:outline-none focus:border-accent-purple"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar">
          {(['all', 'pending', 'approved', 'featured', 'rejected'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono capitalize transition-colors ${
                statusFilter === st
                  ? 'bg-accent-purple text-white font-bold'
                  : 'bg-void text-primary-muted hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Content Area: Desktop Table & Mobile Stacked Cards */}
      <div className="rounded-2xl bg-surface border border-surface-border overflow-hidden">
        {/* Desktop Table View (Hidden on mobile) */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-surface-elevated text-primary-muted uppercase border-b border-surface-border">
              <tr>
                <th className="p-4">Story & Hook</th>
                <th className="p-4">Author</th>
                <th className="p-4">Genre</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Moderation Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {filteredStories.map((story) => (
                <tr key={story.id} className="hover:bg-surface-elevated/50 transition-colors">
                  <td className="p-4 max-w-sm">
                    <p className="font-bold font-sans text-sm text-primary truncate">{story.title}</p>
                    <p className="text-primary-muted text-[11px] truncate mt-0.5">{story.hook}</p>
                  </td>

                  <td className="p-4 whitespace-nowrap text-primary-muted">
                    <p className="text-primary font-medium">{story.authorName}</p>
                    <p className="text-[10px] text-primary-faint">{story.authorHandle}</p>
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-md bg-void border border-surface-border text-[11px] text-primary">
                      {story.genre}
                    </span>
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-bold uppercase ${
                        story.status === 'pending'
                          ? 'bg-amber-500/20 text-amber-300'
                          : story.status === 'approved'
                          ? 'bg-accent-lime/20 text-accent-lime'
                          : story.status === 'featured'
                          ? 'bg-accent-purple/20 text-accent-purple'
                          : 'bg-red-500/20 text-red-300'
                      }`}
                    >
                      {story.status}
                    </span>
                  </td>

                  <td className="p-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => updateStoryStatus(story.id, 'approved')}
                        title="Approve Story"
                        className="p-1.5 rounded-lg bg-accent-lime/10 text-accent-lime hover:bg-accent-lime/20 transition-colors"
                      >
                        <CheckCircle className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => updateStoryStatus(story.id, 'featured')}
                        title="Feature on Discovery"
                        className="p-1.5 rounded-lg bg-accent-purple/10 text-accent-purple hover:bg-accent-purple/20 transition-colors"
                      >
                        <Star className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => updateStoryStatus(story.id, 'approved', true, 'scripting')}
                        title="Nominate for 3D Animation"
                        className="p-1.5 rounded-lg bg-accent-pink/10 text-accent-pink hover:bg-accent-pink/20 transition-colors"
                      >
                        <Film className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => updateStoryStatus(story.id, 'rejected')}
                        title="Reject Story"
                        className="p-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 transition-colors"
                      >
                        <XCircle className="w-4 h-4" />
                      </button>

                      <button
                        onClick={() => navigateTo('reader', story.id)}
                        title="Read Full Story"
                        className="p-1.5 rounded-lg bg-surface-elevated text-primary hover:text-white transition-colors"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile Stacked Cards (Visible on mobile screens) */}
        <div className="md:hidden divide-y divide-surface-border">
          {filteredStories.map((story) => (
            <div key={story.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-bold text-sm text-primary">{story.title}</h3>
                  <p className="text-xs text-primary-muted mt-0.5">{story.authorName} • {story.genre}</p>
                </div>
                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    story.status === 'pending'
                      ? 'bg-amber-500/20 text-amber-300'
                      : story.status === 'approved'
                      ? 'bg-accent-lime/20 text-accent-lime'
                      : story.status === 'featured'
                      ? 'bg-accent-purple/20 text-accent-purple'
                      : 'bg-red-500/20 text-red-300'
                  }`}
                >
                  {story.status}
                </span>
              </div>

              <p className="text-xs text-primary-faint line-clamp-2 font-mono">
                "{story.hook}"
              </p>

              {/* Mobile Actions Toolbar */}
              <div className="flex items-center justify-between pt-2 border-t border-surface-border/60">
                <button
                  onClick={() => navigateTo('reader', story.id)}
                  className="text-xs font-mono text-accent-blue hover:underline"
                >
                  Read Text →
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => updateStoryStatus(story.id, 'approved')}
                    className="px-2.5 py-1 rounded-lg bg-accent-lime/15 text-accent-lime text-xs font-mono font-bold"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => updateStoryStatus(story.id, 'featured')}
                    className="px-2.5 py-1 rounded-lg bg-accent-purple/15 text-accent-purple text-xs font-mono font-bold"
                  >
                    Feature
                  </button>
                  <button
                    onClick={() => updateStoryStatus(story.id, 'rejected')}
                    className="px-2.5 py-1 rounded-lg bg-red-500/15 text-red-400 text-xs font-mono font-bold"
                  >
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
