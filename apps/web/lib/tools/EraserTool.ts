import { ElementState, useElementStore } from "../../store/element";
import { hitTestElement } from "../hitTest/hitTestElement";
import { Point } from "../types/types";
import { TypedWebSocket } from "../ws/TypedWebSocket";

export class EraserTool {
    pointerDown (pt: Point, ws: TypedWebSocket, slug: string) {
        this.eraserAt(pt, ws, slug);
    }
    
    pointerMove (pt: Point, draftCtx: CanvasRenderingContext2D, ws: TypedWebSocket, slug: string) {
        this.eraserAt(pt, ws, slug);
    }

    pointerUp (store: ElementState, ws: TypedWebSocket, slug: string) {
        return;
    }

    eraserAt(pt: Point, ws: TypedWebSocket, slug: string) {
        const store = useElementStore.getState();
        const elements = store.elements;

        const updated = elements.filter(el => !hitTestElement(el, pt));

        if (updated.length !== elements.length) {
            const removed = elements.filter(el => !updated.includes(el));

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