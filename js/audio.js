/**
 * THE REALM OF CYBER - Medieval Cinematic Audio Engine
 * 100% Original Royalty-Free Procedural Medieval Fantasy Orchestral Suite
 * Powered by Web Audio API with real-time frequency analyser.
 */

class RealmAudioEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isMuted = false;
    let savedVol = '0.65';
    try {
      savedVol = localStorage.getItem('realm_audio_vol') || '0.65';
    } catch (e) {
      savedVol = '0.65';
    }
    this.volume = parseFloat(savedVol);
    this.analyser = null;
    this.masterGain = null;
    this.timer = null;
    this.step = 0;
    this.visualizerCanvas = null;
    this.visualizerCtx = null;
    this.animFrameId = null;

    // Track metadata
    this.trackInfo = {
      title: "Crown & Cipher",
      subtitle: "Medieval Cyber Fantasy Suite (Procedural Orchestra)",
      composer: "Realm of Cyber Audio Core"
    };

    // Melody notes (A Dorian / Aeolian medieval mode)
    // A2, C3, D3, E3, G3, A3, B3, C4, D4, E4
    this.scale = [110.00, 130.81, 146.83, 164.81, 196.00, 220.00, 246.94, 261.63, 293.66, 329.63];
    this.melodySequence = [0, 2, 3, 5, 4, 3, 2, 0, 3, 5, 7, 8, 7, 5, 4, 2];
    
    // Chord roots (A -> F -> G -> Em)
    this.chordProgression = [55.0, 43.65, 49.00, 41.20];
    this.currentChord = 0;
  }

  init() {
    if (this.ctx) return;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      console.warn("Web Audio API not supported in this browser.");
      return;
    }
    this.ctx = new AudioContext();

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);

    // Dynamic Compressor for cinematic polish
    this.compressor = this.ctx.createDynamicsCompressor();
    this.compressor.threshold.setValueAtTime(-24, this.ctx.currentTime);
    this.compressor.knee.setValueAtTime(30, this.ctx.currentTime);
    this.compressor.ratio.setValueAtTime(12, this.ctx.currentTime);
    this.compressor.attack.setValueAtTime(0.003, this.ctx.currentTime);
    this.compressor.release.setValueAtTime(0.25, this.ctx.currentTime);

    // Analyser for real-time visualizer
    this.analyser = this.ctx.createAnalyser();
    this.analyser.fftSize = 64;
    this.analyser.smoothingTimeConstant = 0.85;

    // Convolver / Reverb Simulation using noise impulse
    this.reverbNode = this.createSyntheticReverb(2.5, 2.0);

    // Wiring
    this.masterGain.connect(this.compressor);
    this.compressor.connect(this.analyser);
    this.analyser.connect(this.ctx.destination);

    // Setup visualizer if canvas is present
    this.setupVisualizer();
  }

  createSyntheticReverb(duration, decay) {
    const rate = this.ctx.sampleRate;
    const length = rate * duration;
    const impulse = this.ctx.createBuffer(2, length, rate);
    const left = impulse.getChannelData(0);
    const right = impulse.getChannelData(1);

    for (let i = 0; i < length; i++) {
      const n = i / length;
      const dec = Math.pow(1 - n, decay);
      left[i] = (Math.random() * 2 - 1) * dec;
      right[i] = (Math.random() * 2 - 1) * dec;
    }

    const convolver = this.ctx.createConvolver();
    convolver.buffer = impulse;
    return convolver;
  }

  start() {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);

    // Play drone
    this.startDronePad();

    // Start rhythmic loop (War drums + Medieval harp/lute)
    // 72 BPM -> each beat is ~833ms, 16th note is ~208ms
    const stepDuration = 416; // 8th note
    this.timer = setInterval(() => {
      if (!this.isPlaying) return;
      this.playStep(this.step);
      this.step = (this.step + 1) % 32;
    }, stepDuration);

    this.updateUI();
    this.renderVisualizer();
  }

  stop() {
    this.isPlaying = false;
    if (this.timer) {
      clearInterval(this.timer);
      this.timer = null;
    }
    if (this.droneOsc1) {
      try { this.droneOsc1.stop(); this.droneOsc2.stop(); } catch(e){}
    }
    this.updateUI();
  }

  toggle() {
    if (this.isPlaying) {
      this.stop();
    } else {
      this.start();
    }
  }

  setVolume(val) {
    this.volume = Math.max(0, Math.min(1, val));
    try {
      localStorage.setItem('realm_audio_vol', this.volume);
    } catch(e) {}
    if (this.masterGain && !this.isMuted) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
    this.updateUI();
  }

  toggleMute() {
    this.isMuted = !this.isMuted;
    if (this.masterGain) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : this.volume, this.ctx.currentTime);
    }
    this.updateUI();
  }

  // --- SOUND GENERATORS ---

  // Deep Cello / Bass Drone
  startDronePad() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Osc 1 - Saw filtered
    this.droneOsc1 = this.ctx.createOscillator();
    this.droneOsc1.type = 'sawtooth';
    this.droneOsc1.frequency.setValueAtTime(55, now); // A1

    // Osc 2 - Triangle sub
    this.droneOsc2 = this.ctx.createOscillator();
    this.droneOsc2.type = 'triangle';
    this.droneOsc2.frequency.setValueAtTime(110, now); // A2

    // Filter
    this.droneFilter = this.ctx.createBiquadFilter();
    this.droneFilter.type = 'lowpass';
    this.droneFilter.frequency.setValueAtTime(260, now);
    this.droneFilter.Q.setValueAtTime(3, now);

    // Drone Gain
    this.droneGain = this.ctx.createGain();
    this.droneGain.gain.setValueAtTime(0.01, now);
    this.droneGain.gain.linearRampToValueAtTime(0.35, now + 3);

    this.droneOsc1.connect(this.droneFilter);
    this.droneOsc2.connect(this.droneFilter);
    this.droneFilter.connect(this.droneGain);
    this.droneGain.connect(this.masterGain);
    if (this.reverbNode) {
      this.droneGain.connect(this.reverbNode);
      this.reverbNode.connect(this.masterGain);
    }

    this.droneOsc1.start(now);
    this.droneOsc2.start(now);
  }

  // War Drum Beat (Deep Taiko Impact)
  playWarDrum(isHeavy = false) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const startFreq = isHeavy ? 130 : 110;
    const endFreq = isHeavy ? 35 : 42;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + 0.18);

    const initialGain = isHeavy ? 0.75 : 0.45;
    gain.gain.setValueAtTime(initialGain, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (isHeavy ? 0.8 : 0.5));

    // Lowpass body filter
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(220, now);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);

    osc.start(now);
    osc.stop(now + 0.85);
  }

  // Lute / Harp Pluck (Medieval Court Arpeggio)
  playPluck(freq, velocity = 0.25) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(freq, now);

    // Subtle pitch vibrato for medieval string character
    const vib = this.ctx.createOscillator();
    const vibGain = this.ctx.createGain();
    vib.frequency.setValueAtTime(4.5, now);
    vibGain.gain.setValueAtTime(2.0, now);
    vib.connect(osc.frequency);
    vib.start(now);
    vib.stop(now + 1.2);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(velocity, now + 0.015);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, now);
    filter.frequency.exponentialRampToValueAtTime(400, now + 0.6);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    if (this.reverbNode) {
      gain.connect(this.reverbNode);
    }

    osc.start(now);
    osc.stop(now + 1.2);
  }

  // Sequencer step callback
  playStep(step) {
    // War Drum pattern on beats 0, 8, 16, 24 with accents
    if (step === 0) {
      this.playWarDrum(true);
      // Shift chord progression every 16 steps
      this.currentChord = (this.currentChord + 1) % this.chordProgression.length;
      if (this.droneOsc1) {
        const root = this.chordProgression[this.currentChord];
        const now = this.ctx.currentTime;
        this.droneOsc1.frequency.exponentialRampToValueAtTime(root, now + 2);
        this.droneOsc2.frequency.exponentialRampToValueAtTime(root * 2, now + 2);
      }
    } else if (step === 8 || step === 16 || step === 24) {
      this.playWarDrum(false);
    } else if (step === 22 || step === 30) {
      // Subtle war-drum flam / syncopation
      this.playWarDrum(false);
    }

    // Melodic medieval arpeggio on certain steps
    if (step % 2 === 0) {
      const melIndex = this.melodySequence[(step / 2) % this.melodySequence.length];
      const freq = this.scale[melIndex % this.scale.length];
      this.playPluck(freq, 0.22);
    }
  }

  // --- VISUALIZER & UI ---
  setupVisualizer() {
    this.visualizerCanvas = document.getElementById('realm-audio-bars');
    if (this.visualizerCanvas) {
      this.visualizerCtx = this.visualizerCanvas.getContext('2d');
    }
  }

  renderVisualizer() {
    if (!this.isPlaying) {
      if (this.visualizerCtx && this.visualizerCanvas) {
        this.visualizerCtx.clearRect(0, 0, this.visualizerCanvas.width, this.visualizerCanvas.height);
        // Draw resting idle bars
        const numBars = 16;
        const barWidth = 3;
        const gap = 3;
        const totalW = numBars * (barWidth + gap);
        const startX = (this.visualizerCanvas.width - totalW) / 2;
        this.visualizerCtx.fillStyle = 'rgba(197, 161, 91, 0.25)';
        for (let i = 0; i < numBars; i++) {
          this.visualizerCtx.fillRect(startX + i * (barWidth + gap), this.visualizerCanvas.height - 4, barWidth, 4);
        }
      }
      return;
    }

    this.animFrameId = requestAnimationFrame(() => this.renderVisualizer());
    if (!this.analyser || !this.visualizerCtx || !this.visualizerCanvas) return;

    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);

    const canvas = this.visualizerCanvas;
    const ctx = this.visualizerCtx;
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const numBars = 16;
    const barWidth = 3;
    const gap = 3;
    const totalW = numBars * (barWidth + gap);
    const startX = (canvas.width - totalW) / 2;

    for (let i = 0; i < numBars; i++) {
      const val = dataArray[i * 2] || 0;
      const percent = val / 255;
      const barH = Math.max(3, percent * (canvas.height - 4));
      const y = canvas.height - barH;

      // Golden gradient
      const grad = ctx.createLinearGradient(0, y, 0, canvas.height);
      grad.addColorStop(0, '#FFE494');
      grad.addColorStop(1, '#8F7238');

      ctx.fillStyle = grad;
      ctx.fillRect(startX + i * (barWidth + gap), y, barWidth, barH);
    }
  }

  updateUI() {
    const playBtn = document.getElementById('audio-play-btn');
    const muteBtn = document.getElementById('audio-mute-btn');
    const volSlider = document.getElementById('audio-volume-slider');
    const badge = document.getElementById('audio-status-badge');
    const floatingPill = document.getElementById('floating-music-pill');

    if (playBtn) {
      playBtn.innerHTML = this.isPlaying 
        ? window.REALM_ICONS.pause 
        : window.REALM_ICONS.play;
      playBtn.setAttribute('aria-label', this.isPlaying ? 'Pause Music' : 'Play Music');
    }

    if (muteBtn) {
      muteBtn.innerHTML = this.isMuted 
        ? window.REALM_ICONS.volumeX 
        : window.REALM_ICONS.volume2;
    }

    if (volSlider) {
      volSlider.value = this.volume * 100;
    }

    if (badge) {
      badge.textContent = this.isPlaying ? "NOW PLAYING" : "ATMOSPHERIC SUITE";
      badge.classList.toggle('playing', this.isPlaying);
    }

    if (floatingPill) {
      floatingPill.classList.toggle('active', this.isPlaying);
    }
  }
}

// Global instance
window.realmAudio = new RealmAudioEngine();
