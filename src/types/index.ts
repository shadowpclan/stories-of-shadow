export type GenreId = 
  | 'what-if' 
  | 'horror' 
  | 'mind-games' 
  | 'sci-fi' 
  | 'dreams' 
  | 'dark' 
  | 'apocalypse';

export interface GenreInfo {
  id: GenreId;
  label: string;
  icon: string;
  color: string;
  glowClass: string;
  badgeBg: string;
}

export type AdaptationStatus = 'scripting' | 'storyboarding' | 'in-production' | 'released';

export interface Story {
  id: string;
  title: string;
  hook: string;
  content: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  genre: GenreId;
  coverImage: string;
  coverGradient: string;
  readingTimeMinutes: number;
  reactions: {
    mindblown: number;
    spooky: number;
    feltThat: number;
    unreal: number;
  };
  userReactions?: Record<string, boolean>;
  saveCount: number;
  views: number;
  createdAt: string;
  isAdapted?: boolean;
  adaptationVideoUrl?: string;
  adaptationThumbnail?: string;
  adaptationStatus?: AdaptationStatus;
  adaptationProductionNotes?: string;
  status: 'pending' | 'approved' | 'rejected' | 'featured';
  featuredCollection?: string;
  challengeId?: string;
}

export interface Challenge {
  id: string;
  title: string;
  headline: string;
  prompt: string;
  subPrompt: string;
  weekNumber: number;
  deadlineDate: string; // ISO string
  entryCount: number;
  status: 'active' | 'completed';
  featuredStoryId?: string;
}

export interface Comment {
  id: string;
  storyId: string;
  authorName: string;
  authorHandle: string;
  authorAvatar: string;
  text: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

export interface UserProfile {
  id: string;
  name: string;
  handle: string;
  bio: string;
  avatar: string;
  instagramHandle?: string;
  badges: string[];
  savedStoryIds: string[];
  submittedStoryIds: string[];
  stats: {
    storiesSubmitted: number;
    storiesApproved: number;
    storiesAdapted: number;
    totalReads: number;
  };
}

export type ActiveTab = 'home' | 'explore' | 'create' | 'stash' | 'profile';
export type ViewMode = ActiveTab | 'reader' | 'challenge' | 'screen' | 'admin';
