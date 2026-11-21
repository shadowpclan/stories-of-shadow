import React, { createContext, useContext, useState, useEffect } from 'react';
import { Story, GenreId, ViewMode, UserProfile, Challenge, Comment } from '../types';
import { INITIAL_STORIES, INITIAL_CHALLENGE, INITIAL_COMMENTS, INITIAL_USER } from '../data/seedData';

interface AppContextType {
  currentView: ViewMode;
  selectedStoryId: string | null;
  stories: Story[];
  challenge: Challenge;
  user: UserProfile;
  comments: Comment[];
  savedStoryIds: string[];
  searchQuery: string;
  selectedGenre: GenreId | 'all';
  toast: { message: string; type?: 'success' | 'info' | 'purple' } | null;
  
  // Navigation
  navigateTo: (view: ViewMode, storyId?: string) => void;
  goBack: () => void;
  
  // Filters
  setSearchQuery: (query: string) => void;
  setSelectedGenre: (genre: GenreId | 'all') => void;
  
  // Actions
  toggleSaveStory: (storyId: string) => void;
  reactToStory: (storyId: string, type: 'mindblown' | 'spooky' | 'feltThat' | 'unreal') => void;
  addComment: (storyId: string, text: string) => void;
  createStory: (storyData: Omit<Story, 'id' | 'createdAt' | 'views' | 'saveCount' | 'reactions'>) => Story;
  updateStoryStatus: (storyId: string, status: Story['status'], isAdapted?: boolean, adaptationStatus?: Story['adaptationStatus']) => void;
  showToast: (message: string, type?: 'success' | 'info' | 'purple') => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const STORAGE_KEYS = {
  STORIES: 'sos_stories_v1',
  SAVED: 'sos_saved_v1',
  USER: 'sos_user_v1',
  COMMENTS: 'sos_comments_v1',
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentView, setCurrentView] = useState<ViewMode>('home');
  const [previousViews, setPreviousViews] = useState<ViewMode[]>([]);
  const [selectedStoryId, setSelectedStoryId] = useState<string | null>(null);
  
  const [stories, setStories] = useState<Story[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STORIES);
      return saved ? JSON.parse(saved) : INITIAL_STORIES;
    } catch {
      return INITIAL_STORIES;
    }
  });

  const [savedStoryIds, setSavedStoryIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.SAVED);
      return saved ? JSON.parse(saved) : INITIAL_USER.savedStoryIds;
    } catch {
      return INITIAL_USER.savedStoryIds;
    }
  });

  const [user, setUser] = useState<UserProfile>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      return saved ? JSON.parse(saved) : INITIAL_USER;
    } catch {
      return INITIAL_USER;
    }
  });

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
      localStorage.setItem(STORAGE_KEYS.SAVED, JSON.stringify(savedStoryIds));
    } catch (e) {
      console.warn('Storage sync error', e);
    }
  }, [savedStoryIds]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.COMMENTS, JSON.stringify(comments));
    } catch (e) {
      console.warn('Storage sync error', e);
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
      // Increment view count
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
          showToast(`Reacted with ${type === 'mindblown' ? '🔥 Mindblown' : type === 'spooky' ? '💀 Spooky' : type === 'feltThat' ? '💜 Felt That' : '🚀 Unreal'}!`, 'purple');
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
    const newComment: Comment = {
      id: `c-${Date.now()}`,
      storyId,
      authorName: user.name,
      authorHandle: user.handle,
      authorAvatar: user.avatar,
      text: text.trim(),
      createdAt: 'Just now',
      likes: 0,
    };
    setComments((prev) => [newComment, ...prev]);
    showToast('Comment dropped! 💬', 'success');
  };

  const createStory = (
    storyData: Omit<Story, 'id' | 'createdAt' | 'views' | 'saveCount' | 'reactions'>
  ): Story => {
    const newId = `story-${Date.now()}`;
    const newStory: Story = {
      ...storyData,
      id: newId,
      createdAt: 'Just now',
      views: 1,
      saveCount: 0,
      reactions: {
        mindblown: 1,
        spooky: 0,
        feltThat: 0,
        unreal: 0,
      },
      status: 'pending', // goes to editorial queue
    };

    setStories((prev) => [newStory, ...prev]);
    setUser((prev) => ({
      ...prev,
      submittedStoryIds: [newId, ...prev.submittedStoryIds],
      stats: {
        ...prev.stats,
        storiesSubmitted: prev.stats.storiesSubmitted + 1,
      },
    }));

    return newStory;
  };

  const updateStoryStatus = (
    storyId: string,
    status: Story['status'],
    isAdapted?: boolean,
    adaptationStatus?: Story['adaptationStatus']
  ) => {
    setStories((prev) =>
      prev.map((s) => {
        if (s.id !== storyId) return s;
        return {
          ...s,
          status,
          ...(isAdapted !== undefined ? { isAdapted } : {}),
          ...(adaptationStatus ? { adaptationStatus } : {}),
        };
      })
    );
    showToast(`Story status updated to ${status}!`, 'info');
  };

  return (
    <AppContext.Provider
      value={{
        currentView,
        selectedStoryId,
        stories,
        challenge,
        user,
        comments,
        savedStoryIds,
        searchQuery,
        selectedGenre,
        toast,
        navigateTo,
        goBack,
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
