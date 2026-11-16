/**
 * THE REALM OF CYBER - Atmospheric Canvas Particle Engine
 * Handles Falling Snow, Floating Embers, and Royal Gold Dust
 * dynamically tied to the visitor's selected Great House.
 */

class RealmParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.mouse = { x: -1000, y: -1000, radius: 120 };
    
    // Modes: 'snow' (Stark), 'embers' (Targaryen), 'gold' (Lannister), 'cyber' (Night's Watch)
    this.currentMode = 'snow';
    this.particleCount = 75;
    this.animId = null;
    this.isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.init();
  }

  init() {
    this.resize();
    window.addEventListener('resize', () => this.resize());
    window.addEventListener('mousemove', (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    this.spawnParticles();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
    // Adapt particle count for mobile screens
    if (this.width < 768) {
      this.particleCount = 35;
    } else {
      this.particleCount = 75;
    }
    this.spawnParticles();
  }

  setMode(mode) {
    if (this.currentMode === mode) return;
    this.currentMode = mode;
    this.spawnParticles();
  }

  createParticle() {
    const x = Math.random() * this.width;
    const y = Math.random() * this.height;

    switch (this.currentMode) {
      case 'embers': // House Targaryen: Red/Orange Embers rising
        return {
          x,
          y: y > this.height ? this.height : y,
          size: Math.random() * 3.5 + 1.2,
          speedY: -(Math.random() * 1.5 + 0.6), // float upwards
          speedX: (Math.random() - 0.5) * 1.0,
          opacity: Math.random() * 0.7 + 0.3,
          color: Math.random() > 0.4 ? '#E63946' : '#FF9F1C',
          glow: 'rgba(230, 57, 70, 0.6)',
          flicker: Math.random() * 0.05 + 0.02,
          life: Math.random() * 100,
          maxLife: 150 + Math.random() * 100
        };

      case 'gold': // House Lannister: Golden motes & regal dust
        return {
          x,
          y,
          size: Math.random() * 3 + 1,
          speedY: (Math.random() - 0.5) * 0.5,
          speedX: (Math.random() - 0.5) * 0.6,
          opacity: Math.random() * 0.65 + 0.25,
          color: Math.random() > 0.3 ? '#C5A15B' : '#FFE28A',
          glow: 'rgba(197, 161, 91, 0.5)',
          flicker: Math.random() * 0.03,
          life: Math.random() * 100,
          maxLife: 200
        };

      case 'cyber': // Night's Watch: Cyber Frost & Cyan Sparks
        return {
          x,
          y,
          size: Math.random() * 2.8 + 1,
          speedY: Math.random() * 0.8 + 0.3,
          speedX: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.8 + 0.2,
          color: Math.random() > 0.5 ? '#00F0FF' : '#9BC7DF',
          glow: 'rgba(0, 240, 255, 0.5)',
          flicker: Math.random() * 0.04,
          life: Math.random() * 100,
          maxLife: 180,
          isGlyph: Math.random() > 0.7,
          glyph: Math.random() > 0.5 ? '1' : '0'
        };

      case 'snow': // House Stark: Snowflakes falling softly
      default:
        return {
          x,
          y,
          size: Math.random() * 3 + 1.2,
          speedY: Math.random() * 1.2 + 0.4, // falls downwards
          speedX: (Math.random() - 0.5) * 0.8 + 0.2, // slight wind drift
          opacity: Math.random() * 0.7 + 0.25,
          color: Math.random() > 0.5 ? '#FFFFFF' : '#9BC7DF',
          glow: 'rgba(155, 199, 223, 0.4)',
          flicker: 0,
          life: 0,
          maxLife: 500
        };
    }
  }

  spawnParticles() {
    this.particles = [];
    if (this.isReducedMotion) return;
    for (let i = 0; i < this.particleCount; i++) {
      this.particles.push(this.createParticle());
    }
  }

  animate() {
    if (this.isReducedMotion) return;
    this.ctx.clearRect(0, 0, this.width, this.height);

    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Update positions
      p.x += p.speedX;
      p.y += p.speedY;

      // Mouse gentle interaction
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < this.mouse.radius) {
        const force = (this.mouse.radius - dist) / this.mouse.radius;
        const angle = Math.atan2(dy, dx);
        p.x -= Math.cos(angle) * force * 1.5;
        p.y -= Math.sin(angle) * force * 1.5;
      }

      // Mode-specific reset boundaries
      if (this.currentMode === 'embers') {
        p.life++;
        p.opacity = Math.sin((p.life / p.maxLife) * Math.PI) * 0.8;
        if (p.y < -10 || p.life >= p.maxLife) {
          this.particles[i] = this.createParticle();
          this.particles[i].y = this.height + 10;
        }
      } else {
        if (p.y > this.height + 10) {
          p.y = -10;
          p.x = Math.random() * this.width;
        } else if (p.y < -10) {
          p.y = this.height + 10;
        }
        if (p.x > this.width + 10) {
          p.x = -10;
        } else if (p.x < -10) {
          p.x = this.width + 10;
        }
      }

      // Draw particle
      this.ctx.save();
      this.ctx.globalAlpha = Math.max(0, Math.min(1, p.opacity));

      if (p.isGlyph) {
        this.ctx.fillStyle = p.color;
        this.ctx.font = '10px monospace';
        this.ctx.fillText(p.glyph, p.x, p.y);
      } else {
        this.ctx.fillStyle = p.color;
        this.ctx.shadowBlur = 6;
        this.ctx.shadowColor = p.glow;
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        this.ctx.fill();
      }
      this.ctx.restore();
    }

    this.animId = requestAnimationFrame(() => this.animate());
  }
}

// Global initialization
function initParticles() {
  if (!window.realmParticles) {
    window.realmParticles = new RealmParticleEngine('realm-particles-canvas');
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initParticles);
} else {
  initParticles();
}
