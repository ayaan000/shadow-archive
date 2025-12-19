/**
 * Player - The shadow explorer controlled by the user
 */

export class Player {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = 15;
        this.speed = 6; // Increased from 3 for faster gameplay
        this.detectionRadius = 100;
    }

    update(input, worldBounds) {
        const movement = input.getMovement();

        // Update position
        this.x += movement.dx * this.speed;
        this.y += movement.dy * this.speed;

        // Keep player within world bounds
        this.x = Math.max(this.size, Math.min(worldBounds.width - this.size, this.x));
        this.y = Math.max(this.size, Math.min(worldBounds.height - this.size, this.y));
    }

    render(ctx, camera) {
        const screenX = this.x - camera.x;
        const screenY = this.y - camera.y;

        // Draw player glow
        const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, this.size * 2);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 0.4)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

        ctx.fillStyle = gradient;
        ctx.fillRect(screenX - this.size * 2, screenY - this.size * 2, this.size * 4, this.size * 4);

        // Draw player core
        ctx.fillStyle = '#ffffff';
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 20;
        ctx.beginPath();
        ctx.arc(screenX, screenY, this.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;

        // Draw player "eyes" for direction
        ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
        ctx.beginPath();
        ctx.arc(screenX - 4, screenY - 3, 2, 0, Math.PI * 2);
        ctx.arc(screenX + 4, screenY - 3, 2, 0, Math.PI * 2);
        ctx.fill();
    }

    getPosition() {
        return { x: this.x, y: this.y };
    }

    distanceTo(x, y) {
        const dx = this.x - x;
        const dy = this.y - y;
        return Math.sqrt(dx * dx + dy * dy);
    }
}
