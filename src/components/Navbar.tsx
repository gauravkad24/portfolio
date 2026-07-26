import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, Linkedin, ShieldCheck } from 'lucide-react';
import { CONTACT_INFO, PERSONAL_INFO } from '../data/portfolioData';
import { usePortfolio } from '../context/PortfolioContext';

interface NavbarProps {
  onShowToast: (msg: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onShowToast }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');
  const { content, setIsAdminModalOpen, isAdminMode } = usePortfolio();
  const longPressTimerRef = useRef<NodeJS.Timeout | null>(null);

  const handleTouchStart = () => {
    longPressTimerRef.current = setTimeout(() => {
      setIsAdminModalOpen(true);
      onShowToast('🔑 Secret Admin Trigger Activated');
    }, 600);
  };

  const handleTouchEnd = () => {
    if (longPressTimerRef.current) {
      clearTimeout(longPressTimerRef.current);
    }
  };

  const handleLogoDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsAdminModalOpen(true);
  };

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Journey', href: '#journey' },
    { name: 'Resume', href: '#resume' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }

      // ScrollSpy logic
      const sections = ['hero', 'about', 'skills', 'projects', 'journey', 'resume', 'contact'];
      const scrollPosition = window.scrollY + 120;

      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMobileMenuOpen(false);
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
      scrolled 
        ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/5 py-4 shadow-2xl' 
        : 'bg-transparent py-6'
    }`}>
      <div className="max-w-6xl mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Brand Name */}
        <div className="flex items-center gap-3">
          <a 
            href="#hero" 
            onClick={(e) => { e.preventDefault(); scrollTo('#hero'); }}
            onDoubleClick={handleLogoDoubleClick}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
            onTouchMove={handleTouchEnd}
            className="text-base md:text-lg font-light tracking-tight text-white hover:text-indigo-400 transition-colors flex items-center gap-2.5 group select-none cursor-pointer"
            title="Double-click or long-press initials GK for Secret Admin Mode"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-indigo-500 to-emerald-400 flex items-center justify-center font-bold text-xs text-black shadow-md shadow-indigo-500/10 group-hover:scale-105 transition-transform overflow-hidden shrink-0">
              <img
                src={content.avatarUrl || PERSONAL_INFO.avatarUrl}
                alt={content.name}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-full"
              />
            </div>
            <span className="font-semibold text-white tracking-tight">{content.name}</span>
          </a>

          {isAdminMode && (
            <button
              onClick={() => setIsAdminModalOpen(true)}
              className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/40 text-[10px] font-mono font-bold text-emerald-300 flex items-center gap-1 hover:bg-emerald-500/30 transition-colors animate-pulse cursor-pointer"
              title="Open Secret Admin Panel"
            >
              <ShieldCheck className="w-3 h-3 text-emerald-400" />
              EDIT MODE
            </button>
          )}
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => {
            const linkId = link.href.replace('#', '');
            const isActive = activeSection === linkId;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo(link.href);
                }}
                className={`text-xs font-mono uppercase tracking-widest transition-colors relative py-1 nav-link-underline ${
                  isActive
                    ? 'text-white font-bold'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.name}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-indigo-400 to-cyan-400 rounded-full animate-pulse" />
                )}
              </a>
            );
          })}

          <a
            href={CONTACT_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 rounded-sm bg-white text-black text-xs font-mono font-bold tracking-tight hover:bg-cyan-300 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center gap-1.5 shadow-md shadow-cyan-500/10 cursor-pointer"
            title="Connect on LinkedIn"
          >
            <Linkedin className="w-3.5 h-3.5 text-indigo-600" />
            <span>CONNECT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </nav>

        {/* Mobile Hamburger Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle navigation menu"
          className="md:hidden p-2 rounded-sm bg-white/5 border border-white/10 text-white hover:text-indigo-400"
        >
          {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0a0a0a] border-b border-white/10 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                scrollTo(link.href);
              }}
              className="block text-xs font-mono uppercase tracking-widest text-slate-300 hover:text-indigo-400 py-2 border-b border-white/5"
            >
              {link.name}
            </a>
          ))}
          <a
            href={CONTACT_INFO.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            className="inline-flex w-full items-center justify-center gap-2 px-5 py-3 rounded-sm bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-indigo-400"
          >
            <Linkedin className="w-4 h-4 text-indigo-600" />
            <span>LET'S CONNECT</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      )}
    </header>
  );
};
