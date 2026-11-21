import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { GENRES } from '../../data/genres';
import { GenreId } from '../../types';
import { 
  ArrowLeft, ArrowRight, Check, Sparkles, PenTool, 
  Lightbulb, ShieldCheck, Heart, Send, CheckCircle2, Copy, Instagram 
} from 'lucide-react';

export const CreateStoryWizard: React.FC = () => {
  const { createStory, currentUser, signInWithInstagram, navigateTo, showToast } = useApp();

  const [currentStep, setCurrentStep] = useState<number>(1);
  const [submittedStoryId, setSubmittedStoryId] = useState<string | null>(null);

  // Form State
  const [genre, setGenre] = useState<GenreId>(() => {
    return (localStorage.getItem('sos_draft_genre') as GenreId) || 'what-if';
  });
  const [title, setTitle] = useState<string>(() => {
    return localStorage.getItem('sos_draft_title') || '';
  });
  const [hook, setHook] = useState<string>(() => {
    return localStorage.getItem('sos_draft_hook') || '';
  });
  const [content, setContent] = useState<string>(() => {
    return localStorage.getItem('sos_draft_content') || '';
  });
  
  // Use current user's real handle if available
  const [creatorName, setCreatorName] = useState<string>(() => {
    if (currentUser) return currentUser.name;
    const saved = localStorage.getItem('sos_draft_author');
    return (saved && saved !== 'Kai Shadow') ? saved : '';
  });
  const [instagramHandle, setInstagramHandle] = useState<string>(() => {
    if (currentUser) return currentUser.instagramHandle;
    const saved = localStorage.getItem('sos_draft_ig');
    return (saved && !saved.includes('kai')) ? saved : '';
  });
  const [allowAdaptation, setAllowAdaptation] = useState<boolean>(true);
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(false);

  // Keep synced with current user
  useEffect(() => {
    if (currentUser) {
      setCreatorName(currentUser.name);
      setInstagramHandle(currentUser.instagramHandle);
    }
  }, [currentUser]);

  // Save drafts automatically
  useEffect(() => {
    if (!submittedStoryId) {
      localStorage.setItem('sos_draft_genre', genre);
      localStorage.setItem('sos_draft_title', title);
      localStorage.setItem('sos_draft_hook', hook);
      localStorage.setItem('sos_draft_content', content);
      if (creatorName && creatorName !== 'Kai Shadow') {
        localStorage.setItem('sos_draft_author', creatorName);
      }
      if (instagramHandle && !instagramHandle.includes('kai')) {
        localStorage.setItem('sos_draft_ig', instagramHandle);
      }
    }
  }, [genre, title, hook, content, creatorName, instagramHandle, submittedStoryId]);

  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const readingTime = Math.max(1, Math.ceil(wordCount / 180));

  const SPARKS = [
    "You realize the static on your TV isn't white noise—it's whispering your childhood address.",
    "A world where human lifespan is displayed as a battery percentage on your wrist, and yours dropped 40% after touching a stranger.",
    "Every year on your birthday, a courier delivers a key to an apartment you've never visited.",
    "You find an unlisted floor in your university library filled with diaries of people who haven't been born yet.",
  ];

  const handleApplySpark = (sparkText: string) => {
    if (!content.trim()) {
      setContent(sparkText + "\n\n");
    } else {
      setContent((prev) => prev + "\n\n" + sparkText);
    }
    showToast('Spark inserted into your draft! ⚡', 'purple');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
      showToast('Please accept the creator guidelines to submit', 'info');
      return;
    }

    const cleanHandle = instagramHandle.trim() 
      ? (instagramHandle.startsWith('@') ? instagramHandle.trim() : `@${instagramHandle.trim()}`)
      : '@anonymous_mind';

    // If not signed in yet, connect them automatically with their Instagram handle!
    if (!currentUser && instagramHandle.trim()) {
      signInWithInstagram(cleanHandle, creatorName.trim() || cleanHandle.replace('@', ''));
    }

    const created = createStory({
      title: title.trim() || 'Untitled Phenomenon',
      hook: hook.trim() || 'A strange occurrence that defies explanation.',
      content: content.trim(),
      authorName: creatorName.trim() || cleanHandle.replace('@', ''),
      authorHandle: cleanHandle,
      authorAvatar: currentUser?.avatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80',
      genre,
      coverImage: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      coverGradient: 'from-accent-purple/50 via-surface to-void',
      readingTimeMinutes: readingTime,
      status: 'pending',
    });

    // Clear drafts
    localStorage.removeItem('sos_draft_title');
    localStorage.removeItem('sos_draft_hook');
    localStorage.removeItem('sos_draft_content');
    localStorage.removeItem('sos_draft_author');
    localStorage.removeItem('sos_draft_ig');

    setSubmittedStoryId(created.id);
  };

  // Step 5 Confirmation Screen
  if (submittedStoryId) {
    return (
      <div className="min-h-[85vh] flex items-center justify-center px-4 xs:px-6 py-12 pb-36">
        <div className="max-w-md w-full rounded-3xl bg-surface border-2 border-accent-lime/40 p-6 sm:p-8 text-center shadow-glow-lime">
          <div className="w-16 h-16 rounded-full bg-accent-lime/20 text-accent-lime flex items-center justify-center mx-auto mb-5">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold font-display text-primary tracking-tight mb-2">
            IT'S OFFICIALLY OUT OF YOUR HEAD. ✨
          </h2>

          <p className="text-sm text-primary-muted font-mono leading-relaxed mb-6">
            Your story has entered the review queue. You can track real-time editorial status and reader analytics below.
          </p>

          {/* Submission Tracking Box */}
          <div className="p-4 rounded-2xl bg-void/80 border border-surface-border text-left font-mono text-xs space-y-2 mb-6">
            <div className="flex justify-between">
              <span className="text-primary-muted">Submission ID:</span>
              <span className="text-accent-purple font-bold">{submittedStoryId}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-muted">Status:</span>
              <span className="text-amber-400 font-bold">● Stage 1: Received & Queued</span>
            </div>
            <div className="flex justify-between">
              <span className="text-primary-muted">Creator Handle:</span>
              <span className="text-accent-pink font-bold">{instagramHandle ? `@${instagramHandle.replace('@', '')}` : 'Anonymous'}</span>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={() => navigateTo('profile')}
              className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-accent-purple via-accent-pink to-accent-lime text-white font-display font-bold text-sm tracking-wide shadow-glow-purple active:scale-95 transition-all"
            >
              Open Live Tracking Dashboard ➔
            </button>

            <button
              onClick={() => {
                setSubmittedStoryId(null);
                setCurrentStep(1);
                setTitle('');
                setHook('');
                setContent('');
              }}
              className="w-full py-3 rounded-2xl bg-surface-elevated hover:bg-surface-subtle border border-surface-border text-primary font-display font-medium text-xs transition-colors"
            >
              Drop Another Idea
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-4 xs:px-6 pt-6 pb-36 max-w-2xl mx-auto w-full overflow-x-hidden">
      {/* Top Navigation & Step Indicator */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => {
              if (currentStep > 1) {
                setCurrentStep(currentStep - 1);
              } else {
                navigateTo('home');
              }
            }}
            className="inline-flex items-center gap-1.5 text-xs font-mono text-primary-muted hover:text-white"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>{currentStep > 1 ? 'Previous Step' : 'Exit'}</span>
          </button>

          <span className="text-xs font-mono font-bold text-accent-purple tracking-widest uppercase">
            STEP {currentStep} OF 5
          </span>
        </div>

        {/* Step Progress Dots */}
        <div className="grid grid-cols-5 gap-2">
          {[1, 2, 3, 4, 5].map((step) => (
            <div
              key={step}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                step <= currentStep
                  ? 'bg-gradient-to-r from-accent-purple to-accent-pink'
                  : 'bg-surface-elevated'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Headline & Subtext */}
      <div className="mb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold font-display text-primary tracking-tight mb-2">
          Got a plot in your head?
        </h1>
        <p className="text-sm sm:text-base text-primary-muted font-medium">
          That random shower thought, weird dream, or insane plot twist? We wanna hear it.
        </p>
      </div>

      {/* STEP 1: CHOOSE THE VIBE */}
      {currentStep === 1 && (
        <section className="space-y-4">
          <h2 className="text-lg font-bold font-display text-primary flex items-center gap-2">
            <span>Step 1: Choose the vibe</span>
            <span className="text-xs font-mono text-primary-faint font-normal">(Genre)</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {GENRES.map((g) => {
              const isSelected = genre === g.id;
              return (
                <div
                  key={g.id}
                  onClick={() => setGenre(g.id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition-all flex items-center justify-between ${
                    isSelected
                      ? `${g.badgeBg} border-2 ring-1 ring-current shadow-lg scale-[1.01]`
                      : 'bg-surface border-surface-border hover:bg-surface-elevated'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{g.icon}</span>
                    <div>
                      <h3 className="text-base font-bold font-display text-primary">{g.label}</h3>
                    </div>
                  </div>
                  {isSelected && (
                    <div className="w-6 h-6 rounded-full bg-accent-purple text-white flex items-center justify-center">
                      <Check className="w-3.5 h-3.5" />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-6">
            <button
              onClick={() => setCurrentStep(2)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-pink text-white font-display font-bold text-base shadow-glow-purple active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Next: Name Your Story</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      )}

      {/* STEP 2: NAME YOUR STORY */}
      {currentStep === 2 && (
        <section className="space-y-5">
          <h2 className="text-lg font-bold font-display text-primary">
            Step 2: Give it an unforgettable title & hook
          </h2>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-primary-muted mb-2">
              Story Title *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. The Unsent Voice Note on Mars"
              className="w-full px-4 py-3.5 rounded-2xl bg-surface border border-surface-border text-primary placeholder-primary-faint text-base focus:outline-none focus:border-accent-purple"
              maxLength={80}
            />
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-primary-muted mb-2">
              One-Sentence Hook (The Gripping Pitch) *
            </label>
            <textarea
              value={hook}
              onChange={(e) => setHook(e.target.value)}
              rows={3}
              placeholder="e.g. You notice that every night at exactly 3:14 AM, the reflection in your phone screen looks away before you do."
              className="w-full px-4 py-3.5 rounded-2xl bg-surface border border-surface-border text-primary placeholder-primary-faint text-sm focus:outline-none focus:border-accent-purple resize-none"
              maxLength={240}
            />
            <span className="text-[11px] font-mono text-primary-faint float-right mt-1">
              {hook.length}/240 characters
            </span>
          </div>

          <div className="pt-6">
            <button
              disabled={!title.trim() || !hook.trim()}
              onClick={() => setCurrentStep(3)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-pink text-white font-display font-bold text-base shadow-glow-purple disabled:opacity-40 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Next: Write The Story</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      )}

      {/* STEP 3: WRITE YOUR STORY */}
      {currentStep === 3 && (
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold font-display text-primary">
              Step 3: Write your story
            </h2>
            <div className="text-xs font-mono text-primary-muted">
              <span>{wordCount} words</span> • <span>~{readingTime} min read</span>
            </div>
          </div>

          {/* Inspiration Sparks */}
          <div className="p-3.5 rounded-2xl bg-surface border border-surface-border">
            <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-accent-lime uppercase mb-2.5">
              <Lightbulb className="w-3.5 h-3.5" />
              <span>Need a spark? Click to inject an idea prompt:</span>
            </div>
            <div className="flex flex-col gap-2">
              {SPARKS.map((spark, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleApplySpark(spark)}
                  className="text-left text-xs text-primary-muted hover:text-white bg-surface-elevated hover:bg-surface-subtle p-3 rounded-xl border border-surface-border transition-colors leading-relaxed"
                >
                  ⚡ {spark}
                </button>
              ))}
            </div>
          </div>

          {/* Editor Area */}
          <div>
            <textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows={12}
              placeholder="Drop the full narrative here. Don't worry about perfection—raw energy and sharp twists make the best stories..."
              className="w-full p-4 rounded-2xl bg-surface border border-surface-border text-primary placeholder-primary-faint text-base focus:outline-none focus:border-accent-purple leading-relaxed font-sans resize-y"
            />
          </div>

          <div className="pt-4">
            <button
              disabled={!content.trim() || wordCount < 20}
              onClick={() => setCurrentStep(4)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-pink text-white font-display font-bold text-base shadow-glow-purple disabled:opacity-40 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Next: Identity & Credits</span>
              <ArrowRight className="w-5 h-5" />
            </button>
            {wordCount < 20 && (
              <p className="text-center text-xs font-mono text-accent-pink mt-2">
                Write at least 20 words to proceed ({wordCount}/20)
              </p>
            )}
          </div>
        </section>
      )}

      {/* STEP 4: IDENTITY & PRIVACY */}
      {currentStep === 4 && (
        <section className="space-y-5">
          <h2 className="text-lg font-bold font-display text-primary">
            Step 4: Connect your creator identity
          </h2>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-primary-muted mb-2">
              Instagram Handle * (Where readers can follow you)
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-primary-muted font-mono text-sm">@</span>
              <input
                type="text"
                required
                value={instagramHandle.replace('@', '')}
                onChange={(e) => setInstagramHandle(`@${e.target.value}`)}
                placeholder="your_instagram"
                className="w-full pl-9 pr-4 py-3.5 rounded-2xl bg-surface border border-surface-border text-primary placeholder-primary-faint text-sm font-mono focus:outline-none focus:border-accent-purple"
              />
            </div>
            <p className="text-[11px] font-mono text-primary-faint mt-1">
              Used to credit you on our Reels & YouTube when your story is featured.
            </p>
          </div>

          <div>
            <label className="block text-xs font-mono uppercase tracking-wider text-primary-muted mb-2">
              Creator Name or Pen Name *
            </label>
            <input
              type="text"
              value={creatorName}
              onChange={(e) => setCreatorName(e.target.value)}
              placeholder="e.g. Maya Lin, Alex Rivera"
              className="w-full px-4 py-3.5 rounded-2xl bg-surface border border-surface-border text-primary placeholder-primary-faint text-sm focus:outline-none focus:border-accent-purple"
            />
          </div>

          <div className="p-4 rounded-2xl bg-surface border border-surface-border flex items-start gap-3">
            <input
              type="checkbox"
              id="adaptation"
              checked={allowAdaptation}
              onChange={(e) => setAllowAdaptation(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-accent-purple bg-void border-surface-border focus:ring-accent-purple"
            />
            <label htmlFor="adaptation" className="text-xs text-primary-muted leading-relaxed cursor-pointer">
              <strong className="text-primary block mb-0.5">Allow Animation Adaptation Consideration</strong>
              If our studio selects this story, we will adapt it into a cinematic 3D animation short with full tags to your Instagram handle.
            </label>
          </div>

          <div className="pt-4">
            <button
              disabled={!instagramHandle.trim() || !creatorName.trim()}
              onClick={() => setCurrentStep(5)}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-purple to-accent-pink text-white font-display font-bold text-base shadow-glow-purple disabled:opacity-40 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <span>Next: Final Review</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </section>
      )}

      {/* STEP 5: REVIEW PERMISSIONS AND SUBMIT */}
      {currentStep === 5 && (
        <section className="space-y-5">
          <h2 className="text-lg font-bold font-display text-primary">
            Step 5: Review permissions and submit
          </h2>

          {/* Summary Preview Box */}
          <div className="p-5 rounded-2xl bg-surface border border-surface-border space-y-3">
            <div className="flex items-center justify-between pb-3 border-b border-surface-border">
              <span className="text-xs font-mono text-accent-purple uppercase font-bold">Preview</span>
              <span className="text-xs font-mono text-primary-muted">{genre}</span>
            </div>

            <h3 className="text-xl font-bold font-display text-primary">{title}</h3>
            <p className="text-xs text-accent-lime font-mono">"{hook}"</p>
            <p className="text-xs text-primary-muted line-clamp-3 leading-relaxed font-sans">
              {content}
            </p>

            <div className="pt-2 text-xs font-mono text-primary-faint">
              Credit: <span className="text-primary font-bold">{creatorName}</span> ({instagramHandle})
            </div>
          </div>

          {/* Consent Checkbox */}
          <div className="p-4 rounded-2xl bg-void border border-surface-border flex items-start gap-3">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-1 w-4 h-4 rounded text-accent-purple bg-void border-surface-border focus:ring-accent-purple"
            />
            <label htmlFor="terms" className="text-xs text-primary-muted leading-relaxed cursor-pointer">
              I certify that this story is original work created by me, contains no hateful or illegal content, and I grant Stories of Shadow a non-exclusive license to publish it on the platform.
            </label>
          </div>

          <div className="pt-4">
            <button
              disabled={!agreedToTerms}
              onClick={handleSubmit}
              className="w-full py-4 rounded-2xl bg-gradient-to-r from-accent-purple via-accent-pink to-accent-lime text-white font-display font-extrabold text-base shadow-glow-purple disabled:opacity-40 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Send className="w-5 h-5" />
              <span>Submit to Review Queue ✨</span>
            </button>
            <p className="text-center text-[11px] font-mono text-primary-faint mt-2">
              Submissions are reviewed within 24–48 hours by our editorial team.
            </p>
          </div>
        </section>
      )}
    </div>
  );
};
