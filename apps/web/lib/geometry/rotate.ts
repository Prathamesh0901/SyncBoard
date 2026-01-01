import { getBoundingBox } from "../hitTest/pointUtilts";
import { Element, Point } from "../types/types";

export function rotateSingleElement(ctx: CanvasRenderingContext2D, element: Element, start: Element, currPt: Point, startAngle: number, centerX: number, centerY: number) {

    const eBox = getBoundingBox(start, ctx);

    const cx = eBox.x1 + (eBox.x2 - eBox.x1) / 2;
    const cy = eBox.y1 + (eBox.y2 - eBox.y1) / 2;

    const offsetX = cx - centerX;
    const offsetY = cy - centerY;

    const currentAngle = Math.atan2(currPt.y - centerY, currPt.x - centerX);

    const delta = currentAngle - startAngle;

    const cos = Math.cos(delta);
    const sin = Math.sin(delta);

    const newCx = centerX + offsetX * cos - offsetY * sin;
    const newCy = centerY + offsetX * sin + offsetY * cos;

    element.data.angle = start.data.angle + delta;

    switch (element.type) {
        case "PENCIL": {
            if (start.type !== 'PENCIL') break;
            element.data.points.forEach((p, i) => {
                const s = start.data.points[i];
                if (!s) return;
                p.x = (newCx - cx + s.x);
                p.y = (newCy - cy + s.y);
            })
            break;
        }
        case "RECTANGLE": {
            element.data.x = (newCx - element.data.w / 2);
            element.data.y = (newCy - element.data.h / 2);
            break;
        }
        case "ELLIPSE": {
            element.data.x = (newCx);
            element.data.y = (newCy);
            break;
        }
        case "LINE": 
        case "ARROW": {
            const w = element.data.eX - element.data.sX;
            const h = element.data.eY - element.data.sY;
            element.data.sX = (newCx - w/2);
            element.data.eX = (element.data.sX + w);
            element.data.sY = (newCy - h/2);
            element.data.eY = (element.data.sY + h);
            break;
        }
        case "TEXT": {
            element.data.x = (newCx - element.data.currWidth / 2);
            element.data.y = (newCy - element.data.fontSize * element.data.lineCount / 2);
            break;
        }
    }
}
