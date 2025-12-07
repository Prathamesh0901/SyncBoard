import { ElementState, useElementStore } from "../../store/element";
import { hitTestElement } from "../hitTest/hitTestElement";
import { Point } from "../types/types";
import { TypedWebSocket } from "../ws/TypedWebSocket";

export class EraserTool {
    pointerDown (draftCtx: CanvasRenderingContext2D, pt: Point, ws: TypedWebSocket, slug: string) {
        this.eraserAt(pt, ws, slug, draftCtx);
    }
    
    pointerMove (pt: Point, draftCtx: CanvasRenderingContext2D, ws: TypedWebSocket, slug: string) {
        this.eraserAt(pt, ws, slug, draftCtx);
    }

    pointerUp (store: ElementState, ws: TypedWebSocket, draftCtx: CanvasRenderingContext2D, slug: string) {
        return;
    }

    eraserAt(pt: Point, ws: TypedWebSocket, slug: string, ctx: CanvasRenderingContext2D) {
        const store = useElementStore.getState();
        const elements = store.elements;

        const updated = Object.values(elements).filter(el => !hitTestElement(el, pt, 6, ctx)) || [];

        if (updated.length !== Object.keys(elements).length) {
            const removed = Object.values(elements).filter(el => !updated.includes(el));

            removed.forEach(el => {
                ws.sendTyped({
                    type: 'ELEMENT_DELETE',
                    elementId: el.id,
                    slug
                })
            })

            store.init(updated);
        }
    }
}