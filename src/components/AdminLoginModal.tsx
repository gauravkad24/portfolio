import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Lock, ShieldAlert, KeyRound, X, ShieldCheck, Camera, Save, Upload, FileText, CheckCircle2, Download } from 'lucide-react';
import { usePortfolio } from '../context/PortfolioContext';
import { PERSONAL_INFO } from '../data/portfolioData';
import { getActiveResumeLink, setActiveResumeData, setActiveResumeUrl } from '../lib/resumeUtils';

interface AdminLoginModalProps {
  onShowToast: (msg: string) => void;
}

export const AdminLoginModal: React.FC<AdminLoginModalProps> = ({ onShowToast }) => {
  const { 
    isAdminModalOpen, 
    setIsAdminModalOpen, 
    isAdminMode, 
    setIsAdminMode, 
    content, 
    updateContentField,
    saveChanges 
  } = usePortfolio();
  
  const [pin, setPin] = useState<string[]>(['', '', '', '']);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [photoInputUrl, setPhotoInputUrl] = useState<string>('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Resume PDF Upload state
  const resumeFileInputRef = useRef<HTMLInputElement>(null);
  const [resumeFileName, setResumeFileName] = useState<string>('');
  const [pendingResumeData, setPendingResumeData] = useState<string>('');
  const [resumeReadyBadge, setResumeReadyBadge] = useState<boolean>(false);
  const [resumeUrlInput, setResumeUrlInput] = useState<string>('');
  const [activeResumeLink, setActiveResumeLinkState] = useState<string>('');

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  useEffect(() => {
    if (isAdminModalOpen) {
      if (!isAdminMode) {
        setPin(['', '', '', '']);
        setErrorMsg(null);
        setTimeout(() => {
          inputRefs[0].current?.focus();
        }, 100);
      } else {
        setPhotoInputUrl(content.avatarUrl || '');
        const currentLink = getActiveResumeLink();
        setActiveResumeLinkState(currentLink);
        setResumeUrlInput(currentLink.startsWith('data:') ? '' : currentLink);
      }
    }
  }, [isAdminModalOpen, isAdminMode, content.avatarUrl]);

  if (!isAdminModalOpen) return null;

  const handleInputChange = (index: number, value: string) => {
    setErrorMsg(null);
    const cleaned = value.replace(/[^0-9]/g, '');
    if (!cleaned && value !== '') return;

    const newPin = [...pin];
    newPin[index] = cleaned.slice(-1);
    setPin(newPin);

    // Auto focus next input
    if (cleaned && index < 3) {
      inputRefs[index + 1].current?.focus();
    }

    // Auto submit when 4 digits are entered
    const currentPinString = newPin.join('');
    if (currentPinString.length === 4) {
      verifyPin(currentPinString);
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !pin[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const verifyPin = (enteredPin: string) => {
    if (enteredPin === '1234') {
      setIsAdminMode(true);
      setPhotoInputUrl(content.avatarUrl || '');
      onShowToast('🔓 Secret Admin Edit Mode Unlocked!');
    } else {
      setErrorMsg('Access Denied: Incorrect 4-Digit PIN');
      setPin(['', '', '', '']);
      setTimeout(() => {
        inputRefs[0].current?.focus();
      }, 50);
    }
  };

  const handleSubmitPin = (e: React.FormEvent) => {
    e.preventDefault();
    verifyPin(pin.join(''));
  };

  const handleSetPhoto = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = photoInputUrl.trim();
    if (!trimmed) {
      onShowToast('Please enter a direct image URL.');
      return;
    }
    updateContentField('avatarUrl', trimmed);
    onShowToast('Profile photo updated!');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      onShowToast('Please select a valid image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (result) {
        updateContentField('avatarUrl', result);
        setPhotoInputUrl('');
        onShowToast('Profile photo updated from device upload!');
      }
    };
    reader.onerror = () => {
      onShowToast('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleResumeFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      onShowToast('Please select a valid PDF file (.pdf).');
      return;
    }

    setResumeFileName(file.name);
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      if (result) {
        setPendingResumeData(result);
        setResumeReadyBadge(true);
        onShowToast('📄 Resume loaded & ready to save!');
      }
    };
    reader.onerror = () => {
      onShowToast('Failed to read PDF file.');
    };
    reader.readAsDataURL(file);
  };

  const handleSetResumeUrl = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = resumeUrlInput.trim();
    if (!trimmed) {
      onShowToast('Please enter a valid PDF URL.');
      return;
    }
    setActiveResumeUrl(trimmed);
    setPendingResumeData('');
    setResumeReadyBadge(false);
    setResumeFileName('');
    setActiveResumeLinkState(trimmed);
    onShowToast('Resume URL set successfully!');
  };

  const handleSaveAndClose = () => {
    if (pendingResumeData) {
      setActiveResumeData(pendingResumeData);
      setActiveResumeLinkState(pendingResumeData);
    } else if (resumeUrlInput.trim()) {
      setActiveResumeUrl(resumeUrlInput.trim());
    }
    saveChanges();
    setIsAdminModalOpen(false);
    onShowToast('💾 Changes saved successfully to LocalStorage!');
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 10 }}
          className="w-full max-w-lg bg-[#0d0d0d] border border-white/15 rounded-xl p-6 md:p-8 shadow-2xl relative"
        >
          {/* Close Button */}
          <button
            onClick={() => setIsAdminModalOpen(false)}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/5 border border-white/10 text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>

          {isAdminMode ? (
            /* Admin Control Panel View */
            <div className="space-y-6">
              <div className="flex items-center gap-3 pb-4 border-b border-white/10">
                <div className="w-10 h-10 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
                  <ShieldCheck className="w-5 h-5 text-emerald-400" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                    <span>Secret Admin Panel</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 border border-emerald-500/30 text-[10px] font-mono text-emerald-300">
                      Active
                    </span>
                  </h3>
                  <p className="text-xs font-mono text-slate-400 mt-0.5">
                    Live content controls & profile management
                  </p>
                </div>
              </div>

              {/* Section: Upload New Avatar */}
              <div className="p-4 rounded-lg bg-white/5 border border-indigo-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Camera className="w-4 h-4 text-indigo-400" />
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-indigo-300">
                      Upload New Avatar
                    </h4>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded">
                    Instant Live Preview
                  </span>
                </div>

                {/* Avatar Preview & File Input Button */}
                <div className="flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full border-2 border-indigo-500/50 bg-black overflow-hidden shrink-0 shadow-lg group">
                    <img
                      src={content.avatarUrl || PERSONAL_INFO.avatarUrl}
                      alt="Profile Preview"
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover rounded-full"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = PERSONAL_INFO.avatarUrl;
                      }}
                    />
                  </div>

                  <div className="flex-1 space-y-2">
                    <input
                      type="file"
                      ref={fileInputRef}
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="avatar-file-upload"
                    />
                    
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="w-full py-2.5 px-3 rounded-lg bg-indigo-600/20 border border-indigo-500/40 hover:bg-indigo-600/30 text-indigo-200 text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Upload className="w-4 h-4 text-indigo-400" />
                      <span>Choose File from Device</span>
                    </button>

                    <p className="text-[11px] font-mono text-slate-400">
                      Supports JPG, PNG, WEBP. Converts to Base64 data string.
                    </p>
                  </div>
                </div>

                {/* Secondary Option: Direct Image URL */}
                <div className="pt-2 border-t border-white/10 space-y-1.5">
                  <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">
                    Or Enter Direct Image Web URL
                  </label>
                  <form onSubmit={handleSetPhoto} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="https://example.com/photo.jpg"
                      value={photoInputUrl}
                      onChange={(e) => setPhotoInputUrl(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded bg-[#161616] border border-white/15 text-slate-200 text-xs font-mono focus:outline-none focus:border-indigo-400"
                    />
                    <button
                      type="submit"
                      className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold transition-all shrink-0 cursor-pointer"
                    >
                      Set URL
                    </button>
                  </form>
                </div>
              </div>

              {/* Section: Upload Resume (PDF) */}
              <div className="p-4 rounded-lg bg-white/5 border border-cyan-500/30 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-cyan-400" />
                    <h4 className="text-xs font-mono font-bold uppercase tracking-wider text-cyan-300">
                      Upload Resume (PDF)
                    </h4>
                  </div>
                  {resumeReadyBadge ? (
                    <span className="text-[10px] font-mono font-bold text-emerald-300 bg-emerald-500/20 border border-emerald-500/40 px-2 py-0.5 rounded flex items-center gap-1 animate-pulse">
                      <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                      Resume Ready to Save
                    </span>
                  ) : (
                    <span className="text-[10px] font-mono text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 px-2 py-0.5 rounded">
                      PDF Document
                    </span>
                  )}
                </div>

                <div className="space-y-3">
                  <input
                    type="file"
                    ref={resumeFileInputRef}
                    accept=".pdf,application/pdf"
                    onChange={handleResumeFileUpload}
                    className="hidden"
                    id="resume-pdf-upload"
                  />

                  <div className="flex flex-col sm:flex-row items-center gap-3">
                    <button
                      type="button"
                      onClick={() => resumeFileInputRef.current?.click()}
                      className="w-full sm:w-auto py-2.5 px-4 rounded-lg bg-cyan-600/20 border border-cyan-500/40 hover:bg-cyan-600/30 text-cyan-200 text-xs font-mono font-bold transition-all flex items-center justify-center gap-2 cursor-pointer shadow-md"
                    >
                      <Upload className="w-4 h-4 text-cyan-400" />
                      <span>Choose Resume File</span>
                    </button>

                    <p className="text-xs font-mono text-slate-300 truncate max-w-xs">
                      {resumeFileName ? (
                        <span className="text-emerald-300 font-semibold">Selected: {resumeFileName}</span>
                      ) : (
                        <span className="text-slate-400">No new file chosen</span>
                      )}
                    </p>
                  </div>

                  <p className="text-[11px] font-mono text-slate-400">
                    Reads PDF from device file manager and converts directly to Base64 data string.
                  </p>

                  {/* Direct Link Option */}
                  <div className="pt-2 border-t border-white/10 space-y-1.5">
                    <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-400">
                      Or Enter Direct Resume Web Link (PDF URL)
                    </label>
                    <form onSubmit={handleSetResumeUrl} className="flex gap-2">
                      <input
                        type="url"
                        placeholder="https://example.com/resume.pdf"
                        value={resumeUrlInput}
                        onChange={(e) => setResumeUrlInput(e.target.value)}
                        className="flex-1 px-3 py-1.5 rounded bg-[#161616] border border-white/15 text-slate-200 text-xs font-mono focus:outline-none focus:border-cyan-400"
                      />
                      <button
                        type="submit"
                        className="px-3 py-1.5 rounded bg-white/10 hover:bg-white/20 text-white text-xs font-mono font-bold transition-all shrink-0 cursor-pointer"
                      >
                        Set Link
                      </button>
                    </form>
                  </div>

                  {/* Active Resume Link Preview */}
                  {activeResumeLink && (
                    <div className="pt-2 flex items-center justify-between text-xs font-mono text-slate-400 bg-black/40 px-3 py-2 rounded border border-white/5">
                      <span className="truncate max-w-[240px]">
                        {activeResumeLink.startsWith('data:') ? 'Base64 PDF Loaded in Storage' : activeResumeLink}
                      </span>
                      <a
                        href={activeResumeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        download="Gaurav_Kad_Resume.pdf"
                        className="text-cyan-400 hover:underline flex items-center gap-1 shrink-0 font-bold"
                      >
                        <Download className="w-3.5 h-3.5" />
                        Test
                      </a>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  type="button"
                  onClick={handleSaveAndClose}
                  className="w-full sm:flex-1 py-2.5 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-xs font-mono font-bold text-white transition-all flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/20 cursor-pointer"
                >
                  <Save className="w-4 h-4" />
                  <span>Save Changes</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsAdminModalOpen(false)}
                  className="w-full sm:w-auto py-2.5 px-4 rounded-lg bg-white/5 border border-white/10 text-xs font-mono font-bold text-slate-300 hover:bg-white/10 transition-colors cursor-pointer"
                >
                  Close Panel
                </button>
              </div>
            </div>
          ) : (
            /* PIN Entrance Form */
            <div>
              {/* Header */}
              <div className="flex flex-col items-center text-center mb-6">
                <div className="w-12 h-12 rounded-full bg-indigo-500/10 border border-indigo-500/30 flex items-center justify-center text-indigo-400 mb-3 shadow-lg shadow-indigo-500/10">
                  <Lock className="w-6 h-6 text-indigo-400" />
                </div>
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
                  <span>Secret Admin Mode</span>
                </h3>
                <p className="text-xs font-mono text-slate-400 mt-1">
                  Enter 4-digit PIN code to unlock live content edit mode
                </p>
              </div>

              {/* PIN Input Form */}
              <form onSubmit={handleSubmitPin} className="space-y-6">
                <div className="flex justify-center gap-3">
                  {pin.map((digit, idx) => (
                    <input
                      key={idx}
                      ref={inputRefs[idx]}
                      type="password"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleInputChange(idx, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(idx, e)}
                      className="w-12 h-14 text-center text-2xl font-mono font-bold bg-white/5 border border-white/15 rounded-lg text-white focus:outline-none focus:border-indigo-400 focus:ring-2 focus:ring-indigo-500/30 transition-all"
                      placeholder="•"
                    />
                  ))}
                </div>

                {/* Access Denied Warning Notice */}
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-3 rounded-md bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs font-mono flex items-center justify-center gap-2"
                  >
                    <ShieldAlert className="w-4 h-4 text-rose-400 shrink-0" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                <div className="flex items-center gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setIsAdminModalOpen(false)}
                    className="flex-1 py-3 px-4 rounded-lg bg-white/5 border border-white/10 text-xs font-mono font-bold text-slate-300 hover:bg-white/10 transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 py-3 px-4 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-xs font-mono font-bold text-white transition-colors flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/20 cursor-pointer"
                  >
                    <KeyRound className="w-4 h-4" />
                    <span>Unlock</span>
                  </button>
                </div>
              </form>

              <div className="mt-6 pt-4 border-t border-white/10 text-center">
                <p className="text-[11px] font-mono text-slate-500">
                  Default PIN code is <span className="text-indigo-400 font-bold">1234</span>
                </p>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
