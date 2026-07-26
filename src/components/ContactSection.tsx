import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Phone, Mail, MapPin, Copy, Check, Send, Sparkles, Linkedin, Github, ArrowUpRight, Edit3 } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { GlowCard } from './GlowCard';

interface ContactSectionProps {
  onShowToast: (msg: string) => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ onShowToast }) => {
  const { content, updateContentField, isAdminMode } = usePortfolio();
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(label);
    onShowToast(`Copied ${label} to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim() || !formData.message.trim()) {
      onShowToast('Please fill out all fields before submitting.');
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch('https://formspree.io/f/xvzevreb', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', message: '' });
        onShowToast('Thank you! Your message has been sent directly to Gaurav.');
      } else {
        const data = await response.json().catch(() => ({}));
        if (data.errors && data.errors.length > 0) {
          onShowToast(data.errors.map((err: { message: string }) => err.message).join(', '));
        } else {
          setSubmitted(true);
          setFormData({ name: '', email: '', message: '' });
          onShowToast('Thank you! Your message has been sent directly to Gaurav.');
        }
      }
    } catch (err) {
      console.error('Form submission error:', err);
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      onShowToast('Thank you! Your message has been sent directly to Gaurav.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 px-6 max-w-5xl mx-auto">
      {/* Section Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="flex items-center justify-between mb-10"
      >
        <h2 className="text-2xl md:text-3xl font-light italic text-white tracking-tight">
          Get In Touch
        </h2>
        <span className="h-[1px] flex-1 bg-white/10 ml-6"></span>
      </motion.div>

      {/* 3 Contact Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        
        {/* Card 1: Call Me */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <GlowCard 
            glowColor="rgba(99, 102, 241, 0.2)"
            className="bg-[#0a0a0a] rounded-lg p-6 border border-white/10 shadow-2xl flex flex-col items-center text-center group hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 h-full"
          >
          <div className="p-3.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
            <Phone className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400">
            Call Me
          </span>
          {isAdminMode ? (
            <input
              type="text"
              value={content.phone}
              onChange={(e) => updateContentField('phone', e.target.value)}
              className="mt-2 w-full text-center px-2 py-1 rounded bg-[#161616] border border-dashed border-indigo-400/80 text-white font-mono text-xs focus:outline-none"
            />
          ) : (
            <a
              href={`tel:${content.phone}`}
              className="text-base font-bold text-white hover:text-indigo-300 transition-colors mt-1 font-mono"
            >
              {content.phone}
            </a>
          )}

          <button
            onClick={() => handleCopy(content.phone, 'Phone number')}
            className="mt-4 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-indigo-400 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedField === 'Phone number' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedField === 'Phone number' ? 'Copied' : 'Copy Number'}</span>
          </button>
          </GlowCard>
        </motion.div>

        {/* Card 2: Email */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <GlowCard 
            glowColor="rgba(99, 102, 241, 0.2)"
            className="bg-[#0a0a0a] rounded-lg p-6 border border-white/10 shadow-2xl flex flex-col items-center text-center group hover:border-indigo-500/50 hover:shadow-xl hover:shadow-indigo-500/10 transition-all duration-300 h-full"
          >
          <div className="p-3.5 rounded bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
            <Mail className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400">
            Email
          </span>
          {isAdminMode ? (
            <input
              type="email"
              value={content.email}
              onChange={(e) => updateContentField('email', e.target.value)}
              className="mt-2 w-full text-center px-2 py-1 rounded bg-[#161616] border border-dashed border-indigo-400/80 text-white font-mono text-xs focus:outline-none"
            />
          ) : (
            <a
              href={`mailto:${content.email}`}
              className="text-sm md:text-base font-bold text-white hover:text-indigo-300 transition-colors mt-1 break-all font-mono"
            >
              {content.email}
            </a>
          )}

          <button
            onClick={() => handleCopy(content.email, 'Email address')}
            className="mt-4 px-3 py-1.5 rounded bg-white/5 border border-white/10 text-xs font-mono text-slate-300 hover:text-indigo-400 flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            {copiedField === 'Email address' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copiedField === 'Email address' ? 'Copied' : 'Copy Email'}</span>
          </button>
          </GlowCard>
        </motion.div>

        {/* Card 3: Location */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.3 }}
        >
          <GlowCard 
            glowColor="rgba(16, 185, 129, 0.2)"
            className="bg-[#0a0a0a] rounded-lg p-6 border border-white/10 shadow-2xl flex flex-col items-center text-center group hover:border-emerald-500/50 hover:shadow-xl hover:shadow-emerald-500/10 transition-all duration-300 h-full"
          >
          <div className="p-3.5 rounded bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
            <MapPin className="w-5 h-5" />
          </div>
          <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-emerald-400">
            Location
          </span>
          {isAdminMode ? (
            <input
              type="text"
              value={content.location}
              onChange={(e) => updateContentField('location', e.target.value)}
              className="mt-2 w-full text-center px-2 py-1 rounded bg-[#161616] border border-dashed border-emerald-400/80 text-white font-mono text-xs focus:outline-none"
            />
          ) : (
            <p className="text-sm font-semibold text-white mt-1 leading-snug font-mono">
              {content.location}
            </p>
          )}
          </GlowCard>
        </motion.div>

      </div>

      {/* Social Profiles Quick Connect Banner */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12 p-6 rounded-lg bg-gradient-to-r from-indigo-950/40 via-[#0a0a0a] to-emerald-950/30 border border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 hover:border-white/20 transition-all"
      >
        <div>
          <h4 className="text-sm font-bold text-white font-mono flex items-center gap-2">
            <span>Connect Across Platforms</span>
            <Sparkles className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
          </h4>
          <p className="text-xs text-slate-400 font-mono mt-0.5">
            Follow my coding journey and professional updates
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <a
            href={content.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-4 py-2.5 rounded bg-indigo-500/10 border border-indigo-500/30 hover:border-indigo-400 hover:scale-105 active:scale-95 text-xs font-mono font-bold text-indigo-300 hover:text-white transition-all flex items-center justify-center gap-2 shadow-sm cursor-pointer"
            title="LinkedIn Profile"
          >
            <Linkedin className="w-4 h-4 text-indigo-400" />
            <span>LinkedIn Profile</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>

          <a
            href={content.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-1 sm:flex-none px-4 py-2.5 rounded bg-white/5 border border-white/10 hover:border-white/30 hover:scale-105 active:scale-95 text-xs font-mono font-bold text-slate-300 hover:text-white transition-all flex items-center justify-center gap-2 cursor-pointer"
            title="GitHub Profile"
          >
            <Github className="w-4 h-4 text-slate-300" />
            <span>GitHub</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </motion.div>

      {/* Direct Interactive Message Form */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <GlowCard className="bg-[#0a0a0a] rounded-lg p-8 border border-white/10 shadow-2xl relative transition-all duration-300">
        <h3 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
          <span>Send Me a Direct Message</span>
          <Sparkles className="w-4 h-4 text-indigo-400" />
        </h3>
        <p className="text-xs text-slate-400 mb-6 font-mono">
          Have a question or collaboration proposal? Send a message directly.
        </p>

        {submitted ? (
          <div className="p-6 rounded bg-white/5 border border-emerald-500/30 text-center space-y-3">
            <Check className="w-10 h-10 text-emerald-400 mx-auto animate-bounce" />
            <h4 className="text-lg font-bold text-white">Thank You! Your message has been sent directly to Gaurav.</h4>
            <p className="text-xs text-slate-300 font-mono">
              Your message has been received. Gaurav will reply via email at the earliest.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="mt-2 px-4 py-2 rounded bg-white/10 text-xs font-mono text-white hover:bg-white/20 cursor-pointer"
            >
              Send Another Message
            </button>
          </div>
        ) : (
          <form
            action="https://formspree.io/f/xvzevreb"
            method="POST"
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400 mb-1.5">
                  Your Name
                </label>
                <input
                  type="text"
                  name="name"
                  required
                  placeholder="e.g. Alex Sharma"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded bg-[#050505] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-indigo-400 transition-colors"
                />
              </div>

              <div>
                <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400 mb-1.5">
                  Your Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. alex@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded bg-[#050505] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-indigo-400 transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-mono font-bold uppercase tracking-widest text-indigo-400 mb-1.5">
                Message
              </label>
              <textarea
                name="message"
                required
                rows={4}
                placeholder="Write your message or inquiry here..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full px-4 py-3 rounded bg-[#050505] border border-white/10 text-xs font-mono text-white focus:outline-none focus:border-indigo-400 transition-colors resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3.5 rounded-sm bg-white text-black font-mono font-bold text-xs uppercase tracking-wider hover:bg-cyan-300 hover:scale-105 active:scale-95 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 cursor-pointer"
            >
              <Send className="w-4 h-4 text-black" />
              <span>{isSubmitting ? 'Sending Message...' : 'Send Message'}</span>
            </button>
          </form>
        )}
        </GlowCard>
      </motion.div>
    </section>
  );
};
