import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { AboutSection } from './components/AboutSection';
import { SkillsSection } from './components/SkillsSection';
import { ProjectsSection } from './components/ProjectsSection';
import { JourneySection } from './components/JourneySection';
import { ResumeSection } from './components/ResumeSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { Toast } from './components/Toast';
import { PortfolioProvider } from './context/PortfolioContext';
import { AdminLoginModal } from './components/AdminLoginModal';
import { FloatingAdminToolbar } from './components/FloatingAdminToolbar';

export default function App() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  return (
    <PortfolioProvider>
      <div className="min-h-screen bg-[#131313] text-[#e5e2e1] flex flex-col font-sans selection:bg-[#b3d9ff]/30 selection:text-white relative overflow-x-hidden">
        {/* Navigation Bar */}
        <Navbar onShowToast={showToast} />

        {/* Main Portfolio Content */}
        <main className="flex-1 relative z-10">
          <HeroSection onShowToast={showToast} />
          <AboutSection />
          <SkillsSection />
          <ProjectsSection onShowToast={showToast} />
          <JourneySection />
          <ResumeSection onShowToast={showToast} />
          <ContactSection onShowToast={showToast} />
        </main>

        {/* Footer */}
        <Footer onShowToast={showToast} />

        {/* Secret Admin Login Modal */}
        <AdminLoginModal onShowToast={showToast} />

        {/* Fixed Floating Save Changes Toolbar in Admin Mode */}
        <FloatingAdminToolbar onShowToast={showToast} />

        {/* Toast Notification */}
        <Toast 
          message={toastMessage} 
          onClose={() => setToastMessage(null)} 
        />
      </div>
    </PortfolioProvider>
  );
}

