import React from 'react';
import { ImaginationUniverseCanvas } from './ImaginationUniverseCanvas';
import { Hero } from './Hero';
import { TrendingStories } from './TrendingStories';
import { PlotDropBanner } from './PlotDropBanner';
import { AdaptedShowcase } from './AdaptedShowcase';
import { useApp } from '../../context/AppContext';
import { GENRES } from '../../data/genres';
import { Instagram, Youtube, Sparkles, ArrowRight, PenTool } from 'lucide-react';

export const HomeView: React.FC = () => {
  const { setSelectedGenre, navigateTo } = useApp();

  return (
    <div className="relative min-h-screen pb-24 w-full max-w-full overflow-x-hidden">
      {/* 1. Interactive Imagination Universe Canvas */}
      <ImaginationUniverseCanvas />

      {/* 2. Hero Section */}
      <Hero />

      {/* 3. Section Anchor: Explore Quick Vibe Bar */}
      <section id="explore-section" className="relative z-10 px-4 xs:px-6 py-4 max-w-6xl mx-auto w-full">
        <div className="p-4 rounded-3xl bg-surface/70 border border-surface-border backdrop-blur-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent-purple" />
            <span className="text-xs font-mono font-bold uppercase tracking-wider text-primary">
              Choose your late-night mood:
            </span>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
            {GENRES.map((g) => (
              <button
                key={g.id}
                onClick={() => {
                  setSelectedGenre(g.id);
                  navigateTo('explore');
                }}
                className="flex-shrink-0 px-3 py-1.5 rounded-xl bg-void/80 hover:bg-surface-elevated border border-surface-border text-xs font-mono text-primary-muted hover:text-white transition-all flex items-center gap-1.5 active:scale-95"
              >
                <span>{g.icon}</span>
                <span>{g.label}</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Trending Stories — "THE INTERNET IS READING" */}
      <div className="relative z-10 w-full">
        <TrendingStories />
      </div>

      {/* 5. Weekly Challenge — "THE PLOT DROP" */}
      <div className="relative z-10 w-full">
        <PlotDropBanner />
      </div>

      {/* 6. Adapted Stories — "FROM BRAIN TO SCREEN" */}
      <div className="relative z-10 w-full">
        <AdaptedShowcase />
      </div>

      {/* 7. Community Manifesto & Instagram Callout */}
      <section className="relative z-10 px-4 xs:px-6 py-14 max-w-4xl mx-auto text-center w-full">
        <div className="p-8 sm:p-12 rounded-3xl bg-surface border border-surface-border/80 shadow-card-elevated relative overflow-hidden">
          <div className="absolute -top-16 -left-16 w-48 h-48 bg-accent-purple/10 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-16 -right-16 w-48 h-48 bg-accent-pink/10 rounded-full blur-2xl pointer-events-none" />

          <span className="text-xs font-mono uppercase tracking-widest text-accent-lime font-bold mb-3 block">
            ✦ NO CORPORATE JARGON. JUST PURE IMAGINATION. ✦
          </span>

          <h2 className="text-2xl sm:text-4xl font-extrabold font-display text-primary tracking-tight mb-4">
            Built for people with too many tabs open in their head.
          </h2>

          <p className="text-sm sm:text-base text-primary-muted max-w-lg mx-auto leading-relaxed mb-8">
            Stories of Shadow exists to pull raw, unfiltered creativity out of group chats, Notes apps, and 3 AM ceiling stares, turning the best into real cinematic art.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={() => navigateTo('create')}
              className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-gradient-to-r from-accent-purple via-accent-pink to-accent-lime text-white font-display font-bold text-sm shadow-glow-purple active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <PenTool className="w-4 h-4" />
              <span>Drop Your Story Now ↗</span>
            </button>

            <a
              href="https://instagram.com"
              target="_blank"
              rel="noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-2xl bg-surface-elevated hover:bg-surface-subtle border border-surface-border text-primary font-display font-semibold text-sm transition-colors flex items-center justify-center gap-2"
            >
              <Instagram className="w-4 h-4 text-accent-pink" />
              <span>Follow on Instagram</span>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-4 xs:px-6 py-8 border-t border-surface-border/60 text-center max-w-6xl mx-auto w-full">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-primary-muted">
          <div>
            © 2026 Stories of Shadow — The Internet's Imagination Corner
          </div>
          <div className="flex items-center gap-4">
            <button onClick={() => navigateTo('admin')} className="hover:text-accent-lime transition-colors">
              Editorial Console
            </button>
            <span>•</span>
            <button onClick={() => navigateTo('challenge')} className="hover:text-accent-purple transition-colors">
              The Plot Drop
            </button>
            <span>•</span>
            <button onClick={() => navigateTo('screen')} className="hover:text-accent-pink transition-colors">
              Brain To Screen
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
};
