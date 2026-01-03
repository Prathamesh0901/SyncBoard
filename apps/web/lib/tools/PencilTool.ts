import { createId } from "@paralleldrive/cuid2";
import { Element, Point } from "../types/types";
import { ElementState } from "../../store/element";
import { TypedWebSocket } from "../ws/TypedWebSocket";
import { renderPencil } from "../renderers/renderer";

export class PencilTool {
    draft: Element | null = null;
    x1 = Math.pow(10, 10);
    y1 = Math.pow(10, 10);

    pointerDown (draftCtx: CanvasRenderingContext2D, pt: Point, ws: TypedWebSocket, slug: string, roomId: string) {
        this.x1 = pt.x;
        this.y1 = pt.y;
        this.draft = {
            id: createId(),
            type: 'PENCIL',
            data: {
                points: [pt],
                angle: 0,
                x: this.x1,
                y: this.y1
            }
        }
    }

    pointerMove (pt: Point, draftCtx: CanvasRenderingContext2D, ws: TypedWebSocket, slug: string, roomId: string) {
        if (!this.draft || this.draft.type !== 'PENCIL') return;
        this.x1 = Math.min(this.x1, pt.x);
        this.y1 = Math.min(this.y1, pt.y);

        this.draft.data.points.push(pt);
        this.draft.data.x = this.x1;
        this.draft.data.y = this.y1;

        renderPencil(draftCtx, this.draft);
    }
    
    pointerUp (store: ElementState, ws: TypedWebSocket, draftCtx: CanvasRenderingContext2D, slug: string, roomId: string) {
        if (!this.draft || this.draft.type !== 'PENCIL') return;

        store.add(this.draft);

        ws.sendTyped({
            type: 'ELEMENT_CREATE',
            roomId,
            element: {
                ...this.draft,
                data: JSON.stringify({
                    ...this.draft.data,
                    points: this.draft.data.points,
                })
            },
        })

        this.draft = null;
    }
}