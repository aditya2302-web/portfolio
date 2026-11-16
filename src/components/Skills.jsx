import React from 'react';
import { Code, Shield, Terminal, BookOpen, Lock, Server } from 'lucide-react';

export default function Skills() {
  const categories = [
    {
      title: "PROGRAMMING",
      house: "HOUSE OF THE FORGE",
      icon: Code,
      skills: [
        { name: "C Programming", tier: "Learning", progress: "45%" },
        { name: "Python", tier: "Learning", progress: "50%" },
        { name: "HTML", tier: "Learning", progress: "55%" },
        { name: "CSS", tier: "Learning", progress: "48%" }
      ]
    },
    {
      title: "CYBERSECURITY",
      house: "HOUSE OF THE SHIELD",
      icon: Shield,
      skills: [
        { name: "Cybersecurity Fundamentals", tier: "Exploring", progress: "40%" },
        { name: "Networking Fundamentals", tier: "Exploring", progress: "42%" },
        { name: "Linux Fundamentals", tier: "Exploring", progress: "38%" },
        { name: "Ethical Hacking Concepts", tier: "Exploring", progress: "35%" },
        { name: "Information Security Basics", tier: "Exploring", progress: "38%" }
      ]
    },
    {
      title: "TOOLS & TECHNOLOGY",
      house: "HOUSE OF THE APPARATUS",
      icon: Terminal,
      skills: [
        { name: "Git and GitHub", tier: "Exploring", progress: "42%" },
        { name: "VS Code", tier: "Familiar", progress: "60%" },
        { name: "Linux Terminal", tier: "Learning", progress: "45%" }
      ]
    }
  ];

  return (
    <section id="skills" className="py-24 px-4 relative z-10 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="font-serif text-xs tracking-widest text-[#C5A15B] uppercase block mb-2">
          ❖ THE WEAPONS OF MY TRADE ❖
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest uppercase gold-text-glow mb-2">
          MY ARSENAL
        </h2>
        <p className="font-sans italic text-sm text-[#A3A096]">
          "Every warrior must master their weapons."
        </p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#C5A15B]" />
          <span className="text-[#C5A15B] text-xs">⚔️</span>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#C5A15B]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {categories.map((cat, idx) => {
          const Icon = cat.icon;
          return (
            <div
              key={idx}
              className="bg-[#111318]/85 border border-[#C5A15B]/20 rounded p-6 shadow-xl flex flex-col hover:border-[#C5A15B] transition-all hover:-translate-y-1"
            >
              <div className="flex items-center gap-3 pb-4 mb-6 border-b border-[#C5A15B]/20">
                <div className="p-2.5 bg-[#C5A15B]/10 border border-[#8F7238] rounded text-[#C5A15B]">
                  <Icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-serif text-sm font-bold tracking-wider text-[#E7E1D5]">
                    {cat.title}
                  </h3>
                  <span className="font-serif text-[10px] tracking-widest text-[#FFE28A] uppercase">
                    {cat.house}
                  </span>
                </div>
              </div>

              <div className="space-y-4 flex-grow">
                {cat.skills.map((s, sIdx) => (
                  <div key={sIdx} className="space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-[#E7E1D5] font-medium">{s.name}</span>
                      <span
                        className={`text-[10px] px-2 py-0.5 rounded font-mono uppercase ${
                          s.tier === 'Familiar'
                            ? 'bg-[#38BDF8]/15 text-[#38BDF8] border border-[#38BDF8]/40'
                            : s.tier === 'Exploring'
                            ? 'bg-[#9BC7DF]/15 text-[#9BC7DF] border border-[#9BC7DF]/40'
                            : 'bg-[#C5A15B]/15 text-[#FFE28A] border border-[#C5A15B]/40'
                        }`}
                      >
                        {s.tier}
                      </span>
                    </div>
                    {/* Glowing Learning Progress Bar */}
                    <div className="w-full h-1 bg-white/5 rounded overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-[#8F7238] to-[#C5A15B] shadow-[0_0_8px_rgba(197,161,91,0.5)]"
                        style={{ width: s.progress }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-dashed border-[#C5A15B]/20 text-[10px] text-[#A3A096] leading-relaxed">
                <span className="text-[#C5A15B]">★ PLEDGE:</span> Authentically reflecting early first-semester learning rather than inflated professional proficiency.
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
