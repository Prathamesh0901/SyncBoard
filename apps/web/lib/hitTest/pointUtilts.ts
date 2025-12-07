import { Element, Point } from "../types/types";

export function distance(a: Point, b: Point) {
    const dx = a.x - b.x;
    const dy = a.y - b.y;
    return Math.sqrt(dx * dx + dy * dy);
}

export function pointToSegmentDistance(p: Point, a: Point, b: Point) {
    const A = p.x - a.x;
    const B = p.y - a.y;
    const C = b.x - a.x;
    const D = b.y - a.y;

    const dot = A * C + B * D;
    const len = C * C + D * D;

    let t = dot / len;
    t = Math.max(0, Math.min(1, t));

    const projX = a.x + t * C;
    const projY = a.y + t * D;

    const dx = p.x - projX;
    const dy = p.y - projY;

    return Math.sqrt(dx * dx + dy * dy);
}

export function getBoundingBox (el: Element, ctx: CanvasRenderingContext2D) {
        switch (el.type) {
            case "PENCIL": {
                const pts = el.data.points;
                const max = {x: Math.pow(10, -10), y: Math.pow(10, -10)};
                const min = {x: Math.pow(10, 10), y: Math.pow(10, 10)};
                for (const pt of pts) {
                    max.x = Math.max(max.x, pt.x);
                    max.y = Math.max(max.y, pt.y);
                    min.x = Math.min(min.x, pt.x);
                    min.y = Math.min(min.y, pt.y);
                }
                return {
                    x1: min.x,
                    y1: min.y,
                    x2: max.x,
                    y2: max.y
                }
            }
            case "RECTANGLE": {
                const {x, y, w, h} = el.data;
                const x1 = x, y1 = y, x2 = x + w, y2 = y + h;
                return {x1, y1, x2, y2};
            }
            case "ELLIPSE": {
                const {x, y, rX, rY} = el.data;
                const x1 = x - rX, y1 = y - rY, x2 = x + rX, y2 = y + rY;
                return {x1, y1, x2, y2};
            }
            case "LINE": 
            case "ARROW": {
                const {sX, sY, eX, eY} = el.data;
                return {
                    x1: sX,
                    y1: sY,
                    x2: eX,
                    y2: eY
                }
            }
            case "TEXT": {
                const {x, y, text, fontSize, fontFamily} = el.data;
                const lines = text.split('\n');
                let w = 0, h = 0;
                
                ctx.font = `${fontSize}px ${fontFamily}`;
                ctx.fillStyle = 'rgb(255, 255, 255)';
                ctx.textBaseline = 'top';

                for (const line of lines) {
                    const metrics = ctx.measureText(line);
                    w = Math.max(w, metrics.width);
                    h += metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent + 5;
                }

                return {
                    x1: x,
                    y1: y,
                    x2: x + w,
                    y2: y + h
                }
            }
        }
    }