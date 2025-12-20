import { useElementStore } from "../../store/element";
import { useSelectStore } from "../../store/selectElement";
import { TransformState, useTransformStore } from "../../store/transform";
import { Point, BoundingBox, Element } from "../types/types";
import { getElementAtPoints } from "./getElementAtPoint";
import { hitTestElement } from "./hitTestElement";
import { getBoundingBox, pointToSegmentDistance } from "./pointUtilts";

export function getHandleAtPoints(pt: Point, ctx: CanvasRenderingContext2D) {
    const boxes = useSelectStore.getState().boundingBoxes;
    const elements = useElementStore.getState().elements;
    const transform = useTransformStore.getState();
    const { scale } = transform;

    const h: { handleId: string } = {
        handleId: ''
    };

    const pt1: Point = { x: 1000000, y: 1000000 };
    const pt2: Point = { x: -1000000, y: -1000000 };

    const selectStore = useSelectStore.getState();

    const boundingBoxes = selectStore.boundingBoxes;
    const ids = selectStore.selectedIds;

    Object.values(boundingBoxes).forEach((box) => {
        pt1.x = Math.min(pt1.x, box.x1);
        pt1.y = Math.min(pt1.y, box.y1);
        pt1.x = Math.min(pt1.x, box.x2);
        pt1.y = Math.min(pt1.y, box.y2);
        pt2.x = Math.max(pt2.x, box.x1);
        pt2.y = Math.max(pt2.y, box.y1);
        pt2.x = Math.max(pt2.x, box.x2);
        pt2.y = Math.max(pt2.y, box.y2);
    });
    
    const x1 = pt1.x, y1 = pt1.y, x2 = pt2.x, y2 = pt2.y;

    const handleSize = 8 / scale;
    const half = handleSize / 2;

    const cx = (x1 + x2) / 2;
    const cy = (y1 + y2) / 2;

    const handles = [
        { x: x1, y: y1, id: "tl" },
        { x: cx, y: y1, id: "tc" },
        { x: x2, y: y1, id: "tr" },
        { x: x2, y: cy, id: "mr" },
        { x: x2, y: y2, id: "br" },
        { x: cx, y: y2, id: "bc" },
        { x: x1, y: y2, id: "bl" },
        { x: x1, y: cy, id: "ml" },
    ];

    for (const handle of handles) {
        if (pointToSegmentDistance(pt, { x: handle.x - half, y: handle.y }, { x: handle.x - half + handleSize, y: handle.y - half + handleSize }) < handleSize) {
            h.handleId = handle.id;
            break;
        }
    }
    
    if (h.handleId === '') {
        if (pt.x >= x1 && pt.x <= x2 && pt.y >= y1 && pt.y <= y2) {
            h.handleId = 'drag';
        }
        else {
            selectStore.clearSelection();
            const els = useElementStore.getState().elements;
            for (const el of Object.values(els)) {
                if (hitTestElement(el, pt, 10, ctx)) {
                    h.handleId = 'single';
                    const box = getBoundingBox(el, ctx);
                    selectStore.add(el.id, box);
                    break;
                }
            }
        }
    }

    return h;
}