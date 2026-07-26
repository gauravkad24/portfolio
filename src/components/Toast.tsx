import React from 'react';
import { CheckCircle2, Copy, AlertCircle } from 'lucide-react';

interface ToastProps {
  message: string | null;
  type?: 'success' | 'info' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded bg-[#0a0a0a] border border-white/10 text-white shadow-2xl animate-bounce-short font-mono text-xs">
      {type === 'success' && <CheckCircle2 className="w-4 h-4 text-emerald-400" />}
      {type === 'info' && <Copy className="w-4 h-4 text-indigo-400" />}
      {type === 'error' && <AlertCircle className="w-4 h-4 text-rose-400" />}
      <span className="text-xs font-mono text-slate-200">{message}</span>
      <button 
        onClick={onClose} 
        className="ml-2 text-slate-400 hover:text-white transition-colors text-xs font-mono px-1.5 py-0.5 rounded bg-white/10"
      >
        ✕
      </button>
    </div>
  );
};
