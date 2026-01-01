import { BoundingBox, Element, Point } from "../types/types";
import { ElementState, useElementStore } from "../../store/element";
import { TypedWebSocket } from "../ws/TypedWebSocket";
import { getHandleAtPoints } from "../hitTest/getHandleAtPoint";
import { useTransformStore } from "../../store/transform";
import { useSelectStore } from "../../store/selectElement";
import { getBoundingBox } from "../hitTest/pointUtilts";
import { getElementsInsideBox } from "../hitTest/getElementsInsideBox";
import { rotateSingleElement } from "../geometry/rotate";
import { resizeSingleElement } from "../geometry/resizeSingle";
import { resizeMultiElement } from "../geometry/resizeMultiple";
import { toWorldPoint } from "../geometry/transform";
import { renderWithTransform } from "../renderers/render";
import { useRoomStore } from "../../store/room";

export class SelectTool {
    h: { handleId: string | null } | null = null;

    elements: Element[] = [];
    snapshot: Element[] = [];

    initialPos: Point | null = null;
    isDragging = false;
    isMoved = false;

    startRotateAngle = 0;

    groupBounds: BoundingBox = { x1: 0, y1: 0, x2: 0, y2: 0, angle: 0 };
    groupCenter: Point = { x: 0, y: 0 };

    pointerDown(draftCtx: CanvasRenderingContext2D, pt: Point, ws: TypedWebSocket, slug: string) {
        this.h = getHandleAtPoints(pt, draftCtx);
        this.initialPos = pt;
        this.isMoved = false;

        // selection box drag
        if (!this.h.handleId) {
            this.isDragging = true;
            useSelectStore.getState().clearSelection();
            return;
        }

        // normalize drag handles
        if (this.h.handleId === "drag" || this.h.handleId === "single") {
            this.h.handleId = "";
        }

        const store = useElementStore.getState();
        const ids = useSelectStore.getState().selectedIds;
        const boxes = useSelectStore.getState().boundingBoxes;

        const pt1: Point = { x: Infinity, y: Infinity };
        const pt2: Point = { x: -Infinity, y: -Infinity };

        Object.values(boxes).forEach((box) => {
            const cx = box.x1 + (box.x2 - box.x1) / 2;
            const cy = box.y1 + (box.y2 - box.y1) / 2;
            const { x: x1, y: y1 } = toWorldPoint(box.x1, box.y1, cx, cy, box.angle);
            const { x: x2, y: y2 } = toWorldPoint(box.x2, box.y2, cx, cy, box.angle);
            const { x: x3, y: y3 } = toWorldPoint(box.x1, box.y2, cx, cy, box.angle);
            const { x: x4, y: y4 } = toWorldPoint(box.x2, box.y1, cx, cy, box.angle);
            pt1.x = Math.min(pt1.x, x1, x2, x3, x4);
            pt1.y = Math.min(pt1.y, y1, y2, y3, y4);
            pt2.x = Math.max(pt2.x, x1, x2, x3, x4);
            pt2.y = Math.max(pt2.y, y1, y2, y3, y4);
        });

        this.groupBounds = { x1: pt1.x, y1: pt1.y, x2: pt2.x, y2: pt2.y, angle: 0 };

        this.groupCenter.x = pt1.x + (pt2.x - pt1.x) / 2;
        this.groupCenter.y = pt1.y + (pt2.y - pt1.y) / 2;

        this.startRotateAngle = Math.atan2(pt.y - this.groupCenter.y, pt.x - this.groupCenter.x);

        this.elements = [];
        this.snapshot = [];

        for (const id of ids) {
            const e = store.elements[id];
            if (!e) continue;

            this.elements.push(e);

            this.snapshot.push({ ...e, data: JSON.parse(JSON.stringify(e.data)) });

            store.remove(id);
        }

        for (const e of this.elements) {
            renderWithTransform(draftCtx, e);
            const box = getBoundingBox(e, draftCtx);
            useSelectStore.getState().updateBox(e.id, box);
        }
    }

    pointerMove(pt: Point, draftCtx: CanvasRenderingContext2D, ws: TypedWebSocket, slug: string) {
        const { scale, x, y } = useTransformStore.getState();

        draftCtx.setTransform(1, 0, 0, 1, 0, 0);
        draftCtx.clearRect(0, 0, draftCtx.canvas.width, draftCtx.canvas.height);
        draftCtx.setTransform(scale, 0, 0, scale, x, y);

        // box selection drag
        if (this.isDragging && this.initialPos) {
            const w = pt.x - this.initialPos.x;
            const h = pt.y - this.initialPos.y;

            draftCtx.fillStyle = "rgba(36,123,194,0.25)";
            draftCtx.fillRect(this.initialPos.x, this.initialPos.y, w, h);

            getElementsInsideBox(this.initialPos, pt, draftCtx);
            return;
        }

        if (!this.initialPos || !this.h || this.elements.length === 0) return;

        const diffX = pt.x - this.initialPos.x;
        const diffY = pt.y - this.initialPos.y;

        // drag elements
        if (this.h.handleId === "") {
            this.isMoved = true;

            for (let i = 0; i < this.elements.length; i++) {
                const e = this.elements[i];
                const s = this.snapshot[i];
                if (!e || !s) continue;

                switch (e.type) {
                    case "RECTANGLE":
                    case "ELLIPSE":
                    case "TEXT":
                        if (e.type !== s.type) break;
                        e.data.x = s.data.x + diffX;
                        e.data.y = s.data.y + diffY;
                        break;

                    case "PENCIL":
                        if (e.type !== s.type) break;
                        e.data.points = s.data.points.map(p => ({
                            x: p.x + diffX,
                            y: p.y + diffY
                        }));
                        break;

                    case "LINE":
                    case "ARROW":
                        if (e.type !== s.type) break;
                        e.data.sX = s.data.sX + diffX;
                        e.data.eX = s.data.eX + diffX;
                        e.data.sY = s.data.sY + diffY;
                        e.data.eY = s.data.eY + diffY;
                        break;
                }

                renderWithTransform(draftCtx, e);
                const box = getBoundingBox(e, draftCtx);
                useSelectStore.getState().updateBox(e.id, box);
            }
            return;
        }

        // rotate elements
        if (this.h.handleId === "rt") {
            this.isMoved = true;

            for (let i = 0; i < this.elements.length; i++) {
                const e = this.elements[i];
                const snap = this.snapshot[i];
                if (!e || !snap) continue;
                rotateSingleElement(draftCtx, e, snap, pt, this.startRotateAngle, this.groupCenter.x, this.groupCenter.y);
                renderWithTransform(draftCtx, e);
                const box = getBoundingBox(e, draftCtx);
                useSelectStore.getState().updateBox(e.id, box);
            }
            return;
        }

        // reize elements
        this.isMoved = true;
        if (this.elements.length === 1) {

            const element = this.elements[0];
            const start = this.snapshot[0];

            if (!element || !start) return;

            resizeSingleElement(draftCtx, element, start, this.h.handleId!, pt);
            renderWithTransform(draftCtx, element);
            const box = getBoundingBox(element, draftCtx);
            useSelectStore.getState().updateBox(element.id, box);
        }
        else {
            resizeMultiElement(draftCtx, this.elements, this.snapshot, this.h.handleId!, pt, this.groupBounds);
            for (const e of this.elements) {
                renderWithTransform(draftCtx, e);
                const box = getBoundingBox(e, draftCtx);
                useSelectStore.getState().updateBox(e.id, box);
            }
        }

        return;
    }

    pointerUp(store: ElementState, ws: TypedWebSocket, draftCtx: CanvasRenderingContext2D, slug: string) {
        if (this.isDragging) {
            const ids = useSelectStore.getState().selectedIds;
            const els = useElementStore.getState().elements;

            for (const id of ids) {
                if (els[id]) this.elements.push(els[id]);
            }
        }

        for (const e of this.elements) {
            store.add(e);
            
            const roomId = useRoomStore.getState().roomId;

            if (this.isMoved) {
                ws.sendTyped({
                    type: "ELEMENT_UPDATE",
                    roomId,
                    element: {
                        ...e,
                        data: JSON.stringify(e.data)
                    }
                });
            }
        }

        // reset
        this.elements = [];
        this.snapshot = [];
        this.h = null;
        this.initialPos = null;
        this.isDragging = false;
        this.isMoved = false;
        this.groupBounds = { x1: 0, y1: 0, x2: 0, y2: 0, angle: 0 };
        this.groupCenter = { x: 0, y: 0 };
    }
}