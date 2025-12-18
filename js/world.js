/**
 * World - Manages regions, rendering, and transitions
 */

import { REGIONS } from '../data/content.js';

export class World {
    constructor() {
        this.currentRegion = REGIONS.forest;
        this.transitionProgress = 0;
        this.transitioning = false;
        this.nextRegion = null;
    }

    update(deltaTime) {
        if (this.transitioning) {
            this.transitionProgress += deltaTime * 0.5;

            if (this.transitionProgress >= 1) {
                this.currentRegion = this.nextRegion;
                this.transitioning = false;
                this.transitionProgress = 0;
                return true; // Transition complete
            }
        }
        return false;
    }

    render(ctx, camera, canvasWidth, canvasHeight) {
        // Fill with region background color
        ctx.fillStyle = this.currentRegion.bgColor;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Add subtle ambient particles/stars
        this.renderAmbience(ctx, camera, canvasWidth, canvasHeight);

        // Render subtle grid or texture
        this.renderTexture(ctx, camera, canvasWidth, canvasHeight);
    }

    renderAmbience(ctx, camera, width, height) {
        // Draw floating particles based on region
        const particleCount = 30;
        const time = Date.now() * 0.0003;

        ctx.fillStyle = this.currentRegion.accentColor;

        for (let i = 0; i < particleCount; i++) {
            const seed = i * 1000;
            const x = ((seed + camera.x * 0.1 + time * 20) % this.currentRegion.width) - camera.x;
            const y = ((seed * 1.5 + camera.y * 0.1 + Math.sin(time + i) * 50) % this.currentRegion.height) - camera.y;
            const size = 1 + Math.sin(time * 2 + i) * 0.5;

            if (x >= 0 && x <= width && y >= 0 && y <= height) {
                ctx.globalAlpha = 0.3 + Math.sin(time * 3 + i) * 0.2;
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.fill();
            }
        }

        ctx.globalAlpha = 1;
    }

    renderTexture(ctx, camera, width, height) {
        // Subtle grid pattern
        ctx.strokeStyle = this.currentRegion.accentColor;
        ctx.globalAlpha = 0.05;
        ctx.lineWidth = 1;

        const gridSize = 100;
        const startX = -(camera.x % gridSize);
        const startY = -(camera.y % gridSize);

        for (let x = startX; x < width; x += gridSize) {
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, height);
            ctx.stroke();
        }

        for (let y = startY; y < height; y += gridSize) {
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }

        ctx.globalAlpha = 1;
    }

    startTransition(regionId) {
        if (REGIONS[regionId]) {
            this.nextRegion = REGIONS[regionId];
            this.transitioning = true;
            this.transitionProgress = 0;
        }
    }

    getCurrentRegion() {
        return this.currentRegion;
    }

    getBounds() {
        return {
            width: this.currentRegion.width,
            height: this.currentRegion.height
        };
    }
}
