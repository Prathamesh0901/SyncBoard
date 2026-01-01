import { createId } from "@paralleldrive/cuid2";
import { Element, Point } from "../types/types";
import { ElementState } from "../../store/element";
import { TypedWebSocket } from "../ws/TypedWebSocket";
import { renderRectangle } from "../renderers/renderer";
import { getBoundingBox } from "../hitTest/pointUtilts";
import { useSelectStore } from "../../store/selectElement";
import { useToolStore } from "../../store/tool";
import { useRoomStore } from "../../store/room";

export class RectangleTool {
    start: Point | null = null;
    draft: Element | null = null;

    pointerDown (draftCtx: CanvasRenderingContext2D, pt: Point, ws: TypedWebSocket, slug: string) {
        this.start = pt;
        this.draft = {
            id: createId(),
            type: 'RECTANGLE',
            data: {
                x: pt.x,
                y: pt.y,
                h: 0,
                w: 0,
                angle: 0,
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

    pointerUp (store: ElementState, ws: TypedWebSocket, draftCtx: CanvasRenderingContext2D, slug: string) {
        if (!this.start || !this.draft || this.draft.type !== 'RECTANGLE') return;

        store.add(this.draft);
        
        const roomId = useRoomStore.getState().roomId;

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
        selectStore.add(this.draft.id, box);

        useToolStore.getState().setTool('SELECT');

        this.start = null;
        this.draft = null;
    }
}