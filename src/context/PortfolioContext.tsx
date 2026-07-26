import React, { createContext, useContext, useState, useEffect } from 'react';
import { PERSONAL_INFO } from '../data/portfolioData';

export interface EditableContent {
  name: string;
  avatarUrl: string;
  title: string;
  heroBadge: string;
  shortBio: string;
  aboutMe: string;
  cgpaScore: string;
  specialization: string;
  currentFocus: string;
  leadership: string;
  college: string;
  location: string;
  email: string;
  phone: string;
  github: string;
  linkedin: string;
  softSkills: string[];
  techProficient: string[];
  techFuture: string[];
}

export const DEFAULT_EDITABLE_CONTENT: EditableContent = {
  name: "Gaurav Suhas Kad",
  avatarUrl: PERSONAL_INFO.avatarUrl,
  title: "Second Year B.Tech AI & ML | Zeal College, Pune",
  heroBadge: "Second Year B.Tech AI & ML • 8.86 CGPA First Year Distinction",
  shortBio: "Second-year B.Tech student in Artificial Intelligence & Machine Learning at Zeal College, Pune. Diving deep into Data Structures & Algorithms, OOP, and Machine Learning fundamentals.",
  aboutMe: `I am a second-year B.Tech student specializing in Artificial Intelligence & Machine Learning at Zeal College of Engineering and Research, Pune. Building on a strong academic foundation (8.86 CGPA in First Year), I am currently diving deeper into Data Structures & Algorithms, Object-Oriented Programming, and Machine Learning fundamentals.

Beyond coursework, I bridge the gap between AI theory and practical web development using Python, C, HTML/CSS, and modern frontend frameworks. I enjoy tackling complex algorithmic logic and engineering clean, user-centric digital experiences.`,
  cgpaScore: "8.86 CGPA (First Year Distinction)",
  specialization: "Second Year | B.Tech in AI & ML",
  currentFocus: "DSA, Python, C, CSS/HTML & Machine Learning Fundamentals",
  leadership: "UPSC NDA Candidate | 2-Year Defence Academy Training (11th-12th)",
  college: "Zeal College of Engineering and Research, Narhe, Pune",
  location: "Narhe, Pune",
  email: "gauravkad2424@gmail.com",
  phone: "+91 9673747641",
  github: "https://github.com/gauravkad24",
  linkedin: "https://www.linkedin.com/in/gaurav-kad-7330b23a7?utm_source=share_via&utm_content=profile&utm_medium=member_android",
  softSkills: [
    "Programming",
    "Web Development",
    "Problem Solving",
    "Communication",
    "Critical Thinking",
    "Team Collaboration",
    "AI & ML Fundamentals"
  ],
  techProficient: [
    "Python",
    "C Language",
    "HTML5",
    "CSS3",
    "Git / GitHub"
  ],
  techFuture: [
    "C++",
    "Data Structures & Algorithms (DSA)",
    "Machine Learning / Scikit-Learn",
    "JavaScript"
  ]
};

const LOCAL_STORAGE_KEY = 'gaurav_portfolio_content_v4';

interface PortfolioContextType {
  content: EditableContent;
  updateContentField: <K extends keyof EditableContent>(field: K, value: EditableContent[K]) => void;
  saveChanges: () => void;
  resetToDefaults: () => void;
  isAdminMode: boolean;
  setIsAdminMode: (mode: boolean) => void;
  isAdminModalOpen: boolean;
  setIsAdminModalOpen: (open: boolean) => void;
}

const PortfolioContext = createContext<PortfolioContextType | undefined>(undefined);

export const PortfolioProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<EditableContent>(() => {
    try {
      const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
      const adminAvatar = localStorage.getItem('adminProfileAvatar');
      let baseContent = DEFAULT_EDITABLE_CONTENT;
      
      if (saved) {
        const parsed = JSON.parse(saved);
        baseContent = { ...DEFAULT_EDITABLE_CONTENT, ...parsed };
      }
      if (!baseContent.location || baseContent.location.toLowerCase().includes('mohol') || baseContent.location.toLowerCase().includes('hostel')) {
        baseContent.location = "Narhe, Pune";
      }
      if (adminAvatar) {
        baseContent.avatarUrl = adminAvatar;
      }
      return baseContent;
    } catch (e) {
      console.error('Failed to load portfolio content from localStorage', e);
    }
    return DEFAULT_EDITABLE_CONTENT;
  });

  const [isAdminMode, setIsAdminMode] = useState<boolean>(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState<boolean>(false);

  const updateContentField = <K extends keyof EditableContent>(field: K, value: EditableContent[K]) => {
    setContent(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const saveChanges = () => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(content));
      if (content.avatarUrl) {
        localStorage.setItem('adminProfileAvatar', content.avatarUrl);
      }
    } catch (e) {
      console.error('Failed to save to localStorage', e);
    }
  };

  const resetToDefaults = () => {
    setContent(DEFAULT_EDITABLE_CONTENT);
    try {
      localStorage.removeItem(LOCAL_STORAGE_KEY);
      localStorage.removeItem('adminProfileAvatar');
    } catch (e) {
      console.error('Failed to reset localStorage', e);
    }
  };

  return (
    <PortfolioContext.Provider value={{
      content,
      updateContentField,
      saveChanges,
      resetToDefaults,
      isAdminMode,
      setIsAdminMode,
      isAdminModalOpen,
      setIsAdminModalOpen
    }}>
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};
