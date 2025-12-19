/**
 * World - Manages regions, rendering, and transitions
 * OPTIMIZED version with cached values and reduced per-frame calculations
 */

import { REGIONS } from '../data/content.js';

export class World {
    constructor() {
        this.currentRegion = REGIONS.forest;
        this.transitionProgress = 0;
        this.transitioning = false;
        this.nextRegion = null;

        // Generate terrain features for current region
        this.terrainFeatures = this.generateTerrainFeatures();

        // Cache for fog gradient (recreated on resize)
        this.fogGradient = null;
        this.lastWidth = 0;
        this.lastHeight = 0;
    }

    generateTerrainFeatures() {
        const features = [];
        const region = this.currentRegion;

        // Reduced feature count for performance
        const featureCount = 20 + Math.floor(Math.random() * 15);

        for (let i = 0; i < featureCount; i++) {
            features.push({
                x: Math.random() * region.width,
                y: Math.random() * region.height,
                type: Math.floor(Math.random() * 3),
                size: 20 + Math.random() * 40,
                seed: Math.random() * 1000,
                opacity: 0.15 + Math.random() * 0.1 // Pre-calculated opacity
            });
        }

        return features;
    }

    update(deltaTime) {
        if (this.transitioning) {
            this.transitionProgress += deltaTime * 0.5;

            if (this.transitionProgress >= 1) {
                this.currentRegion = this.nextRegion;
                this.transitioning = false;
                this.transitionProgress = 0;
                this.terrainFeatures = this.generateTerrainFeatures();
                this.fogGradient = null; // Reset fog gradient
                return true;
            }
        }
        return false;
    }

    render(ctx, camera, canvasWidth, canvasHeight) {
        // Fill with region background color
        ctx.fillStyle = this.currentRegion.bgColor;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Render terrain features (optimized)
        this.renderTerrainFeatures(ctx, camera);

        // Render ambient particles (reduced count)
        this.renderAmbience(ctx, camera, canvasWidth, canvasHeight);

        // Render atmospheric fog (cached gradient)
        this.renderFog(ctx, canvasWidth, canvasHeight);
    }

    renderTerrainFeatures(ctx, camera) {
        const region = this.currentRegion;
        const cw = ctx.canvas.width;
        const ch = ctx.canvas.height;

        for (let i = 0; i < this.terrainFeatures.length; i++) {
            const feature = this.terrainFeatures[i];
            const screenX = feature.x - camera.x;
            const screenY = feature.y - camera.y;

            // Culling check
            if (screenX < -100 || screenX > cw + 100 ||
                screenY < -100 || screenY > ch + 100) {
                continue;
            }

            ctx.globalAlpha = feature.opacity;
            ctx.fillStyle = region.accentColor;

            if (feature.type === 0) {
                // Simple triangle for trees
                ctx.beginPath();
                ctx.moveTo(screenX, screenY - feature.size);
                ctx.lineTo(screenX + feature.size * 0.4, screenY);
                ctx.lineTo(screenX - feature.size * 0.4, screenY);
                ctx.closePath();
                ctx.fill();
            } else if (feature.type === 1) {
                // Simple circle for rocks
                ctx.beginPath();
                ctx.arc(screenX, screenY, feature.size * 0.4, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Simple lines for grass
                ctx.strokeStyle = region.accentColor;
                ctx.lineWidth = 2;
                ctx.beginPath();
                ctx.moveTo(screenX - 10, screenY);
                ctx.lineTo(screenX, screenY - feature.size * 0.3);
                ctx.moveTo(screenX + 10, screenY);
                ctx.lineTo(screenX, screenY - feature.size * 0.25);
                ctx.stroke();
            }
        }

        ctx.globalAlpha = 1;
    }

    renderFog(ctx, width, height) {
        // Cache fog gradient
        if (!this.fogGradient || this.lastWidth !== width || this.lastHeight !== height) {
            this.fogGradient = ctx.createRadialGradient(
                width / 2, height / 2, width * 0.2,
                width / 2, height / 2, width * 0.7
            );
            this.fogGradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
            this.fogGradient.addColorStop(1, this.currentRegion.bgColor + 'aa');
            this.lastWidth = width;
            this.lastHeight = height;
        }

        ctx.fillStyle = this.fogGradient;
        ctx.fillRect(0, 0, width, height);
    }

    renderAmbience(ctx, camera, width, height) {
        // Reduced particle count for performance
        const particleCount = 25;
        const time = Date.now() * 0.0003;

        ctx.fillStyle = this.currentRegion.glowColor;

        for (let i = 0; i < particleCount; i++) {
            const seed = i * 1000;
            const x = ((seed + camera.x * 0.1 + time * 20) % this.currentRegion.width) - camera.x;
            const y = ((seed * 1.5 + camera.y * 0.1 + Math.sin(time + i) * 50) % this.currentRegion.height) - camera.y;

            if (x >= 0 && x <= width && y >= 0 && y <= height) {
                ctx.globalAlpha = 0.3;
                ctx.beginPath();
                ctx.arc(x, y, 1.5, 0, Math.PI * 2);
                ctx.fill();
            }
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
