import { ElementState, useElementStore } from "../../store/element";
import { useSelectStore } from "../../store/selectElement";
import { toLocalPoint } from "../geometry/transform";
import { hitTestElement } from "../hitTest/hitTestElement";
import { getBoundingBox } from "../hitTest/pointUtilts";
import { Point } from "../types/types";
import { TypedWebSocket } from "../ws/TypedWebSocket";

export class EraserTool {
    pointerDown(draftCtx: CanvasRenderingContext2D, pt: Point, ws: TypedWebSocket, slug: string, roomId: string) {
        this.eraserAt(pt, ws, slug, draftCtx, roomId);
    }

    pointerMove(pt: Point, draftCtx: CanvasRenderingContext2D, ws: TypedWebSocket, slug: string, roomId: string) {
        this.eraserAt(pt, ws, slug, draftCtx, roomId);
    }

    pointerUp(store: ElementState, ws: TypedWebSocket, draftCtx: CanvasRenderingContext2D, slug: string, roomId: string) {
        return;
    }

    eraserAt(pt: Point, ws: TypedWebSocket, slug: string, ctx: CanvasRenderingContext2D, roomId: string) {
        const store = useElementStore.getState();
        const elements = store.elements;

        const updated = Object.values(elements).filter(el => {
            const { x1, y1, x2, y2, angle } = getBoundingBox(el, ctx);
            const cx = x1 + (x2 - x1) / 2;
            const cy = y1 + (y2 - y1) / 2;

            const local = toLocalPoint(pt.x, pt.y, cx, cy, angle);

            return !hitTestElement(el, local, 6, ctx)
        }) || [];

        if (updated.length !== Object.keys(elements).length) {
            const removed = Object.values(elements).filter(el => !updated.includes(el));

            const selectStore = useSelectStore.getState();

            removed.forEach(el => {
                selectStore.remove(el.id);
                ws.sendTyped({
                    type: 'ELEMENT_DELETE',
                    elementId: el.id,
                    roomId
                })
            });


            store.init(updated);
        }
    }
}