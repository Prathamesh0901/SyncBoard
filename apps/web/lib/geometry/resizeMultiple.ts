import { getBoundingBox } from "../hitTest/pointUtilts";
import { BoundingBox, Element, Point } from "../types/types";

export function resizeMultiElement (ctx: CanvasRenderingContext2D, elements: Element[], snapshots: Element[], handle: string, pt: Point, oldGroupBounds: BoundingBox) {
    const oldBox = oldGroupBounds;
    const newBox = { ...oldGroupBounds };

    const oldW = oldBox.x2 - oldBox.x1;
    const oldH = oldBox.y2 - oldBox.y1;

    const local = pt;

    switch (handle) {
        case "no": newBox.y1 = local.y; break;
        case "so": newBox.y2 = local.y; break;
        case "we": newBox.x1 = local.x; break;
        case "ea": newBox.x2 = local.x; break;
        case "nw": newBox.x1 = local.x; newBox.y1 = local.y; break;
        case "ne": newBox.x2 = local.x; newBox.y1 = local.y; break;
        case "sw": newBox.x1 = local.x; newBox.y2 = local.y; break;
        case "se": newBox.x2 = local.x; newBox.y2 = local.y; break;
    }

    const newW = newBox.x2 - newBox.x1;
    const newH = newBox.y2 - newBox.y1;

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

    const isHorizontalSide = handle === 'ea' || handle === 'we';

    const isVerticalSide = handle === 'so' || handle === 'no';

    const isCorner = !isHorizontalSide && !isVerticalSide;

    const crossedX = newBox.x1 > newBox.x2;
    const crossedY = newBox.y1 > newBox.y2;

    let flipX = false, flipY = false;

    if (isHorizontalSide) {
        flipX = crossedX;
    }
    else if (isVerticalSide) {
        flipY = crossedY;
    }

    const pivot = getPivot(oldBox, handle);

    elements.forEach((element, i) => {
        const start = snapshots[i];
        if (!start) return;

        const { x1, y1, x2, y2 } = getBoundingBox(start, ctx);

        const startCx = x1 + (x2 - x1) / 2;
        const startCy = y1 + (y2 - y1) / 2;

        const relCx = startCx - pivot.x;
        const relCy = startCy - pivot.y;

        const newCx = pivot.x + relCx * scale;
        const newCy = pivot.y + relCy * scale;

        switch (element.type) {
            case "PENCIL": {
                if (start.type !== 'PENCIL') break;

                const elCx = x1 + (x2 - x1) / 2;
                const elCy = y1 + (y2 - y1) / 2;

                element.data.angle = start.data.angle;

                element.data.points = start.data.points.map(p => {
                    const pRelX = p.x - elCx;
                    const pRelY = p.y - elCy;

                    let x = newCx + pRelX * scale;
                    let y = newCy + pRelY * scale;

                    if (flipX) {
                        y = 2 * pivot.y - y;
                        element.data.angle = -element.data.angle;
                    }
                    if (flipY) {
                        x = 2 * pivot.x - x;
                        element.data.angle = -element.data.angle;
                    }

                    return {
                        x, y
                    }
                });

                break;
            }
            case "RECTANGLE": {
                if (start.type !== 'RECTANGLE') break;

                const w = start.data.w * scale;
                const h = start.data.h * scale;

                element.data.x = newCx - w / 2;
                element.data.y = newCy - h / 2;
                element.data.w = w;
                element.data.h = h;
                element.data.angle = start.data.angle;

                if (flipX) {
                    element.data.y = 2 * pivot.y - element.data.y;
                    element.data.h = -h;
                    element.data.angle = -element.data.angle;
                }
                if (flipY) {
                    element.data.x = 2 * pivot.x - element.data.x;
                    element.data.w = -w;
                    element.data.angle = -element.data.angle;
                }

                break;
            }
            case "ELLIPSE": {
                if (start.type !== 'ELLIPSE') break;

                const rX = start.data.rX * scale;
                const rY = start.data.rY * scale;

                element.data.x = newCx;
                element.data.y = newCy;
                element.data.rX = Math.abs(rX);
                element.data.rY = Math.abs(rY);
                element.data.angle = start.data.angle;

                if (flipX) {
                    element.data.y = 2 * pivot.y - element.data.y;
                    element.data.angle = -element.data.angle;
                }
                if (flipY) {
                    element.data.x = 2 * pivot.x - element.data.x;
                    element.data.angle = -element.data.angle;
                }

                break;
            }
            case "LINE": {
                if (start.type !== 'LINE') break;

                const w = (start.data.eX - start.data.sX) * scale;
                const h = (start.data.eY - start.data.sY) * scale;

                element.data.sX = newCx - w / 2;
                element.data.sY = newCy - h / 2;
                element.data.eX = element.data.sX + w;
                element.data.eY = element.data.sY + h;
                element.data.angle = start.data.angle;

                if (flipX) {
                    element.data.sY = 2 * pivot.y - element.data.sY;
                    element.data.eY = 2 * pivot.y - element.data.eY;
                    element.data.angle = -element.data.angle;
                }
                if (flipY) {
                    element.data.sX = 2 * pivot.x - element.data.sX;
                    element.data.eX = 2 * pivot.x - element.data.eX;
                    element.data.angle = -element.data.angle;
                }

                break;
            }
            case "ARROW": {
                if (start.type !== 'ARROW') break;

                const w = (start.data.eX - start.data.sX) * scale;
                const h = (start.data.eY - start.data.sY) * scale;

                element.data.sX = newCx - w / 2;
                element.data.sY = newCy - h / 2;
                element.data.eX = element.data.sX + w;
                element.data.eY = element.data.sY + h;
                element.data.angle = start.data.angle;

                if (flipX) {
                    element.data.sY = 2 * pivot.y - element.data.sY;
                    element.data.eY = 2 * pivot.y - element.data.eY;
                    element.data.angle = -element.data.angle;
                }
                if (flipY) {
                    element.data.sX = 2 * pivot.x - element.data.sX;
                    element.data.eX = 2 * pivot.x - element.data.eX;
                    element.data.angle = -element.data.angle;
                }

                break;
            }
            case "TEXT": {
                if (start.type !== 'TEXT') break;

                const absScale = Math.abs(isCorner ? sx : (handle === 'ea' || handle === 'we' ? sx : sy));
                
                element.data.fontSize = start.data.fontSize * absScale;
                element.data.maxWidth = start.data.maxWidth * absScale;
                element.data.currWidth = Math.max(element.data.maxWidth, start.data.currWidth * absScale);

                const w = element.data.currWidth;
                const h = start.data.fontSize * start.data.lineCount * absScale;
                
                element.data.x = newCx - w / 2;
                element.data.y = newCy - h / 2;
                element.data.angle = start.data.angle;

                if (flipX) {
                    element.data.y = 2 * pivot.y - element.data.y - h;
                    element.data.angle = -element.data.angle;
                }
                if (flipY) {
                    element.data.x = 2 * pivot.x - element.data.x - w;
                    element.data.angle = -element.data.angle;
                }

                break;
            }
        }

    });
}

function getPivot(box: BoundingBox, handle: string) {
    switch (handle) {
        case "nw":
            return {
                x: box.x2, y: box.y2
            }
        case "ne":
            return {
                x: box.x1, y: box.y2
            }
        case "se":
            return {
                x: box.x1, y: box.y1
            }
        case "sw":
            return {
                x: box.x2, y: box.y1
            }
        case "no":
            return {
                x: (box.x1 + box.x2) / 2, y: box.y2
            }
        case "so":
            return {
                x: (box.x1 + box.x2) / 2, y: box.y1
            }
        case "ea":
            return {
                x: box.x1, y: (box.y1 + box.y2) / 2
            }
        case "we":
            return {
                x: box.x2, y: (box.y1 + box.y2) / 2
            }
        default:
            return {
                x: (box.x1 + box.x2) / 2, y: (box.y1 + box.y2) / 2
            }
    }
}
