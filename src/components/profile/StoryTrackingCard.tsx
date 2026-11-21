import React from 'react';
import { Story, SubmissionPipelineStep } from '../../types';
import { useApp } from '../../context/AppContext';
import { 
  Clock, CheckCircle2, AlertCircle, Film, Sparkles, 
  Flame, Skull, Heart, Rocket, Bookmark, Eye, ArrowUpRight 
} from 'lucide-react';

interface StoryTrackingCardProps {
  story: Story;
}

export const StoryTrackingCard: React.FC<StoryTrackingCardProps> = ({ story }) => {
  const { navigateTo } = useApp();

  // 5 Step Labels
  const STEPS: { step: SubmissionPipelineStep; label: string; desc: string }[] = [
    { step: 1, label: 'Submitted', desc: 'Received & queued' },
    { step: 2, label: 'Under Review', desc: 'Editorial review' },
    { step: 3, label: 'Live on Feed', desc: 'Public discovery' },
    { step: 4, label: 'In 3D Production', desc: 'Unreal/Blender' },
    { step: 5, label: 'Animated on Screen', desc: 'Live on Reels & YT' },
  ];

  const currentStep = story.pipelineStep || (story.isAdapted ? 5 : story.status === 'approved' ? 3 : 2);

  // Status Badge Colors & Text
  const getStatusBadge = () => {
    switch (currentStep) {
      case 1:
        return {
          text: 'Submitted • In Queue',
          color: 'bg-blue-500/15 text-blue-400 border-blue-500/30',
          dot: 'bg-blue-400',
        };
      case 2:
        return {
          text: 'Under Editorial Review',
          color: 'bg-amber-500/15 text-amber-300 border-amber-500/30',
          dot: 'bg-amber-400 animate-ping',
        };
      case 3:
        return {
          text: 'Approved • Published Live',
          color: 'bg-accent-lime/15 text-accent-lime border-accent-lime/30',
          dot: 'bg-accent-lime',
        };
      case 4:
        return {
          text: 'Selected for 3D Animation 🎬',
          color: 'bg-accent-purple/20 text-accent-purple border-accent-purple/40',
          dot: 'bg-accent-purple animate-pulse',
        };
      case 5:
        return {
          text: 'Animated & Live on Reels / YT ✨',
          color: 'bg-accent-pink/20 text-accent-pink border-accent-pink/40 shadow-glow-pink',
          dot: 'bg-accent-pink',
        };
      default:
        return {
          text: 'Under Review',
          color: 'bg-surface-elevated text-primary-muted border-surface-border',
          dot: 'bg-primary-muted',
        };
    }
  };

  const badge = getStatusBadge();

  return (
    <div className="p-5 sm:p-6 rounded-3xl bg-surface border border-surface-border shadow-card-elevated space-y-5">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold border ${badge.color}`}>
              <span className={`w-2 h-2 rounded-full ${badge.dot}`} />
              <span>{badge.text}</span>
            </span>

            <span className="text-xs font-mono text-primary-muted">
              ID: <strong className="text-primary">{story.id}</strong>
            </span>
          </div>

          <h3 className="text-xl font-bold font-display text-primary leading-tight">
            {story.title}
          </h3>
          <p className="text-xs text-primary-muted font-mono mt-0.5 line-clamp-1">
            "{story.hook}"
          </p>
        </div>

        <button
          onClick={() => navigateTo('reader', story.id)}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-surface-elevated hover:bg-surface-subtle border border-surface-border text-xs font-mono text-primary hover:text-white transition-colors self-start sm:self-auto flex-shrink-0"
        >
          <span>Open Story</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-accent-purple" />
        </button>
      </div>

      {/* 5-Step Visual Progress Bar */}
      <div className="pt-2">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-mono uppercase font-bold text-accent-purple">
            Pipeline Progress: Stage {currentStep} of 5
          </span>
          <span className="text-xs font-mono text-primary-muted">
            {Math.round((currentStep / 5) * 100)}% Complete
          </span>
        </div>

        {/* Bar */}
        <div className="grid grid-cols-5 gap-1.5 sm:gap-2 mb-3">
          {STEPS.map((s) => {
            const isCompleted = s.step < currentStep;
            const isCurrent = s.step === currentStep;
            return (
              <div
                key={s.step}
                className={`h-2 rounded-full transition-all duration-300 ${
                  isCompleted
                    ? 'bg-accent-lime'
                    : isCurrent
                    ? 'bg-gradient-to-r from-accent-purple to-accent-pink shadow-glow-purple animate-pulse'
                    : 'bg-surface-elevated'
                }`}
              />
            );
          })}
        </div>

        {/* Step Micro Descriptions on larger viewports */}
        <div className="hidden sm:grid grid-cols-5 gap-2 text-[10px] font-mono text-primary-muted text-center">
          {STEPS.map((s) => (
            <div key={s.step} className={s.step === currentStep ? 'text-primary font-bold' : ''}>
              <p className="truncate">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Live Community Analytics (Reads, Reactions, Saves) */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
        <div className="p-3 rounded-2xl bg-void/60 border border-surface-border text-center">
          <div className="flex items-center justify-center gap-1 text-primary text-sm font-bold font-display">
            <Eye className="w-4 h-4 text-accent-blue" />
            <span>{story.views.toLocaleString()}</span>
          </div>
          <span className="text-[10px] font-mono text-primary-muted uppercase">Total Reads</span>
        </div>

        <div className="p-3 rounded-2xl bg-void/60 border border-surface-border text-center">
          <div className="flex items-center justify-center gap-1 text-accent-pink text-sm font-bold font-display">
            <Bookmark className="w-4 h-4 fill-current" />
            <span>{story.saveCount}</span>
          </div>
          <span className="text-[10px] font-mono text-primary-muted uppercase">Saved to Stash</span>
        </div>

        <div className="p-3 rounded-2xl bg-void/60 border border-surface-border text-center">
          <div className="flex items-center justify-center gap-1 text-amber-400 text-sm font-bold font-display">
            <Flame className="w-4 h-4 fill-current" />
            <span>{story.reactions.mindblown}</span>
          </div>
          <span className="text-[10px] font-mono text-primary-muted uppercase">Mindblown 🔥</span>
        </div>

        <div className="p-3 rounded-2xl bg-void/60 border border-surface-border text-center">
          <div className="flex items-center justify-center gap-1 text-accent-lime text-sm font-bold font-display">
            <Rocket className="w-4 h-4" />
            <span>{story.reactions.unreal + story.reactions.spooky}</span>
          </div>
          <span className="text-[10px] font-mono text-primary-muted uppercase">Total Reactions</span>
        </div>
      </div>

      {/* Editorial Feedback & Review Message */}
      <div className="p-4 rounded-2xl bg-void/80 border border-surface-border space-y-1.5">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-accent-purple font-bold flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-accent-pink" />
            <span>Editorial Studio Feedback</span>
          </span>
          <span className="text-primary-muted text-[11px]">
            {story.approvedAt ? `Approved ${story.approvedAt}` : 'Active Queue'}
          </span>
        </div>

        <p className="text-xs sm:text-sm text-primary leading-relaxed font-sans">
          {story.editorialReviewNotes || 'Your story is safely stored in our editorial review queue. Our reading team evaluates submissions daily for community feed release and 3D adaptation.'}
        </p>

        {story.isAdapted && (
          <div className="pt-2 flex items-center gap-2">
            <button
              onClick={() => navigateTo('screen')}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-accent-pink text-white font-mono text-xs font-bold shadow-glow-pink active:scale-95 transition-all"
            >
              <Film className="w-3.5 h-3.5" />
              <span>Watch Animation Episode 🎬</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
