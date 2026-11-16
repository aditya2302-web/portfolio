import React from 'react';
import { Crown, Github, Linkedin, Mail, ArrowUp } from 'lucide-react';

export default function Footer({ onOpenContact }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#050608] border-t border-[#C5A15B]/20 py-20 px-4 text-center relative z-10 overflow-hidden">
      <div className="max-w-4xl mx-auto flex flex-col items-center">
        {/* Golden Sigil */}
        <div className="w-16 h-16 text-[#C5A15B] mb-6 drop-shadow-[0_0_20px_rgba(197,161,91,0.5)]">
          <Crown className="w-full h-full" />
        </div>

        {/* Main Quote */}
        <blockquote className="font-serif text-lg sm:text-2xl md:text-3xl font-bold tracking-widest text-[#FFE28A] max-w-3xl leading-relaxed mb-3 gold-text-glow">
          "THE NIGHT IS DARK AND FULL OF TERRORS, BUT KNOWLEDGE IS MY LIGHT."
        </blockquote>

        {/* Subquote */}
        <div className="font-serif text-xs sm:text-sm tracking-widest text-[#A3A096] uppercase mb-10">
          Still learning. Still exploring. Still becoming.
        </div>

        {/* Social Links */}
        <div className="flex gap-4 mb-12">
          <a
            href="https://github.com/aditya2302-web"
            target="_blank"
            rel="noopener noreferrer"
            className="w-12 h-12 rounded-full bg-[#111318] border border-[#8F7238] text-[#C5A15B] flex items-center justify-center hover:bg-[#C5A15B] hover:text-[#08090C] hover:scale-110 transition-all shadow-lg"
            aria-label="Aditya's GitHub"
          >
            <Github className="w-5 h-5" />
          </a>
          <a
            href="mailto:aditya26bcon2441@jecrcu.edu.in"
            className="w-12 h-12 rounded-full bg-[#111318] border border-[#8F7238] text-[#C5A15B] flex items-center justify-center hover:bg-[#C5A15B] hover:text-[#08090C] hover:scale-110 transition-all shadow-lg"
            aria-label="Send Email to Aditya"
          >
            <Mail className="w-5 h-5" />
          </a>
          <button
            onClick={onOpenContact}
            className="w-12 h-12 rounded-full bg-[#111318] border border-[#8F7238] text-[#C5A15B] flex items-center justify-center hover:bg-[#C5A15B] hover:text-[#08090C] hover:scale-110 transition-all shadow-lg"
            aria-label="Open Encrypted Terminal Dispatch"
          >
            <Linkedin className="w-5 h-5" />
          </button>
        </div>

        {/* Footer Meta */}
        <div className="w-full pt-8 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center text-xs text-[#A3A096] gap-4">
          <div>&copy; 2026 Aditya &bull; B.Tech Cyber Security, JECRC University</div>
          <button
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 text-[#C5A15B] hover:text-[#FFE28A] font-serif uppercase tracking-wider text-xs transition-colors"
          >
            <span>RETURN TO THE THRONE</span>
            <ArrowUp className="w-4 h-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
