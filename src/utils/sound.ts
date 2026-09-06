// Web Audio API ambient cosmic sound generator and SFX manager
// 100% self-contained, no external audio files required!

class SoundManager {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = true;
  private ambientOscillators: OscillatorNode[] = [];
  private ambientGain: GainNode | null = null;
  private isPlayingAmbient: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioCtxClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtxClass();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public toggleMute(): boolean {
    this.initContext();
    this.isMuted = !this.isMuted;
    if (this.isMuted) {
      this.stopAmbient();
    } else {
      this.startAmbient();
      this.playChime(600, 0.1);
    }
    return !this.isMuted;
  }

  public getIsMuted(): boolean {
    return this.isMuted;
  }

  public startAmbient() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx || this.isPlayingAmbient) return;

    try {
      const masterGain = this.ctx.createGain();
      masterGain.gain.setValueAtTime(0.0001, this.ctx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.04, this.ctx.currentTime + 3);
      masterGain.connect(this.ctx.destination);
      this.ambientGain = masterGain;

      // Chord frequencies: Deep E Minor space chord (E2, B2, G3, D4)
      const chord = [82.41, 123.47, 196.0, 293.66];
      this.ambientOscillators = [];

      chord.forEach((freq, idx) => {
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const panner = this.ctx.createStereoPanner ? this.ctx.createStereoPanner() : null;
        const filter = this.ctx.createBiquadFilter();

        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

        // Lowpass filter for warm space drone
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(350 + idx * 50, this.ctx.currentTime);

        if (panner) {
          panner.pan.setValueAtTime((idx - 1.5) * 0.4, this.ctx.currentTime);
          osc.connect(filter);
          filter.connect(panner);
          panner.connect(masterGain);
        } else {
          osc.connect(filter);
          filter.connect(masterGain);
        }

        osc.start();
        this.ambientOscillators.push(osc);
      });

      this.isPlayingAmbient = true;
    } catch {
      // Audio context might be blocked prior to user interaction
    }
  }

  public stopAmbient() {
    if (!this.ambientGain || !this.ctx) return;
    try {
      this.ambientGain.gain.setValueAtTime(this.ambientGain.gain.value, this.ctx.currentTime);
      this.ambientGain.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + 0.8);
      setTimeout(() => {
        this.ambientOscillators.forEach(osc => {
          try { osc.stop(); osc.disconnect(); } catch { /* ignore */ }
        });
        this.ambientOscillators = [];
        this.isPlayingAmbient = false;
      }, 900);
    } catch {
      this.isPlayingAmbient = false;
    }
  }

  public playHoverBeep() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(440, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.05);

      gain.gain.setValueAtTime(0.015, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.05);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.05);
    } catch {
      // ignore
    }
  }

  public playSelectSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(320, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(720, this.ctx.currentTime + 0.12);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.15);
    } catch {
      // ignore
    }
  }

  public playWarpSound() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(150, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.35);
      osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.6);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.65);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.65);
    } catch {
      // ignore
    }
  }

  public playChime(freq = 520, duration = 0.25) {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch {
      // ignore
    }
  }

  public playKeyClick() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'square';
      osc.frequency.setValueAtTime(1200 + Math.random() * 400, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.006, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.00001, this.ctx.currentTime + 0.02);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.02);
    } catch {
      // ignore
    }
  }

  public playTargetLock() {
    if (this.isMuted) return;
    this.initContext();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(800, this.ctx.currentTime);
      osc.frequency.setValueAtTime(1600, this.ctx.currentTime + 0.04);

      gain.gain.setValueAtTime(0.03, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.09);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 0.09);
    } catch {
      // ignore
    }
  }
}

export const soundManager = new SoundManager();
