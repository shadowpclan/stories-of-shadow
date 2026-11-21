import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Story, GenreId, SubmissionPipelineStep } from '../../types';
import { GENRES } from '../../data/genres';
import { 
  Shield, CheckCircle, XCircle, Star, Film, Eye, 
  Filter, Search, ArrowLeft, Clock, AlertTriangle, Layers, Sparkles 
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { stories, updateStoryStatus, navigateTo, goBack, showToast } = useApp();

  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'approved' | 'rejected' | 'featured'>('all');
  const [genreFilter, setGenreFilter] = useState<GenreId | 'all'>('all');
  const [search, setSearch] = useState('');
  const [editingStoryId, setEditingStoryId] = useState<string | null>(null);
  const [customNote, setCustomNote] = useState('');

  const filteredStories = stories.filter((s) => {
    if (statusFilter !== 'all' && s.status !== statusFilter) return false;
    if (genreFilter !== 'all' && s.genre !== genreFilter) return false;
    if (search.trim()) {
      const q = search.toLowerCase();
      return (
        s.title.toLowerCase().includes(q) ||
        s.authorName.toLowerCase().includes(q) ||
        s.hook.toLowerCase().includes(q) ||
        s.id.toLowerCase().includes(q)
      );
    }
    return true;
  });

  const pendingCount = stories.filter((s) => s.status === 'pending').length;
  const approvedCount = stories.filter((s) => s.status === 'approved' || s.status === 'featured').length;
  const adaptedCount = stories.filter((s) => s.isAdapted).length;

  const handleUpdatePipeline = (story: Story, step: SubmissionPipelineStep, status: Story['status'], isAdapted?: boolean, note?: string) => {
    updateStoryStatus(
      story.id,
      status,
      isAdapted,
      step === 5 ? 'released' : step === 4 ? 'in-production' : undefined,
      step,
      note || (step === 3 ? 'Approved by editorial team! Live on community discovery feed.' : step === 4 ? 'Story selected for 3D animation adaptation! Storyboard and audio casting in progress.' : step === 5 ? 'Animation released on Instagram Reels and YouTube!' : undefined)
    );
  };

  return (
    <div className="min-h-screen px-4 xs:px-6 pt-6 pb-28 max-w-6xl mx-auto w-full overflow-x-hidden">
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
              Editorial Studio & Moderation Console
            </h1>
          </div>
          <p className="text-xs font-mono text-primary-muted mt-1">
            Review incoming submissions, advance pipeline stages, and publish live feedback to creator tracking dashboards.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="flex flex-wrap items-center gap-2 font-mono text-xs">
          <span className="px-3 py-1.5 rounded-xl bg-amber-500/15 border border-amber-500/30 text-amber-300">
            Pending: <strong>{pendingCount}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-accent-lime/15 border border-accent-lime/30 text-accent-lime">
            Live: <strong>{approvedCount}</strong>
          </span>
          <span className="px-3 py-1.5 rounded-xl bg-accent-pink/15 border border-accent-pink/30 text-accent-pink">
            In Animation: <strong>{adaptedCount}</strong>
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
            placeholder="Filter by title, writer, handle (@...), or ID..."
            className="w-full pl-10 pr-4 py-2 rounded-xl bg-void border border-surface-border text-primary text-xs font-mono focus:outline-none focus:border-accent-purple"
          />
        </div>

        {/* Status Filter */}
        <div className="flex items-center gap-1 overflow-x-auto no-scrollbar py-1">
          {(['all', 'pending', 'approved', 'featured', 'rejected'] as const).map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono capitalize transition-colors whitespace-nowrap ${
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

      {/* Stories List */}
      <div className="rounded-2xl bg-surface border border-surface-border overflow-hidden">
        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left text-xs font-mono">
            <thead className="bg-surface-elevated text-primary-muted uppercase border-b border-surface-border">
              <tr>
                <th className="p-4">Submission & Hook</th>
                <th className="p-4">Creator / IG</th>
                <th className="p-4">Genre</th>
                <th className="p-4">Pipeline Stage</th>
                <th className="p-4 text-right">Advance Stage Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-border">
              {filteredStories.map((story) => (
                <tr key={story.id} className="hover:bg-surface-elevated/50 transition-colors">
                  <td className="p-4 max-w-sm">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className="text-[10px] text-accent-purple font-bold">{story.id}</span>
                      <span className="text-primary-muted text-[10px]">• {story.createdAt}</span>
                    </div>
                    <p className="font-bold font-sans text-sm text-primary truncate">{story.title}</p>
                    <p className="text-primary-muted text-[11px] truncate mt-0.5">{story.hook}</p>
                  </td>

                  <td className="p-4 whitespace-nowrap text-primary-muted">
                    <p className="text-primary font-medium">{story.authorName}</p>
                    <p className="text-[10px] text-accent-pink font-mono">{story.authorHandle}</p>
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <span className="px-2 py-0.5 rounded-md bg-void border border-surface-border text-[11px] text-primary">
                      {story.genre}
                    </span>
                  </td>

                  <td className="p-4 whitespace-nowrap">
                    <div className="space-y-1">
                      <span
                        className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                          story.pipelineStep === 1
                            ? 'bg-blue-500/20 text-blue-300'
                            : story.pipelineStep === 2
                            ? 'bg-amber-500/20 text-amber-300'
                            : story.pipelineStep === 3
                            ? 'bg-accent-lime/20 text-accent-lime'
                            : story.pipelineStep === 4
                            ? 'bg-accent-purple/20 text-accent-purple'
                            : 'bg-accent-pink/20 text-accent-pink'
                        }`}
                      >
                        Stage {story.pipelineStep || 2}: {
                          story.pipelineStep === 1 ? 'Received' :
                          story.pipelineStep === 2 ? 'In Review' :
                          story.pipelineStep === 3 ? 'Live' :
                          story.pipelineStep === 4 ? '3D Production' : 'Animated'
                        }
                      </span>
                      <p className="text-[10px] text-primary-faint truncate max-w-[140px]">
                        {story.editorialReviewNotes || 'In review queue'}
                      </p>
                    </div>
                  </td>

                  <td className="p-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-1.5">
                      {/* Step 3: Approve & Publish */}
                      <button
                        onClick={() => handleUpdatePipeline(story, 3, 'approved')}
                        title="Stage 3: Approve & Publish Live"
                        className="px-2 py-1 rounded-lg bg-accent-lime/10 text-accent-lime hover:bg-accent-lime/20 font-bold transition-colors"
                      >
                        Approve Live
                      </button>

                      {/* Step 4: Nominate for 3D Animation */}
                      <button
                        onClick={() => handleUpdatePipeline(story, 4, 'approved', true)}
                        title="Stage 4: Start 3D Animation"
                        className="px-2 py-1 rounded-lg bg-accent-purple/10 text-accent-purple hover:bg-accent-purple/20 font-bold transition-colors"
                      >
                        Start 3D
                      </button>

                      {/* Step 5: Mark Animation Released */}
                      <button
                        onClick={() => handleUpdatePipeline(story, 5, 'featured', true)}
                        title="Stage 5: Animation Released on Reels"
                        className="px-2 py-1 rounded-lg bg-accent-pink/10 text-accent-pink hover:bg-accent-pink/20 font-bold transition-colors"
                      >
                        Released ✨
                      </button>

                      {/* View text */}
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

        {/* Mobile Stacked Cards */}
        <div className="md:hidden divide-y divide-surface-border">
          {filteredStories.map((story) => (
            <div key={story.id} className="p-4 space-y-3">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-mono text-accent-purple font-bold">{story.id}</span>
                  <h3 className="font-bold text-sm text-primary">{story.title}</h3>
                  <p className="text-xs text-primary-muted mt-0.5">
                    {story.authorName} <span className="text-accent-pink font-mono">({story.authorHandle})</span>
                  </p>
                </div>

                <span
                  className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase ${
                    story.pipelineStep === 1
                      ? 'bg-blue-500/20 text-blue-300'
                      : story.pipelineStep === 2
                      ? 'bg-amber-500/20 text-amber-300'
                      : story.pipelineStep === 3
                      ? 'bg-accent-lime/20 text-accent-lime'
                      : story.pipelineStep === 4
                      ? 'bg-accent-purple/20 text-accent-purple'
                      : 'bg-accent-pink/20 text-accent-pink'
                  }`}
                >
                  Stage {story.pipelineStep || 2}
                </span>
              </div>

              <p className="text-xs text-primary-muted font-sans line-clamp-2">
                "{story.hook}"
              </p>

              <div className="p-2.5 rounded-xl bg-void border border-surface-border text-[11px] font-mono text-primary-muted">
                <span className="text-accent-purple font-bold">Feedback: </span>
                {story.editorialReviewNotes || 'Queued for editorial review.'}
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-surface-border/60">
                <button
                  onClick={() => navigateTo('reader', story.id)}
                  className="text-xs font-mono text-accent-blue hover:underline"
                >
                  Read Text →
                </button>

                <div className="flex items-center gap-1.5">
                  <button
                    onClick={() => handleUpdatePipeline(story, 3, 'approved')}
                    className="px-2.5 py-1 rounded-lg bg-accent-lime/15 text-accent-lime text-xs font-mono font-bold"
                  >
                    Approve
                  </button>
                  <button
                    onClick={() => handleUpdatePipeline(story, 4, 'approved', true)}
                    className="px-2.5 py-1 rounded-lg bg-accent-purple/15 text-accent-purple text-xs font-mono font-bold"
                  >
                    3D Studio
                  </button>
                  <button
                    onClick={() => handleUpdatePipeline(story, 5, 'featured', true)}
                    className="px-2.5 py-1 rounded-lg bg-accent-pink/15 text-accent-pink text-xs font-mono font-bold"
                  >
                    Reels ✨
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
