import React, { createContext, useContext, useState, useEffect } from 'react';
import { Story, GenreId, ViewMode, UserProfile, Challenge, Comment, SubmissionPipelineStep } from '../types';
import { INITIAL_STORIES, INITIAL_CHALLENGE, INITIAL_COMMENTS, CREATOR_PROFILES } from '../data/seedData';

interface AppContextType {
  currentView: ViewMode;
  selectedStoryId: string | null;
  stories: Story[];
  challenge: Challenge;
  currentUser: UserProfile | null;
  viewingProfile: UserProfile | null;
  comments: Comment[];
  savedStoryIds: string[];
  searchQuery: string;
  selectedGenre: GenreId | 'all';
  toast: { message: string; type?: 'success' | 'info' | 'purple' } | null;
  isAuthModalOpen: boolean;
  
  // Navigation & Profile viewing
  navigateTo: (view: ViewMode, storyId?: string) => void;
  goBack: () => void;
  openCreatorProfile: (authorHandle: string) => void;
  openOwnProfile: () => void;
  
  // Auth
  setIsAuthModalOpen: (open: boolean) => void;
  signInWithInstagram: (instagramHandle: string, name: string, bio?: string) => UserProfile;
  signOut: () => void;
  updateUserProfile: (data: Partial<UserProfile>) => void;
  
  // Filters
  setSearchQuery: (query: string) => void;
  setSelectedGenre: (genre: GenreId | 'all') => void;
  
  // Actions
  toggleSaveStory: (storyId: string) => void;
  reactToStory: (storyId: string, type: 'mindblown' | 'spooky' | 'feltThat' | 'unreal') => void;
  addComment: (storyId: string, text: string) => void;
  createStory: (storyData: Omit<Story, 'id' | 'createdAt' | 'views' | 'saveCount' | 'reactions' | 'pipelineStep'>) => Story;
  updateStoryStatus: (
    storyId: string, 
    status: Story['status'], 
    isAdapted?: boolean, 
    adaptationStatus?: Story['adaptationStatus'],
    pipelineStep?: SubmissionPipelineStep,
    editorialReviewNotes?: string
  ) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'purple') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  STORIES: 'sos_stories_v3',
  SAVED: 'sos_saved_v3',
  CURRENT_USER: 'sos_current_user_v3',
  COMMENTS: 'sos_comments_v3',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [previousViews, setPreviousViews] = useState<ViewMode[]>([]);
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  const [viewingProfile, setViewingProfile] = useState<UserProfile | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Stories
  const [stories, setStories] = useState<Story[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STORIES);
      return saved ? JSON.parse(saved) : INITIAL_STORIES;
    } catch {
      return INITIAL_STORIES;
    }
  });

  // Current User (null if guest / not signed in!)
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Saved Stash
  const [savedStoryIds, setSavedStoryIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED);
      return saved ? JSON.parse(saved) : ['story-1', 'story-3'];
    } catch {
      return ['story-1', 'story-3'];
    }
  });

  // Comments
  const [comments, setComments] = useState<Comment[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.COMMENTS);
      return saved ? JSON.parse(saved) : INITIAL_COMMENTS;
    } catch {
      return INITIAL_COMMENTS;
    }
  });

  const [challenge] = useState<Challenge>(INITIAL_CHALLENGE);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedGenre, setSelectedGenre] = useState<GenreId | 'all'>('all');
  const [toast, setToast] = useState<{ message: string; type?: 'success' | 'info' | 'purple' } | null>(null);

  // Sync to local storage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.STORIES, JSON.stringify(stories));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [stories]);

  useEffect(() => {
    try {
      if (currentUser) {
        localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(currentUser));
      } else {
        localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
      }
    } catch (e) {
      console.warn('User storage error', e);
    }
  }, [currentUser]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedStoryIds));
    } catch (e) {
      console.warn('Saved stories storage error', e);
    }
  }, [savedStoryIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
    } catch (e) {
      console.warn('Comments storage error', e);
    }
  }, [comments]);

  const showToast = (message: string, type: 'success' | 'info' | 'purple' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3200);
  };

  const navigateTo = (view: ViewMode, storyId?: string) => {
    setPreviousViews((prev) => [...prev, currentView]);
    setCurrentView(view);
    if (storyId) {
      setSelectedStoryId(storyId);
      setStories((prev) =>
        prev.map((s) => (s.id === storyId ? { ...s, views: s.views + 1 } : s))
      );
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (previousViews.length > 0) {
      const prev = previousViews[previousViews.length - 1];
      setPreviousViews((prevArr) => prevArr.slice(0, -1));
      setCurrentView(prev);
    } else {
      setCurrentView('home');
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const openCreatorProfile = (authorHandle: string) => {
    const cleanHandle = authorHandle.startsWith('@') ? authorHandle : `@${authorHandle}`;
    
    if (CREATOR_PROFILES[cleanHandle]) {
      setViewingProfile(CREATOR_PROFILES[cleanHandle]);
    } else if (currentUser && (currentUser.handle === cleanHandle || currentUser.instagramHandle === cleanHandle)) {
      setViewingProfile(currentUser);
    } else {
      const authorStory = stories.find((s) => s.authorHandle === cleanHandle);
      const profile: UserProfile = {
        id: `creator-${cleanHandle.replace('@', '')}`,
        name: authorStory ? authorStory.authorName : cleanHandle.replace('@', ''),
        handle: cleanHandle,
        instagramHandle: cleanHandle,
        bio: `Storyteller & worldbuilder on Stories of Shadow. Exploring midnight thought experiments.`,
        avatar: authorStory?.authorAvatar || `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80`,
        badges: ['Community Writer', 'Night Explorer'],
        savedStoryIds: [],
        submittedStoryIds: stories.filter((s) => s.authorHandle === cleanHandle).map((s) => s.id),
        stats: {
          storiesSubmitted: stories.filter((s) => s.authorHandle === cleanHandle).length,
          storiesApproved: stories.filter((s) => s.authorHandle === cleanHandle && s.status !== 'rejected').length,
          storiesAdapted: stories.filter((s) => s.authorHandle === cleanHandle && s.isAdapted).length,
          totalReads: stories
            .filter((s) => s.authorHandle === cleanHandle)
            .reduce((acc, curr) => acc + curr.views, 0),
        },
      };
      setViewingProfile(profile);
    }

    navigateTo('creator-profile');
  };

  const openOwnProfile = () => {
    if (!currentUser) {
      setIsAuthModalOpen(true);
    } else {
      navigateTo('profile');
    }
  };

  const signInWithInstagram = (instagramHandle: string, name: string, bio?: string): UserProfile => {
    const cleanHandle = instagramHandle.startsWith('@') ? instagramHandle : `@${instagramHandle}`;
    const cleanName = name.trim() || cleanHandle.replace('@', '');
    
    const newUser: UserProfile = {
      id: `u-${Date.now()}`,
      name: cleanName,
      handle: cleanHandle,
      instagramHandle: cleanHandle,
      bio: bio?.trim() || 'Midnight writer dropping thoughts on Stories of Shadow.',
      avatar: `https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=250&q=80`,
      badges: ['Verified Instagram Creator', 'Early Explorer ✨'],
      savedStoryIds: savedStoryIds,
      submittedStoryIds: [],
      isOwnAccount: true,
      stats: {
        storiesSubmitted: 0,
        storiesApproved: 0,
        storiesAdapted: 0,
        totalReads: 0,
      },
    };

    setCurrentUser(newUser);
    setIsAuthModalOpen(false);
    navigateTo('profile'); // Immediately take them to their new personal dashboard!
    showToast(`Connected as ${cleanHandle}! ✦`, 'purple');
    return newUser;
  };

  const signOut = () => {
    setCurrentUser(null);
    showToast('Signed out of Instagram account', 'info');
    navigateTo('home');
  };

  const updateUserProfile = (data: Partial<UserProfile>) => {
    if (!currentUser) return;
    const updated = { ...currentUser, ...data };
    setCurrentUser(updated);
    showToast('Profile updated successfully!', 'success');
  };

  const toggleSaveStory = (storyId: string) => {
    const isSaved = savedStoryIds.includes(storyId);
    let updated: string[];
    if (isSaved) {
      updated = savedStoryIds.filter((id) => id !== storyId);
      showToast('Removed from your stash', 'info');
    } else {
      updated = [...savedStoryIds, storyId];
      showToast('Saved to Your Stash ✨', 'purple');
    }
    setSavedStoryIds(updated);
    setStories((prev) =>
      prev.map((s) =>
        s.id === storyId
          ? { ...s, saveCount: Math.max(0, s.saveCount + (isSaved ? -1 : 1)) }
          : s
      )
    );
  };

  const reactToStory = (storyId: string, type: 'mindblown' | 'spooky' | 'feltThat' | 'unreal') => {
    setStories((prev) =>
      prev.map((s) => {
        if (s.id !== storyId) return s;
        const currentReactions = { ...s.reactions };
        const userReactions = { ...(s.userReactions || {}) };
        const hasReacted = !!userReactions[type];

        if (hasReacted) {
          currentReactions[type] = Math.max(0, currentReactions[type] - 1);
          delete userReactions[type];
        } else {
          currentReactions[type] = currentReactions[type] + 1;
          userReactions[type] = true;
          showToast(
            `Reacted with ${
              type === 'mindblown' ? '🔥 Mindblown' : type === 'spooky' ? '💀 Spooky' : type === 'feltThat' ? '💜 Felt That' : '🚀 Unreal'
            }!`,
            'purple'
          );
        }

        return {
          ...s,
          reactions: currentReactions,
          userReactions,
        };
      })
    );
  };

  const addComment = (storyId: string, text: string) => {
    if (!text.trim()) return;
    const authorName = currentUser?.name || 'Curious Mind';
    const authorHandle = currentUser?.handle || '@guest_explorer';
    const authorAvatar = currentUser?.avatar || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80';

    const newComment: Comment = {
      id: `c-${Date.now()}`,
      storyId,
      authorName,
      authorHandle,
      authorAvatar,
      text: text.trim(),
      createdAt: 'Just now',
      likes: 0,
    };
    setComments((prev) => [newComment, ...prev]);
    showToast('Comment dropped! 💬', 'success');
  };

  const createStory = (
    storyData: Omit<Story, 'id' | 'createdAt' | 'views' | 'saveCount' | 'reactions' | 'pipelineStep'>
  ): Story => {
    const newId = `story-${Date.now()}`;
    const newStory: Story = {
      ...storyData,
      id: newId,
      createdAt: 'Just now',
      submittedAt: 'Today',
      views: 1,
      saveCount: 0,
      pipelineStep: 1, // Step 1: Submitted
      editorialReviewNotes: 'Submission received. Assigned to editorial queue for initial review.',
      estimatedReviewHours: 24,
      reactions: {
        mindblown: 1,
        spooky: 0,
        feltThat: 0,
        unreal: 0,
      },
      status: 'pending',
    };

    setStories((prev) => [newStory, ...prev]);
    
    // Update logged in user submissions if logged in
    if (currentUser) {
      setCurrentUser((prev) => {
        if (!prev) return null;
        return {
          ...prev,
          submittedStoryIds: [newId, ...prev.submittedStoryIds],
          stats: {
            ...prev.stats,
            storiesSubmitted: prev.stats.storiesSubmitted + 1,
            totalReads: prev.stats.totalReads + 1,
          },
        };
      });
    }

    return newStory;
  };

  const updateStoryStatus = (
    storyId: string, 
    status: Story['status'], 
    isAdapted?: boolean, 
    adaptationStatus?: Story['adaptationStatus'],
    pipelineStep?: SubmissionPipelineStep,
    editorialReviewNotes?: string
  ) => {
    setStories((prev) =>
      prev.map((s) => {
        if (s.id !== storyId) return s;
        
        let determinedStep: SubmissionPipelineStep = pipelineStep || s.pipelineStep;
        if (!pipelineStep) {
          if (status === 'pending') determinedStep = 2; // Under review
          else if (status === 'approved' && !isAdapted) determinedStep = 3; // Live
          else if (isAdapted && adaptationStatus !== 'released') determinedStep = 4; // In 3D production
          else if (isAdapted && adaptationStatus === 'released') determinedStep = 5; // Released
        }

        return {
          ...s,
          status,
          pipelineStep: determinedStep,
          ...(isAdapted !== undefined ? { isAdapted } : {}),
          ...(adaptationStatus ? { adaptationStatus } : {}),
          ...(editorialReviewNotes ? { editorialReviewNotes } : {}),
          ...(status === 'approved' ? { approvedAt: 'Today' } : {}),
        };
      })
    );
    showToast(`Status updated to ${status}!`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        selectedStoryId,
        stories,
        challenge,
        currentUser,
        viewingProfile,
        comments,
        savedStoryIds,
        searchQuery,
        selectedGenre,
        toast,
        isAuthModalOpen,
        navigateTo,
        goBack,
        openCreatorProfile,
        openOwnProfile,
        setIsAuthModalOpen,
        signInWithInstagram,
        signOut,
        updateUserProfile,
        setSearchQuery,
        setSelectedGenre,
        toggleSaveStory,
        reactToStory,
        addComment,
        createStory,
        updateStoryStatus,
        showToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
