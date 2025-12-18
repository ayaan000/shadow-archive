/**
 * Main Entry Point - The Shadow Archive
 * Initializes and starts the game
 */

import { Game } from './game.js';

// Wait for DOM to be ready
window.addEventListener('DOMContentLoaded', () => {
    console.log('The Shadow Archive - Initializing...');

    const canvas = document.getElementById('game-canvas');

    if (!canvas) {
        console.error('Canvas element not found!');
        return;
    }

    // Create and start the game
    const game = new Game(canvas);

    console.log('Game started. Use WASD to move, J to open journal.');
});
