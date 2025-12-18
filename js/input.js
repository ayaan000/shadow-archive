/**
 * Input Handler - Manages keyboard and mouse input
 */

export class InputHandler {
    constructor() {
        this.keys = {
            w: false,
            a: false,
            s: false,
            d: false,
            ArrowUp: false,
            ArrowLeft: false,
            ArrowDown: false,
            ArrowRight: false,
            j: false
        };

        this.journalToggled = false;

        // Bind keyboard events
        window.addEventListener('keydown', (e) => this.onKeyDown(e));
        window.addEventListener('keyup', (e) => this.onKeyUp(e));
    }

    onKeyDown(e) {
        const key = e.key.toLowerCase();

        if (key in this.keys) {
            this.keys[key] = true;
        }

        // Toggle journal with J
        if (key === 'j' && !this.journalToggled) {
            this.journalToggled = true;
        }
    }

    onKeyUp(e) {
        const key = e.key.toLowerCase();

        if (key in this.keys) {
            this.keys[key] = false;
        }

        if (key === 'j') {
            this.journalToggled = false;
        }
    }

    // Get movement direction
    getMovement() {
        let dx = 0;
        let dy = 0;

        if (this.keys.w || this.keys.ArrowUp) dy -= 1;
        if (this.keys.s || this.keys.ArrowDown) dy += 1;
        if (this.keys.a || this.keys.ArrowLeft) dx -= 1;
        if (this.keys.d || this.keys.ArrowRight) dx += 1;

        // Normalize diagonal movement
        if (dx !== 0 && dy !== 0) {
            const length = Math.sqrt(dx * dx + dy * dy);
            dx /= length;
            dy /= length;
        }

        return { dx, dy };
    }

    wasJournalToggled() {
        return this.journalToggled;
    }
}
