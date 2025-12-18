/**
 * Audio Manager - Handles ambient sounds and discovery cues
 * Uses Web Audio API for procedural sound generation
 */

export class AudioManager {
    constructor() {
        this.audioContext = null;
        this.initialized = false;
        this.currentAmbience = null;

        // Initialize on first user interaction (browser requirement)
        document.addEventListener('click', () => this.init(), { once: true });
        document.addEventListener('keydown', () => this.init(), { once: true });
    }

    init() {
        if (this.initialized) return;

        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
            this.initialized = true;
            console.log('Audio initialized');
        } catch (e) {
            console.warn('Web Audio not supported:', e);
        }
    }

    // Play ambient drone for a region
    playAmbience(regionId) {
        if (!this.initialized || !this.audioContext) return;

        // Stop current ambience
        this.stopAmbience();

        // Create oscillators for ambient drone
        const oscillator1 = this.audioContext.createOscillator();
        const oscillator2 = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();

        // Different frequencies based on region
        const frequencies = {
            forest: [110, 165],    // A2, E3 - earthy
            ice: [130.81, 196],    // C3, G3 - cold
            ruins: [98, 146.83],   // G2, D3 - ancient
            void: [82.41, 123.47]  // E2, B2 - deep
        };

        const [freq1, freq2] = frequencies[regionId] || frequencies.forest;

        oscillator1.type = 'sine';
        oscillator1.frequency.setValueAtTime(freq1, this.audioContext.currentTime);

        oscillator2.type = 'sine';
        oscillator2.frequency.setValueAtTime(freq2, this.audioContext.currentTime);

        // Very quiet ambient
        gainNode.gain.setValueAtTime(0, this.audioContext.currentTime);
        gainNode.gain.linearRampToValueAtTime(0.03, this.audioContext.currentTime + 2);

        oscillator1.connect(gainNode);
        oscillator2.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator1.start();
        oscillator2.start();

        this.currentAmbience = { oscillator1, oscillator2, gainNode };
    }

    stopAmbience() {
        if (this.currentAmbience) {
            try {
                const { oscillator1, oscillator2, gainNode } = this.currentAmbience;
                const fadeTime = this.audioContext.currentTime + 1;

                gainNode.gain.linearRampToValueAtTime(0, fadeTime);
                oscillator1.stop(fadeTime);
                oscillator2.stop(fadeTime);
            } catch (e) {
                // Oscillator might already be stopped
            }
            this.currentAmbience = null;
        }
    }

    // Play discovery sound
    playDiscovery(isBoss = false) {
        if (!this.initialized || !this.audioContext) return;

        const now = this.audioContext.currentTime;

        // Create a bell-like discovery sound
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        const filter = this.audioContext.createBiquadFilter();

        oscillator.type = 'sine';
        const baseFreq = isBoss ? 523.25 : 880; // C5 for boss, A5 for normal
        oscillator.frequency.setValueAtTime(baseFreq, now);
        oscillator.frequency.exponentialRampToValueAtTime(baseFreq * 0.5, now + 0.5);

        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(2000, now);
        filter.Q.setValueAtTime(1, now);

        gainNode.gain.setValueAtTime(0.2, now);
        gainNode.gain.exponentialRampToValueAtTime(0.01, now + 1);

        oscillator.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(this.audioContext.destination);

        oscillator.start(now);
        oscillator.stop(now + 1);

        // Add second harmonic for richness
        if (isBoss) {
            const osc2 = this.audioContext.createOscillator();
            const gain2 = this.audioContext.createGain();

            osc2.type = 'triangle';
            osc2.frequency.setValueAtTime(baseFreq * 1.5, now);

            gain2.gain.setValueAtTime(0.1, now);
            gain2.gain.exponentialRampToValueAtTime(0.01, now + 1.2);

            osc2.connect(gain2);
            gain2.connect(this.audioContext.destination);

            osc2.start(now + 0.1);
            osc2.stop(now + 1.2);
        }
    }
}
