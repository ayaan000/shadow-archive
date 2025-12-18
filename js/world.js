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

        // Generate terrain features for current region
        this.terrainFeatures = this.generateTerrainFeatures();
    }

    generateTerrainFeatures() {
        const features = [];
        const region = this.currentRegion;

        // Generate random terrain features based on region
        const featureCount = 30 + Math.floor(Math.random() * 20);

        for (let i = 0; i < featureCount; i++) {
            features.push({
                x: Math.random() * region.width,
                y: Math.random() * region.height,
                type: Math.floor(Math.random() * 3), // 0=tree, 1=rock, 2=grass
                size: 20 + Math.random() * 40,
                seed: Math.random() * 1000
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
                return true; // Transition complete
            }
        }
        return false;
    }

    render(ctx, camera, canvasWidth, canvasHeight) {
        // Fill with region background color
        ctx.fillStyle = this.currentRegion.bgColor;
        ctx.fillRect(0, 0, canvasWidth, canvasHeight);

        // Render terrain features first (behind entities)
        this.renderTerrainFeatures(ctx, camera);

        // Add subtle ambient particles/stars
        this.renderAmbience(ctx, camera, canvasWidth, canvasHeight);

        // Render atmospheric fog
        this.renderFog(ctx, camera, canvasWidth, canvasHeight);
    }

    renderTerrainFeatures(ctx, camera) {
        const region = this.currentRegion;

        this.terrainFeatures.forEach(feature => {
            const screenX = feature.x - camera.x;
            const screenY = feature.y - camera.y;

            // Only render if on screen (with margin)
            if (screenX < -100 || screenX > ctx.canvas.width + 100 ||
                screenY < -100 || screenY > ctx.canvas.height + 100) {
                return;
            }

            ctx.save();
            ctx.globalAlpha = 0.2 + Math.random() * 0.1;

            if (feature.type === 0) {
                // Tree-like shapes
                ctx.fillStyle = region.accentColor;
                ctx.beginPath();
                ctx.moveTo(screenX, screenY - feature.size);
                ctx.lineTo(screenX + feature.size * 0.4, screenY);
                ctx.lineTo(screenX - feature.size * 0.4, screenY);
                ctx.closePath();
                ctx.fill();

                // Trunk
                ctx.fillStyle = region.accentColor;
                ctx.globalAlpha = 0.15;
                ctx.fillRect(screenX - 5, screenY, 10, feature.size * 0.3);
            } else if (feature.type === 1) {
                // Rock-like shapes
                ctx.fillStyle = region.accentColor;
                ctx.beginPath();
                const sides = 5 + Math.floor(feature.seed % 3);
                for (let i = 0; i < sides; i++) {
                    const angle = (i / sides) * Math.PI * 2;
                    const radius = feature.size * 0.5 * (0.8 + Math.sin(feature.seed + i) * 0.2);
                    const x = screenX + Math.cos(angle) * radius;
                    const y = screenY + Math.sin(angle) * radius;
                    if (i === 0) ctx.moveTo(x, y);
                    else ctx.lineTo(x, y);
                }
                ctx.closePath();
                ctx.fill();
            } else {
                // Grass/shrub
                ctx.strokeStyle = region.accentColor;
                ctx.lineWidth = 2;
                for (let i = 0; i < 5; i++) {
                    const offset = (i - 2) * 8;
                    ctx.beginPath();
                    ctx.moveTo(screenX + offset, screenY);
                    ctx.lineTo(screenX + offset + Math.sin(feature.seed + i) * 3,
                        screenY - feature.size * 0.4);
                    ctx.stroke();
                }
            }

            ctx.restore();
        });
    }

    renderFog(ctx, camera, width, height) {
        // Vignette effect
        const gradient = ctx.createRadialGradient(
            width / 2, height / 2, width * 0.2,
            width / 2, height / 2, width * 0.7
        );
        gradient.addColorStop(0, 'rgba(0, 0, 0, 0)');
        gradient.addColorStop(1, this.currentRegion.bgColor + 'aa');

        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
    }

    renderAmbience(ctx, camera, width, height) {
        // Draw floating particles based on region
        const particleCount = 50;
        const time = Date.now() * 0.0003;

        ctx.fillStyle = this.currentRegion.glowColor;

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
