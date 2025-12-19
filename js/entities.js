import { SPRITES } from '../data/sprites.js';

/**
 * Entity - Discoverable game objects (creatures, artifacts, bosses)
 */
export class Entity {
    constructor(data, region) {
        this.data = data;
        this.region = region;
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.x = data.x;
        this.y = data.y;
        this.initialX = data.x;
        this.initialY = data.y;
        this.size = data.size;
        this.isBoss = data.isBoss || false;
        this.moving = data.moving || false;
        this.description = data.description;

        // State
        this.discovered = false;
        this.revealProgress = 0; // 0 to 1

        // Visuals
        this.glowColor = region.glowColor;
        this.accentColor = region.accentColor;
        this.moveOffset = Math.random() * 1000;
        this.moveSpeed = 0.5 + Math.random() * 0.5;
    }

    toJournalEntry() {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            region: this.region.name,
            discovered: false
        };
    }

    update(playerPos, deltaTime) {
        // Handle movement if entity is moving type
        if (this.moving) {
            const time = Date.now() * 0.001;

            if (this.isBoss) {
                // Bosses hover slowly
                this.y = this.initialY + Math.sin(time + this.moveOffset) * 10;
            } else {
                // Creatures wander slightly
                this.x = this.initialX + Math.sin(time * this.moveSpeed + this.moveOffset) * 30;
                this.y = this.initialY + Math.cos(time * this.moveSpeed * 0.7 + this.moveOffset) * 20;
            }
        }

        // Check distance to player for discovery
        const distance = this.distanceTo(playerPos.x, playerPos.y);
        const detectionRadius = this.isBoss ? 250 : 150; // Increased radius

        // Gradually reveal when player is near
        if (distance < detectionRadius) {
            this.revealProgress = Math.min(1, this.revealProgress + deltaTime * 0.8);

            // Mark as discovered when fully revealed
            if (this.revealProgress >= 1 && !this.discovered) {
                this.discovered = true;
                return true; // Signal that discovery just happened
            }
        }

        return false;
    }

    render(ctx, camera) {
        const screenX = this.x - camera.x;
        const screenY = this.y - camera.y;

        // Don't render if off-screen
        if (screenX < -200 || screenX > ctx.canvas.width + 200 ||
            screenY < -200 || screenY > ctx.canvas.height + 200) {
            return;
        }

        // Determine opacity based on reveal progress
        // Even undiscovered entities should be quite visible as shadows
        const shadowOpacity = 0.6 + this.revealProgress * 0.4;
        const blurAmount = 5 * (1 - this.revealProgress); // Less blur for pixel art

        // Pulsing effect for undiscovered entities
        const pulse = this.discovered ? 1 : (0.9 + Math.sin(Date.now() * 0.003 + this.x) * 0.1);
        const displaySize = this.size * pulse;

        // Draw glow
        const glowSize = displaySize * 2.5;
        const glowOpacity = this.discovered ? 0.3 : 0.15;
        const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, glowSize);

        if (this.revealProgress > 0.1) {
            gradient.addColorStop(0, this.glowColor + Math.floor(80 * glowOpacity).toString(16).padStart(2, '0'));
            gradient.addColorStop(0.5, this.glowColor + Math.floor(40 * glowOpacity).toString(16).padStart(2, '0'));
        } else {
            gradient.addColorStop(0, 'rgba(100, 100, 120, ' + (glowOpacity * 0.5) + ')');
        }
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(screenX - glowSize, screenY - glowSize, glowSize * 2, glowSize * 2);

        // Draw entity sprite
        ctx.save();
        if (!this.discovered) {
            ctx.filter = `blur(${blurAmount}px)`;
            ctx.fillStyle = '#000000'; // Pure shadow when not discovered
        }

        this.renderSprite(ctx, screenX, screenY, displaySize, shadowOpacity);

        ctx.restore();

        // Pulsing outer ring for discovered entities (boss only)
        if (this.discovered && this.isBoss) {
            const ringPulse = 0.8 + Math.sin(Date.now() * 0.003) * 0.2;
            ctx.globalAlpha = ringPulse * 0.4;
            ctx.strokeStyle = this.glowColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(screenX, screenY, displaySize * 1.5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
        }

        // Discovery indicator
        if (!this.discovered && this.revealProgress < 0.5) {
            ctx.save();
            ctx.globalAlpha = 0.8 * (1 - this.revealProgress * 2);
            ctx.fillStyle = '#ffffff';
            ctx.font = `${displaySize * 0.6}px monospace`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('?', screenX, screenY - displaySize * 1.2);
            ctx.restore();
        }
    }

    renderSprite(ctx, x, y, size, opacity) {
        // Get sprite data
        const spriteKey = this.data.sprite || 'cat'; // Fallback to cat
        const sprite = SPRITES[spriteKey] || SPRITES.cat;

        // Calculate pixel size
        const pixelSize = (size * 2) / Math.max(sprite.width, sprite.height);

        // Center the sprite
        const startX = x - (sprite.width * pixelSize) / 2;
        const startY = y - (sprite.height * pixelSize) / 2;

        // Determine frame for animation (if moving)
        const frameIndex = this.moving ? Math.floor(Date.now() / 500) % sprite.frames.length : 0;
        const frame = sprite.frames[frameIndex];

        // Set context alpha
        ctx.globalAlpha = opacity;

        // Draw pixels
        for (let row = 0; row < frame.length; row++) {
            const rowStr = frame[row]; // e.g. " ....xxx... "
            for (let col = 0; col < rowStr.length; col++) {
                const char = rowStr[col];
                if (char === ' ') continue; // Skip padding
                if (char === '.') continue; // Transparent

                // Determine color
                if (this.discovered) {
                    if (char === 'x') ctx.fillStyle = this.accentColor;
                    else if (char === 'o') ctx.fillStyle = this.glowColor; // Eyes/glows
                    else ctx.fillStyle = '#ffffff';
                } else {
                    // Silhouette mode
                    ctx.fillStyle = this.glowColor; // Use glow color for shadow shape
                }

                // Draw pixel rect
                ctx.fillRect(
                    startX + col * pixelSize,
                    startY + row * pixelSize,
                    pixelSize + 0.5, // +0.5 to prevent gap lines
                    pixelSize + 0.5
                );
            }
        }

        ctx.globalAlpha = 1;
    }

    distanceTo(x, y) {
        const dx = this.x - x;
        const dy = this.y - y;
        return Math.sqrt(dx * dx + dy * dy);
    }


}
