import React from 'react';
import { useApp } from '../../context/AppContext';
import { Sparkles, ArrowUpRight, Compass, ChevronDown, Zap } from 'lucide-react';

export const Hero: React.FC = () => {
  const { navigateTo } = useApp();

  const handleScrollToExplore = () => {
    const exploreSection = document.getElementById('explore-section');
    if (exploreSection) {
      exploreSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigateTo('explore');
    }
  };

  return (
    <section className="relative min-h-[85vh] sm:min-h-[88vh] flex flex-col justify-center items-center px-4 xs:px-6 pt-12 sm:pt-16 pb-16 text-center overflow-hidden">
      {/* Decorative Floating Badges for Gen Z Aesthetic */}
      <div className="absolute top-6 left-3 sm:left-12 rotate-[-6deg] pointer-events-none hidden xs:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-elevated/90 border border-accent-purple/40 text-[11px] font-mono text-accent-purple backdrop-blur-md shadow-glow-purple z-10">
        <span className="w-1.5 h-1.5 rounded-full bg-accent-purple animate-ping" />
        <span>3 AM PLOT DROP</span>
      </div>

      <div className="absolute top-10 right-3 sm:right-14 rotate-[6deg] pointer-events-none hidden xs:inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-elevated/90 border border-accent-lime/40 text-[11px] font-mono text-accent-lime backdrop-blur-md shadow-glow-lime z-10">
        <Zap className="w-3 h-3" />
        <span>NOW ANIMATING</span>
      </div>

      {/* Hero Content Container */}
      <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center w-full">
        
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface/90 border border-white/10 text-xs sm:text-sm font-mono tracking-wider text-accent-purple uppercase mb-5 backdrop-blur-md shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-accent-pink animate-pulse" />
          <span>THE INTERNET'S IMAGINATION CORNER ✦</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl xs:text-4xl sm:text-6xl md:text-7xl font-extrabold font-display tracking-tight text-primary leading-[1.1] mb-4">
          Your brain is <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-purple via-accent-pink to-accent-blue underline decoration-accent-lime/60 decoration-wavy decoration-2">weird</span>.
          <br />
          We love that.
        </h1>

        {/* Alternate Supporting Phrase */}
        <p className="text-xs xs:text-sm sm:text-base font-medium text-accent-lime/90 font-mono tracking-wide mb-3">
          Turn that random 3 AM thought into a story worth watching.
        </p>

        {/* Subheading */}
        <p className="text-xs xs:text-sm sm:text-base text-primary-muted max-w-xl mx-auto font-normal leading-relaxed mb-6 sm:mb-8">
          Drop your wildest ideas, discover stories from other minds, and watch the best ones come alive as cinematic animations.
        </p>

        {/* Action CTAs */}
        <div className="w-full xs:w-auto flex flex-col xs:flex-row items-stretch xs:items-center justify-center gap-3 mb-8">
          {/* Primary CTA */}
          <button
            onClick={() => navigateTo('create')}
            className="group relative inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-pink text-white font-display font-bold text-sm sm:text-base tracking-wide shadow-glow-purple active:scale-[0.97] hover:brightness-110 transition-all duration-200"
          >
            <span>Drop Your Story</span>
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </button>

          {/* Secondary CTA */}
          <button
            onClick={handleScrollToExplore}
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-2xl bg-surface-elevated/90 hover:bg-surface-subtle border border-surface-border text-primary font-display font-semibold text-sm sm:text-base backdrop-blur-md active:scale-[0.97] transition-all duration-200"
          >
            <Compass className="w-4 h-4 text-accent-blue" />
            <span>Enter the Universe</span>
          </button>
        </div>

        {/* Social Proof Ticker */}
        <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 text-[11px] sm:text-xs text-primary-faint font-mono mb-8">
          <div className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-accent-lime inline-block" />
            <span>1,420+ stories submitted</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="text-accent-pink">★</span>
            <span>12 stories animated this season</span>
          </div>
        </div>

        {/* Animated Scroll Cue — in flow to prevent overlap */}
        <div 
          onClick={handleScrollToExplore}
          className="inline-flex flex-col items-center gap-1 cursor-pointer select-none text-primary-faint hover:text-accent-purple transition-colors pt-2"
        >
          <span className="text-[10px] font-mono tracking-widest uppercase">SCROLL TO ENTER ✦</span>
          <ChevronDown className="w-4 h-4 animate-bounce" />
        </div>

      </div>
    </section>
  );
};
