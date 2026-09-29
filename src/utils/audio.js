/**
 * Web Audio API Engine for Manya's Birthday Experience
 * High quality synthetic music box / marimba lullaby & rich sound effects
 */

class SoundEngine {
  constructor() {
    this.ctx = null;
    this.isPlaying = false;
    this.isMuted = false;
    this.currentLoopTimeout = null;
    this.bgGainNode = null;
    this.masterGainNode = null;
  }

  init() {
    if (!this.ctx) {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioContext();
      this.masterGainNode = this.ctx.createGain();
      this.masterGainNode.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.masterGainNode.connect(this.ctx.destination);

      this.bgGainNode = this.ctx.createGain();
      this.bgGainNode.gain.setValueAtTime(0.35, this.ctx.currentTime);
      this.bgGainNode.connect(this.masterGainNode);
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playNote(frequency, duration, startTime, gainLevel = 0.25, type = 'sine') {
    if (!this.ctx || this.isMuted) return;

    const osc = this.ctx.createOscillator();
    const noteGain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = type;
    osc.frequency.setValueAtTime(frequency, startTime);

    // Warm filter for acoustic music-box / kalimba feel
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2200, startTime);
    filter.Q.setValueAtTime(3, startTime);

    // Envelope (soft attack, smooth acoustic decay)
    noteGain.gain.setValueAtTime(0.001, startTime);
    noteGain.gain.exponentialRampToValueAtTime(gainLevel, startTime + 0.04);
    noteGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

    // Subtle harmonic overtone for dreamy sparkle
    const harmOsc = this.ctx.createOscillator();
    const harmGain = this.ctx.createGain();
    harmOsc.type = 'triangle';
    harmOsc.frequency.setValueAtTime(frequency * 2, startTime);
    harmGain.gain.setValueAtTime(0.001, startTime);
    harmGain.gain.exponentialRampToValueAtTime(gainLevel * 0.3, startTime + 0.03);
    harmGain.gain.exponentialRampToValueAtTime(0.001, startTime + duration * 0.7);

    osc.connect(filter);
    harmOsc.connect(filter);
    filter.connect(noteGain);
    harmGain.connect(noteGain);
    noteGain.connect(this.bgGainNode);

    osc.start(startTime);
    harmOsc.start(startTime);
    osc.stop(startTime + duration);
    harmOsc.stop(startTime + duration);
  }

  // Melodic Happy Birthday Theme (Warm Lo-Fi Acoustic Lullaby)
  startBGM() {
    this.init();
    if (this.isPlaying) return;
    this.isPlaying = true;

    // Frequencies for notes
    const N = {
      C4: 261.63, D4: 293.66, E4: 329.63, F4: 349.23, G4: 392.00, A4: 440.00, B4: 493.88,
      C5: 523.25, D5: 587.33, E5: 659.25, F5: 698.46, G5: 783.99, A5: 880.00,
      REST: 0
    };

    // Melody: [Note, durationInBeats]
    const melody = [
      [N.C4, 0.75], [N.C4, 0.25], [N.D4, 1.0], [N.C4, 1.0], [N.F4, 1.0], [N.E4, 2.0],
      [N.C4, 0.75], [N.C4, 0.25], [N.D4, 1.0], [N.C4, 1.0], [N.G4, 1.0], [N.F4, 2.0],
      [N.C4, 0.75], [N.C4, 0.25], [N.C5, 1.0], [N.A4, 1.0], [N.F4, 1.0], [N.E4, 1.0], [N.D4, 1.5],
      [N.A4, 0.5], [N.A4, 0.5], [N.A4, 1.0], [N.F4, 1.0], [N.G4, 1.0], [N.F4, 2.5]
    ];

    // Accompanying ambient chords
    const chords = [
      { beat: 0, notes: [130.81, 164.81, 196.00] }, // C major
      { beat: 4, notes: [174.61, 220.00, 261.63] }, // F major
      { beat: 7, notes: [130.81, 196.00, 246.94] }, // G major
      { beat: 12, notes: [174.61, 220.00, 261.63] }, // F major
      { beat: 16, notes: [110.00, 164.81, 220.00] }, // A minor
      { beat: 20, notes: [146.83, 174.61, 220.00] }, // D minor
      { beat: 24, notes: [130.81, 164.81, 196.00] }, // C major
    ];

    const playPhrase = () => {
      if (!this.isPlaying) return;
      const now = this.ctx.currentTime + 0.1;
      const beatDuration = 0.55; // tempo

      let currentBeat = 0;
      melody.forEach(([freq, beats]) => {
        if (freq > 0) {
          this.playNote(freq, beats * beatDuration * 1.1, now + currentBeat * beatDuration, 0.28, 'sine');
        }
        currentBeat += beats;
      });

      // Play chords
      chords.forEach(ch => {
        ch.notes.forEach(f => {
          this.playNote(f, 2.2, now + ch.beat * beatDuration, 0.12, 'triangle');
        });
      });

      const totalTime = currentBeat * beatDuration;
      this.currentLoopTimeout = setTimeout(playPhrase, (totalTime + 1.2) * 1000);
    };

    playPhrase();
  }

  stopBGM() {
    this.isPlaying = false;
    if (this.currentLoopTimeout) {
      clearTimeout(this.currentLoopTimeout);
      this.currentLoopTimeout = null;
    }
  }

  toggleBGM() {
    if (this.isPlaying) {
      this.stopBGM();
      return false;
    } else {
      this.startBGM();
      return true;
    }
  }

  // Sound Effect: Candle Blow Out (Air rush + sparkling chiming glissando)
  playBlowCandleFX() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    // White noise wind rush
    const bufferSize = this.ctx.sampleRate * 1.2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noise = this.ctx.createBufferSource();
    noise.buffer = buffer;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(800, now);
    filter.frequency.exponentialRampToValueAtTime(150, now + 1.1);
    filter.Q.setValueAtTime(2, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.35, now + 0.15);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.1);

    noise.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGainNode);

    noise.start(now);
    noise.stop(now + 1.2);

    // Magical chime ascending
    const chimes = [523.25, 659.25, 783.99, 1046.50, 1318.51];
    chimes.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const chGain = this.ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + 0.3 + idx * 0.08);

      chGain.gain.setValueAtTime(0.001, now + 0.3 + idx * 0.08);
      chGain.gain.exponentialRampToValueAtTime(0.2, now + 0.34 + idx * 0.08);
      chGain.gain.exponentialRampToValueAtTime(0.001, now + 1.2 + idx * 0.08);

      osc.connect(chGain);
      chGain.connect(this.masterGainNode);
      osc.start(now + 0.3 + idx * 0.08);
      osc.stop(now + 1.3 + idx * 0.08);
    });
  }

  // Sound Effect: Cake Cutting Slice
  playCakeCutFX() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    // Metallic slice sparkle
    const osc1 = this.ctx.createOscillator();
    const gain1 = this.ctx.createGain();
    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(1200, now);
    osc1.frequency.exponentialRampToValueAtTime(300, now + 0.3);

    gain1.gain.setValueAtTime(0.15, now);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

    osc1.connect(gain1);
    gain1.connect(this.masterGainNode);
    osc1.start(now);
    osc1.stop(now + 0.35);

    // Sweet celebration pop chord
    const popNotes = [440, 554.37, 659.25, 880];
    popNotes.forEach((f, idx) => {
      const osc = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(f, now + 0.1 + idx * 0.05);

      g.gain.setValueAtTime(0.001, now + 0.1 + idx * 0.05);
      g.gain.exponentialRampToValueAtTime(0.22, now + 0.12 + idx * 0.05);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.8 + idx * 0.05);

      osc.connect(g);
      g.connect(this.masterGainNode);
      osc.start(now + 0.1 + idx * 0.05);
      osc.stop(now + 0.9 + idx * 0.05);
    });
  }

  // Sound Effect: Confetti Cannon Celebration
  playConfettiFX() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    // Pop sound
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(220, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.18);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

    osc.connect(gain);
    gain.connect(this.masterGainNode);
    osc.start(now);
    osc.stop(now + 0.22);

    // Celebration arpeggio
    const fanfare = [523.25, 659.25, 783.99, 1046.50];
    fanfare.forEach((f, i) => {
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = 'triangle';
      o.frequency.setValueAtTime(f, now + 0.08 + i * 0.06);

      g.gain.setValueAtTime(0.001, now + 0.08 + i * 0.06);
      g.gain.exponentialRampToValueAtTime(0.25, now + 0.1 + i * 0.06);
      g.gain.exponentialRampToValueAtTime(0.001, now + 0.9 + i * 0.06);

      o.connect(g);
      g.connect(this.masterGainNode);
      o.start(now + 0.08 + i * 0.06);
      o.stop(now + 1.0 + i * 0.06);
    });
  }

  // Sound Effect: Click / Sparkle pop
  playSparkleFX() {
    this.init();
    if (!this.ctx || this.isMuted) return;
    const now = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(880 + Math.random() * 400, now);
    osc.frequency.exponentialRampToValueAtTime(1400, now + 0.15);

    gain.gain.setValueAtTime(0.12, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

    osc.connect(gain);
    gain.connect(this.masterGainNode);
    osc.start(now);
    osc.stop(now + 0.2);
  }
}

export const soundEngine = new SoundEngine();
