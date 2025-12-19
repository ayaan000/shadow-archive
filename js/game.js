/**
 * Game - Main game class managing the game loop and all systems
 */

import { Player } from './player.js';
import { World } from './world.js';
import { Entity } from './entities.js';
import { InputHandler } from './input.js';
import { Journal } from './journal.js';
import { AudioManager } from './audio.js';
import { ENTITIES, REGIONS } from '../data/content.js';

export class Game {
    constructor(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');

        // Resize canvas to fill window
        this.resizeCanvas();
        window.addEventListener('resize', () => this.resizeCanvas());

        // Initialize systems
        this.input = new InputHandler();
        this.world = new World();
        this.journal = new Journal();
        this.audio = new AudioManager();

        // Initialize player at center of first region
        const startX = REGIONS.forest.width / 2;
        const startY = REGIONS.forest.height / 2;
        this.player = new Player(startX, startY);

        // Camera follows player
        this.camera = {
            x: this.player.x - this.canvas.width / 2,
            y: this.player.y - this.canvas.height / 2
        };

        // Initialize entities for current region
        this.entities = [];
        this.loadRegionEntities('forest');

        // Load previous progress
        this.loadSavedProgress();

        // Game state
        this.lastTime = 0;
        this.running = true;
        this.pendingBossTransition = false;

        // Start ambient audio
        this.audio.playAmbience('forest');

        // Update UI
        this.updateRegionUI();

        // Start game loop
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    loadRegionEntities(regionId) {
        const regionConfig = REGIONS[regionId];
        const entityData = ENTITIES[regionId] || [];

        this.entities = entityData.map(data => {
            const entity = new Entity(data, regionConfig);
            this.journal.addEntry(entity.toJournalEntry());
            return entity;
        });
    }

    loadSavedProgress() {
        const discovered = this.journal.getDiscoveredIds();
        discovered.forEach(id => {
            this.journal.markDiscovered(id);
            const entity = this.entities.find(e => e.id === id);
            if (entity) {
                entity.discovered = true;
                entity.revealProgress = 1;
            }
        });
    }

    gameLoop(currentTime) {
        if (!this.running) return;

        // Calculate delta time in seconds
        const deltaTime = this.lastTime ? (currentTime - this.lastTime) / 1000 : 0;
        this.lastTime = currentTime;

        // Update game state
        this.update(deltaTime);

        // Render everything
        this.render();

        // Continue loop
        requestAnimationFrame((time) => this.gameLoop(time));
    }

    update(deltaTime) {
        // Handle journal toggle
        if (this.input.wasJournalToggled()) {
            this.journal.toggle();

            // If we closed the journal and have a pending boss transition
            if (!this.journal.isOpen && this.pendingBossTransition) {
                this.pendingBossTransition = false;
                this.triggerRegionTransition();
            }
        }

        // Check if journal was closed by clicking X
        if (this.pendingBossTransition && !this.journal.isOpen) {
            this.pendingBossTransition = false;
            this.triggerRegionTransition();
        }

        // Don't update game when journal is open
        if (this.journal.isOpen) return;

        // Update player
        this.player.update(this.input, this.world.getBounds());

        // Update camera to follow player
        this.updateCamera();

        // Update entities and check for discoveries
        const playerPos = this.player.getPosition();
        this.entities.forEach(entity => {
            const justDiscovered = entity.update(playerPos, deltaTime);

            if (justDiscovered) {
                this.onEntityDiscovered(entity);
            }
        });

        // Update world (handles transitions)
        const transitionComplete = this.world.update(deltaTime);
        if (transitionComplete) {
            this.onRegionChanged();
        }
    }

    updateCamera() {
        this.camera.x = this.player.x - this.canvas.width / 2;
        this.camera.y = this.player.y - this.canvas.height / 2;
    }

    render() {
        // Clear canvas
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

        // Render world background
        this.world.render(this.ctx, this.camera, this.canvas.width, this.canvas.height);

        // Render entities
        this.entities.forEach(entity => {
            entity.render(this.ctx, this.camera);
        });

        // Render player
        this.player.render(this.ctx, this.camera);
    }

    onEntityDiscovered(entity) {
        console.log('Discovered:', entity.name);

        // Update journal
        this.journal.markDiscovered(entity.id);

        // Play discovery sound
        this.audio.playDiscovery(entity.isBoss);

        // Check if boss - trigger specific logic
        if (entity.isBoss) {
            setTimeout(() => {
                this.journal.open();
                this.pendingBossTransition = true;
            }, 500);
        }
    }

    triggerRegionTransition() {
        const currentRegion = this.world.getCurrentRegion();
        if (currentRegion.nextRegion) {
            this.world.startTransition(currentRegion.nextRegion);
        }
    }

    onRegionChanged() {
        const newRegion = this.world.getCurrentRegion();
        console.log('Entered region:', newRegion.name);

        // Load new region entities
        this.loadRegionEntities(newRegion.id);
        this.loadSavedProgress();

        // Update audio
        this.audio.stopAmbience();
        setTimeout(() => {
            this.audio.playAmbience(newRegion.id);
        }, 500);

        // Move player to start of new region
        this.player.x = 200;
        this.player.y = newRegion.height / 2;

        // Update UI
        this.updateRegionUI();
    }

    updateRegionUI() {
        const regionName = document.getElementById('region-name');
        if (regionName) {
            regionName.textContent = this.world.getCurrentRegion().name;
        }
    }
}
