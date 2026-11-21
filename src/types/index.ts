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

export type SubmissionPipelineStep = 1 | 2 | 3 | 4 | 5; 
// 1: Submitted, 2: Under Editorial Review, 3: Approved & Live, 4: Selected for Animation, 5: Released on Reels/YT

export interface Story {
  id: string;
  title: string;
  hook: string;
  content: string;
  authorName: string;
  authorHandle: string; // e.g. @auranebula
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
  
  // Real-time tracking & editorial analytics
  pipelineStep: SubmissionPipelineStep;
  editorialReviewNotes?: string;
  submittedAt?: string;
  approvedAt?: string;
  estimatedReviewHours?: number;
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
  handle: string; // e.g. @username
  bio: string;
  avatar: string;
  instagramHandle: string;
  isOwnAccount?: boolean;
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
export type ViewMode = ActiveTab | 'reader' | 'challenge' | 'screen' | 'admin' | 'creator-profile';
