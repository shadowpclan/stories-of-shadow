import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Film, Play, Pause, Volume2, VolumeX, ArrowRight, Sparkles, ExternalLink, Zap } from 'lucide-react';

export const AdaptedShowcase: React.FC = () => {
  const { stories, navigateTo, openCreatorProfile } = useApp();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // Find stories that have been adapted
  const adaptedStories = stories.filter((s) => s.isAdapted);
  const activeAdapted = adaptedStories[0];

  // Animated visualizer when playing
  useEffect(() => {
    if (!isPlaying) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let t = 0;

    const render = () => {
      t += 0.04;
      const w = (canvas.width = canvas.clientWidth);
      const h = (canvas.height = canvas.clientHeight);

      ctx.fillStyle = '#05050A';
      ctx.fillRect(0, 0, w, h);

      // Starfield drift
      for (let i = 0; i < 40; i++) {
        const x = (Math.sin(i * 99 + t * 0.2) * 0.5 + 0.5) * w;
        const y = (Math.cos(i * 33 + t * 0.3) * 0.5 + 0.5) * h;
        const r = (Math.sin(i + t) * 0.5 + 0.5) * 2 + 1;
        ctx.fillStyle = i % 2 === 0 ? '#9B5CFF' : '#FF4FA3';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      // Audio waveform bars
      const bars = 32;
      const barWidth = w / bars;
      for (let i = 0; i < bars; i++) {
        const barHeight = Math.abs(Math.sin(t * 2 + i * 0.3)) * (h * 0.45) + 15;
        const grad = ctx.createLinearGradient(0, h / 2 - barHeight / 2, 0, h / 2 + barHeight / 2);
        grad.addColorStop(0, '#FF4FA3');
        grad.addColorStop(0.5, '#9B5CFF');
        grad.addColorStop(1, '#C7FF5E');
        ctx.fillStyle = grad;
        ctx.fillRect(i * barWidth + 2, h / 2 - barHeight / 2, barWidth - 4, barHeight);
      }

      // Cyber CRT scanlines
      ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
      for (let y = 0; y < h; y += 4) {
        ctx.fillRect(0, y, w, 1.5);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  if (!activeAdapted) return null;

  return (
    <section className="px-4 xs:px-6 py-10 max-w-6xl mx-auto w-full">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 mb-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono font-bold tracking-widest text-accent-lime uppercase mb-1">
            <Film className="w-4 h-4" />
            <span>COMMUNITY ADAPTATIONS</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-primary tracking-tight">
            FROM BRAIN TO SCREEN
          </h2>
          <p className="text-xs sm:text-sm text-primary-muted mt-0.5">
            Real stories submitted by our community, brought to life as cinematic animations.
          </p>
        </div>

        <button
          onClick={() => navigateTo('screen')}
          className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-mono text-accent-lime hover:underline font-semibold self-start sm:self-auto"
        >
          <span>See all animations</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>

      {/* Featured Video Spotlight Card */}
      <div className="rounded-3xl bg-surface border border-surface-border overflow-hidden grid grid-cols-1 lg:grid-cols-12 shadow-card-elevated">
        {/* Video Column */}
        <div className="relative lg:col-span-7 bg-black min-h-[260px] sm:min-h-[360px] flex items-center justify-center overflow-hidden group">
          {isPlaying ? (
            <div className="relative w-full h-full min-h-[280px]">
              <canvas ref={canvasRef} className="w-full h-full min-h-[280px] block" />
              
              <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                <button
                  type="button"
                  aria-label={isMuted ? "Unmute audio" : "Mute audio"}
                  onClick={() => setIsMuted(!isMuted)}
                  className="p-2.5 rounded-full bg-void/80 text-white backdrop-blur-md hover:bg-void transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4 text-accent-lime" />}
                </button>

                <button
                  type="button"
                  aria-label="Pause teaser"
                  onClick={() => setIsPlaying(false)}
                  className="p-2.5 rounded-full bg-void/80 text-white backdrop-blur-md hover:bg-void transition-colors"
                >
                  <Pause className="w-4 h-4" />
                </button>
              </div>

              <div className="absolute bottom-4 left-4 z-20 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-void/80 border border-accent-pink text-xs font-mono text-white backdrop-blur-md">
                <span className="w-2 h-2 rounded-full bg-accent-pink animate-pulse" />
                <span>Simulating 3D Spatial Audio & Render</span>
              </div>
            </div>
          ) : (
            <div className="relative w-full h-full min-h-[280px]">
              <img
                src={activeAdapted.adaptationThumbnail || activeAdapted.coverImage}
                alt={activeAdapted.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-void/50 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
                <button
                  type="button"
                  aria-label="Play animated adaptation"
                  onClick={() => setIsPlaying(true)}
                  className="w-16 h-16 rounded-full bg-accent-pink hover:bg-accent-pink/90 text-white flex items-center justify-center shadow-glow-pink active:scale-95 transition-all group-hover:scale-110 mb-3"
                >
                  <Play className="w-7 h-7 fill-current ml-1" />
                </button>
                <span className="text-xs font-mono font-semibold tracking-wider text-white uppercase bg-void/70 px-3.5 py-1.5 rounded-full border border-white/10">
                  Tap to watch teaser
                </span>
              </div>
            </div>
          )}

          {/* Status badge */}
          <div className="absolute top-4 left-4 z-10 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-void/90 text-accent-lime text-xs font-mono font-bold border border-accent-lime/40 backdrop-blur-md">
            <span className="w-2 h-2 rounded-full bg-accent-lime animate-ping" />
            <span>RELEASED ON IG & YOUTUBE</span>
          </div>
        </div>

        {/* Story Info Column */}
        <div className="lg:col-span-5 p-6 sm:p-8 flex flex-col justify-between bg-surface-elevated">
          <div>
            {/* Author Credit — Clicking opens THAT author's creator profile! */}
            <div 
              onClick={() => openCreatorProfile(activeAdapted.authorHandle)}
              className="flex items-center gap-2.5 mb-4 cursor-pointer hover:opacity-80 transition-opacity"
            >
              <img
                src={activeAdapted.authorAvatar}
                alt={activeAdapted.authorName}
                className="w-8 h-8 rounded-full object-cover border border-accent-purple/50 flex-shrink-0"
              />
              <div className="min-w-0">
                <p className="text-xs font-mono text-primary-muted">Original Story By</p>
                <p className="text-sm font-bold text-primary truncate hover:text-accent-lime transition-colors">
                  {activeAdapted.authorName} <span className="text-accent-pink text-xs font-mono">({activeAdapted.authorHandle})</span>
                </p>
              </div>
            </div>

            {/* Story Title */}
            <h3 className="text-2xl font-bold font-display text-primary leading-tight mb-2">
              {activeAdapted.title}
            </h3>

            {/* Hook */}
            <p className="text-sm text-primary-muted leading-relaxed mb-6">
              {activeAdapted.hook}
            </p>

            {/* Production Details */}
            <div className="p-3.5 rounded-2xl bg-void/60 border border-surface-border text-xs text-primary-muted font-mono space-y-1.5 mb-6">
              <div className="flex items-center gap-1.5 text-accent-purple font-semibold">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Production Notes</span>
              </div>
              <p className="text-[11px] leading-relaxed text-primary-faint">
                {activeAdapted.adaptationProductionNotes}
              </p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('reader', activeAdapted.id)}
              className="flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-pink text-white font-display font-bold text-xs tracking-wider shadow-glow-purple active:scale-95 transition-all"
            >
              <span>Read Original Story</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>

            <button
              onClick={() => navigateTo('screen')}
              className="p-3 rounded-2xl bg-surface hover:bg-surface-subtle border border-surface-border text-primary-muted hover:text-white transition-colors"
              title="View full film studio"
            >
              <ExternalLink className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
