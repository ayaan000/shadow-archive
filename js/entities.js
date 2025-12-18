/**
 * Entity - Discoverable creatures, artifacts, and bosses in the world
 */

export class Entity {
    constructor(data, regionConfig) {
        // Core properties
        this.id = data.id;
        this.name = data.name;
        this.type = data.type;
        this.region = data.region;
        this.description = data.description;

        // Position and rendering
        this.x = data.x;
        this.y = data.y;
        this.size = data.size;
        this.isBoss = data.isBoss;
        this.moving = data.moving;

        // Discovery state
        this.discovered = false;
        this.revealProgress = 0; // 0 = shadow, 1= fully revealed

        // Movement (for moving entities)
        this.moveAngle = Math.random() * Math.PI * 2;
        this.moveSpeed = this.moving ? 0.5 + Math.random() * 0.5 : 0;
        this.moveTimer = 0;

        // Visual properties from region
        this.glowColor = regionConfig.glowColor;
        this.accentColor = regionConfig.accentColor;
    }

    update(playerPos, deltaTime) {
        // Check distance to player for discovery
        const distance = this.distanceTo(playerPos.x, playerPos.y);
        const detectionRadius = this.isBoss ? 150 : 100;

        // Gradually reveal when player is near
        if (distance < detectionRadius) {
            this.revealProgress = Math.min(1, this.revealProgress + deltaTime * 0.5);

            // Mark as discovered when fully revealed
            if (this.revealProgress >= 1 && !this.discovered) {
                this.discovered = true;
                return true; // Signal that discovery just happened
            }
        } else {
            // Fade back to shadow when player moves away (but stay discovered)
            if (!this.discovered) {
                this.revealProgress = Math.max(0, this.revealProgress - deltaTime * 0.3);
            }
        }

        // Movement for moving entities
        if (this.moving) {
            this.moveTimer += deltaTime;

            // Change direction occasionally
            if (this.moveTimer > 3) {
                this.moveAngle += (Math.random() - 0.5) * Math.PI * 0.5;
                this.moveTimer = 0;
            }

            this.x += Math.cos(this.moveAngle) * this.moveSpeed;
            this.y += Math.sin(this.moveAngle) * this.moveSpeed;
        }

        return false;
    }

    render(ctx, camera) {
        const screenX = this.x - camera.x;
        const screenY = this.y - camera.y;

        // Determine opacity based on reveal progress
        const shadowOpacity = 0.3 + this.revealProgress * 0.7;
        const blurAmount = 20 * (1 - this.revealProgress);

        // Draw glow for revealed entities
        if (this.revealProgress > 0.3) {
            const glowSize = this.size * (1.5 + this.revealProgress * 0.5);
            const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, glowSize);
            gradient.addColorStop(0, this.glowColor + Math.floor(100 * this.revealProgress).toString(16).padStart(2, '0'));
            gradient.addColorStop(1, this.glowColor + '00');

            ctx.fillStyle = gradient;
            ctx.fillRect(screenX - glowSize, screenY - glowSize, glowSize * 2, glowSize * 2);
        }

        // Draw entity shape
        ctx.save();
        ctx.filter = `blur(${blurAmount}px)`;

        if (this.isBoss) {
            // Boss: Large imposing shape
            this.renderBoss(ctx, screenX, screenY, shadowOpacity);
        } else if (this.type === 'creature') {
            // Creature: Organic flowing shape
            this.renderCreature(ctx, screenX, screenY, shadowOpacity);
        } else {
            // Artifact: Geometric shape
            this.renderArtifact(ctx, screenX, screenY, shadowOpacity);
        }

        ctx.restore();

        // Pulsing effect for discovered entities
        if (this.discovered) {
            const pulse = 0.8 + Math.sin(Date.now() * 0.003) * 0.2;
            ctx.globalAlpha = pulse * 0.3;
            ctx.strokeStyle = this.glowColor;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(screenX, screenY, this.size * 1.2, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
        }
    }

    renderBoss(ctx, x, y, opacity) {
        // Large multi-layered shadow creature
        const color = this.revealProgress > 0.5 ? this.glowColor : '#1a1a1a';

        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;

        // Outer layer
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const radius = this.size + Math.sin(Date.now() * 0.001 + i) * 5;
            const px = x + Math.cos(angle) * radius;
            const py = y + Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();

        // Inner core
        ctx.fillStyle = this.revealProgress > 0.7 ? '#ffffff' : color;
        ctx.beginPath();
        ctx.arc(x, y, this.size * 0.4, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;
    }

    renderCreature(ctx, x, y, opacity) {
        // Organic blob-like shape
        const color = this.revealProgress > 0.5 ? this.glowColor : '#1a1a1a';

        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.beginPath();

        for (let i = 0; i < 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const offset = Math.sin(Date.now() * 0.002 + i) * 3;
            const px = x + Math.cos(angle) * (this.size + offset);
            const py = y + Math.sin(angle) * (this.size + offset);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();
        ctx.globalAlpha = 1;
    }

    renderArtifact(ctx, x, y, opacity) {
        // Geometric crystalline shape
        const color = this.revealProgress > 0.5 ? this.glowColor : '#1a1a1a';

        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;

        // Draw diamond/crystal
        ctx.beginPath();
        ctx.moveTo(x, y - this.size);
        ctx.lineTo(x + this.size * 0.6, y);
        ctx.lineTo(x, y + this.size);
        ctx.lineTo(x - this.size * 0.6, y);
        ctx.closePath();
        ctx.fill();

        // Inner facets
        if (this.revealProgress > 0.5) {
            ctx.fillStyle = this.accentColor;
            ctx.globalAlpha = opacity * 0.7;
            ctx.beginPath();
            ctx.moveTo(x, y - this.size * 0.5);
            ctx.lineTo(x + this.size * 0.3, y);
            ctx.lineTo(x, y + this.size * 0.5);
            ctx.lineTo(x - this.size * 0.3, y);
            ctx.closePath();
            ctx.fill();
        }

        ctx.globalAlpha = 1;
    }

    distanceTo(x, y) {
        const dx = this.x - x;
        const dy = this.y - y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    toJournalEntry() {
        return {
            id: this.id,
            name: this.name,
            region: this.region,
            description: this.description,
            discovered: this.discovered
        };
    }
}
