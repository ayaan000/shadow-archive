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

        // Don't render if off-screen
        if (screenX < -200 || screenX > ctx.canvas.width + 200 ||
            screenY < -200 || screenY > ctx.canvas.height + 200) {
            return;
        }

        // Determine opacity based on reveal progress
        // Even undiscovered entities should be quite visible as shadows
        const shadowOpacity = 0.6 + this.revealProgress * 0.4; // Increased from 0.3
        const blurAmount = 10 * (1 - this.revealProgress); // Reduced blur

        // Pulsing effect for undiscovered entities
        const pulse = this.discovered ? 1 : (0.85 + Math.sin(Date.now() * 0.002 + this.x) * 0.15);
        const displaySize = this.size * pulse;

        // Draw larger outer glow for ALL entities (not just revealed)
        const glowSize = displaySize * 2;
        const glowOpacity = this.discovered ? 0.4 : 0.2;
        const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, glowSize);

        if (this.revealProgress > 0.1) {
            gradient.addColorStop(0, this.glowColor + Math.floor(100 * glowOpacity).toString(16).padStart(2, '0'));
            gradient.addColorStop(0.5, this.glowColor + Math.floor(50 * glowOpacity).toString(16).padStart(2, '0'));
        } else {
            gradient.addColorStop(0, 'rgba(100, 100, 120, ' + (glowOpacity * 0.5) + ')');
            gradient.addColorStop(0.5, 'rgba(100, 100, 120, ' + (glowOpacity * 0.2) + ')');
        }
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(screenX - glowSize, screenY - glowSize, glowSize * 2, glowSize * 2);

        // Draw entity shape with less blur
        ctx.save();
        ctx.filter = `blur(${blurAmount}px)`;

        if (this.isBoss) {
            // Boss: Large imposing shape
            this.renderBoss(ctx, screenX, screenY, shadowOpacity, displaySize);
        } else if (this.type === 'creature') {
            // Creature: Organic flowing shape
            this.renderCreature(ctx, screenX, screenY, shadowOpacity, displaySize);
        } else {
            // Artifact: Geometric shape
            this.renderArtifact(ctx, screenX, screenY, shadowOpacity, displaySize);
        }

        ctx.restore();

        // Pulsing outer ring for discovered entities
        if (this.discovered) {
            const ringPulse = 0.8 + Math.sin(Date.now() * 0.003) * 0.2;
            ctx.globalAlpha = ringPulse * 0.4;
            ctx.strokeStyle = this.glowColor;
            ctx.lineWidth = 3;
            ctx.beginPath();
            ctx.arc(screenX, screenY, displaySize * 1.3, 0, Math.PI * 2);
            ctx.stroke();
            ctx.globalAlpha = 1;
        }

        // Add discovery indicator (question mark for undiscovered, exclamation for discovered)
        if (!this.discovered && this.revealProgress < 0.5) {
            ctx.save();
            ctx.globalAlpha = 0.6 * (1 - this.revealProgress * 2);
            ctx.fillStyle = '#ffffff';
            ctx.font = `${displaySize * 0.8}px Arial`;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText('?', screenX, screenY);
            ctx.restore();
        }
    }

    renderBoss(ctx, x, y, opacity, size) {
        // Large multi-layered shadow creature
        const color = this.revealProgress > 0.5 ? this.glowColor : '#8899aa';

        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;

        // Outer layer - menacing shape
        ctx.beginPath();
        for (let i = 0; i < 8; i++) {
            const angle = (i / 8) * Math.PI * 2;
            const radius = size + Math.sin(Date.now() * 0.001 + i) * (size * 0.15);
            const px = x + Math.cos(angle) * radius;
            const py = y + Math.sin(angle) * radius;
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();

        // Middle layer
        ctx.globalAlpha = opacity * 0.8;
        ctx.beginPath();
        ctx.arc(x, y, size * 0.6, 0, Math.PI * 2);
        ctx.fill();

        // Inner core
        ctx.fillStyle = this.revealProgress > 0.7 ? '#ffffff' : color;
        ctx.globalAlpha = opacity * 0.6;
        ctx.beginPath();
        ctx.arc(x, y, size * 0.3, 0, Math.PI * 2);
        ctx.fill();

        ctx.globalAlpha = 1;
    }

    renderCreature(ctx, x, y, opacity, size) {
        // Organic blob-like shape - more visible
        const color = this.revealProgress > 0.5 ? this.glowColor : '#7788aa';

        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.beginPath();

        for (let i = 0; i <= 6; i++) {
            const angle = (i / 6) * Math.PI * 2;
            const offset = Math.sin(Date.now() * 0.002 + i) * (size * 0.2);
            const px = x + Math.cos(angle) * (size + offset);
            const py = y + Math.sin(angle) * (size + offset);
            if (i === 0) ctx.moveTo(px, py);
            else ctx.lineTo(px, py);
        }
        ctx.closePath();
        ctx.fill();

        // Add some internal detail
        if (this.revealProgress > 0.3) {
            ctx.globalAlpha = opacity * 0.5;
            ctx.beginPath();
            ctx.arc(x, y, size * 0.5, 0, Math.PI * 2);
            ctx.fill();
        }

        ctx.globalAlpha = 1;
    }

    renderArtifact(ctx, x, y, opacity, size) {
        // Geometric crystalline shape - brighter default color
        const color = this.revealProgress > 0.5 ? this.glowColor : '#6677bb';

        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;

        // Draw diamond/crystal
        ctx.beginPath();
        ctx.moveTo(x, y - size);
        ctx.lineTo(x + size * 0.6, y);
        ctx.lineTo(x, y + size);
        ctx.lineTo(x - size * 0.6, y);
        ctx.closePath();
        ctx.fill();

        // Inner facets
        ctx.fillStyle = this.revealProgress > 0.3 ? this.glowColor : this.accentColor;
        ctx.globalAlpha = opacity * 0.7;
        ctx.beginPath();
        ctx.moveTo(x, y - size * 0.5);
        ctx.lineTo(x + size * 0.3, y);
        ctx.lineTo(x, y + size * 0.5);
        ctx.lineTo(x - size * 0.3, y);
        ctx.closePath();
        ctx.fill();

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
