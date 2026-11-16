
/**
 * REALM OF CYBER - Background Music Engine
 * Custom MP3 soundtrack with playback controls,
 * volume control, looping and audio visualizer.
 */

class RealmAudioEngine {
    constructor() {
        this.audio = new Audio('assets/background.mp3');

        this.audio.loop = true;
        this.audio.preload = 'auto';

        this.isPlaying = false;
        this.isMuted = false;

        let savedVol = '0.65';

        try {
            savedVol = localStorage.getItem('realm_audio_vol') || '0.65';
        } catch (e) {}

        this.volume = parseFloat(savedVol);
        this.audio.volume = this.volume;

        this.ctx = null;
        this.analyser = null;
        this.source = null;

        this.visualizerCanvas = null;
        this.visualizerCtx = null;
        this.animFrameId = null;

        this.trackInfo = {
            title: "Background Soundtrack",
            subtitle: "Realm of Cyber Cinematic Audio",
            composer: "Custom MP3"
        };
    }

    init() {
        if (this.ctx) return;

        const AudioContext =
            window.AudioContext || window.webkitAudioContext;

        if (!AudioContext) return;

        try {
            this.ctx = new AudioContext();

            this.analyser = this.ctx.createAnalyser();
            this.analyser.fftSize = 64;
            this.analyser.smoothingTimeConstant = 0.85;

            this.source = this.ctx.createMediaElementSource(this.audio);

            this.source.connect(this.analyser);
            this.analyser.connect(this.ctx.destination);

        } catch (e) {
            console.warn("Audio visualizer unavailable:", e);
        }

        this.setupVisualizer();
    }

    async start() {
        if (this.isPlaying) return;

        this.init();

        try {
            if (this.ctx && this.ctx.state === 'suspended') {
                await this.ctx.resume();
            }

            this.audio.volume = this.isMuted ? 0 : this.volume;

            await this.audio.play();

            this.isPlaying = true;

            this.updateUI();
            this.renderVisualizer();

        } catch (error) {
            console.warn("Unable to play soundtrack:", error);
            this.isPlaying = false;
            this.updateUI();
        }
    }

    stop() {
        this.audio.pause();
        this.isPlaying = false;

        if (this.animFrameId) {
            cancelAnimationFrame(this.animFrameId);
            this.animFrameId = null;
        }

        this.updateUI();
        this.renderVisualizer();
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
        } catch (e) {}

        if (!this.isMuted) {
            this.audio.volume = this.volume;
        }

        this.updateUI();
    }

    toggleMute() {
        this.isMuted = !this.isMuted;

        this.audio.volume = this.isMuted ? 0 : this.volume;

        this.updateUI();
    }

    setupVisualizer() {
        this.visualizerCanvas =
            document.getElementById('realm-audio-bars');

        if (this.visualizerCanvas) {
            this.visualizerCtx =
                this.visualizerCanvas.getContext('2d');
        }
    }

    renderVisualizer() {
        if (!this.isPlaying) {
            if (this.visualizerCtx && this.visualizerCanvas) {
                const canvas = this.visualizerCanvas;
                const ctx = this.visualizerCtx;

                ctx.clearRect(0, 0, canvas.width, canvas.height);

                const numBars = 16;
                const barWidth = 3;
                const gap = 3;

                const totalW = numBars * (barWidth + gap);
                const startX = (canvas.width - totalW) / 2;

                ctx.fillStyle = 'rgba(197, 161, 91, 0.25)';

                for (let i = 0; i < numBars; i++) {
                    ctx.fillRect(
                        startX + i * (barWidth + gap),
                        canvas.height - 4,
                        barWidth,
                        4
                    );
                }
            }

            return;
        }

        this.animFrameId = requestAnimationFrame(
            () => this.renderVisualizer()
        );

        if (!this.analyser || !this.visualizerCtx ||
            !this.visualizerCanvas) return;

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

            const barH = Math.max(
                3,
                percent * (canvas.height - 4)
            );

            const y = canvas.height - barH;

            const grad = ctx.createLinearGradient(
                0, y, 0, canvas.height
            );

            grad.addColorStop(0, '#FFE494');
            grad.addColorStop(1, '#8F7238');

            ctx.fillStyle = grad;

            ctx.fillRect(
                startX + i * (barWidth + gap),
                y,
                barWidth,
                barH
            );
        }
    }

    updateUI() {
        const playBtn =
            document.getElementById('audio-play-btn');

        const muteBtn =
            document.getElementById('audio-mute-btn');

        const volSlider =
            document.getElementById('audio-volume-slider');

        const badge =
            document.getElementById('audio-status-badge');

        const floatingPill =
            document.getElementById('floating-music-pill');

        if (playBtn) {
            playBtn.innerHTML = this.isPlaying
                ? window.REALM_ICONS.pause
                : window.REALM_ICONS.play;

            playBtn.setAttribute(
                'aria-label',
                this.isPlaying ? 'Pause Music' : 'Play Music'
            );
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
            badge.textContent = this.isPlaying
                ? "NOW PLAYING"
                : "ATMOSPHERIC SUITE";

            badge.classList.toggle('playing', this.isPlaying);
        }

        if (floatingPill) {
            floatingPill.classList.toggle(
                'active',
                this.isPlaying
            );
        }
    }
}

// Create global audio instance
window.realmAudio = new RealmAudioEngine();
