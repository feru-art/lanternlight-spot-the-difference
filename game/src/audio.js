// Lanternlight — synthesized sounds: no audio files, every note is made by the
// Web Audio oscillator at play time, so the game ships no sound assets at all.

export function createLanternlightAudio() {
  let audioContext = null;

  function ensureAudioContext() {
    if (audioContext) return audioContext;
    try {
      const Ctor = window.AudioContext ?? window.webkitAudioContext;
      if (!Ctor) return null;
      audioContext = new Ctor();
    } catch {
      return null;
    }
    return audioContext;
  }

  function playTone(frequency, startAt, length, kind, loudness) {
    const ctx = ensureAudioContext();
    if (!ctx) return;
    try {
      if (ctx.state === 'suspended') void ctx.resume();
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = kind;
      oscillator.frequency.value = frequency;
      gain.gain.setValueAtTime(0.0001, ctx.currentTime + startAt);
      gain.gain.exponentialRampToValueAtTime(loudness, ctx.currentTime + startAt + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + startAt + length);
      oscillator.connect(gain).connect(ctx.destination);
      oscillator.start(ctx.currentTime + startAt);
      oscillator.stop(ctx.currentTime + startAt + length + 0.05);
    } catch {
      // Silence is fine: a missing beep never breaks the game.
    }
  }

  // A warm two-note chime when a difference is found.
  function playFoundChime() {
    playTone(659.25, 0, 0.16, 'sine', 0.12);
    playTone(987.77, 0.09, 0.26, 'sine', 0.12);
  }

  // A soft low thud for a wrong click.
  function playWrongThud() {
    playTone(140, 0, 0.18, 'triangle', 0.1);
  }

  // A rising arpeggio when a scene is completed.
  function playSceneCompleteArpeggio() {
    [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
      playTone(freq, i * 0.11, 0.24, 'sine', 0.11);
    });
  }

  function unlockOnFirstGesture() {
    ensureAudioContext();
  }

  return { playFoundChime, playWrongThud, playSceneCompleteArpeggio, unlockOnFirstGesture };
}
