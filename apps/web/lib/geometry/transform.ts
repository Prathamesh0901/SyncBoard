export function toLocalPoint (x: number, y: number, cx: number, cy: number, angle: number) {
    const dx = x - cx;
    const dy = y - cy;

    const cos = Math.cos(-angle);
    const sin = Math.sin(-angle);

    return {
        x: cx + dx * cos - dy * sin,
        y: cy + dx * sin + dy * cos
    }
}

export function toLocalDelta (dx: number, dy: number, angle: number) {
    const cos = Math.cos(-angle);
    const sin = Math.sin(-angle);

    return {
        x: dx * cos - dy * sin,
        y: dx * sin + dy * cos
    }
}

export function toWorldPoint (x: number, y: number, cx: number, cy: number, angle: number) {
    const dx = x - cx;
    const dy = y - cy;

    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return {
        x: cx + dx * cos - dy * sin,
        y: cy + dx * sin + dy * cos
    }
}

export function toWorldDelta (dx: number, dy: number, angle: number) {
    const cos = Math.cos(angle);
    const sin = Math.sin(angle);

    return {
        x: dx * cos - dy * sin,
        y: dx * sin + dy * cos
    }
}