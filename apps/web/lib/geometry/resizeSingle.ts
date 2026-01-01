import { getBoundingBox } from "../hitTest/pointUtilts";
import { Element, Point } from "../types/types";
import { toLocalPoint, toWorldPoint } from "./transform";

export function resizeSingleElement(ctx: CanvasRenderingContext2D, element: Element, start: Element, handle: string, pt: Point) {

    const box = getBoundingBox(start, ctx);

    const cx = box.x1 + (box.x2 - box.x1) / 2;
    const cy = box.y1 + (box.y2 - box.y1) / 2;

    const angle = start.data.angle;

    const local = toLocalPoint(pt.x, pt.y, cx, cy, angle);
    console.log(local);
    let x1 = box.x1;
    let x2 = box.x2
    let y1 = box.y1;
    let y2 = box.y2;

    switch (handle) {
        case "no": {
            y1 = local.y;
            break;
        }

        case "so": {
            y2 = local.y;
            break;
        }

        case "we": {
            x1 = local.x;
            break;
        }

        case "ea": {
            x2 = local.x;
            break;
        }

        case "nw": {
            x1 = local.x;
            y1 = local.y;
            break;
        }

        case "ne": {
            x2 = local.x;
            y1 = local.y;
            break;
        }

        case "sw": {
            x1 = local.x;
            y2 = local.y;
            break;
        }

        case "se": {
            x2 = local.x;
            y2 = local.y;
            break;
        }
    }
    // Calculate new dimensions
    const newW = x2 - x1;
    const newH = y2 - y1;

    // Calculate the new center in local space
    const newLocalCx = x1 + newW / 2;
    const newLocalCy = y1 + newH / 2;

    // Transform the new center back to world coordinates
    const worldCenter = toWorldPoint(newLocalCx, newLocalCy, cx, cy, angle);

    switch (element.type) {

        case "RECTANGLE": {

            element.data.x = worldCenter.x - newW / 2;
            element.data.y = worldCenter.y - newH / 2;
            element.data.w = newW;
            element.data.h = newH;

            break;
        }

        case "ELLIPSE": {

            element.data.x = worldCenter.x;
            element.data.y = worldCenter.y;
            element.data.rX = newW / 2;
            element.data.rY = newH / 2;

            break;
        }

        case "LINE": {

            element.data.sX = worldCenter.x - newW / 2;
            element.data.sY = worldCenter.y - newH / 2;
            element.data.eX = element.data.sX + newW;
            element.data.eY = element.data.sY + newH;

            break;
        }
        case "ARROW": {

            element.data.sX = worldCenter.x - newW / 2;
            element.data.sY = worldCenter.y - newH / 2;
            element.data.eX = element.data.sX + newW;
            element.data.eY = element.data.sY + newH;

            break;
        }
        case "PENCIL": {
            if (start.type !== 'PENCIL') break;
            const origW = box.x2 - box.x1;
            const origH = box.y2 - box.y1;

            const scaleX = newW / origW;
            const scaleY = newH / origH;

            element.data.points = start.data.points.map(p => {
                const relX = p.x - cx;
                const relY = p.y - cy;

                const scaledX = relX * scaleX;
                const scaledY = relY * scaleY;

                return {
                    x: worldCenter.x + scaledX,
                    y: worldCenter.y + scaledY
                }
            })

            break;
        }
        case "TEXT": {

            if (start.type !== 'TEXT') break;

            const oldW = box.x2 - box.x1;
            const oldH = box.y2 - box.y1;

            let scale = 1;
            const sx = oldW === 0 ? 0 : newW / oldW;
            const sy = oldH === 0 ? 0 : newH / oldH;

            switch (handle) {
                case "no":
                case "so": {
                    scale = sy;
                    break;
                }

                case "we":
                case "ea": {
                    scale = sx;
                    break;
                }

                case "nw":
                case "ne":
                case "se":
                case "sw": {
                    scale = Math.abs(sx) > Math.abs(sy) ? sx : sy;
                }
            }

            if (handle === 'ea' || handle === 'we') {
                element.data.maxWidth = start.data.maxWidth;
                if (newW > start.data.maxWidth) {
                    element.data.x = worldCenter.x - newW / 2;
                    element.data.y = worldCenter.y - newH / 2;
                    element.data.currWidth = Math.max(start.data.maxWidth, newW);
                }
                break;
            }
            
            if (start.data.fontSize * scale >= 20) {
                element.data.fontSize = Math.max(20, start.data.fontSize * scale);
                element.data.maxWidth = start.data.maxWidth * scale;
                element.data.currWidth = start.data.currWidth * scale;
                
                const w = element.data.currWidth;
                const h = start.data.fontSize * start.data.lineCount * scale;
                
                element.data.x = worldCenter.x - w / 2;
                element.data.y = worldCenter.y - h / 2;
            }

            break;
        }
    }
}