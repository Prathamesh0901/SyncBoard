import { Element, Point } from "../types/types";
import { ElementState, useElementStore } from "../../store/element";
import { TypedWebSocket } from "../ws/TypedWebSocket";
import { getElementAtPoints } from "../hitTest/getElementAtPoint";
import { getHandleAtPoints } from "../hitTest/getHandleAtPoint";
import { renderEllipse, renderLine, renderPencil, renderRectangle, renderText } from "../renderers/renderer";
import { useTransformStore } from "../../store/transform";

export class SelectTool {
    h: {elementId: string | null, handleId: string | null} | null = null;
    isMoving: boolean = false;
    initialPos: Point | null = null;
    el: Element | undefined = undefined;

    pointerDown (pt: Point, ws: TypedWebSocket, slug: string) {
        this.h = getHandleAtPoints(pt);
        if (this.h.elementId && this.h.elementId !== '') {
            this.initialPos = pt;
            const store = useElementStore.getState();
            this.el = store.elements.filter(el => el.id === this.h?.elementId)[0];
            store.remove(this.h.elementId);
            if (this.h.handleId === '') {
                this.isMoving = true;
            }
            else {
                this.isMoving = false;
            }
        }
        else {
            getElementAtPoints(pt);
        }
    }

    pointerMove (pt: Point, draftCtx: CanvasRenderingContext2D, ws: TypedWebSocket, slug: string) {
        if (!this.h || !this.h.elementId || !this.initialPos || !this.el) return;
        if (this.isMoving) {
            const diffX = pt.x - this.initialPos.x;
            const diffY = pt.y - this.initialPos.y;
            this.initialPos = pt;
            const { scale, x, y } = useTransformStore.getState();
            draftCtx.setTransform(1, 0, 0, 1, 0, 0);
            draftCtx.clearRect(0, 0, draftCtx.canvas.width, draftCtx.canvas.height);

            draftCtx.setTransform(scale, 0, 0, scale, x, y);
            switch (this.el.type) {
                case "TEXT": {
                    this.el.data.x += diffX;
                    this.el.data.y += diffY;
                    renderText(draftCtx, this.el);
                    break;
                }
                case "PENCIL": {
                    const pts = this.el.data.points;
                    for (const p of pts) {
                        p.x += diffX;
                        p.y += diffY;
                    }
                    this.el.data.points = pts;
                    renderPencil(draftCtx, this.el);
                    break;
                }
                case "RECTANGLE": {
                    this.el.data.x += diffX;
                    this.el.data.y += diffY;
                    renderRectangle(draftCtx, this.el);
                    break;
                }
                case "ELLIPSE": {
                    this.el.data.x += diffX;
                    this.el.data.y += diffY;
                    renderEllipse(draftCtx, this.el);
                    break;
                }
                case "LINE": 
                case "ARROW": {
                    this.el.data.sX += diffX;
                    this.el.data.eX += diffX;
                    this.el.data.sY += diffY;
                    this.el.data.eY += diffY;
                    renderLine(draftCtx, this.el);
                    break;
                }
            }
        }
        return;
    }

    pointerUp (store: ElementState, ws: TypedWebSocket, slug: string) {
        if (this.el) store.add(this.el);
        this.isMoving = false;
        this.h = null;
        this.initialPos = null;
        this.el = undefined;
        return;
    }
}