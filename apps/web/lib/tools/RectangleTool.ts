import { createId } from "@paralleldrive/cuid2";
import { Element, Point } from "../types/types";
import { ElementState } from "../../store/element";
import { TypedWebSocket } from "../ws/TypedWebSocket";
import { renderRectangle } from "../renderers/renderer";

export class RectangleTool {
    start: Point | null = null;
    draft: Element | null = null;

    pointerDown (pt: Point, ws: TypedWebSocket, slug: string) {
        this.start = pt;
        this.draft = {
            id: createId(),
            type: 'RECTANGLE',
            data: {
                x: pt.x,
                y: pt.y,
                h: 0,
                w: 0
            }
        }
    }

    pointerMove (pt: Point, draftCtx: CanvasRenderingContext2D, ws: TypedWebSocket, slug: string) {
        if (!this.start || !this.draft || this.draft.type !== 'RECTANGLE') return;

        const w = pt.x - this.start.x;
        const h = pt.y - this.start.y;

        this.draft.data.w = w;
        this.draft.data.h = h;

        renderRectangle(draftCtx, this.draft);
    }

    pointerUp (store: ElementState, ws: TypedWebSocket, slug: string) {
        if (!this.start || !this.draft || this.draft.type !== 'RECTANGLE') return;

        store.add(this.draft);

        ws.sendTyped({
            type: 'ELEMENT_CREATE',
            slug,
            element: {
                ...this.draft,
                data: JSON.stringify(this.draft.data)
            }
        })

        this.start = null;
        this.draft = null;
    }
}