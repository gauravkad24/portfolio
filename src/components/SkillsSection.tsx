import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Sparkles, FolderCode, Code, Layout, MessageSquare, BrainCircuit, Lightbulb, Users, Plus, X } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { GlowCard } from './GlowCard';

export const SkillsSection: React.FC = () => {
  const { content, updateContentField, isAdminMode } = usePortfolio();
  const [newSoftSkill, setNewSoftSkill] = useState('');
  const [newProficientTech, setNewProficientTech] = useState('');
  const [newFutureTech, setNewFutureTech] = useState('');

  const addSoftSkill = () => {
    if (!newSoftSkill.trim()) return;
    updateContentField('softSkills', [...content.softSkills, newSoftSkill.trim()]);
    setNewSoftSkill('');
  };

  const removeSoftSkill = (index: number) => {
    updateContentField('softSkills', content.softSkills.filter((_, i) => i !== index));
  };

  const addProficientTech = () => {
    if (!newProficientTech.trim()) return;
    updateContentField('techProficient', [...content.techProficient, newProficientTech.trim()]);
    setNewProficientTech('');
  };

  const removeProficientTech = (index: number) => {
    updateContentField('techProficient', content.techProficient.filter((_, i) => i !== index));
  };

  const addFutureTech = () => {
    if (!newFutureTech.trim()) return;
    updateContentField('techFuture', [...content.techFuture, newFutureTech.trim()]);
    setNewFutureTech('');
  };

  const removeFutureTech = (index: number) => {
    updateContentField('techFuture', content.techFuture.filter((_, i) => i !== index));
  };

  return (
    <section id="skills" className="py-20 px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-10"
      >
        <h2 className="text-2xl md:text-3xl font-light italic text-white tracking-tight">
          Skills & Expertise
        </h2>
        <span className="h-[1px] flex-1 bg-white/10 ml-6"></span>
      </motion.div>

      {/* 2 Main Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Card 1: Passion & Soft Skills */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
        >
          <GlowCard 
            glowColor="rgba(99, 102, 241, 0.2)" 
            className="bg-[#0a0a0a] rounded-lg p-7 border border-white/10 shadow-2xl hover:border-indigo-500/50 hover:shadow-indigo-500/10 transition-all duration-300 h-full"
          >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ scale: 1.15, rotate: 5 }}
                className="p-2.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400"
              >
                <Sparkles className="w-5 h-5 text-indigo-400" />
              </motion.div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Passion & Soft Skills
              </h3>
            </div>

            {/* Skill Pills */}
            <div className="flex flex-wrap gap-2.5 mt-6">
              {content.softSkills.map((skillName, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.3, delay: index * 0.04 }}
                  whileHover={{
                    scale: 1.06,
                    y: -2,
                    borderColor: 'rgba(99, 102, 241, 0.6)',
                    backgroundColor: 'rgba(255, 255, 255, 0.08)',
                  }}
                  whileTap={{ scale: 0.96 }}
                  className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full bg-white/5 border border-white/10 text-xs font-mono text-slate-300 transition-all cursor-default shadow-sm relative group"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  <span>{skillName}</span>
                  {isAdminMode && (
                    <button
                      onClick={() => removeSoftSkill(index)}
                      className="ml-1 p-0.5 rounded-full bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white transition-colors"
                      title="Delete Skill"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </motion.div>
              ))}
            </div>

            {isAdminMode && (
              <div className="mt-4 flex items-center gap-2 pt-3 border-t border-white/10">
                <input
                  type="text"
                  value={newSoftSkill}
                  onChange={(e) => setNewSoftSkill(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && addSoftSkill()}
                  placeholder="Add new soft skill..."
                  className="flex-1 px-3 py-1.5 rounded bg-[#161616] border border-dashed border-indigo-400/80 text-xs font-mono text-white focus:outline-none"
                />
                <button
                  onClick={addSoftSkill}
                  className="px-3 py-1.5 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold flex items-center gap-1"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add</span>
                </button>
              </div>
            )}
          </div>
          </GlowCard>
        </motion.div>

        {/* Card 2: Tech Stack */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.15 }}
        >
          <GlowCard 
            glowColor="rgba(16, 185, 129, 0.2)" 
            className="bg-[#0a0a0a] rounded-lg p-7 border border-white/10 shadow-2xl hover:border-emerald-500/50 hover:shadow-emerald-500/10 transition-all duration-300 h-full"
          >
          <div>
            <div className="flex items-center gap-3 mb-6">
              <motion.div
                whileHover={{ scale: 1.15, rotate: -5 }}
                className="p-2.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400"
              >
                <FolderCode className="w-5 h-5 text-emerald-400" />
              </motion.div>
              <h3 className="text-xl font-bold text-white tracking-tight">
                Tech Stack
              </h3>
            </div>

            {/* Category 1: PROFICIENT & CURRENTLY USING */}
            <div className="mt-6 space-y-3">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
                PROFICIENT & CURRENTLY USING
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {content.techProficient.map((item, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    whileHover={{ scale: 1.08, y: -2, borderColor: 'rgba(16, 185, 129, 0.6)' }}
                    whileTap={{ scale: 0.96 }}
                    className="px-3.5 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-xs font-mono font-medium text-emerald-200 cursor-default shadow-sm inline-flex items-center gap-1.5"
                  >
                    <span>{item}</span>
                    {isAdminMode && (
                      <button
                        onClick={() => removeProficientTech(idx)}
                        className="p-0.5 rounded-full bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white transition-colors"
                        title="Delete Tech"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </motion.span>
                ))}
              </div>

              {isAdminMode && (
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={newProficientTech}
                    onChange={(e) => setNewProficientTech(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addProficientTech()}
                    placeholder="Add proficient tech..."
                    className="flex-1 px-3 py-1 rounded bg-[#161616] border border-dashed border-emerald-400/80 text-xs font-mono text-white focus:outline-none"
                  />
                  <button
                    onClick={addProficientTech}
                    className="px-3 py-1 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              )}
            </div>

            {/* Category 2: ADVANCING & FUTURE ROADMAP */}
            <div className="mt-8 space-y-3">
              <h4 className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-indigo-400"></span>
                ADVANCING & FUTURE ROADMAP
              </h4>
              <div className="flex flex-wrap gap-2.5">
                {content.techFuture.map((item, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.04 }}
                    whileHover={{ scale: 1.08, y: -2, borderColor: 'rgba(99, 102, 241, 0.6)' }}
                    whileTap={{ scale: 0.96 }}
                    className="px-3.5 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-xs font-mono text-indigo-200 cursor-default shadow-sm inline-flex items-center gap-1.5"
                  >
                    <span>{item}</span>
                    {isAdminMode && (
                      <button
                        onClick={() => removeFutureTech(idx)}
                        className="p-0.5 rounded-full bg-rose-500/20 hover:bg-rose-500 text-rose-300 hover:text-white transition-colors"
                        title="Delete Item"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    )}
                  </motion.span>
                ))}
              </div>

              {isAdminMode && (
                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="text"
                    value={newFutureTech}
                    onChange={(e) => setNewFutureTech(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && addFutureTech()}
                    placeholder="Add future roadmap tech..."
                    className="flex-1 px-3 py-1 rounded bg-[#161616] border border-dashed border-indigo-400/80 text-xs font-mono text-white focus:outline-none"
                  />
                  <button
                    onClick={addFutureTech}
                    className="px-3 py-1 rounded bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-bold flex items-center gap-1"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Add</span>
                  </button>
                </div>
              )}
            </div>
          </div>
          </GlowCard>
        </motion.div>

      </div>
    </section>
  );
};

