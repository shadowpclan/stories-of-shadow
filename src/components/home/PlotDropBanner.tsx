import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, Clock, PenTool, ArrowUpRight, Flame } from 'lucide-react';

export const PlotDropBanner: React.FC = () => {
  const { challenge, navigateTo } = useApp();

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

  return (
    <section className="px-4 xs:px-6 py-8 max-w-6xl mx-auto">
      <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-br from-surface-elevated via-surface to-void border border-accent-purple/40 overflow-hidden shadow-glow-purple">
        {/* Abstract cyber backdrop elements */}
        <div className="absolute -top-24 -right-24 w-80 h-80 rounded-full bg-accent-purple/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-80 h-80 rounded-full bg-accent-pink/15 blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
          <div className="max-w-2xl">
            {/* Tagline */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent-purple/20 border border-accent-purple/40 text-xs font-mono font-bold text-accent-purple mb-3">
              <Sparkles className="w-3.5 h-3.5 text-accent-pink" />
              <span>WEEK #{challenge.weekNumber} CREATIVE CHALLENGE</span>
            </div>

            {/* Name & Headline */}
            <h3 className="text-3xl sm:text-4xl font-extrabold font-display text-primary tracking-tight mb-1">
              {challenge.title}
            </h3>
            <p className="text-sm sm:text-base font-mono text-accent-lime font-medium mb-4">
              "{challenge.headline}"
            </p>

            {/* Prompt Box */}
            <div className="p-4 rounded-2xl bg-void/70 border border-white/10 backdrop-blur-md mb-4">
              <p className="text-base sm:text-lg font-medium text-primary leading-snug">
                "{challenge.prompt}"
              </p>
              <p className="text-xs sm:text-sm text-primary-muted mt-2">
                {challenge.subPrompt}
              </p>
            </div>

            {/* Entry stats */}
            <div className="flex items-center gap-4 text-xs font-mono text-primary-muted">
              <span className="flex items-center gap-1.5 text-accent-pink">
                <Flame className="w-3.5 h-3.5" />
                <span>{challenge.entryCount} writers dropped plots</span>
              </span>
              <span>•</span>
              <span className="text-primary-faint">Top story gets adapted into 3D Reel</span>
            </div>
          </div>

          {/* Right Column: Live Countdown & CTA */}
          <div className="w-full lg:w-auto flex flex-col items-center lg:items-end justify-center gap-4">
            {/* Countdown timer */}
            <div className="w-full sm:w-auto flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-void/90 border border-surface-border font-mono text-center shadow-inner">
              <Clock className="w-4 h-4 text-accent-purple mr-1 hidden xs:inline" />
              <div className="flex flex-col px-2">
                <span className="text-xl font-bold text-primary">{String(timeLeft.days).padStart(2, '0')}</span>
                <span className="text-[10px] text-primary-muted uppercase">Days</span>
              </div>
              <span className="text-accent-purple font-bold">:</span>
              <div className="flex flex-col px-2">
                <span className="text-xl font-bold text-primary">{String(timeLeft.hours).padStart(2, '0')}</span>
                <span className="text-[10px] text-primary-muted uppercase">Hrs</span>
              </div>
              <span className="text-accent-purple font-bold">:</span>
              <div className="flex flex-col px-2">
                <span className="text-xl font-bold text-primary">{String(timeLeft.minutes).padStart(2, '0')}</span>
                <span className="text-[10px] text-primary-muted uppercase">Min</span>
              </div>
              <span className="text-accent-purple font-bold">:</span>
              <div className="flex flex-col px-2">
                <span className="text-xl font-bold text-accent-lime">{String(timeLeft.seconds).padStart(2, '0')}</span>
                <span className="text-[10px] text-accent-lime uppercase">Sec</span>
              </div>
            </div>

            {/* Actions */}
            <div className="w-full flex items-center gap-3">
              <button
                onClick={() => navigateTo('create')}
                className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-pink text-white font-display font-bold text-sm shadow-glow-purple active:scale-95 transition-all hover:brightness-110"
              >
                <PenTool className="w-4 h-4" />
                <span>Drop Your Entry</span>
              </button>

              <button
                onClick={() => navigateTo('challenge')}
                className="inline-flex items-center justify-center p-3 rounded-2xl bg-surface-elevated hover:bg-surface-subtle border border-surface-border text-primary-muted hover:text-white transition-colors"
                title="View challenge hub"
              >
                <ArrowUpRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
