import React from 'react';
import { motion } from 'motion/react';
import { Save, RotateCcw, ShieldCheck, X, Camera } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface FloatingAdminToolbarProps {
  onShowToast: (msg: string) => void;
}

export const FloatingAdminToolbar: React.FC<FloatingAdminToolbarProps> = ({ onShowToast }) => {
  const { isAdminMode, setIsAdminMode, setIsAdminModalOpen, saveChanges, resetToDefaults } = usePortfolio();

  if (!isAdminMode) return null;

  const handleSave = () => {
    saveChanges();
    onShowToast('💾 Changes saved successfully to LocalStorage!');
  };

  const handleReset = () => {
    if (window.confirm('Reset all edited content back to default values?')) {
      resetToDefaults();
      onShowToast('↺ Content restored to default portfolio data.');
    }
  };

  const handleExit = () => {
    setIsAdminMode(false);
    onShowToast('Locked Admin Edit Mode.');
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 30, scale: 0.9 }}
      className="fixed bottom-6 right-6 z-50 p-2.5 rounded-xl bg-[#0a0a0a]/95 border border-indigo-500/40 shadow-2xl backdrop-blur-md flex flex-wrap items-center gap-3"
    >
      <button
        onClick={() => setIsAdminModalOpen(true)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-indigo-500/10 border border-indigo-500/30 hover:bg-indigo-500/20 transition-colors cursor-pointer"
        title="Open Secret Admin Panel"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
        <ShieldCheck className="w-4 h-4 text-indigo-400" />
        <span className="text-xs font-mono font-bold text-indigo-300 uppercase tracking-wider">
          Admin Panel
        </span>
      </button>

      <div className="h-5 w-[1px] bg-white/10 hidden sm:block" />

      <div className="flex items-center gap-2">
        <button
          onClick={() => setIsAdminModalOpen(true)}
          className="px-3 py-2 rounded-lg bg-indigo-600/20 border border-indigo-500/40 hover:bg-indigo-600/30 text-indigo-300 text-xs font-mono font-bold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
          title="Update profile photo"
        >
          <Camera className="w-3.5 h-3.5 text-indigo-400" />
          <span className="hidden sm:inline">Update Photo</span>
        </button>

        <button
          onClick={handleSave}
          className="px-3.5 py-2 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-lg shadow-emerald-600/20 active:scale-95 cursor-pointer"
          title="Save changes to local storage"
        >
          <Save className="w-3.5 h-3.5" />
          <span>Save Changes</span>
        </button>

        <button
          onClick={handleReset}
          className="px-3 py-2 rounded-lg bg-white/5 border border-white/10 hover:border-white/20 text-slate-300 hover:text-white text-xs font-mono font-bold transition-all flex items-center gap-1.5 active:scale-95 cursor-pointer"
          title="Reset back to default values"
        >
          <RotateCcw className="w-3.5 h-3.5 text-amber-400" />
          <span className="hidden sm:inline">Reset</span>
        </button>

        <button
          onClick={handleExit}
          className="p-2 rounded-lg bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-300 text-xs font-mono font-bold transition-colors cursor-pointer"
          title="Exit Admin Edit Mode"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};
