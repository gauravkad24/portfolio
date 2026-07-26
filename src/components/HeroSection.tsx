import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ArrowDown, Code2, MapPin, Linkedin, ArrowUpRight, Github, Edit3, Download, FileText } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';
import { HeroNameHeading } from './HeroNameHeading';

interface HeroSectionProps {
  onShowToast: (msg: string) => void;
}

const DEFAULT_RESUME_URL = 'https://raw.githubusercontent.com/gauravkad24/portfolio/main/resume.pdf';

export const HeroSection: React.FC<HeroSectionProps> = () => {
  const { content, updateContentField, isAdminMode } = usePortfolio();
  const [resumeUrl, setResumeUrl] = useState<string>(DEFAULT_RESUME_URL);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('adminResumeUrl');
      if (saved) {
        setResumeUrl(saved);
      }
    } catch (e) {
      console.error('Failed to read adminResumeUrl', e);
    }
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative pt-32 pb-20 md:pt-44 md:pb-28 flex flex-col items-center justify-center text-center px-6 overflow-hidden">
      {/* Subtle Ambient Radial Backlight Glow - Indigo/Cyan */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 md:w-[500px] md:h-[500px] bg-indigo-600/10 rounded-full blur-[120px] pointer-events-none -z-10" />

      {/* Avatar Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative group mb-8"
      >
        <div className="absolute -inset-1.5 rounded-full bg-gradient-to-tr from-cyan-500 via-indigo-500 to-emerald-400 blur-md group-hover:opacity-100 opacity-75 transition duration-500"></div>
        <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full border-2 border-cyan-400/60 p-1 bg-[#0a0a0a] shadow-2xl overflow-hidden flex items-center justify-center">
          <img
            src={content.avatarUrl || PERSONAL_INFO.avatarUrl}
            alt={content.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-500"
          />
        </div>
      </motion.div>

      {/* Role / Eyebrow Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
      >
        {isAdminMode ? (
          <div className="w-full max-w-lg mb-4 flex flex-col items-center gap-1">
            <label className="text-[10px] font-mono text-indigo-400 font-bold flex items-center gap-1">
              <Edit3 className="w-3 h-3" /> EDIT HERO BADGE
            </label>
            <input
              type="text"
              value={content.heroBadge}
              onChange={(e) => updateContentField('heroBadge', e.target.value)}
              className="w-full text-center px-3 py-1.5 rounded bg-[#161616] border border-dashed border-indigo-400/80 text-indigo-300 font-mono text-xs focus:outline-none focus:ring-1 focus:ring-indigo-400"
            />
          </div>
        ) : (
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 mb-4 hover:border-cyan-400/40 transition-colors">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="text-indigo-300 font-mono text-xs uppercase tracking-widest font-semibold">
              {content.heroBadge}
            </span>
          </div>
        )}
      </motion.div>

      {/* Main Name Heading */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
      >
        {isAdminMode ? (
          <div className="w-full max-w-xl my-2 flex flex-col items-center gap-1">
            <label className="text-[10px] font-mono text-indigo-400 font-bold flex items-center gap-1">
              <Edit3 className="w-3 h-3" /> EDIT FULL NAME
            </label>
            <input
              type="text"
              value={content.name}
              onChange={(e) => updateContentField('name', e.target.value)}
              className="w-full text-center px-4 py-2 rounded bg-[#161616] border border-dashed border-indigo-400/80 text-white font-bold text-2xl md:text-3xl focus:outline-none focus:ring-1 focus:ring-indigo-400"
            />
          </div>
        ) : (
          <HeroNameHeading name={content.name} />
        )}
      </motion.div>

      {/* Subtitle / Title */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
      >
        {isAdminMode ? (
          <div className="w-full max-w-xl my-2 flex flex-col items-center gap-1">
            <label className="text-[10px] font-mono text-indigo-400 font-bold flex items-center gap-1">
              <Edit3 className="w-3 h-3" /> EDIT SUBTITLE / TITLE
            </label>
            <input
              type="text"
              value={content.title}
              onChange={(e) => updateContentField('title', e.target.value)}
              className="w-full text-center px-4 py-1.5 rounded bg-[#161616] border border-dashed border-indigo-400/80 text-slate-300 font-mono text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400"
            />
          </div>
        ) : (
          <p className="mt-4 text-sm sm:text-base md:text-lg font-mono text-slate-400 tracking-wide max-w-2xl">
            {content.title}
          </p>
        )}
      </motion.div>

      {/* Intro Short Bio */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
      >
        {isAdminMode ? (
          <div className="w-full max-w-2xl my-3 flex flex-col items-center gap-1">
            <label className="text-[10px] font-mono text-indigo-400 font-bold flex items-center gap-1">
              <Edit3 className="w-3 h-3" /> EDIT SHORT BIO
            </label>
            <textarea
              rows={3}
              value={content.shortBio}
              onChange={(e) => updateContentField('shortBio', e.target.value)}
              className="w-full px-4 py-2 rounded bg-[#161616] border border-dashed border-indigo-400/80 text-slate-200 text-sm focus:outline-none focus:ring-1 focus:ring-indigo-400"
            />
          </div>
        ) : (
          <p className="mt-6 text-sm sm:text-base md:text-lg text-slate-300 max-w-2xl leading-relaxed font-normal">
            {content.shortBio}
          </p>
        )}
      </motion.div>

      {/* Quick Location & Campus Badge */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.5, ease: "easeOut" }}
        className="mt-6 flex flex-wrap items-center justify-center gap-3 text-xs font-mono"
      >
        {isAdminMode ? (
          <div className="flex flex-col sm:flex-row gap-2 w-full max-w-xl">
            <input
              type="text"
              value={content.location}
              onChange={(e) => updateContentField('location', e.target.value)}
              className="flex-1 px-3 py-1.5 rounded bg-[#161616] border border-dashed border-indigo-400/80 text-slate-300 text-xs font-mono focus:outline-none"
              placeholder="Location"
            />
            <input
              type="text"
              value={content.college}
              onChange={(e) => updateContentField('college', e.target.value)}
              className="flex-1 px-3 py-1.5 rounded bg-[#161616] border border-dashed border-indigo-400/80 text-slate-300 text-xs font-mono focus:outline-none"
              placeholder="College"
            />
          </div>
        ) : (
          <>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-white/5 border border-white/10 text-slate-300 hover:border-indigo-400/40 hover:-translate-y-0.5 transition-all">
              <MapPin className="w-3.5 h-3.5 text-indigo-400" />
              {content.location}
            </span>
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-md bg-white/5 border border-white/10 text-slate-300 hover:border-emerald-400/40 hover:-translate-y-0.5 transition-all">
              <Code2 className="w-3.5 h-3.5 text-emerald-400" />
              {content.college}
            </span>
          </>
        )}
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        className="mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <button
          onClick={() => scrollTo('about')}
          className="px-6 py-3.5 rounded-sm bg-white text-black text-xs font-mono font-bold tracking-wider hover:bg-cyan-300 hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-cyan-500/10 flex items-center gap-2 group cursor-pointer"
        >
          <span>VIEW PORTFOLIO</span>
          <ArrowDown className="w-4 h-4 text-black" />
        </button>

        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          download="Gaurav_Suhas_Kad_Resume.pdf"
          className="px-6 py-3.5 rounded-sm bg-gradient-to-r from-cyan-500 to-indigo-500 hover:from-cyan-400 hover:to-indigo-400 text-black text-xs font-mono font-bold tracking-wider hover:scale-105 active:scale-95 transition-all duration-300 shadow-xl shadow-cyan-500/20 flex items-center gap-2 cursor-pointer"
          title="Download Resume PDF"
        >
          <Download className="w-4 h-4 text-black" />
          <span>DOWNLOAD RESUME</span>
        </a>

        <a
          href={content.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 rounded-sm border border-indigo-500/30 bg-indigo-500/10 hover:bg-indigo-500/20 hover:border-indigo-400 hover:scale-105 active:scale-95 text-xs font-mono font-bold text-white tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer shadow-lg shadow-indigo-500/10"
          title="Connect on LinkedIn"
        >
          <Linkedin className="w-4 h-4 text-indigo-400" />
          <span>LET'S CONNECT</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
        </a>

        <a
          href={content.github}
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3.5 rounded-sm border border-white/10 bg-white/5 hover:border-white/20 hover:bg-white/10 hover:scale-105 active:scale-95 text-xs font-mono font-bold text-slate-200 tracking-wider transition-all duration-300 flex items-center gap-2 cursor-pointer"
          title="Visit GitHub Profile"
        >
          <Github className="w-4 h-4 text-slate-300" />
          <span>GITHUB</span>
          <ArrowUpRight className="w-3.5 h-3.5 text-slate-400" />
        </a>
      </motion.div>
    </section>
  );
};

