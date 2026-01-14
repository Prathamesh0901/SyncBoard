import { createId } from "@paralleldrive/cuid2";
import { Element, Point } from "../types/types";
import { ElementState } from "../../store/element";
import { TypedWebSocket } from "../ws/TypedWebSocket";
import { renderRectangle } from "../renderers/renderer";
import { getBoundingBox } from "../hitTest/pointUtilts";
import { useSelectStore } from "../../store/selectElement";
import { useToolStore } from "../../store/tool";
import { useStyleStore } from "../../store/style";

export class RectangleTool {
    start: Point | null = null;
    draft: Element | null = null;

    pointerDown (draftCtx: CanvasRenderingContext2D, pt: Point, ws: TypedWebSocket, slug: string, roomId: string) {
        this.start = pt;
        const styleStore = useStyleStore.getState();
        this.draft = {
            id: createId(),
            type: 'RECTANGLE',
            data: {
                x: pt.x,
                y: pt.y,
                h: 0,
                w: 0,
                angle: 0,
                strokeColor: styleStore.strokeColor,
                strokeWidth: styleStore.strokeWidth,
                strokeType: styleStore.strokeType,
                opacity: styleStore.opacity
            }
        }
    }

    pointerMove (pt: Point, draftCtx: CanvasRenderingContext2D, ws: TypedWebSocket, slug: string, roomId: string) {
        if (!this.start || !this.draft || this.draft.type !== 'RECTANGLE') return;

        const w = pt.x - this.start.x;
        const h = pt.y - this.start.y;

        this.draft.data.w = w;
        this.draft.data.h = h;

        renderRectangle(draftCtx, this.draft);
    }

    pointerUp (store: ElementState, ws: TypedWebSocket, draftCtx: CanvasRenderingContext2D, slug: string, roomId: string) {
        if (!this.start || !this.draft || this.draft.type !== 'RECTANGLE') return;

        store.add(this.draft);

        ws.sendTyped({
            type: 'ELEMENT_CREATE',
            roomId,
            element: {
                ...this.draft,
                data: JSON.stringify(this.draft.data)
            }
        });

        const box = getBoundingBox(this.draft, draftCtx);
        const selectStore = useSelectStore.getState();
        selectStore.clearSelection();
        selectStore.add(this.draft.id, box, 'OTHER');

        useToolStore.getState().setTool('SELECT');

        this.start = null;
        this.draft = null;
    }
}