import React from 'react';
import { Crown, Scroll, Swords, Castle, Shield } from 'lucide-react';

export default function Journey() {
  const chapters = [
    {
      num: "CHAPTER I",
      title: "THE AWAKENING",
      desc: "Started my B.Tech journey in Cyber Security at JECRC University.",
      icon: Crown
    },
    {
      num: "CHAPTER II",
      title: "THE FIRST STEP",
      desc: "Entered the first semester and began understanding the fundamentals of computer science and cybersecurity.",
      icon: Scroll
    },
    {
      num: "CHAPTER III",
      title: "FORGING THE WEAPONS",
      desc: "Beginning to explore programming, Python, C, networking, Linux and essential technical tools.",
      icon: Swords
    },
    {
      num: "CHAPTER IV",
      title: "THE FIRST BATTLES",
      desc: "Building beginner-level projects, experimenting with code and applying the concepts I learn.",
      icon: Castle
    },
    {
      num: "CHAPTER V",
      title: "THE ROAD AHEAD",
      desc: "My future goal is to strengthen my technical knowledge, explore ethical hacking, understand digital security and become a skilled cybersecurity professional.",
      icon: Shield
    }
  ];

  return (
    <section id="journey" className="py-24 px-4 relative z-10 max-w-5xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="font-serif text-xs tracking-widest text-[#C5A15B] uppercase block mb-2">
          ❖ THE ROYAL CHRONICLES ❖
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest uppercase gold-text-glow mb-2">
          THE CHRONICLES OF MY JOURNEY
        </h2>
        <p className="font-sans italic text-sm text-[#A3A096]">
          "The path to the Iron Throne is forged in discipline, one step at a time."
        </p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#C5A15B]" />
          <span className="text-[#C5A15B] text-xs">🏰</span>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#C5A15B]" />
        </div>
      </div>

      <div className="relative pl-8 md:pl-0">
        {/* Golden Spine */}
        <div className="absolute top-0 left-8 md:left-1/2 -translate-x-1/2 w-[2px] h-full bg-gradient-to-b from-transparent via-[#C5A15B] to-transparent shadow-[0_0_12px_rgba(197,161,91,0.4)]" />

        <div className="space-y-12">
          {chapters.map((ch, idx) => {
            const Icon = ch.icon;
            const isEven = idx % 2 === 1;

            return (
              <div
                key={idx}
                className={`relative flex flex-col md:flex-row items-center ${
                  isEven ? 'md:flex-row-reverse' : ''
                }`}
              >
                {/* Content Box */}
                <div className="w-full md:w-1/2 md:px-8">
                  <div className="bg-[#111318]/90 border border-[#C5A15B]/25 p-6 rounded shadow-xl hover:border-[#C5A15B] transition-all hover:-translate-y-1">
                    <div className="font-serif text-xs font-bold tracking-widest text-[#C5A15B] mb-1">
                      {ch.num}
                    </div>
                    <h3 className="font-serif text-base sm:text-lg font-bold tracking-wider text-[#E7E1D5] mb-2">
                      {ch.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#A3A096] leading-relaxed font-sans">
                      {ch.desc}
                    </p>
                  </div>
                </div>

                {/* Milestone Node */}
                <div className="absolute left-0 md:left-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#08090C] border-2 border-[#C5A15B] flex items-center justify-center text-[#FFE28A] shadow-[0_0_15px_rgba(197,161,91,0.5)] z-10 my-4 md:my-0">
                  <Icon className="w-4 h-4" />
                </div>

                {/* Empty opposite half for balance */}
                <div className="hidden md:block w-1/2" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
