import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar.jsx';
import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Skills from './components/Skills.jsx';
import Projects from './components/Projects.jsx';
import Journey from './components/Journey.jsx';
import Footer from './components/Footer.jsx';
import ParticleCanvas from './components/ParticleCanvas.jsx';
import MusicPlayer from './components/MusicPlayer.jsx';
import ProjectModal from './components/ProjectModal.jsx';

export default function App() {
  const [activeHouse, setActiveHouse] = useState('stark');
  const [isPlaying, setIsPlaying] = useState(false);
  const [modalData, setModalData] = useState({ isOpen: false, project: null });

  const houseParticleModes = {
    stark: 'snow',
    targaryen: 'embers',
    lannister: 'gold',
    nightswatch: 'cyber'
  };

  const handleSelectHouse = (houseId) => {
    setActiveHouse(houseId);
    document.body.setAttribute('data-house', houseId);
  };

  const toggleMusic = () => {
    if (window.realmAudio) {
      window.realmAudio.toggle();
      setIsPlaying(window.realmAudio.isPlaying);
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const openProjectModal = (projId) => {
    const details = {
      'password-generator': {
        title: "PROJECT 01: PYTHON PASSWORD GENERATOR",
        status: "STATUS: LEARNING / PLANNED",
        description: (
          <>
            <p>A beginner Python project that generates random passwords using combinations of letters, numbers and special characters to fortify authentication against brute-force incursions.</p>
            <p className="mt-2"><strong>Core Learning:</strong> Python standard library (`secrets`, `string`), entropy calculations, and command-line arguments.</p>
          </>
        ),
        codeSnippet: "git clone https://github.com/aditya2302-web/python-password-generator.git"
      },
      'portfolio-website': {
        title: "PROJECT 02: PERSONAL PORTFOLIO WEBSITE",
        status: "STATUS: IN PROGRESS",
        description: (
          <>
            <p>A personal portfolio website showcasing my academic journey, skills, interests and projects through a medieval fantasy-inspired design infused with cybersecurity command aesthetics.</p>
            <p className="mt-2"><strong>Tech Stack:</strong> React, Vite, Tailwind CSS, Web Audio API, Canvas particle physics.</p>
          </>
        ),
        codeSnippet: "git clone https://github.com/aditya2302-web/realm-of-cyber-portfolio.git"
      },
      'networking-lab': {
        title: "PROJECT 03: NETWORKING FUNDAMENTALS LAB",
        status: "STATUS: PLANNED",
        description: (
          <>
            <p>An educational project documenting my understanding of IP addresses, networking concepts, protocols and basic network analysis.</p>
            <p className="mt-2"><strong>Focus:</strong> Wireshark packet capture, TCP handshake inspection, Linux routing tables.</p>
          </>
        ),
        codeSnippet: "# Planned Repository: https://github.com/aditya2302-web/networking-fundamentals-lab"
      },
      'learning-notes': {
        title: "PROJECT 04: CYBERSECURITY LEARNING NOTES",
        status: "STATUS: IN PROGRESS",
        description: (
          <>
            <p>A structured collection of notes covering cybersecurity fundamentals, common digital threats, security practices and defensive concepts.</p>
            <p className="mt-2"><strong>Topics:</strong> CIA Triad, OWASP Top 10 introduction, Linux privilege models.</p>
          </>
        ),
        codeSnippet: "git clone https://github.com/aditya2302-web/cybersecurity-learning-notes.git"
      }
    };

    if (details[projId]) {
      setModalData({ isOpen: true, project: details[projId] });
    }
  };

  const openContactModal = () => {
    setModalData({
      isOpen: true,
      project: {
        title: "ENCRYPTED DISPATCH — ADITYA",
        status: "JECRC UNIVERSITY CITADEL",
        description: (
          <div>
            <p>Direct communication channel with Aditya, B.Tech Cyber Security student at JECRC University. Welcoming discussions on security research, CTF teams, and code collaboration.</p>
          </div>
        ),
        codeSnippet: "email: aditya26bcon2441@jecrcu.edu.in\ngithub: https://github.com/aditya2302-web\nuniversity: JECRC University, Jaipur"
      }
    });
  };

  return (
    <div className="min-h-screen bg-[#08090C] text-[#E7E1D5] relative selection:bg-[#8F7238] selection:text-white">
      {/* Dynamic Canvas Particles */}
      <ParticleCanvas mode={houseParticleModes[activeHouse] || 'snow'} />

      {/* Navigation */}
      <Navbar
        activeHouse={activeHouse}
        toggleMusic={toggleMusic}
        isPlaying={isPlaying}
      />

      {/* Main Content */}
      <main>
        <Hero activeHouse={activeHouse} onSelectHouse={handleSelectHouse} />
        <About />
        <Skills />
        <Projects onOpenProject={openProjectModal} />
        <Journey />
      </main>

      {/* Footer */}
      <Footer onOpenContact={openContactModal} />

      {/* Floating Music Player */}
      <MusicPlayer isPlaying={isPlaying} toggleMusic={toggleMusic} />

      {/* Modal Dialog */}
      <ProjectModal
        isOpen={modalData.isOpen}
        project={modalData.project}
        onClose={() => setModalData({ isOpen: false, project: null })}
      />
    </div>
  );
}
