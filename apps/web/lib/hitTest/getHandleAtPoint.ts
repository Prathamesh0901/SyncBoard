import { useElementStore } from "../../store/element";
import { useSelectStore } from "../../store/selectElement";
import { TransformState, useTransformStore } from "../../store/transform";
import { Point, BoundingBox, Element } from "../types/types";
import { hitTestElement } from "./hitTestElement";
import { pointToSegmentDistance } from "./pointUtilts";

export function getHandleAtPoints(pt: Point) {
    const boxes = useSelectStore.getState().boundingBoxes;
    const elements = useElementStore.getState().elements;
    const transform = useTransformStore.getState();
    const { scale } = transform;

    const h: {handleId: string, elementId: string} = {
        elementId: '',
        handleId: ''
    };

    Object.keys(boxes).forEach(key => {
        if (h.elementId !== '') return h;
        const box = boxes[key];
        if (!box) return null;
        const { x1, y1, x2, y2 } = box;

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
                h.elementId = key;
                break;
            }
        }
        
        if (h.elementId === '') {
            const el = elements.filter(el => el.id === key)[0];
            if (!el) return;
            if (hitTestElement(el, pt, 6)) {
                h.elementId = el.id;
            }
            else {
                if (!handles[0] || !handles[4]) return;
                const e: Element = {
                    type: 'RECTANGLE',
                    id: '',
                    data: {
                        x: handles[0].x,
                        y: handles[0].y,
                        w: handles[4].x - handles[0].x,
                        h: handles[4].y - handles[0].y
                    }
                }
                if (hitTestElement(e, pt, 6)) {
                    h.elementId = el.id;
                }
            }
        }
    });

    return h;
}