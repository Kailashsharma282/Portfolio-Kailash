import React, { useState, useEffect } from 'react';
import { Navbar } from './components/common/Navbar';
import { LandingSelector } from './components/selector/LandingSelector';
import { Portfolio2D } from './components/portfolio2d/Portfolio2D';
import { Portfolio3D } from './components/portfolio3d/Portfolio3D';
import { ResumeModal } from './components/portfolio2d/ResumeModal';

export const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<'selector' | '2d' | '3d'>('selector');
  const [resumeModalOpen, setResumeModalOpen] = useState(false);

  // Handle browser popstate / back button if needed
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentView]);

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#07080e', color: '#f8fafc', position: 'relative' }}>
      {/* Universal Top Navigation Header */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => setCurrentView(view)}
        onOpenResume={() => setResumeModalOpen(true)}
      />

      {/* Main Interactive Views */}
      <main>
        {currentView === 'selector' && (
          <LandingSelector
            onSelectExperience={(mode) => setCurrentView(mode)}
          />
        )}

        {currentView === '2d' && (
          <Portfolio2D
            onOpenResume={() => setResumeModalOpen(true)}
            onSwitchTo3D={() => setCurrentView('3d')}
            onBackToSelector={() => setCurrentView('selector')}
          />
        )}

        {currentView === '3d' && (
          <Portfolio3D
            onSwitchTo2D={() => setCurrentView('2d')}
            onBackToSelector={() => setCurrentView('selector')}
            onOpenResume={() => setResumeModalOpen(true)}
          />
        )}
      </main>

      {/* Global Interactive Resume Modal */}
      {resumeModalOpen && (
        <ResumeModal onClose={() => setResumeModalOpen(false)} />
      )}
    </div>
  );
};

export default App;
