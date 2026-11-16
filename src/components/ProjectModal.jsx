import React from 'react';
import { X, Copy, Check } from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose }) {
  const [copied, setCopied] = React.useState(false);

  if (!isOpen || !project) return null;

  const handleCopy = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 bg-[#050608]/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#0D0F14] border border-[#C5A15B] rounded p-6 sm:p-10 max-w-xl w-full relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-[#C5A15B] hover:rotate-90 hover:text-white transition-all p-1"
          aria-label="Close"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="border-b border-[#C5A15B]/20 pb-4 mb-6">
          <div className="font-serif text-[10px] tracking-widest text-[#C5A15B] uppercase mb-1">
            {project.status || "ROYAL DISPATCH"}
          </div>
          <h3 className="font-serif text-xl sm:text-2xl font-bold tracking-wider text-[#E7E1D5] gold-text-glow">
            {project.title}
          </h3>
        </div>

        <div className="text-sm text-[#A3A096] space-y-4 leading-relaxed font-sans mb-6">
          {project.description}
        </div>

        {project.codeSnippet && (
          <div className="bg-[#060709] border border-[#C5A15B]/30 rounded p-4 font-mono text-xs text-[#38BDF8] relative mb-6">
            <code>{project.codeSnippet}</code>
            <button
              onClick={() => handleCopy(project.codeSnippet)}
              className="absolute top-2 right-2 px-2.5 py-1 bg-[#C5A15B]/20 border border-[#8F7238] rounded text-[10px] font-serif uppercase tracking-wider text-[#FFE28A] hover:bg-[#C5A15B] hover:text-[#08090C] transition-colors flex items-center gap-1"
            >
              {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
              <span>{copied ? 'COPIED' : 'COPY'}</span>
            </button>
          </div>
        )}

        <div className="text-[11px] text-[#A3A096] italic border-t border-white/5 pt-4">
          ★ Authentic student portfolio note: Replace repository placeholder once project code is finalized.
        </div>
      </div>
    </div>
  );
}
