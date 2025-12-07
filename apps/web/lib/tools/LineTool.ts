import { createId } from "@paralleldrive/cuid2";
import { Element, Point } from "../types/types";
import { ElementState } from "../../store/element";
import { TypedWebSocket } from "../ws/TypedWebSocket";
import { renderLine } from "../renderers/renderer";
import { getBoundingBox } from "../hitTest/pointUtilts";
import { useSelectStore } from "../../store/selectElement";
import { useToolStore } from "../../store/tool";

export class LineTool {
    start: Point | null = null;
    draft: Element | null = null;

    pointerDown (draftCtx: CanvasRenderingContext2D, pt: Point, ws: TypedWebSocket, slug: string) {
        this.start = pt;
        this.draft = {
            id: createId(),
            type: 'LINE',
            data: {
                sX: pt.x,
                sY: pt.y,
                eX: pt.x,
                eY: pt.y
            }
        }
    }

    pointerMove (pt: Point, draftCtx: CanvasRenderingContext2D, ws: TypedWebSocket, slug: string) {
        if (!this.start || !this.draft || this.draft.type !== 'LINE') return;

        this.draft.data.eX = pt.x;
        this.draft.data.eY = pt.y;

        renderLine(draftCtx, this.draft);
    }

    pointerUp (store: ElementState, ws: TypedWebSocket, draftCtx: CanvasRenderingContext2D, slug: string) {
        if (!this.start || !this.draft || this.draft.type !== 'LINE') return;

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

        const box = getBoundingBox(this.draft, draftCtx);
        const selectStore = useSelectStore.getState();
        selectStore.clearSelection();
        selectStore.add(this.draft.id, box);

        useToolStore.getState().setTool('SELECT');

        this.draft = null;
        this.start = null;
    }
}