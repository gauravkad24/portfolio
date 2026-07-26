export const DEFAULT_RESUME_URL = 'https://raw.githubusercontent.com/gauravkad24/portfolio/main/resume.pdf';

export function getActiveResumeLink(): string {
  try {
    const data = localStorage.getItem('adminResumeData');
    if (data && data.trim()) {
      return data.trim();
    }
    const url = localStorage.getItem('adminResumeUrl');
    if (url && url.trim()) {
      return url.trim();
    }
  } catch (e) {
    console.error('Failed to read resume from localStorage', e);
  }
  return DEFAULT_RESUME_URL;
}

export function setActiveResumeData(dataUrl: string): void {
  try {
    localStorage.setItem('adminResumeData', dataUrl);
    window.dispatchEvent(new CustomEvent('resumeUpdated', { detail: dataUrl }));
  } catch (e) {
    console.error('Failed to set adminResumeData', e);
  }
}

export function setActiveResumeUrl(url: string): void {
  try {
    localStorage.setItem('adminResumeUrl', url);
    window.dispatchEvent(new CustomEvent('resumeUpdated', { detail: url }));
  } catch (e) {
    console.error('Failed to set adminResumeUrl', e);
  }
}
