import React from 'react';
import { Linkedin, Github, Mail } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';

interface FooterProps {
  onShowToast: (msg: string) => void;
}

export const Footer: React.FC<FooterProps> = () => {
  const { content } = usePortfolio();

  return (
    <footer className="border-t border-white/10 bg-[#050505] py-8 px-6 mt-16">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-xs font-mono">
        
        {/* Brand Name Left */}
        <div className="font-bold text-white text-sm tracking-tight flex items-center gap-2">
          <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center font-bold text-[9px] text-black">
            GK
          </div>
          <span>Gaurav <span className="text-indigo-400">Kad</span></span>
        </div>

        {/* Center Copyright Notice */}
        <div className="text-slate-500 text-center">
          © 2026 {content.name} • Zeal College of Engineering & Research
        </div>

        {/* Right Social Links */}
        <div className="flex items-center gap-6 text-slate-400">
          <a
            href={content.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition-colors uppercase tracking-wider text-[11px] flex items-center gap-1.5 group"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span>LinkedIn</span>
          </a>
          <a
            href={content.github}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-indigo-400 transition-colors uppercase tracking-wider text-[11px] flex items-center gap-1.5 group"
            title="GitHub Profile"
          >
            <Github className="w-3.5 h-3.5 text-slate-300 group-hover:text-indigo-400 group-hover:scale-110 transition-transform" />
            <span>GitHub</span>
          </a>
          <a
            href={`mailto:${content.email}`}
            className="hover:text-indigo-400 transition-colors uppercase tracking-wider text-[11px] flex items-center gap-1.5 group"
            title="Send Email"
          >
            <Mail className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
            <span>Email</span>
          </a>
        </div>

      </div>
    </footer>
  );
};
