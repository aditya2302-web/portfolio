import React, { useState } from 'react';
import { Crown, Terminal, Shield, Sparkles } from 'lucide-react';

export default function About() {
  const [isTerminal, setIsTerminal] = useState(false);

  return (
    <section id="about" className="py-24 px-4 relative z-10 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="font-serif text-xs tracking-widest text-[#C5A15B] uppercase block mb-2">
          ❖ A CHRONICLE OF ORIGINS ❖
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest uppercase gold-text-glow mb-4">
          THE WARRIOR BEHIND THE SCREEN
        </h2>
        <div className="flex items-center justify-center gap-3">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#C5A15B]" />
          <span className="text-[#C5A15B] text-xs">❖</span>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#C5A15B]" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Parchment / Terminal Column */}
        <div className="lg:col-span-7 bg-[#0E1015] border border-[#8F7238] rounded p-6 sm:p-10 shadow-2xl relative">
          <div className="flex justify-between items-center pb-4 mb-6 border-b border-[#C5A15B]/20">
            <div className="flex items-center gap-3">
              <Crown className="w-8 h-8 text-[#C5A15B]" />
              <div>
                <h4 className="font-serif text-xs font-bold tracking-widest text-[#FFE28A] uppercase">
                  ROYAL ARCHIVES &bull; CODEX CYBER
                </h4>
                <span className="text-[10px] text-[#A3A096] tracking-wider uppercase">
                  SEALED BY ADITYA &bull; JECRC UNIVERSITY
                </span>
              </div>
            </div>

            {/* Toggle Terminal / Manuscript */}
            <button
              onClick={() => setIsTerminal(!isTerminal)}
              className="flex items-center gap-1.5 px-3 py-1 bg-[#111318] border border-[#C5A15B]/40 rounded text-xs font-mono text-[#C5A15B] hover:bg-[#C5A15B] hover:text-[#08090C] transition-colors"
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>{isTerminal ? 'ROYAL VIEW' : 'CYBER DECRYPTOR'}</span>
            </button>
          </div>

          {!isTerminal ? (
            <div className="space-y-4 text-[#E7E1D5] text-base leading-relaxed font-sans text-justify">
              <p>
                I am Aditya, a first-year B.Tech Cyber Security student currently in my first semester at JECRC University, driven by curiosity about computers, technology, and the world of cybersecurity.
              </p>
              <p>
                I believe that every digital system has a story, every vulnerability has a lesson, and every challenge is an opportunity to learn.
              </p>
              <p>
                I am at the beginning of my journey, exploring the fundamentals of programming, networking, computer systems, and cybersecurity.
              </p>
              <p>
                My ambition is to develop the knowledge and practical skills needed to understand digital threats and contribute to building a safer digital world.
              </p>
              <p>
                I may be at the beginning of my journey, but my determination is already set.
              </p>
            </div>
          ) : (
            <div className="font-mono text-xs text-[#38BDF8] space-y-3 bg-[#060709] p-4 rounded border border-[#C5A15B]/20">
              <div><span className="text-[#FFE28A]">></span> whoami</div>
              <div className="text-[#E7E1D5]">Aditya | B.Tech Cyber Security Student [Semester 1] @ JECRC University</div>
              <div><span className="text-[#FFE28A]">></span> cat /var/log/realm/mission.txt</div>
              <div className="text-[#A3A096] whitespace-pre-line">
[ORIGIN] Aditya @ JECRC University — Driven by curiosity about computing architectures.
[PRINCIPLE] Every system has a story; every vulnerability holds a lesson.
[CURRENT SCOPE] Initializing: C, Python, TCP/IP, Linux Kernel, Defensive Security.
[END STATE] Safeguarding the realm of cyberspace through deep understanding.
              </div>
              <div><span className="text-[#FFE28A]">></span> status --determination</div>
              <div className="text-[#38BDF8]">[OK] Determination: SET. Ready for battle.</div>
            </div>
          )}

          {/* Medieval Quote */}
          <div className="mt-8 p-4 bg-[#C5A15B]/5 border-l-2 border-[#C5A15B] rounded-r">
            <p className="font-serif italic text-sm text-[#FFE28A] leading-relaxed mb-1">
              "Power resides where men believe it resides."
            </p>
            <span className="font-serif text-[10px] tracking-widest text-[#A3A096] uppercase">
              — Lord Varys &bull; A Song of Ice and Fire
            </span>
          </div>
        </div>

        {/* 3 Info Cards Column */}
        <div className="lg:col-span-5 flex flex-col gap-4">
          <div className="bg-[#111318]/85 border border-[#C5A15B]/20 p-6 rounded shadow-xl relative overflow-hidden group hover:border-[#C5A15B] transition-all">
            <div className="font-serif text-xs font-bold tracking-widest text-[#C5A15B] mb-1">
              01 — THE IDENTITY
            </div>
            <h3 className="font-serif text-lg font-bold tracking-wider text-[#E7E1D5] mb-2">
              B.Tech Cyber Security Student
            </h3>
            <p className="text-xs text-[#A3A096] leading-relaxed">
              Enrolled in foundational computer science and cybersecurity disciplines, fortifying my mind with the principles of defensive technologies.
            </p>
          </div>

          <div className="bg-[#111318]/85 border border-[#C5A15B]/20 p-6 rounded shadow-xl relative overflow-hidden group hover:border-[#C5A15B] transition-all">
            <div className="font-serif text-xs font-bold tracking-widest text-[#C5A15B] mb-1">
              02 — THE CURRENT CHAPTER
            </div>
            <h3 className="font-serif text-lg font-bold tracking-wider text-[#E7E1D5] mb-2">
              First Year | First Semester
            </h3>
            <p className="text-xs text-[#A3A096] leading-relaxed">
              Establishing the cornerstone of technical competence: computational logic, structured algorithms, digital systems, and network communication standards.
            </p>
          </div>

          <div className="bg-[#111318]/85 border border-[#C5A15B]/20 p-6 rounded shadow-xl relative overflow-hidden group hover:border-[#C5A15B] transition-all">
            <div className="font-serif text-xs font-bold tracking-widest text-[#C5A15B] mb-1">
              03 — THE MISSION
            </div>
            <h3 className="font-serif text-lg font-bold tracking-wider text-[#E7E1D5] mb-2">
              Learn. Explore. Secure.
            </h3>
            <p className="text-xs text-[#A3A096] leading-relaxed">
              To transform theoretical knowledge into resilient security defenses, contributing to an unbreachable future for the digital kingdoms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
