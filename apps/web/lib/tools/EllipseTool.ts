import { createId } from "@paralleldrive/cuid2";
import { Element, Point } from "../types/types";
import { ElementState } from "../../store/element";
import { TypedWebSocket } from "../ws/TypedWebSocket";
import { renderEllipse } from "../renderers/renderer";
import { getBoundingBox } from "../hitTest/pointUtilts";
import { useSelectStore } from "../../store/selectElement";
import { useToolStore } from "../../store/tool";
import { useStyleStore } from "../../store/style";

export class EllipseTool {
    start: Point | null = null;
    draft: Element | null = null;

    pointerDown (draftCtx: CanvasRenderingContext2D, pt: Point, ws: TypedWebSocket, slug: string, roomId: string) {
        this.start = pt;
        const styleStore = useStyleStore.getState();
        this.draft = {
            id: createId(),
            type: 'ELLIPSE',
            data: {
                x: pt.x,
                y: pt.y,
                rX: 0,
                rY: 0,
                angle: 0,
                strokeColor: styleStore.strokeColor,
                strokeWidth: styleStore.strokeWidth,
                strokeStyle: styleStore.strokeType,
                opacity: styleStore.opacity
            }
        }
    }

    pointerMove (pt: Point, draftCtx: CanvasRenderingContext2D, ws: TypedWebSocket, slug: string, roomId: string) {
        if (!this.start || !this.draft || this.draft.type !== 'ELLIPSE') return;

        const radiusX = Math.abs(pt.x - this.start.x)/2;
        const radiusY = Math.abs(pt.y - this.start.y)/2;
        const centerX = this.start.x + radiusX;
        const centerY = this.start.y + radiusY;

        this.draft.data.x = centerX;
        this.draft.data.y = centerY;
        this.draft.data.rX = radiusX;
        this.draft.data.rY = radiusY;
        
        renderEllipse(draftCtx, this.draft);
    }

    pointerUp (store: ElementState, ws: TypedWebSocket, draftCtx: CanvasRenderingContext2D, slug: string, roomId: string) {
        if (!this.start || !this.draft || this.draft.type !== 'ELLIPSE') return;

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
        selectStore.add(this.draft.id, box);

        useToolStore.getState().setTool('SELECT');

        this.start = null;
        this.draft = null;
    }
}