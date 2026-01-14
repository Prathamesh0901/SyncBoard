import { createId } from "@paralleldrive/cuid2";
import { Element, Point } from "../types/types";
import { ElementState } from "../../store/element";
import { TypedWebSocket } from "../ws/TypedWebSocket";
import { renderArrow } from "../renderers/renderer";
import { useSelectStore } from "../../store/selectElement";
import { getBoundingBox } from "../hitTest/pointUtilts";
import { useToolStore } from "../../store/tool";
import { useStyleStore } from "../../store/style";

export class ArrowTool {
    start: Point | null = null;
    draft: Element | null = null;

    pointerDown (draftCtx: CanvasRenderingContext2D, pt: Point, ws: TypedWebSocket, slug: string, roomId: string) {
        this.start = pt;
        const styleStore = useStyleStore.getState();
        this.draft = {
            id: createId(),
            type: 'ARROW',
            data: {
                sX: pt.x,
                sY: pt.y,
                eX: pt.x,
                eY: pt.y,
                headlen: 10,
                angle: 0,
                strokeColor: styleStore.strokeColor,
                strokeWidth: styleStore.strokeWidth,
                strokeType: styleStore.strokeType,
                opacity: styleStore.opacity
            }
        }
    }

    pointerMove (pt: Point, draftCtx: CanvasRenderingContext2D, ws: TypedWebSocket, slug: string, roomId: string) {
        if (!this.start || !this.draft || this.draft.type !== 'ARROW') return;

        this.draft.data.eX = pt.x;
        this.draft.data.eY = pt.y;

        renderArrow(draftCtx, this.draft);
    }

    pointerUp (store: ElementState, ws: TypedWebSocket, draftCtx: CanvasRenderingContext2D, slug: string, roomId: string) {
        if (!this.start || !this.draft || this.draft.type !== 'ARROW') return;
        
        if (this.start.x === this.draft.data.eX && this.start.y === this.draft.data.eY) {
            this.start = null;
            this.draft = null;
            return;
        }

        store.add(this.draft);

        ws.sendTyped({
            type: 'ELEMENT_CREATE',
            roomId,
            element: {
                ...this.draft,
                data: JSON.stringify(this.draft.data)
            }
        })

        const box = getBoundingBox(this.draft, draftCtx);
        const selectStore = useSelectStore.getState();
        selectStore.clearSelection();
        selectStore.add(this.draft.id, box, 'OTHER');

        useToolStore.getState().setTool('SELECT');

        this.start = null;
        this.draft = null;
    }
}