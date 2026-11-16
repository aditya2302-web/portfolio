import React, { useState, useEffect } from 'react';
import { Shield, Volume2, VolumeX, Menu, X, Sparkles } from 'lucide-react';

export default function Navbar({ activeHouse, toggleMusic, isPlaying }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 60);

      const sections = ['about', 'skills', 'projects', 'journey'];
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop - 200;
          const height = el.offsetHeight;
          if (window.scrollY >= top && window.scrollY < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'ABOUT', href: '#about', id: 'about' },
    { label: 'SKILLS', href: '#skills', id: 'skills' },
    { label: 'PROJECTS', href: '#projects', id: 'projects' },
    { label: 'JOURNEY', href: '#journey', id: 'journey' },
  ];

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-400 px-6 py-4 flex items-center justify-between ${scrolled ? 'bg-[#08090C]/95 backdrop-blur-md border-b border-[#C5A15B]/20 shadow-2xl py-3' : 'bg-transparent'}`}>
      <a href="#" className="flex items-center gap-3 no-underline group">
        <div className="w-8 h-8 text-[#C5A15B] group-hover:scale-110 transition-transform">
          <Shield className="w-full h-full" />
        </div>
        <span className="font-serif text-lg font-bold tracking-widest text-[#E7E1D5] uppercase">
          THE REALM OF CYBER
        </span>
      </a>

      {/* Desktop Navigation Links */}
      <nav className="hidden md:flex items-center gap-8">
        {navItems.map((item) => (
          <a
            key={item.id}
            href={item.href}
            className={`font-serif text-xs font-semibold tracking-widest uppercase transition-colors relative py-1 no-underline ${activeSection === item.id ? 'text-[#FFE28A]' : 'text-[#A3A096] hover:text-[#FFE28A]'}`}
          >
            {item.label}
            {activeSection === item.id && (
              <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#C5A15B] shadow-[0_0_8px_#C5A15B]" />
            )}
          </a>
        ))}
      </nav>

      {/* Sound Pill & Mobile Hamburger */}
      <div className="flex items-center gap-4">
        <button
          onClick={toggleMusic}
          className={`flex items-center gap-2 px-3 py-1.5 rounded-full border text-xs font-serif uppercase tracking-wider transition-all ${isPlaying ? 'border-[#C5A15B] text-[#FFE28A] bg-[#C5A15B]/20 shadow-[0_0_15px_rgba(197,161,91,0.3)]' : 'border-[#C5A15B]/40 text-[#A3A096] bg-[#111318]/60 hover:border-[#C5A15B]'}`}
        >
          <Sparkles className="w-3.5 h-3.5 text-[#C5A15B]" />
          <span>{isPlaying ? 'PLAYING' : 'SOUNDTRACK'}</span>
        </button>

        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden text-[#C5A15B] p-1"
          aria-label="Toggle Menu"
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 bg-[#08090C]/95 backdrop-blur-xl z-50 flex flex-col p-8 md:hidden">
          <div className="flex justify-between items-center mb-10">
            <span className="font-serif text-lg font-bold text-[#FFE28A]">THE REALM OF CYBER</span>
            <button onClick={() => setMobileOpen(false)} className="text-[#C5A15B]">
              <X className="w-7 h-7" />
            </button>
          </div>
          <div className="flex flex-col gap-6 text-center">
            {navItems.map((item) => (
              <a
                key={item.id}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="font-serif text-xl tracking-widest text-[#E7E1D5] hover:text-[#FFE28A] no-underline py-2"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>
      )}
    </header>
  );
}
