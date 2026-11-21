# Stories of Shadow — Gen Z Mobile-First Storytelling Universe

> **"The Internet's Imagination Corner ✦"**  
> *Turn that random 3 AM thought into a story worth watching.*

Stories of Shadow is a mobile-first creative storytelling platform designed for people aged ~16–28 who live on Instagram, TikTok, Pinterest, and Spotify. It transforms raw, late-night shower thoughts, weird dreams, and crazy plot twists into community-ranked stories, with the best adapted into cinematic 3D animations.

---

## 🎨 Visual Identity & Brand System

- **Primary Background:** `#09090F` (Dark void)
- **Secondary Surfaces:** `#151520` (Glassmorphic cards)
- **Primary Text:** `#F8F7FF` (Off-white luminance)
- **Muted Text:** `#A4A3B5` (Lilac-slate)
- **Accents:**
  - Electric Purple: `#9B5CFF`
  - Hot Pink: `#FF4FA3`
  - Acid Lime: `#C7FF5E`
  - Electric Blue: `#5B8CFF`
- **Typography:** Modern display fonts (`Space Grotesk`, `Syne`), clean interface text (`Inter`), and immersive editorial reading serif (`Instrument Serif`).

---

## 📱 Mobile-First Features

1. **"The Imagination Universe" Interactive Background:**
   - Lightweight HTML5 Canvas particle & keyword drift engine with zero heavy 3D dependencies.
   - Responds to mouse parallax on desktop and touch/drift on mobile.
   - Automatically pauses offscreen via `IntersectionObserver` to preserve battery life and guarantee 60fps performance.
   - Respects `prefers-reduced-motion`.

2. **Fixed Bottom Navigation Bar:**
   - 5 core tabs: **Home**, **Explore**, **Create (+)**, **Saved (Your Stash)**, and **Profile**.
   - Distinctive elevated center **Create** button with holographic glow gradient.
   - Safe-area inset aware (`env(safe-area-inset-bottom)`).

3. **Story Discovery & Social Feed:**
   - Horizontal genre chips: 🛸 What If, 👻 Horror, 🌀 Mind Games, 🌌 Sci-Fi, 💭 Dreams, 🖤 Dark Stories, 🔥 Apocalypse.
   - Curated playlists: *"Stories That Hit Different"*, *"3 AM Thoughts"*, *"Reality.exe Stopped Working"*, *"Straight Outta Someone's Mind"*, *"Plot Twists You Won't Recover From"*.
   - Interactive story cards with cover art, author profiles, and animated reaction pickers (🔥 Mindblown, 💀 Spooky, 💜 Felt That, 🚀 Unreal).

4. **Distraction-Free Story Reader:**
   - Sticky top reading progress bar.
   - Dynamic typography switch: toggle between **Sans** and **Editorial (Serif)** font modes.
   - Dynamic text size cycler (`A1`, `A2`, `A3`).
   - `"WATCH THIS STORY COME ALIVE 🎬"` highlight banner for animated stories.
   - Story outro: `"Okay... that was a ride."` with reaction burst triggers, comments, social share, and next story recommendations.

5. **5-Step Mobile-First Creation Flow:**
   - **Step 1:** Choose the vibe (interactive genre cards)
   - **Step 2:** Name your story (title & hook)
   - **Step 3:** Write your story (word count, reading time calculator, draft auto-save to `localStorage`, and "Need a spark?" prompt injection)
   - **Step 4:** Identity & permissions (pen name, Instagram handle for credit, adaptation authorization)
   - **Step 5:** Review & submit (`"IT'S OFFICIALLY OUT OF YOUR HEAD. ✨"` confirmation with live submission tracking ID)

6. **Community Features:**
   - **THE PLOT DROP:** Weekly creative writing challenge with real-time countdown timer to deadline, active prompts, and community entries.
   - **FROM BRAIN TO SCREEN:** Studio showcase highlighting stories adapted into 3D animations with interactive audio visualizer and production milestones.
   - **YOUR STASH:** Personal bookmarks vault.
   - **Creator Dashboard:** Track story status (Submitted → Under Review → Approved → In Animation Pipeline).
   - **Editorial Moderation Console:** Professional admin dashboard with status filtering, table/card toggle, and instant moderation actions.

---

## ⚡ Performance Budget

- **Bundle Size:** ~79 kB gzipped JavaScript bundle.
- **CSS:** ~7.5 kB gzipped.
- **Rendering:** Zero layout shifts (CLS < 0.1), sub-2.5s LCP, GPU-accelerated CSS transforms.
- Tested and verified at **360px**, **375px**, **390px**, **430px**, and desktop viewports.

---

## 🛠️ Getting Started

```bash
# Install dependencies
npm install

# Start local development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```
