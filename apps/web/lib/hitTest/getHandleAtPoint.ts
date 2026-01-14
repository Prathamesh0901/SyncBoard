import { useElementStore } from "../../store/element";
import { useSelectStore } from "../../store/selectElement";
import { useTransformStore } from "../../store/transform";
import { toLocalPoint, toWorldPoint } from "../geometry/transform";
import { Point } from "../types/types";
import { hitTestElement } from "./hitTestElement";
import { getBoundingBox, pointToSegmentDistance } from "./pointUtilts";

export function getHandleAtPoints(pt: Point, ctx: CanvasRenderingContext2D) {
    const transform = useTransformStore.getState();
    const { scale } = transform;

    const clickHandle: { handleId: string } = {
        handleId: ''
    };

    const pt1: Point = { x: Infinity, y: Infinity };
    const pt2: Point = { x: -Infinity, y: -Infinity };

    const selectStore = useSelectStore.getState();

    const boundingBoxes = selectStore.boundingBoxes;

    let angle = 0;

    Object.values(boundingBoxes).forEach((box) => {
        angle = box.angle;
        const cx = box.x1 + (box.x2 - box.x1) / 2;
        const cy = box.y1 + (box.y2 - box.y1) / 2;
        const {x: x1, y: y1} = toWorldPoint(box.x1, box.y1, cx, cy, box.angle);
        const {x: x2, y: y2} = toWorldPoint(box.x2, box.y2, cx, cy, box.angle);
        const {x: x3, y: y3} = toWorldPoint(box.x1, box.y2, cx, cy, box.angle);
        const {x: x4, y: y4} = toWorldPoint(box.x2, box.y1, cx, cy, box.angle);
        pt1.x = Math.min(pt1.x, x1, x2, x3, x4);
        pt1.y = Math.min(pt1.y, y1, y2, y3, y4);
        pt2.x = Math.max(pt2.x, x1, x2, x3, x4);
        pt2.y = Math.max(pt2.y, y1, y2, y3, y4);
    });

    let x1 = 0, x2 = 0, y1 = 0, y2 = 0;
    if (Object.values(boundingBoxes).length > 1) {
        angle = 0;
        x1 = pt1.x;
        y1 = pt1.y;
        x2 = pt2.x;
        y2 = pt2.y;
    }
    else {
        const box = Object.values(boundingBoxes)[0];
        x1 = box?.x1 || 0;
        x2 = box?.x2 || 0;
        y1 = box?.y1 || 0;
        y2 = box?.y2 || 0;
    }
    
    const handleSize = 8 / scale;
    const half = handleSize / 2;

    const w = x2 - x1;
    const h = y2 - y1;

    const cx = x1 + w / 2;
    const cy = y1 + h / 2;

    let localPt = toLocalPoint(pt.x, pt.y, cx, cy, angle);

    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.translate(-cx, -cy);

    const handles = [
        { x: x1, y: y1, id: "nw" },
        { x: cx, y: y1, id: "no" },
        { x: x2, y: y1, id: "ne" },
        { x: x2, y: cy, id: "ea" },
        { x: x2, y: y2, id: "se" },
        { x: cx, y: y2, id: "so" },
        { x: x1, y: y2, id: "sw" },
        { x: x1, y: cy, id: "we" },
        { x: cx, y: Math.min(y1, y2) - 10, id: "rt" }
    ]


    for (const handle of handles) {
        if (pointToSegmentDistance(localPt, { x: handle.x - half, y: handle.y }, { x: handle.x - half + handleSize, y: handle.y - half + handleSize }) < handleSize) {
            clickHandle.handleId = handle.id;
            break;
        }
    }

    ctx.restore();

    if (clickHandle.handleId === '') {
        if (localPt.x >= x1 && localPt.x <= x2 && localPt.y >= y1 && localPt.y <= y2) {
            clickHandle.handleId = 'drag';
        }
        else {
            selectStore.clearSelection();
            const els = useElementStore.getState().elements;
            for (const el of Object.values(els)) {
                const box = getBoundingBox(el, ctx);
                const cx = box.x1 + (box.x2 - box.x1) / 2;
                const cy = box.y1 + (box.y2 - box.y1) / 2;
                localPt = toLocalPoint(pt.x, pt.y, cx, cy, box.angle);
                if (hitTestElement(el, localPt, 10, ctx)) {
                    clickHandle.handleId = 'single';
                    const type = el.type;
                    selectStore.add(el.id, box, (type === 'TEXT'? 'TEXT': 'OTHER'));
                    break;
                }
            }
        }
    }

    return clickHandle;
}