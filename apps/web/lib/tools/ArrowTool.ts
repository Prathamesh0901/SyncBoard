import { createId } from "@paralleldrive/cuid2";
import { Element, Point } from "../types/types";
import { ElementState } from "../../store/element";
import { TypedWebSocket } from "../ws/TypedWebSocket";
import { renderArrow } from "../renderers/renderer";

export class ArrowTool {
    start: Point | null = null;
    draft: Element | null = null;

    pointerDown (pt: Point, ws: TypedWebSocket, slug: string) {
        this.start = pt;
        this.draft = {
            id: createId(),
            type: 'ARROW',
            data: {
                sX: pt.x,
                sY: pt.y,
                eX: pt.x,
                eY: pt.y,
                headlen: 10
            }
        }
    }

    pointerMove (pt: Point, draftCtx: CanvasRenderingContext2D, ws: TypedWebSocket, slug: string) {
        if (!this.start || !this.draft || this.draft.type !== 'ARROW') return;

        this.draft.data.eX = pt.x;
        this.draft.data.eY = pt.y;

        renderArrow(draftCtx, this.draft);
    }

    pointerUp (store: ElementState, ws: TypedWebSocket, slug: string) {
        if (!this.start || !this.draft || this.draft.type !== 'ARROW') return;
        
        if (this.start.x === this.draft.data.eX && this.start.y === this.draft.data.eY) {
            this.start = null;
            this.draft = null;
            return;
        }

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