import React from 'react';
import { Shield, ChevronDown, Castle, Scroll } from 'lucide-react';
import HouseSelector from './HouseSelector.jsx';

export default function Hero({ activeHouse, onSelectHouse }) {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-28 pb-16 px-4 text-center overflow-hidden">
      {/* Background Throne Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-gradient-to-r from-[#C5A15B]/15 via-[#8B1E24]/10 to-[#9BC7DF]/15 blur-3xl pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
        {/* House Motto Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#111318]/80 border border-[#C5A15B]/30 backdrop-blur-md mb-6">
          <Shield className="w-4 h-4 text-[#C5A15B]" />
          <span className="font-serif text-xs tracking-widest uppercase text-[#FFE28A]">
            Winter Is Coming. Threats Are Evolving. I Am Preparing.
          </span>
        </div>

        {/* Main Heading */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-black tracking-widest uppercase mb-4 gold-text-glow leading-tight">
          THE REALM OF CYBER
        </h1>

        {/* Subtitle */}
        <h2 className="font-serif text-lg sm:text-2xl tracking-widest text-[#FFE28A] font-semibold mb-6">
          From the First Semester to the Frontlines of Cybersecurity.
        </h2>

        {/* Introduction */}
        <p className="max-w-2xl text-[#A3A096] text-sm sm:text-base leading-relaxed mb-8 font-sans">
          Every legend begins somewhere. Mine begins with curiosity, code, and the determination to understand the digital world. I am <strong className="text-[#FFE28A]">Aditya</strong>, a first-year B.Tech Cyber Security student at <strong className="text-[#FFE28A]">JECRC University</strong>, beginning my journey to explore, defend, and conquer the ever-evolving realm of technology.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <a
            href="#about"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gradient-to-r from-[#C5A15B]/20 to-[#8F7238]/40 border border-[#C5A15B] text-[#FFF0C2] font-serif text-xs font-bold tracking-widest uppercase rounded hover:bg-[#C5A15B]/40 hover:shadow-[0_0_20px_rgba(197,161,91,0.4)] transition-all no-underline"
          >
            <Castle className="w-4 h-4" />
            <span>EXPLORE MY REALM</span>
          </a>
          <a
            href="#journey"
            className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-[#111318]/60 border border-[#E7E1D5]/20 text-[#E7E1D5] font-serif text-xs font-bold tracking-widest uppercase rounded hover:border-[#9BC7DF] hover:text-[#9BC7DF] transition-all no-underline"
          >
            <Scroll className="w-4 h-4" />
            <span>VIEW MY JOURNEY</span>
          </a>
        </div>

        {/* Interactive Choose Your House */}
        <HouseSelector activeHouse={activeHouse} onSelectHouse={onSelectHouse} />

        {/* Animated Scroll Indicator */}
        <a href="#about" className="flex flex-col items-center gap-2 mt-12 text-[#C5A15B] hover:text-[#FFE28A] transition-colors no-underline">
          <span className="font-serif text-[10px] tracking-widest uppercase">THE JOURNEY BEGINS BELOW</span>
          <ChevronDown className="w-5 h-5 animate-bounce" />
        </a>
      </div>
    </section>
  );
}
