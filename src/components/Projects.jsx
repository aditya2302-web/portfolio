import React from 'react';
import { Lock, Castle, Network, BookOpen, Github, ExternalLink } from 'lucide-react';

export default function Projects({ onOpenProject }) {
  const projects = [
    {
      id: 'password-generator',
      title: "PROJECT 01: PYTHON PASSWORD GENERATOR",
      desc: "A beginner Python project that generates random passwords using combinations of letters, numbers and special characters.",
      tags: ["Python", "Security Basics", "Random Logic"],
      status: "Learning / Planned",
      statusClass: "border-[#9BC7DF] text-[#9BC7DF] bg-[#9BC7DF]/10",
      icon: Lock
    },
    {
      id: 'portfolio-website',
      title: "PROJECT 02: PERSONAL PORTFOLIO WEBSITE",
      desc: "A personal portfolio website showcasing my academic journey, skills, interests and projects through a medieval fantasy-inspired design.",
      tags: ["HTML", "CSS", "JavaScript", "React"],
      status: "In Progress",
      statusClass: "border-[#C5A15B] text-[#FFE28A] bg-[#C5A15B]/15",
      icon: Castle
    },
    {
      id: 'networking-lab',
      title: "PROJECT 03: NETWORKING FUNDAMENTALS LAB",
      desc: "An educational project documenting my understanding of IP addresses, networking concepts, protocols and basic network analysis.",
      tags: ["Networking Fundamentals", "Linux", "TCP/IP"],
      status: "Planned",
      statusClass: "border-[#9BC7DF] text-[#9BC7DF] bg-[#9BC7DF]/10",
      icon: Network
    },
    {
      id: 'learning-notes',
      title: "PROJECT 04: CYBERSECURITY LEARNING NOTES",
      desc: "A structured collection of notes covering cybersecurity fundamentals, common digital threats, security practices and defensive concepts.",
      tags: ["Cybersecurity Fundamentals", "Markdown"],
      status: "In Progress",
      statusClass: "border-[#C5A15B] text-[#FFE28A] bg-[#C5A15B]/15",
      icon: BookOpen
    }
  ];

  return (
    <section id="projects" className="py-24 px-4 relative z-10 max-w-6xl mx-auto">
      {/* Section Header */}
      <div className="text-center mb-16">
        <span className="font-serif text-xs tracking-widest text-[#C5A15B] uppercase block mb-2">
          ❖ EXPEDITIONS &amp; CONQUESTS ❖
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-widest uppercase gold-text-glow mb-2">
          MY BATTLES
        </h2>
        <p className="font-sans italic text-sm text-[#A3A096]">
          "Every great journey begins with the first victory."
        </p>
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-[#C5A15B]" />
          <span className="text-[#C5A15B] text-xs">🛡️</span>
          <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-[#C5A15B]" />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {projects.map((proj) => {
          const Icon = proj.icon;
          return (
            <div
              key={proj.id}
              className="bg-[#111318]/85 border border-[#C5A15B]/25 rounded overflow-hidden shadow-2xl flex flex-col group hover:border-[#C5A15B] transition-all hover:-translate-y-1"
            >
              {/* Card Banner */}
              <div className="h-44 bg-gradient-to-b from-[#181B22] to-[#0F1116] border-b border-[#C5A15B]/20 relative flex items-center justify-center">
                <Icon className="w-16 h-16 text-[#C5A15B] opacity-80 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(197,161,91,0.5)] transition-all" />
                <span
                  className={`absolute top-4 right-4 text-[10px] font-mono px-2.5 py-1 rounded border uppercase tracking-wider backdrop-blur-md ${proj.statusClass}`}
                >
                  {proj.status}
                </span>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex flex-col flex-grow">
                <h3 className="font-serif text-base sm:text-lg font-bold tracking-wider text-[#E7E1D5] mb-3">
                  {proj.title}
                </h3>
                <p className="text-xs sm:text-sm text-[#A3A096] leading-relaxed mb-6 flex-grow font-sans">
                  {proj.desc}
                </p>

                {/* Tech Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {proj.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="font-mono text-[11px] px-2.5 py-1 bg-white/5 border border-white/10 rounded text-[#FFE28A]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Footer Action */}
                <div className="pt-4 border-t border-[#C5A15B]/20 flex justify-between items-center">
                  <button
                    onClick={() => onOpenProject(proj.id)}
                    className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#C5A15B]/10 border border-[#8F7238] rounded text-xs font-serif tracking-widest text-[#FFE28A] hover:bg-[#C5A15B] hover:text-[#08090C] transition-all"
                  >
                    <Github className="w-3.5 h-3.5" />
                    <span>INSPECT REPO</span>
                  </button>
                  <span className="font-mono text-xs text-[#A3A096]">SEMESTER 1</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
