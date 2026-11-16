/**
 * THE REALM OF CYBER — Master Interaction Engine
 * Handles Cinematic Preloader, House Switching, 3D Card Tilt,
 * Scroll Spy, Interactive Terminal/Parchment Decryptor, and Modals.
 */

// Safe Storage Helper to prevent SecurityError on file:// or private windows
const safeStorage = {
  get: (key, fallback = null) => {
    try {
      return localStorage.getItem(key) || fallback;
    } catch(e) {
      return fallback;
    }
  },
  set: (key, val) => {
    try {
      localStorage.setItem(key, val);
    } catch(e) {}
  }
};

function initApp() {
  // 1. CINEMATIC PRELOADER
  initPreloader();

  // 2. CHOOSE YOUR HOUSE ENGINE
  initHouseSelector();

  // 3. NAVIGATION, SCROLL SPY & PROGRESS BAR
  initNavigation();

  // 4. PARCHMENT <-> CYBER TERMINAL DECRYPTOR TOGGLE
  initTerminalToggle();

  // 5. 3D TILT EFFECT ON CARDS
  init3DCardTilt();

  // 6. TORCHLIGHT SPOTLIGHT CURSOR FOLLOWER
  initTorchlightFollower();

  // 7. MODALS & INTERACTIVE DIALOGS
  initModals();

  // 8. AUDIO CONTROLLER BINDINGS
  initAudioControls();

  // 9. AUTOMATIC SOUNDTRACK ON NAVIGATION & FIRST GESTURE
  initAutoplayOnNavigation();
}

/* ==========================================================================
   0. AUTOMATIC SOUNDTRACK ON NAVIGATION
   ========================================================================== */
function initAutoplayOnNavigation() {
  const startMusic = () => {
    if (window.realmAudio && !window.realmAudio.isPlaying) {
      window.realmAudio.start();
    }
  };

  // Trigger on click, scroll, touch, or key navigation
  ['click', 'touchstart', 'scroll', 'keydown', 'wheel'].forEach(evt => {
    window.addEventListener(evt, startMusic, { once: true, passive: true });
    document.addEventListener(evt, startMusic, { once: true, passive: true });
  });
}

// Run immediately if DOM is already ready, or on DOMContentLoaded
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initApp);
} else {
  initApp();
}

// Backup window load trigger to guarantee preloader is dismissed
window.addEventListener('load', () => {
  const preloader = document.getElementById('realm-preloader');
  if (preloader) {
    preloader.classList.add('loaded');
  }
});

/* ==========================================================================
   1. PRELOADER
   ========================================================================== */
function initPreloader() {
  const preloader = document.getElementById('realm-preloader');
  if (!preloader) return;

  // Click anywhere to dismiss immediately
  preloader.addEventListener('click', () => {
    preloader.classList.add('loaded');
  });

  const titleEl = document.getElementById('preloader-title');
  if (titleEl) {
    const rawText = "THE REALM OF CYBER";
    titleEl.innerHTML = '';
    rawText.split('').forEach((char, index) => {
      const span = document.createElement('span');
      span.textContent = char === ' ' ? '\u00A0' : char;
      span.style.animationDelay = `${index * 0.04 + 0.1}s`;
      titleEl.appendChild(span);
    });
  }

  // Guarantee fade out after 1.5 seconds
  setTimeout(() => {
    preloader.classList.add('loaded');
  }, 1500);
}

/* ==========================================================================
   2. CHOOSE YOUR HOUSE ENGINE
   ========================================================================== */
const HOUSES = {
  stark: {
    id: 'stark',
    name: 'House Stark',
    motto: 'Winter Is Coming',
    tagline: 'Discipline & Resilience',
    particleMode: 'snow',
    icon: 'stark'
  },
  targaryen: {
    id: 'targaryen',
    name: 'House Targaryen',
    motto: 'Fire and Blood',
    tagline: 'Ambition & Power',
    particleMode: 'embers',
    icon: 'targaryen'
  },
  lannister: {
    id: 'lannister',
    name: 'House Lannister',
    motto: 'Hear Me Roar',
    tagline: 'Strategy & Intelligence',
    particleMode: 'gold',
    icon: 'lannister'
  },
  nightswatch: {
    id: 'nightswatch',
    name: 'The Night\'s Watch',
    motto: 'Sword in the Darkness',
    tagline: 'Defenders of the Realm',
    particleMode: 'cyber',
    icon: 'shieldCyber'
  }
};

function initHouseSelector() {
  const savedHouse = safeStorage.get('realm_house', 'stark');
  applyHouse(savedHouse, false);

  const houseButtons = document.querySelectorAll('.house-card-btn');
  houseButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const houseId = btn.getAttribute('data-house-id');
      if (houseId && HOUSES[houseId]) {
        applyHouse(houseId, true);
      }
    });
  });
}

function applyHouse(houseId, animateToast = true) {
  const house = HOUSES[houseId] || HOUSES.stark;
  document.body.setAttribute('data-house', house.id);
  safeStorage.set('realm_house', house.id);

  // Update active state in buttons
  document.querySelectorAll('.house-card-btn').forEach(btn => {
    btn.classList.toggle('active', btn.getAttribute('data-house-id') === house.id);
  });

  // Update particle engine if initialized
  if (window.realmParticles) {
    window.realmParticles.setMode(house.particleMode);
  }

  // Update nav sigil icon
  const navSigil = document.getElementById('nav-house-sigil');
  if (navSigil && window.REALM_ICONS && window.REALM_ICONS[house.icon]) {
    navSigil.innerHTML = window.REALM_ICONS[house.icon];
  }

  // Update Hero Tagline
  const heroTagline = document.getElementById('hero-house-motto');
  if (heroTagline) {
    heroTagline.textContent = `House Banner: ${house.motto} — ${house.tagline}`;
  }

  // Optional toast feedback
  if (animateToast) {
    showToast(`Allegiance pledged to ${house.name}: "${house.motto}"`);
  }
}

/* ==========================================================================
   3. NAVIGATION, SCROLL SPY & SCROLL PROGRESS
   ========================================================================== */
function initNavigation() {
  const nav = document.getElementById('realm-nav');
  const scrollBar = document.getElementById('scroll-progress');
  const backToTopBtn = document.getElementById('back-to-top-btn');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileDrawerClose = document.getElementById('mobile-drawer-close');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  // Window scroll handler
  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = docHeight > 0 ? (scrollY / docHeight) * 100 : 0;

    // Progress bar width
    if (scrollBar) {
      scrollBar.style.width = `${progress}%`;
    }

    // Nav elevation class
    if (nav) {
      nav.classList.toggle('scrolled', scrollY > 60);
    }

    // Back to top button visibility
    if (backToTopBtn) {
      backToTopBtn.classList.toggle('visible', scrollY > 450);
    }

    // Scroll Spy for active section highlighting
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 180;
      const sectionHeight = section.offsetHeight;
      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  });

  // Back to top click
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // Mobile drawer controls
  if (mobileMenuBtn && mobileDrawer) {
    mobileMenuBtn.addEventListener('click', () => mobileDrawer.classList.add('open'));
  }
  if (mobileDrawerClose && mobileDrawer) {
    mobileDrawerClose.addEventListener('click', () => mobileDrawer.classList.remove('open'));
  }
  mobileLinks.forEach(link => {
    link.addEventListener('click', () => {
      if (mobileDrawer) mobileDrawer.classList.remove('open');
    });
  });
}

/* ==========================================================================
   4. PARCHMENT <-> CYBER TERMINAL DECRYPTOR TOGGLE
   ========================================================================== */
function initTerminalToggle() {
  const toggleBtn = document.getElementById('toggle-terminal-mode');
  const parchmentBody = document.getElementById('parchment-content-body');
  const terminalView = document.getElementById('cyber-terminal-view');
  if (!toggleBtn || !parchmentBody || !terminalView) return;

  let isTerminalMode = false;

  toggleBtn.addEventListener('click', () => {
    isTerminalMode = !isTerminalMode;
    parchmentBody.classList.toggle('hidden', isTerminalMode);
    terminalView.classList.toggle('active', isTerminalMode);

    toggleBtn.innerHTML = isTerminalMode
      ? `<span>📜</span> [ROYAL MANUSCRIPT VIEW]`
      : `<span>💻</span> [CYBER DECRYPTOR VIEW]`;
  });
}

/* ==========================================================================
   5. 3D TILT EFFECT ON CARDS
   ========================================================================== */
function init3DCardTilt() {
  // Only apply tilt on larger screens and when user does not prefer reduced motion
  if (window.innerWidth < 992 || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

  const cards = document.querySelectorAll('.battle-card, .arsenal-card, .parchment-card');

  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -5;
      const rotateY = ((x - centerX) / centerX) * 5;

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;

      // Update glare coordinates
      card.style.setProperty('--mouse-card-x', `${(x / rect.width) * 100}%`);
      card.style.setProperty('--mouse-card-y', `${(y / rect.height) * 100}%`);
    });

    card.addEventListener('mouseleave', () => {
      card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0)';
    });
  });
}

/* ==========================================================================
   6. TORCHLIGHT SPOTLIGHT FOLLOWER
   ========================================================================== */
function initTorchlightFollower() {
  window.addEventListener('mousemove', (e) => {
    document.documentElement.style.setProperty('--mouse-x', `${e.clientX}px`);
    document.documentElement.style.setProperty('--mouse-y', `${e.clientY}px`);
  });
}

/* ==========================================================================
   7. MODALS & INTERACTIVE DIALOGS
   ========================================================================== */
function initModals() {
  const modalBackdrop = document.getElementById('realm-modal-backdrop');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalBody = document.getElementById('modal-body-content');
  const modalClose = document.getElementById('modal-close-btn');

  if (!modalBackdrop) return;

  function openModal(title, subtitle, contentHtml) {
    modalTitle.textContent = title;
    modalSubtitle.textContent = subtitle;
    modalBody.innerHTML = contentHtml;
    modalBackdrop.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modalBackdrop.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (modalClose) modalClose.addEventListener('click', closeModal);
  modalBackdrop.addEventListener('click', (e) => {
    if (e.target === modalBackdrop) closeModal();
  });

  // Escape key to close
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalBackdrop.classList.contains('open')) {
      closeModal();
    }
  });

  // Wire GitHub / Project Info Buttons
  document.querySelectorAll('[data-open-project]').forEach(btn => {
    btn.addEventListener('click', () => {
      const projId = btn.getAttribute('data-open-project');
      const projectDetails = getProjectDetails(projId);
      if (projectDetails) {
        openModal(projectDetails.title, projectDetails.status, projectDetails.content);
      }
    });
  });

  // Wire Contact / Email Button
  document.querySelectorAll('[data-open-contact]').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(
        "SUMMON THE WARRIOR — ADITYA",
        "JECRC UNIVERSITY &bull; CYBER DISPATCH",
        `
          <p>Send an encrypted dispatch to Aditya's terminal at JECRC University. Open to collegiate inquiries, cybersecurity collaborations, and CTF challenges.</p>
          <div class="modal-code-snippet">
            <code>email: aditya26bcon2441@jecrcu.edu.in</code>
            <button class="copy-snippet-btn" onclick="navigator.clipboard.writeText('aditya26bcon2441@jecrcu.edu.in'); showToast('Email address copied!');">COPY</button>
          </div>
          <div class="modal-code-snippet">
            <code>github: https://github.com/aditya2302-web</code>
            <button class="copy-snippet-btn" onclick="navigator.clipboard.writeText('https://github.com/aditya2302-web'); showToast('GitHub URL copied!');">COPY</button>
          </div>
          <div class="modal-code-snippet">
            <code>citadel: JECRC University, Jaipur (B.Tech Cyber Security)</code>
            <button class="copy-snippet-btn" onclick="navigator.clipboard.writeText('JECRC University'); showToast('University copied!');">COPY</button>
          </div>
          <p style="font-size:0.8rem; color: var(--gold-light); margin-top:1rem;">
            <em>Pledged to defend the digital realm through knowledge, resilience, and code.</em>
          </p>
        `
      );
    });
  });
}

function getProjectDetails(id) {
  const projects = {
    'password-generator': {
      title: "PROJECT 01: PYTHON PASSWORD GENERATOR",
      status: "STATUS: LEARNING / PLANNED",
      content: `
        <p>A beginner Python project designed to generate robust, cryptographically random passwords utilizing permutations of uppercase characters, lowercase characters, numbers, and symbols.</p>
        <h4 style="color:var(--gold-primary); font-family:var(--font-serif); margin:1.25rem 0 0.5rem;">CORE LEARNING OBJECTIVES</h4>
        <ul style="padding-left:1.2rem; line-height:1.8; color:var(--text-secondary);">
          <li>Mastering Python standard library modules (<code>secrets</code>, <code>string</code>, <code>random</code>).</li>
          <li>Entropy calculation and basic password strength verification.</li>
          <li>Command Line Interface (CLI) input validation and secure storage practices.</li>
        </ul>
        <div class="modal-code-snippet">
          <code>git clone https://github.com/aditya2302-web/python-password-generator.git</code>
          <button class="copy-snippet-btn" onclick="navigator.clipboard.writeText('git clone https://github.com/aditya2302-web/python-password-generator.git'); showToast('Git clone command copied!');">COPY</button>
        </div>
        <p style="font-size:0.82rem; color:var(--text-muted);">
          <em>Repository link will be activated once the first-semester implementation is finalized.</em>
        </p>
      `
    },
    'portfolio-website': {
      title: "PROJECT 02: PERSONAL PORTFOLIO WEBSITE",
      status: "STATUS: IN PROGRESS",
      content: `
        <p>This very interactive portfolio, fusing medieval fantasy worldbuilding from Game of Thrones with the modern aesthetic of a cybersecurity command post.</p>
        <h4 style="color:var(--gold-primary); font-family:var(--font-serif); margin:1.25rem 0 0.5rem;">TECHNOLOGICAL ARCHITECTURE</h4>
        <ul style="padding-left:1.2rem; line-height:1.8; color:var(--text-secondary);">
          <li>Modular CSS3 custom properties with real-time House theming engine.</li>
          <li>Web Audio API procedural synthesizer creating a zero-copyright medieval orchestra.</li>
          <li>HTML5 Canvas particle physics system (snow, embers, golden dust motes).</li>
          <li>Semantic, responsive layout crafted with accessible standards.</li>
        </ul>
        <div class="modal-code-snippet">
          <code>git clone https://github.com/aditya2302-web/realm-of-cyber-portfolio.git</code>
          <button class="copy-snippet-btn" onclick="navigator.clipboard.writeText('git clone https://github.com/aditya2302-web/realm-of-cyber-portfolio.git'); showToast('Git clone command copied!');">COPY</button>
        </div>
      `
    },
    'networking-lab': {
      title: "PROJECT 03: NETWORKING FUNDAMENTALS LAB",
      status: "STATUS: PLANNED",
      content: `
        <p>An educational project documenting hands-on understanding of IPv4/IPv6 addressing, subnetting, TCP/IP vs OSI models, routing protocols, and traffic analysis.</p>
        <h4 style="color:var(--gold-primary); font-family:var(--font-serif); margin:1.25rem 0 0.5rem;">LAB ROADMAP</h4>
        <ul style="padding-left:1.2rem; line-height:1.8; color:var(--text-secondary);">
          <li>Linux network socket exploration and routing tables (<code>ip route</code>, <code>ss</code>, <code>traceroute</code>).</li>
          <li>Packet capture analysis using Wireshark and tcpdump in a sandboxed VM.</li>
          <li>DNS query mechanics and firewall fundamentals (iptables/ufw).</li>
        </ul>
        <div class="modal-code-snippet">
          <code># Planned repository link: networking-fundamentals-lab</code>
        </div>
      `
    },
    'learning-notes': {
      title: "PROJECT 04: CYBERSECURITY LEARNING NOTES",
      status: "STATUS: IN PROGRESS",
      content: `
        <p>A living, structured knowledge repository covering fundamental concepts of computer science, hardware architectures, operating system security, and defense fundamentals.</p>
        <h4 style="color:var(--gold-primary); font-family:var(--font-serif); margin:1.25rem 0 0.5rem;">CURATED TOPICS</h4>
        <ul style="padding-left:1.2rem; line-height:1.8; color:var(--text-secondary);">
          <li>CIA Triad (Confidentiality, Integrity, Availability) and threat models.</li>
          <li>Linux permissions, file hierarchies, and privilege escalation concepts.</li>
          <li>Common vulnerability patterns (OWASP Top 10 introduction).</li>
          <li>Ethical disclosure guidelines and legal boundaries for security researchers.</li>
        </ul>
        <div class="modal-code-snippet">
          <code>git clone https://github.com/aditya2302-web/cybersecurity-learning-notes.git</code>
          <button class="copy-snippet-btn" onclick="navigator.clipboard.writeText('git clone https://github.com/aditya2302-web/cybersecurity-learning-notes.git'); showToast('Git clone command copied!');">COPY</button>
        </div>
      `
    }
  };
  return projects[id];
}

/* ==========================================================================
   8. AUDIO CONTROLLER BINDINGS
   ========================================================================== */
function initAudioControls() {
  const playBtn = document.getElementById('audio-play-btn');
  const muteBtn = document.getElementById('audio-mute-btn');
  const volSlider = document.getElementById('audio-volume-slider');
  const navSoundBtn = document.getElementById('nav-sound-toggle');

  if (playBtn) {
    playBtn.addEventListener('click', () => {
      if (window.realmAudio) window.realmAudio.toggle();
    });
  }

  if (navSoundBtn) {
    navSoundBtn.addEventListener('click', () => {
      if (window.realmAudio) window.realmAudio.toggle();
    });
  }

  if (muteBtn) {
    muteBtn.addEventListener('click', () => {
      if (window.realmAudio) window.realmAudio.toggle();
    });
  }

  if (volSlider) {
    volSlider.addEventListener('input', (e) => {
      if (window.realmAudio) {
        window.realmAudio.setVolume(e.target.value / 100);
      }
    });
  }
}

/* ==========================================================================
   TOAST NOTIFICATION HELPER
   ========================================================================== */
function showToast(message) {
  let toast = document.getElementById('realm-toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'realm-toast';
    toast.style.cssText = `
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%) translateY(20px);
      background: #0E1015;
      border: 1px solid var(--gold-primary);
      color: #FFE28A;
      font-family: var(--font-serif);
      font-size: 0.8rem;
      letter-spacing: 0.15em;
      padding: 0.65rem 1.5rem;
      border-radius: 3px;
      box-shadow: 0 10px 30px rgba(0,0,0,0.9), 0 0 15px var(--gold-glow);
      z-index: 3000;
      opacity: 0;
      pointer-events: none;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
      text-transform: uppercase;
    `;
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.style.opacity = '1';
  toast.style.transform = 'translateX(-50%) translateY(0)';

  clearTimeout(toast._timer);
  toast._timer = setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(20px)';
  }, 2800);
}

window.showToast = showToast;
