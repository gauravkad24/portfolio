import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { FileText, Download, ExternalLink, Edit3, Check, Award, GraduationCap, ShieldCheck, Sparkles } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { GlowCard } from './GlowCard';

interface ResumeSectionProps {
  onShowToast?: (msg: string) => void;
}

const DEFAULT_RESUME_URL = 'https://raw.githubusercontent.com/gauravkad24/portfolio/main/resume.pdf';

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onShowToast }) => {
  const { content, isAdminMode } = usePortfolio();
  const [resumeUrl, setResumeUrl] = useState<string>(DEFAULT_RESUME_URL);
  const [editingUrl, setEditingUrl] = useState<string>('');
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedUrl = localStorage.getItem('adminResumeUrl');
      if (savedUrl) {
        setResumeUrl(savedUrl);
        setEditingUrl(savedUrl);
      } else {
        setEditingUrl(DEFAULT_RESUME_URL);
      }
    } catch (e) {
      console.error('Failed to read adminResumeUrl', e);
    }
  }, []);

  const handleSaveResumeUrl = () => {
    try {
      const finalUrl = editingUrl.trim() || DEFAULT_RESUME_URL;
      localStorage.setItem('adminResumeUrl', finalUrl);
      setResumeUrl(finalUrl);
      setIsEditing(false);
      if (onShowToast) {
        onShowToast('✅ Resume PDF URL updated successfully!');
      }
    } catch (e) {
      console.error('Failed to save adminResumeUrl', e);
    }
  };

  return (
    <section id="resume" className="py-20 md:py-28 px-6 md:px-12 max-w-6xl mx-auto relative z-10">
      {/* Section Header */}
      <div className="flex flex-col items-center text-center mb-16">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 font-mono text-xs uppercase tracking-widest mb-4"
        >
          <FileText className="w-3.5 h-3.5 text-indigo-400" />
          <span>Curriculum Vitae</span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight"
        >
          Resume & <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">Qualifications</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="mt-4 text-slate-400 max-w-2xl text-sm sm:text-base font-normal leading-relaxed"
        >
          Download my official resume to review my academic performance, technical skillset, leadership record, and engineering projects.
        </motion.p>
      </div>

      {/* Main Resume Showcase Card */}
      <motion.div
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.3 }}
      >
        <GlowCard className="p-8 md:p-12 relative overflow-hidden">
          {/* Ambient Glow */}
          <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-600/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Highlights */}
            <div className="lg:col-span-8 space-y-6">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <GraduationCap className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white tracking-tight">{content.name}</h3>
                  <p className="text-xs font-mono text-indigo-300">{content.specialization}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 font-semibold">
                    <Award className="w-4 h-4" />
                    ACADEMIC DISTINCTION
                  </div>
                  <p className="text-sm font-bold text-white">{content.cgpaScore}</p>
                  <p className="text-xs text-slate-400">{content.college}</p>
                </div>

                <div className="p-4 rounded-lg bg-white/5 border border-white/10 space-y-1">
                  <div className="flex items-center gap-2 text-xs font-mono text-cyan-400 font-semibold">
                    <ShieldCheck className="w-4 h-4" />
                    DEFENCE LEADERSHIP
                  </div>
                  <p className="text-sm font-bold text-white">UPSC NDA Candidate</p>
                  <p className="text-xs text-slate-400">2-Year Defence Academy Training</p>
                </div>
              </div>

              {/* Core Skill Chips */}
              <div>
                <p className="text-xs font-mono text-slate-400 uppercase tracking-wider mb-2.5">Key Core Competencies:</p>
                <div className="flex flex-wrap gap-2">
                  {['Python', 'C Language', 'Data Structures & Algorithms', 'HTML5 / CSS3', 'Machine Learning', 'Problem Solving'].map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-200 text-xs font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Admin Mode URL Editing */}
              {isAdminMode && (
                <div className="pt-4 border-t border-white/10 space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="text-xs font-mono text-indigo-400 font-bold flex items-center gap-1.5">
                      <Edit3 className="w-3.5 h-3.5" /> EDIT RESUME PDF URL
                    </label>
                    <button
                      onClick={() => setIsEditing(!isEditing)}
                      className="text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
                    >
                      {isEditing ? 'Cancel' : 'Change URL'}
                    </button>
                  </div>

                  {isEditing ? (
                    <div className="flex flex-col sm:flex-row gap-2">
                      <input
                        type="url"
                        value={editingUrl}
                        onChange={(e) => setEditingUrl(e.target.value)}
                        placeholder="https://example.com/resume.pdf"
                        className="flex-1 px-3 py-2 rounded bg-[#161616] border border-dashed border-indigo-400 text-white text-xs font-mono focus:outline-none"
                      />
                      <button
                        onClick={handleSaveResumeUrl}
                        className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Save
                      </button>
                    </div>
                  ) : (
                    <p className="text-xs font-mono text-slate-400 truncate bg-black/40 px-3 py-2 rounded border border-white/5">
                      {resumeUrl}
                    </p>
                  )}
                </div>
              )}
            </div>

            {/* Right Call-To-Action Box */}
            <div className="lg:col-span-4 flex flex-col items-center text-center p-6 rounded-2xl bg-gradient-to-b from-indigo-950/40 to-slate-900/60 border border-indigo-500/30 shadow-2xl space-y-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-indigo-500 to-cyan-400 p-0.5 flex items-center justify-center shadow-lg shadow-indigo-500/20">
                <div className="w-full h-full bg-[#0a0a0a] rounded-full flex items-center justify-center text-indigo-400">
                  <FileText className="w-8 h-8" />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-bold text-white">Official Resume</h4>
                <p className="text-xs text-slate-400 mt-1">PDF Format • Updated for 2026</p>
              </div>

              <div className="w-full space-y-2.5 pt-2">
                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  download="Gaurav_Suhas_Kad_Resume.pdf"
                  className="w-full px-5 py-3.5 rounded-lg bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-400 text-black font-mono font-bold text-xs uppercase tracking-wider hover:opacity-95 hover:scale-[1.02] active:scale-98 transition-all duration-300 flex items-center justify-center gap-2 shadow-xl shadow-cyan-500/20 cursor-pointer"
                >
                  <Download className="w-4 h-4" />
                  <span>DOWNLOAD RESUME</span>
                </a>

                <a
                  href={resumeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full px-5 py-2.5 rounded-lg border border-white/10 bg-white/5 hover:bg-white/10 text-slate-300 font-mono text-xs font-semibold flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ExternalLink className="w-3.5 h-3.5 text-indigo-400" />
                  <span>PREVIEW IN NEW TAB</span>
                </a>
              </div>
            </div>
          </div>
        </GlowCard>
      </motion.div>
    </section>
  );
};
