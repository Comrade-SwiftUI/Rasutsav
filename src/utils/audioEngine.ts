/**
 * Authentic Web Audio API Synthesizer for Navratri Garba Beats,
 * Temple Bells, 50-Dhol Rhythms, Shankh Naad, and Dandiya Clacks.
 */

export type RhythmMode = 'none' | 'dhol' | 'aarti' | 'sanedo';

export interface AudioEngineState {
  isPlaying: boolean;
  mode: RhythmMode;
  bpm: number;
}

class NavratriAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;
  private currentMode: RhythmMode = 'none';
  private timerId: any = null;
  private step: number = 0;
  private tempoBpm: number = 118;
  private analyser: AnalyserNode | null = null;
  private listeners: Set<(state: AudioEngineState) => void> = new Set();

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
      this.analyser = this.ctx.createAnalyser();
      this.analyser.fftSize = 64;
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public subscribe(fn: (state: AudioEngineState) => void) {
    this.listeners.add(fn);
    fn({ isPlaying: this.isPlaying, mode: this.currentMode, bpm: this.tempoBpm });
    return () => {
      this.listeners.delete(fn);
    };
  }

  private notify() {
    this.listeners.forEach((fn) =>
      fn({ isPlaying: this.isPlaying, mode: this.currentMode, bpm: this.tempoBpm })
    );
  }

  public getAnalyser(): AnalyserNode | null {
    return this.analyser;
  }

  // Auspicious Shankh (Conch Shell) invocation sound
  public playShankhNaad() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(330, now + 1.2);
    osc.frequency.exponentialRampToValueAtTime(320, now + 3.0);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(440, now);
    osc2.frequency.exponentialRampToValueAtTime(660, now + 1.2);

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(800, now);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.6);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 3.5);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);

    if (this.analyser) {
      gain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    } else {
      gain.connect(this.ctx.destination);
    }

    osc.start(now);
    osc2.start(now);
    osc.stop(now + 3.6);
    osc2.stop(now + 3.6);
  }

  // Dandiya Wood Strike Sound
  public playDandiyaClack() {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(1400, now);
    osc.frequency.exponentialRampToValueAtTime(300, now + 0.08);

    gain.gain.setValueAtTime(0.7, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);

    // Noise burst for the wood texture
    const bufferSize = this.ctx.sampleRate * 0.05;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    const noiseFilter = this.ctx.createBiquadFilter();
    noiseFilter.type = 'bandpass';
    noiseFilter.frequency.value = 2400;

    const noiseGain = this.ctx.createGain();
    noiseGain.gain.setValueAtTime(0.4, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);

    osc.connect(gain);

    const master = this.ctx.createGain();
    master.gain.value = 0.8;
    gain.connect(master);
    noiseGain.connect(master);

    if (this.analyser) {
      master.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    } else {
      master.connect(this.ctx.destination);
    }

    osc.start(now);
    osc.stop(now + 0.1);
    whiteNoise.start(now);
    whiteNoise.stop(now + 0.06);
  }

  // Resonant Temple Brass Bell
  public playTempleBell(freq = 880) {
    this.initContext();
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const partials = [1, 2.01, 3.02, 4.2];
    const masterGain = this.ctx.createGain();
    masterGain.gain.setValueAtTime(0.3, now);
    masterGain.gain.exponentialRampToValueAtTime(0.001, now + 2.5);

    partials.forEach((mult, idx) => {
      if (!this.ctx) return;
      const osc = this.ctx.createOscillator();
      const pGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq * mult, now);
      pGain.gain.setValueAtTime(0.4 / (idx + 1), now);
      pGain.gain.exponentialRampToValueAtTime(0.001, now + 2.0 - idx * 0.3);

      osc.connect(pGain);
      pGain.connect(masterGain);
      osc.start(now);
      osc.stop(now + 2.5);
    });

    if (this.analyser) {
      masterGain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    } else {
      masterGain.connect(this.ctx.destination);
    }
  }

  // Deep Bass Dhol Thump (Kathiyawadi / Baroda Style)
  private playDholBass(accent = false) {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    const startFreq = accent ? 135 : 105;
    const endFreq = 42;
    osc.frequency.setValueAtTime(startFreq, now);
    osc.frequency.exponentialRampToValueAtTime(endFreq, now + (accent ? 0.22 : 0.16));

    const vol = accent ? 0.8 : 0.5;
    gain.gain.setValueAtTime(vol, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + (accent ? 0.35 : 0.24));

    osc.connect(gain);
    if (this.analyser) {
      gain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    } else {
      gain.connect(this.ctx.destination);
    }

    osc.start(now);
    osc.stop(now + 0.36);
  }

  // Crisp High Dhol Treble (Chanti / Tasha)
  private playDholTreble() {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(650, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.06);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    if (this.analyser) {
      gain.connect(this.analyser);
      this.analyser.connect(this.ctx.destination);
    } else {
      gain.connect(this.ctx.destination);
    }

    osc.start(now);
    osc.stop(now + 0.09);
  }

  // 3-Taali Authentic Garba Loop
  public toggleRhythm(mode: 'dhol' | 'aarti' | 'sanedo' = 'dhol') {
    this.initContext();

    if (this.isPlaying && this.currentMode === mode) {
      this.stop();
      return;
    }

    if (this.isPlaying) {
      this.stop();
    }

    this.isPlaying = true;
    this.currentMode = mode;
    this.step = 0;

    if (mode === 'dhol') {
      this.tempoBpm = 118;
      // Garba 3-Taali (beats on 1, 2, 3, clap, syncopated dhol)
      const intervalMs = (60 / this.tempoBpm / 2) * 1000;
      this.timerId = setInterval(() => {
        const beatInMeasure = this.step % 8;
        if (beatInMeasure === 0) {
          this.playDholBass(true);
        } else if (beatInMeasure === 2 || beatInMeasure === 4) {
          this.playDholBass(false);
          this.playDholTreble();
        } else if (beatInMeasure === 6) {
          this.playDandiyaClack();
        } else if (beatInMeasure === 7) {
          this.playDholTreble();
        }
        this.step++;
      }, intervalMs);
    } else if (mode === 'aarti') {
      this.tempoBpm = 84;
      // Holy Aarti Cadence with regular temple bells & solemn dhol
      const intervalMs = (60 / this.tempoBpm / 2) * 1000;
      this.timerId = setInterval(() => {
        const beatInMeasure = this.step % 8;
        if (beatInMeasure === 0) {
          this.playTempleBell(528); // Miraculous tone
          this.playDholBass(true);
        } else if (beatInMeasure === 4) {
          this.playTempleBell(660);
          this.playDholBass(false);
        } else if (beatInMeasure === 2 || beatInMeasure === 6) {
          this.playTempleBell(792);
        }
        this.step++;
      }, intervalMs);
    } else if (mode === 'sanedo') {
      this.tempoBpm = 138;
      // Fast High-Energy Sanedo 3-Taali rhythm
      const intervalMs = (60 / this.tempoBpm / 2) * 1000;
      this.timerId = setInterval(() => {
        const beatInMeasure = this.step % 6;
        if (beatInMeasure === 0) {
          this.playDholBass(true);
          this.playDholTreble();
        } else if (beatInMeasure === 2 || beatInMeasure === 4) {
          this.playDholBass(false);
          this.playDandiyaClack();
        } else {
          this.playDholTreble();
        }
        this.step++;
      }, intervalMs);
    }

    this.notify();
  }

  public setBpm(newBpm: number) {
    this.tempoBpm = Math.max(70, Math.min(180, newBpm));
    if (this.isPlaying && this.currentMode !== 'none') {
      const mode = this.currentMode;
      this.stop();
      this.toggleRhythm(mode);
    } else {
      this.notify();
    }
  }

  public playRhythm(mode: 'dhol' | 'aarti' | 'sanedo' = 'dhol') {
    if (this.isPlaying && this.currentMode === mode) return;
    this.toggleRhythm(mode);
  }

  public isPlayingState(): boolean {
    return this.isPlaying;
  }

  public stop() {
    if (this.timerId) {
      clearInterval(this.timerId);
      this.timerId = null;
    }
    this.isPlaying = false;
    this.currentMode = 'none';
    this.notify();
  }

  public getState(): { isPlaying: boolean; mode: 'none' | 'dhol' | 'aarti' | 'sanedo'; bpm: number } {
    return {
      isPlaying: this.isPlaying,
      mode: this.currentMode,
      bpm: this.tempoBpm
    };
  }
}

export const audioEngine = new NavratriAudioEngine();
