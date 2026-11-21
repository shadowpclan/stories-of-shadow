import { GenreInfo, GenreId } from '../types';

export const GENRES: GenreInfo[] = [
  {
    id: 'what-if',
    label: 'What If',
    icon: '🛸',
    color: '#9B5CFF', // Electric purple
    glowClass: 'shadow-glow-purple',
    badgeBg: 'bg-accent-purple/15 text-accent-purple border-accent-purple/30',
  },
  {
    id: 'horror',
    label: 'Horror',
    icon: '👻',
    color: '#FF4FA3', // Hot pink
    glowClass: 'shadow-glow-pink',
    badgeBg: 'bg-accent-pink/15 text-accent-pink border-accent-pink/30',
  },
  {
    id: 'mind-games',
    label: 'Mind Games',
    icon: '🌀',
    color: '#5B8CFF', // Electric blue
    glowClass: 'shadow-glow-blue',
    badgeBg: 'bg-accent-blue/15 text-accent-blue border-accent-blue/30',
  },
  {
    id: 'sci-fi',
    label: 'Sci-Fi',
    icon: '🌌',
    color: '#C7FF5E', // Acid lime
    glowClass: 'shadow-glow-lime',
    badgeBg: 'bg-accent-lime/15 text-accent-lime border-accent-lime/30',
  },
  {
    id: 'dreams',
    label: 'Dreams',
    icon: '💭',
    color: '#9B5CFF',
    glowClass: 'shadow-glow-purple',
    badgeBg: 'bg-purple-400/15 text-purple-300 border-purple-400/30',
  },
  {
    id: 'dark',
    label: 'Dark Stories',
    icon: '🖤',
    color: '#FF4FA3',
    glowClass: 'shadow-glow-pink',
    badgeBg: 'bg-red-400/15 text-red-300 border-red-400/30',
  },
  {
    id: 'apocalypse',
    label: 'Apocalypse',
    icon: '🔥',
    color: '#C7FF5E',
    glowClass: 'shadow-glow-lime',
    badgeBg: 'bg-amber-400/15 text-amber-300 border-amber-400/30',
  },
];

export const FEATURED_COLLECTIONS = [
  {
    id: 'hit-different',
    title: 'Stories That Hit Different',
    tagline: 'Emotional damage with immaculate worldbuilding.',
    accent: 'border-l-accent-purple',
  },
  {
    id: '3am-thoughts',
    title: '3 AM Thoughts',
    tagline: 'Brain completely unhinged while staring at the ceiling.',
    accent: 'border-l-accent-pink',
  },
  {
    id: 'reality-glitch',
    title: 'Reality.exe Stopped Working',
    tagline: 'Glitches in the matrix that feel uncomfortably plausible.',
    accent: 'border-l-accent-lime',
  },
  {
    id: 'straight-outta-mind',
    title: "Straight Outta Someone's Mind",
    tagline: 'Raw, unfiltered imagination submissions straight from the community.',
    accent: 'border-l-accent-blue',
  },
  {
    id: 'plot-twists',
    title: "Plot Twists You Won't Recover From",
    tagline: 'Read slowly. The final three sentences change everything.',
    accent: 'border-l-accent-purple',
  },
];
