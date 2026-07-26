import React from 'react';
import { motion } from 'motion/react';
import { BookOpen, BrainCircuit, Target, Trophy, ShieldCheck, MapPin, Edit3 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { PERSONAL_INFO } from '../data/portfolioData';
import { GlowCard } from './GlowCard';

export const AboutSection: React.FC = () => {
  const { content, updateContentField, isAdminMode } = usePortfolio();

  const highlights = [
    {
      icon: Trophy,
      title: "First Year Score",
      fieldKey: "cgpaScore" as const,
      detail: content.cgpaScore
    },
    {
      icon: BrainCircuit,
      title: "Specialization",
      fieldKey: "specialization" as const,
      detail: content.specialization
    },
    {
      icon: BookOpen,
      title: "Academic Institution",
      fieldKey: "college" as const,
      detail: content.college
    },
    {
      icon: MapPin,
      title: "Campus Location",
      fieldKey: "location" as const,
      detail: content.location
    },
    {
      icon: Target,
      title: "Current Focus",
      fieldKey: "currentFocus" as const,
      detail: content.currentFocus
    },
    {
      icon: ShieldCheck,
      title: "Leadership & Discipline",
      fieldKey: "leadership" as const,
      detail: content.leadership
    }
  ];

  return (
    <section id="about" className="py-20 px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-10"
      >
        <h2 className="text-2xl md:text-3xl font-light italic text-white tracking-tight">
          About Me
        </h2>
        <span className="h-[1px] flex-1 bg-white/10 ml-6"></span>
      </motion.div>

      {/* Main Glass Panel Card */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
      >
        <GlowCard className="bg-[#0a0a0a] rounded-lg p-8 md:p-10 border border-white/10 shadow-2xl relative overflow-hidden transition-all duration-300">
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>

        {/* Profile Avatar Header Block */}
        <div className="flex items-center gap-5 mb-6 pb-6 border-b border-white/10">
          <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full border-2 border-indigo-500/30 p-0.5 bg-[#121212] overflow-hidden shrink-0 shadow-lg group">
            <img
              src={content.avatarUrl || PERSONAL_INFO.avatarUrl}
              alt={content.name}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover rounded-full group-hover:scale-105 transition-transform duration-300"
            />
          </div>
          <div>
            <h3 className="text-lg md:text-xl font-bold text-white">{content.name}</h3>
            <p className="text-xs font-mono text-indigo-400 mt-0.5">{content.title}</p>
          </div>
        </div>

        <div className="space-y-6 text-slate-300 text-base md:text-lg leading-relaxed font-light">
          {isAdminMode ? (
            <div className="flex flex-col gap-1">
              <label className="text-[10px] font-mono text-indigo-400 font-bold flex items-center gap-1">
                <Edit3 className="w-3 h-3" /> EDIT ABOUT ME DESCRIPTION
              </label>
              <textarea
                rows={7}
                value={content.aboutMe}
                onChange={(e) => updateContentField('aboutMe', e.target.value)}
                className="w-full px-4 py-2 rounded bg-[#161616] border border-dashed border-indigo-400/80 text-slate-200 text-base focus:outline-none focus:ring-1 focus:ring-indigo-400"
              />
            </div>
          ) : (
            <div className="space-y-4">
              {content.aboutMe.split('\n\n').map((paragraph, index) => (
                <p key={index}>
                  {paragraph}
                </p>
              ))}
            </div>
          )}
        </div>

        {/* Quick Highlights Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4 pt-8 border-t border-white/10">
          {highlights.map((item, idx) => {
            const IconComponent = item.icon;
            return (
              <motion.div 
                key={idx} 
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.1 * idx }}
              >
                <GlowCard 
                  glowColor="rgba(99, 102, 241, 0.25)"
                  className="flex items-start gap-3.5 p-4 rounded bg-white/5 border border-white/5 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all duration-300 h-full"
                >
                  <div className="flex items-start gap-3.5 w-full">
                    <div className="p-2.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shrink-0 mt-0.5">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div className="flex-1">
                      <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400">
                        {item.title}
                      </h4>
                      {isAdminMode && item.fieldKey ? (
                        <input
                          type="text"
                          value={content[item.fieldKey]}
                          onChange={(e) => updateContentField(item.fieldKey!, e.target.value)}
                          className="w-full mt-1 px-2 py-1 rounded bg-[#161616] border border-dashed border-indigo-400/80 text-slate-200 text-xs font-mono focus:outline-none"
                        />
                      ) : (
                        <p className="text-sm font-medium text-slate-200 mt-1">
                          {item.detail}
                        </p>
                      )}
                    </div>
                  </div>
                </GlowCard>
              </motion.div>
            );
          })}
        </div>
        </GlowCard>
      </motion.div>
    </section>
  );
};

