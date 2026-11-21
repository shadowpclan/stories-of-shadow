import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../../context/AppContext';
import { Film, Play, Pause, Volume2, VolumeX, ArrowLeft, ArrowRight, Sparkles, CheckCircle2, Clock } from 'lucide-react';

export const BrainToScreenView: React.FC = () => {
  const { stories, navigateTo, goBack } = useApp();
  const [activeStoryIndex, setActiveStoryIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const adaptedStories = stories.filter((s) => s.isAdapted);
  const currentStory = adaptedStories[activeStoryIndex] || adaptedStories[0];

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

      for (let i = 0; i < 50; i++) {
        const x = (Math.sin(i * 77 + t * 0.25) * 0.5 + 0.5) * w;
        const y = (Math.cos(i * 22 + t * 0.2) * 0.5 + 0.5) * h;
        const r = (Math.sin(i + t) * 0.5 + 0.5) * 2.5 + 1;
        ctx.fillStyle = i % 2 === 0 ? '#9B5CFF' : '#5B8CFF';
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      const bars = 36;
      const barWidth = w / bars;
      for (let i = 0; i < bars; i++) {
        const barHeight = Math.abs(Math.sin(t * 2.2 + i * 0.28)) * (h * 0.45) + 20;
        const grad = ctx.createLinearGradient(0, h / 2 - barHeight / 2, 0, h / 2 + barHeight / 2);
        grad.addColorStop(0, '#C7FF5E');
        grad.addColorStop(0.5, '#5B8CFF');
        grad.addColorStop(1, '#9B5CFF');
        ctx.fillStyle = grad;
        ctx.fillRect(i * barWidth + 2, h / 2 - barHeight / 2, barWidth - 4, barHeight);
      }

      ctx.fillStyle = 'rgba(0, 0, 0, 0.2)';
      for (let y = 0; y < h; y += 4) {
        ctx.fillRect(0, y, w, 1.5);
      }

      animId = requestAnimationFrame(render);
    };

    render();
    return () => cancelAnimationFrame(animId);
  }, [isPlaying]);

  return (
    <div className="min-h-screen px-4 xs:px-6 pt-6 pb-28 max-w-5xl mx-auto">
      {/* Back Button */}
      <button
        onClick={goBack}
        className="inline-flex items-center gap-1.5 text-xs font-mono text-primary-muted hover:text-white mb-6"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Feed</span>
      </button>

      {/* Header */}
      <div className="mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-lime/15 text-accent-lime border border-accent-lime/30 text-xs font-mono font-bold uppercase mb-2">
          <Film className="w-3.5 h-3.5" />
          <span>ORIGINAL PRODUCTIONS</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-primary tracking-tight">
          From Brain To Screen
        </h1>
        <p className="text-xs sm:text-sm text-primary-muted font-mono mt-0.5">
          See how user-submitted text concepts evolve into viral 3D cinematic animations.
        </p>
      </div>

      {currentStory && (
        <div className="rounded-3xl bg-surface border border-surface-border overflow-hidden mb-12 shadow-card-elevated">
          {/* Main Video Viewport */}
          <div className="relative aspect-[16/9] bg-black flex items-center justify-center overflow-hidden">
            {isPlaying ? (
              <div className="relative w-full h-full">
                <canvas ref={canvasRef} className="w-full h-full block" />
                <div className="absolute top-4 right-4 flex items-center gap-2 z-20">
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-3 rounded-full bg-void/80 text-white backdrop-blur-md hover:bg-void transition-colors"
                  >
                    {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5 text-accent-lime" />}
                  </button>
                  <button
                    onClick={() => setIsPlaying(false)}
                    className="p-3 rounded-full bg-void/80 text-white backdrop-blur-md hover:bg-void transition-colors"
                  >
                    <Pause className="w-5 h-5" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative w-full h-full">
                <img
                  src={currentStory.coverImage}
                  alt={currentStory.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-void/50 backdrop-blur-[2px] flex flex-col items-center justify-center p-6 text-center">
                  <button
                    type="button"
                    aria-label="Play animated episode"
                    onClick={() => setIsPlaying(true)}
                    className="w-16 h-16 rounded-full bg-accent-pink hover:bg-accent-pink/90 text-white flex items-center justify-center shadow-glow-pink active:scale-95 transition-all group-hover:scale-110 mb-3"
                  >
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </button>
                  <span className="text-xs font-mono font-semibold tracking-wider text-white uppercase bg-void/70 px-3.5 py-1.5 rounded-full border border-white/10">
                    Play 3D Episode Simulation
                  </span>
                </div>
              </div>
            )}

            {/* Top Tag */}
            <div className="absolute top-4 left-4 inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent-pink/90 text-white text-xs font-mono font-bold shadow-glow-pink backdrop-blur-md">
              <Sparkles className="w-3.5 h-3.5" />
              <span>OFFICIAL 3D ANIMATION REEL</span>
            </div>
          </div>

          {/* Details & Pipeline */}
          <div className="p-6 sm:p-8">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-surface-border">
              <div>
                <span className="text-xs font-mono text-accent-purple uppercase tracking-wider">
                  Original Writer: {currentStory.authorName} ({currentStory.authorHandle})
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-primary mt-1">
                  {currentStory.title}
                </h2>
              </div>

              <button
                onClick={() => navigateTo('reader', currentStory.id)}
                className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-pink text-white font-display font-bold text-xs uppercase tracking-wider shadow-glow-purple active:scale-95 transition-all self-start sm:self-auto"
              >
                <span>Read Original Text</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            {/* Production Pipeline Timeline */}
            <div className="mb-6">
              <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-primary-muted mb-4">
                Production Pipeline Journey
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="p-3.5 rounded-2xl bg-void/60 border border-accent-lime/40 text-center">
                  <div className="flex items-center justify-center gap-1 text-accent-lime text-xs font-mono font-bold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Story Chosen</span>
                  </div>
                  <p className="text-[11px] text-primary-muted">Editorial approval & script adaptation</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-void/60 border border-accent-lime/40 text-center">
                  <div className="flex items-center justify-center gap-1 text-accent-lime text-xs font-mono font-bold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Voiceover</span>
                  </div>
                  <p className="text-[11px] text-primary-muted">Audio casting & spatial soundscape</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-void/60 border border-accent-lime/40 text-center">
                  <div className="flex items-center justify-center gap-1 text-accent-lime text-xs font-mono font-bold mb-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>3D Unreal Render</span>
                  </div>
                  <p className="text-[11px] text-primary-muted">Atmospheric lighting & particle simulation</p>
                </div>

                <div className="p-3.5 rounded-2xl bg-void/60 border border-accent-pink/40 text-center">
                  <div className="flex items-center justify-center gap-1 text-accent-pink text-xs font-mono font-bold mb-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Live on Reels</span>
                  </div>
                  <p className="text-[11px] text-primary-muted">Published to Instagram & YouTube</p>
                </div>
              </div>
            </div>

            {/* Production notes */}
            <div className="p-4 rounded-2xl bg-void border border-surface-border font-mono text-xs text-primary-muted">
              <span className="text-accent-purple font-bold block mb-1">Director's Note:</span>
              <p className="leading-relaxed">{currentStory.adaptationProductionNotes}</p>
            </div>
          </div>
        </div>
      )}

      {/* Other Adapted Titles List */}
      <div>
        <h2 className="text-xl font-bold font-display text-primary mb-4">
          All Studio Adaptations
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {adaptedStories.map((s, idx) => (
            <div
              key={s.id}
              onClick={() => {
                setActiveStoryIndex(idx);
                setIsPlaying(false);
              }}
              className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                activeStoryIndex === idx
                  ? 'bg-surface-elevated border-accent-purple shadow-glow-purple'
                  : 'bg-surface border-surface-border hover:bg-surface-elevated'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl overflow-hidden bg-black flex-shrink-0">
                  <img src={s.coverImage} alt={s.title} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h3 className="text-sm font-bold font-display text-primary line-clamp-1">{s.title}</h3>
                  <p className="text-xs text-primary-muted">by {s.authorName}</p>
                </div>
              </div>

              <span className="text-xs font-mono text-accent-pink font-semibold">
                {activeStoryIndex === idx ? '▶ Selected' : 'Watch'}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
