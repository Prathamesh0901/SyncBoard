import { createId } from "@paralleldrive/cuid2";
import { Element, Point } from "../types/types";
import { ElementState } from "../../store/element";
import { TypedWebSocket } from "../ws/TypedWebSocket";
import { renderEllipse } from "../renderers/renderer";

export class EllipseTool {
    start: Point | null = null;
    draft: Element | null = null;

    pointerDown (pt: Point, ws: TypedWebSocket, slug: string) {
        this.start = pt;
        this.draft = {
            id: createId(),
            type: 'ELLIPSE',
            data: {
                x: pt.x,
                y: pt.y,
                rX: 0,
                rY: 0
            }
        }
    }

    pointerMove (pt: Point, draftCtx: CanvasRenderingContext2D, ws: TypedWebSocket, slug: string) {
        if (!this.start || !this.draft || this.draft.type !== 'ELLIPSE') return;

        const radiusX = Math.abs(pt.x - this.start.x);
        const radiusY = Math.abs(pt.y - this.start.y);

        this.draft.data.rX = radiusX;
        this.draft.data.rY = radiusY;
        
        renderEllipse(draftCtx, this.draft);
    }

    pointerUp (store: ElementState, ws: TypedWebSocket, slug: string) {
        if (!this.start || !this.draft || this.draft.type !== 'ELLIPSE') return;

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