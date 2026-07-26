import React from 'react';
import { motion } from 'motion/react';
import { GraduationCap, Trophy, Award, Calendar, CheckCircle2, ShieldCheck } from 'lucide-react';
import { MILESTONES } from '../data/portfolioData';
import { GlowCard } from './GlowCard';

export const JourneySection: React.FC = () => {
  return (
    <section id="journey" className="py-20 px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-10"
      >
        <h2 className="text-2xl md:text-3xl font-light italic text-white tracking-tight">
          Education Journey
        </h2>
        <span className="h-[1px] flex-1 bg-white/10 ml-6"></span>
      </motion.div>

      {/* Timeline Container */}
      <div className="relative max-w-4xl mx-auto py-4">
        {/* Central Vertical Line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500 via-emerald-400 to-white/10 md:-translate-x-1/2"></div>

        <div className="space-y-12">
          {MILESTONES.map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: isEven ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative flex flex-col md:flex-row items-start md:items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Timeline Icon Node */}
                <div className="absolute left-6 md:left-1/2 -translate-x-1/2 z-10 p-2.5 rounded-full bg-[#0a0a0a] border border-indigo-400 shadow-lg shadow-indigo-500/20 text-indigo-400 flex items-center justify-center">
                  {item.icon === 'GraduationCap' && <GraduationCap className="w-5 h-5" />}
                  {item.icon === 'Trophy' && <Trophy className="w-5 h-5 text-emerald-400" />}
                  {item.icon === 'Award' && <Award className="w-5 h-5 text-amber-400" />}
                  {item.icon === 'ShieldCheck' && <ShieldCheck className="w-5 h-5 text-indigo-400" />}
                </div>

                {/* Content Side */}
                <div className={`pl-16 md:pl-0 w-full md:w-1/2 ${isEven ? 'md:pl-12' : 'md:pr-12'}`}>
                  
                  {/* Year Pill Tag */}
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded bg-white/5 border border-white/10 text-xs font-mono text-indigo-300 mb-3">
                    <Calendar className="w-3.5 h-3.5 text-indigo-400" />
                    <span>{item.year}</span>
                  </div>

                  {/* Card */}
                  <GlowCard 
                    glowColor="rgba(99, 102, 241, 0.2)"
                    className="bg-[#0a0a0a] rounded-lg p-6 border border-white/10 shadow-2xl space-y-2 hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="text-lg font-bold text-white tracking-tight">
                        {item.title}
                      </h3>
                      {item.status === 'current' && (
                        <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 border border-emerald-500/30 text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">
                          Current
                        </span>
                      )}
                    </div>

                    <p className="text-sm font-medium text-slate-300">
                      {item.institution}
                    </p>

                    {item.score && (
                      <div className="pt-2 flex items-center gap-2 text-xs font-mono font-semibold text-emerald-400">
                        <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                        <span>{item.score}</span>
                      </div>
                    )}

                    {item.description && (
                      <p className="pt-2 text-xs text-slate-400 leading-relaxed font-light">
                        {item.description}
                      </p>
                    )}
                  </GlowCard>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
