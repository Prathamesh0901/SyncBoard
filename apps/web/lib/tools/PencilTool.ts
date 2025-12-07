import { createId } from "@paralleldrive/cuid2";
import { Element, Point } from "../types/types";
import { ElementState } from "../../store/element";
import { TypedWebSocket } from "../ws/TypedWebSocket";
import { renderPencil } from "../renderers/renderer";

export class PencilTool {
    draft: Element | null = null;

    pointerDown (draftCtx: CanvasRenderingContext2D, pt: Point, ws: TypedWebSocket, slug: string) {
        this.draft = {
            id: createId(),
            type: 'PENCIL',
            data: {
                points: [pt]
            }
        }
    }

    pointerMove (pt: Point, draftCtx: CanvasRenderingContext2D, ws: TypedWebSocket, slug: string) {
        if (!this.draft || this.draft.type !== 'PENCIL') return;

        this.draft.data.points.push(pt);

        renderPencil(draftCtx, this.draft);
    }
    
    pointerUp (store: ElementState, ws: TypedWebSocket, draftCtx: CanvasRenderingContext2D, slug: string) {
        if (!this.draft || this.draft.type !== 'PENCIL') return;

        store.add(this.draft);

        ws.sendTyped({
            type: 'ELEMENT_CREATE',
            slug,
            element: {
                ...this.draft,
                data: JSON.stringify({
                    points: this.draft.data.points
                })
            },
        })

        this.draft = null;
    }
}