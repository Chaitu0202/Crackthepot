/**
 * Web Audio API festive synthesizer for Janmashtami campaign
 * Generates earthen pot tap knocks, Dholak festive beats, temple bells, and celebratory chimes.
 */

let audioCtx: AudioContext | null = null;

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

export function playPotTap(tapStep: number = 1, muted: boolean = false) {
  if (muted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // Clay / Terracotta impact transient
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  
  // Frequency steps up slightly as tension builds
  const baseFreq = 180 + tapStep * 28;
  osc.type = 'triangle';
  osc.frequency.setValueAtTime(baseFreq, now);
  osc.frequency.exponentialRampToValueAtTime(60, now + 0.12);

  gain.gain.setValueAtTime(0.4, now);
  gain.gain.exponentialRampToValueAtTime(0.001, now + 0.12);

  osc.connect(gain);
  gain.connect(ctx.destination);

  osc.start(now);
  osc.stop(now + 0.13);

  // High ceramic 'click / clink' layer
  const clickOsc = ctx.createOscillator();
  const clickGain = ctx.createGain();
  clickOsc.type = 'sine';
  clickOsc.frequency.setValueAtTime(1200 + tapStep * 180, now);
  clickOsc.frequency.exponentialRampToValueAtTime(300, now + 0.05);

  clickGain.gain.setValueAtTime(0.25, now);
  clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);

  clickOsc.connect(clickGain);
  clickGain.connect(ctx.destination);

  clickOsc.start(now);
  clickOsc.stop(now + 0.06);
}

export function playPotShatter(muted: boolean = false) {
  if (muted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;

  // 1. Terracotta Burst Noise (white noise through bandpass)
  const bufferSize = ctx.sampleRate * 0.4;
  const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
  const data = buffer.getChannelData(0);
  for (let i = 0; i < bufferSize; i++) {
    data[i] = Math.random() * 2 - 1;
  }

  const noise = ctx.createBufferSource();
  noise.buffer = buffer;

  const filter = ctx.createBiquadFilter();
  filter.type = 'bandpass';
  filter.frequency.setValueAtTime(1400, now);
  filter.frequency.exponentialRampToValueAtTime(400, now + 0.35);
  filter.Q.setValueAtTime(3, now);

  const noiseGain = ctx.createGain();
  noiseGain.gain.setValueAtTime(0.6, now);
  noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

  noise.connect(filter);
  filter.connect(noiseGain);
  noiseGain.connect(ctx.destination);

  noise.start(now);
  noise.stop(now + 0.4);

  // 2. Festive Dholak / Dhol Drum celebration punch
  const dholOsc = ctx.createOscillator();
  const dholGain = ctx.createGain();
  dholOsc.type = 'sine';
  dholOsc.frequency.setValueAtTime(160, now + 0.04);
  dholOsc.frequency.exponentialRampToValueAtTime(48, now + 0.4);

  dholGain.gain.setValueAtTime(0.7, now + 0.04);
  dholGain.gain.exponentialRampToValueAtTime(0.001, now + 0.45);

  dholOsc.connect(dholGain);
  dholGain.connect(ctx.destination);

  dholOsc.start(now + 0.04);
  dholOsc.stop(now + 0.46);

  // 3. Second Dhol hit (Rhythmic Dhol Roll)
  const dhol2Osc = ctx.createOscillator();
  const dhol2Gain = ctx.createGain();
  dhol2Osc.type = 'triangle';
  dhol2Osc.frequency.setValueAtTime(220, now + 0.18);
  dhol2Osc.frequency.exponentialRampToValueAtTime(65, now + 0.5);

  dhol2Gain.gain.setValueAtTime(0.5, now + 0.18);
  dhol2Gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

  dhol2Osc.connect(dhol2Gain);
  dhol2Gain.connect(ctx.destination);

  dhol2Osc.start(now + 0.18);
  dhol2Osc.stop(now + 0.56);

  // 4. Temple Bell / Ghanta resonant harmonic chime
  const bellFrequencies = [587.33, 880.0, 1174.66, 1760.0]; // D5, A5, D6, A6 (Devotional Indian Raga tones)
  bellFrequencies.forEach((freq, idx) => {
    const bellOsc = ctx.createOscillator();
    const bellGain = ctx.createGain();

    bellOsc.type = 'sine';
    bellOsc.frequency.setValueAtTime(freq, now + 0.1 + idx * 0.04);

    const bellVol = 0.2 / (idx + 1);
    bellGain.gain.setValueAtTime(bellVol, now + 0.1 + idx * 0.04);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 + idx * 0.2);

    bellOsc.connect(bellGain);
    bellGain.connect(ctx.destination);

    bellOsc.start(now + 0.1 + idx * 0.04);
    bellOsc.stop(now + 1.5);
  });
}

export function playTempleBell(muted: boolean = false) {
  if (muted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const bellFrequencies = [587.33, 880.0, 1174.66, 1760.0];
  bellFrequencies.forEach((freq, idx) => {
    const bellOsc = ctx.createOscillator();
    const bellGain = ctx.createGain();

    bellOsc.type = 'sine';
    bellOsc.frequency.setValueAtTime(freq, now + idx * 0.03);

    const bellVol = 0.25 / (idx + 1);
    bellGain.gain.setValueAtTime(bellVol, now + idx * 0.03);
    bellGain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2 + idx * 0.2);

    bellOsc.connect(bellGain);
    bellGain.connect(ctx.destination);

    bellOsc.start(now + idx * 0.03);
    bellOsc.stop(now + 1.5);
  });
}

export function playCelebrationFanfare(muted: boolean = false) {
  if (muted) return;
  const ctx = getAudioContext();
  if (!ctx) return;

  const now = ctx.currentTime;
  const notes = [
    { freq: 440.0, time: 0.0, dur: 0.12 },  // A4
    { freq: 554.37, time: 0.12, dur: 0.12 }, // C#5
    { freq: 659.25, time: 0.24, dur: 0.16 }, // E5
    { freq: 880.0, time: 0.38, dur: 0.45 },  // A5
  ];

  notes.forEach((note) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(note.freq, now + note.time);

    gain.gain.setValueAtTime(0.28, now + note.time);
    gain.gain.exponentialRampToValueAtTime(0.001, now + note.time + note.dur);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now + note.time);
    osc.stop(now + note.time + note.dur + 0.05);
  });
}
