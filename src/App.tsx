import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { Toast } from './components/common/Toast';
import { InstagramAuthModal } from './components/profile/InstagramAuthModal';
import { HomeView } from './components/home/HomeView';
import { ExploreView } from './components/explore/ExploreView';
import { StoryReader } from './components/reader/StoryReader';
import { CreateStoryWizard } from './components/create/CreateStoryWizard';
import { StashView } from './components/stash/StashView';
import { ProfileView } from './components/profile/ProfileView';
import { PlotDropView } from './components/challenge/PlotDropView';
import { BrainToScreenView } from './components/adapted/BrainToScreenView';
import { AdminDashboard } from './components/admin/AdminDashboard';

const MainContent: React.FC = () => {
  const { currentView } = useApp();

  return (
    <div className="relative min-h-screen bg-void flex flex-col justify-between w-full max-w-full overflow-x-hidden">
      {/* Header is rendered for all views except reader to preserve full immersion */}
      {currentView !== 'reader' && <Header />}

      {/* Main View Router */}
      <main className="flex-1 w-full">
        {currentView === 'home' && <HomeView />}
        {currentView === 'explore' && <ExploreView />}
        {currentView === 'reader' && <StoryReader />}
        {currentView === 'create' && <CreateStoryWizard />}
        {currentView === 'stash' && <StashView />}
        {(currentView === 'profile' || currentView === 'creator-profile') && <ProfileView />}
        {currentView === 'challenge' && <PlotDropView />}
        {currentView === 'screen' && <BrainToScreenView />}
        {currentView === 'admin' && <AdminDashboard />}
      </main>

      {/* Fixed Mobile Bottom Nav */}
      <BottomNav />

      {/* Notification Toast */}
      <Toast />

      {/* Instagram Auth Modal */}
      <InstagramAuthModal />
    </div>
  );
};

export function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}

export default App;
