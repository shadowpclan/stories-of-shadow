import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { StoryCard } from '../explore/StoryCard';
import { Sparkles, Clock, PenTool, Flame, ArrowLeft, Trophy, CheckCircle2 } from 'lucide-react';

export const PlotDropView: React.FC = () => {
  const { challenge, stories, navigateTo, goBack } = useApp();

  const [timeLeft, setTimeLeft] = useState<{ days: number; hours: number; minutes: number; seconds: number }>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const difference = new Date(challenge.deadlineDate).getTime() - new Date().getTime();
      if (difference <= 0) {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      setTimeLeft({
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      });
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [challenge.deadlineDate]);

  // Entries for challenge
  const challengeEntries = stories.slice(0, 4);

  return (
    <div className="min-h-screen px-4 xs:px-6 pt-6 pb-28 max-w-5xl mx-auto">
      {/* Back button */}
      <button
        onClick={goBack}
        className="inline-flex items-center gap-1.5 text-xs font-mono text-primary-muted hover:text-white mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Universe</span>
      </button>

      {/* Hero Header */}
      <div className="relative rounded-3xl bg-surface border border-accent-purple/40 p-6 sm:p-10 mb-10 overflow-hidden shadow-glow-purple">
        <div className="absolute top-0 right-0 w-96 h-96 bg-accent-purple/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-purple/20 border border-accent-purple/40 text-xs font-mono font-bold text-accent-purple mb-4">
            <Sparkles className="w-4 h-4 text-accent-pink" />
            <span>WEEK #{challenge.weekNumber} OFFICIAL WRITING CHALLENGE</span>
          </div>

          <h1 className="text-3xl xs:text-4xl sm:text-5xl font-extrabold font-display text-primary tracking-tight mb-2">
            {challenge.title}
          </h1>

          <p className="text-base sm:text-lg font-mono text-accent-lime font-semibold mb-6">
            "{challenge.headline}"
          </p>

          {/* Active Prompt Container */}
          <div className="p-5 sm:p-6 rounded-2xl bg-void/80 border border-white/10 backdrop-blur-md mb-6">
            <h2 className="text-xs font-mono uppercase tracking-widest text-accent-purple font-bold mb-2">
              The Official Prompt
            </h2>
            <p className="text-lg sm:text-xl font-bold font-display text-primary leading-snug mb-3">
              "{challenge.prompt}"
            </p>
            <p className="text-sm text-primary-muted leading-relaxed">
              {challenge.subPrompt}
            </p>
          </div>

          {/* Countdown & Action Bar */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-surface-border">
            <div className="flex items-center gap-2 font-mono text-xs">
              <Clock className="w-4 h-4 text-accent-lime" />
              <span className="text-primary-muted">Submission deadline in:</span>
              <span className="text-primary font-bold">
                {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
              </span>
            </div>

            <button
              onClick={() => navigateTo('create')}
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-pink text-white font-display font-bold text-sm shadow-glow-purple active:scale-95 transition-all"
            >
              <PenTool className="w-4 h-4" />
              <span>Drop Entry For This Challenge</span>
            </button>
          </div>
        </div>
      </div>

      {/* Reward & Criteria */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12">
        <div className="p-5 rounded-2xl bg-surface border border-surface-border flex items-start gap-3">
          <Trophy className="w-6 h-6 text-accent-lime flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold font-display text-primary mb-1">Top Story Adaptation</h3>
            <p className="text-xs text-primary-muted">The winning narrative is selected by editorial vote to become a full 3D animated episode.</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface border border-surface-border flex items-start gap-3">
          <Sparkles className="w-6 h-6 text-accent-pink flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold font-display text-primary mb-1">Creator Recognition</h3>
            <p className="text-xs text-primary-muted">Featured at the top of the Stories of Shadow Instagram feed and pinned in the app.</p>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-surface border border-surface-border flex items-start gap-3">
          <Flame className="w-6 h-6 text-accent-purple flex-shrink-0 mt-0.5" />
          <div>
            <h3 className="text-sm font-bold font-display text-primary mb-1">Permanent Badge</h3>
            <p className="text-xs text-primary-muted">Unlock the exclusive "Plot Drop Champion" trophy badge on your creator profile.</p>
          </div>
        </div>
      </div>

      {/* Challenge Entries Feed */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl sm:text-2xl font-bold font-display text-primary">
            Current Submissions ({challengeEntries.length})
          </h2>
          <span className="text-xs font-mono text-accent-lime">Live entries</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {challengeEntries.map((story) => (
            <StoryCard key={story.id} story={story} />
          ))}
        </div>
      </div>
    </div>
  );
};
