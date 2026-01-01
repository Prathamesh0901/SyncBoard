import { Element, Point } from "../types/types";
import {pointToSegmentDistance } from "./pointUtilts";

export function hitTestElement (el: Element, point: Point, threshold: number = 6, ctx: CanvasRenderingContext2D) {
    switch (el.type) {
        case "PENCIL": {
            const pts = el.data.points;

            for (let i=1; i<pts.length; i++) {
                if (pointToSegmentDistance(point, pts[i-1] as Point, pts[i] as Point) < threshold) {
                    return true;
                }
            }
            
            return false;
        }
        case "RECTANGLE": {
            const {x, y, w, h} = el.data;

            const left =  { a: {x, y}, b: {x, y: y + h}};
            const right = { a: {x: x + w, y: y}, b: {x: x + w, y: y + w}};
            const top = { a: {x, y}, b: {x: x + w, y}};
            const bottom = { a: {x: x, y: y + h}, b: {x: x + w, y: y + h}};

            return (
                pointToSegmentDistance(point, left.a, left.b) < threshold ||
                pointToSegmentDistance(point, right.a, right.b) < threshold ||
                pointToSegmentDistance(point, top.a, top.b) < threshold ||
                pointToSegmentDistance(point, bottom.a, bottom.b) < threshold 
            );
        }
        case "ELLIPSE": {
            const {x, y, rX, rY} = el.data;

            const dx = (point.x - x) / rX;
            const dy = (point.y - y) / rY;

            const dist = dx * dx + dy * dy;

            const diff = Math.abs(dist - 1);

            return diff < (threshold / Math.max(rX, rY));
        }
        case "LINE": 
        case "ARROW": {
            const {sX, sY, eX, eY} = el.data;

            return (
                pointToSegmentDistance(point, {x: sX, y: sY}, {x: eX, y: eY}) < threshold
            );
        }
        case "TEXT": {
            const {x, y, fontSize, fontFamily, currWidth, lineCount} = el.data;
            
            ctx.font = `${fontSize}px ${fontFamily}`;
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.lineWidth = 1;
            ctx.textBaseline = 'top';
            
            return (
                point.x >= x && 
                point.x <= x + currWidth &&
                point.y >= y &&
                point.y <= y + fontSize * lineCount
            )
        }

        default: 
            return false;
    }
}
