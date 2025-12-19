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
        this.revealProgress = 0;

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
                this.y = this.initialY + Math.sin(time + this.moveOffset) * 10;
            } else {
                this.x = this.initialX + Math.sin(time * this.moveSpeed + this.moveOffset) * 30;
                this.y = this.initialY + Math.cos(time * this.moveSpeed * 0.7 + this.moveOffset) * 20;
            }
        }

        // Check distance to player for discovery
        const distance = this.distanceTo(playerPos.x, playerPos.y);
        const detectionRadius = this.isBoss ? 250 : 150;

        // Gradually reveal when player is near
        if (distance < detectionRadius) {
            this.revealProgress = Math.min(1, this.revealProgress + deltaTime * 0.8);

            if (this.revealProgress >= 1 && !this.discovered) {
                this.discovered = true;
                return true;
            }
        } else {
            if (!this.discovered) {
                this.revealProgress = Math.max(0, this.revealProgress - deltaTime * 0.5);
            }
        }

        return false;
    }

    distanceTo(x, y) {
        const dx = this.x - x;
        const dy = this.y - y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    render(ctx, camera) {
        const screenX = this.x - camera.x;
        const screenY = this.y - camera.y;

        // Don't render if off-screen
        if (screenX < -200 || screenX > ctx.canvas.width + 200 ||
            screenY < -200 || screenY > ctx.canvas.height + 200) {
            return;
        }

        const shadowOpacity = 0.6 + this.revealProgress * 0.4;
        const pulse = this.discovered ? 1 : (0.9 + Math.sin(Date.now() * 0.003 + this.x) * 0.1);
        const displaySize = this.size * pulse;

        // Simple glow (no gradient for performance)
        const glowSize = displaySize * 2;
        ctx.globalAlpha = this.discovered ? 0.2 : 0.1;
        ctx.fillStyle = this.glowColor;
        ctx.beginPath();
        ctx.arc(screenX, screenY, glowSize, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;

        // Draw entity sprite
        ctx.save();
        if (!this.discovered) {
            const blurAmount = 3 * (1 - this.revealProgress);
            ctx.filter = `blur(${blurAmount}px)`;
        }

        this.renderSprite(ctx, screenX, screenY, displaySize, shadowOpacity);

        ctx.restore();

        // Pulsing outer ring for discovered bosses
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
        const spriteKey = this.data.sprite || 'cat';
        const sprite = SPRITES[spriteKey] || SPRITES.cat;

        const pixelSize = (size * 2) / Math.max(sprite.width, sprite.height);

        const startX = x - (sprite.width * pixelSize) / 2;
        const startY = y - (sprite.height * pixelSize) / 2;

        const frameIndex = this.moving ? Math.floor(Date.now() / 500) % sprite.frames.length : 0;
        const frame = sprite.frames[frameIndex];

        ctx.globalAlpha = opacity;

        for (let row = 0; row < frame.length; row++) {
            const rowStr = frame[row];
            for (let col = 0; col < rowStr.length; col++) {
                const char = rowStr[col];
                if (char === ' ' || char === '.') continue;

                if (this.discovered) {
                    if (char === 'x') ctx.fillStyle = this.accentColor;
                    else if (char === 'o') ctx.fillStyle = this.glowColor;
                    else ctx.fillStyle = '#ffffff';
                } else {
                    ctx.fillStyle = this.glowColor;
                }

                ctx.fillRect(
                    startX + col * pixelSize,
                    startY + row * pixelSize,
                    pixelSize + 0.5,
                    pixelSize + 0.5
                );
            }
        }

        ctx.globalAlpha = 1;
    }
}
