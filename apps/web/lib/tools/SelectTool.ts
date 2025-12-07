import { Element, Point } from "../types/types";
import { ElementState, useElementStore } from "../../store/element";
import { TypedWebSocket } from "../ws/TypedWebSocket";
import { getHandleAtPoints } from "../hitTest/getHandleAtPoint";
import { renderArrow, renderEllipse, renderLine, renderPencil, renderRectangle, renderText } from "../renderers/renderer";
import { useTransformStore } from "../../store/transform";
import { useSelectStore } from "../../store/selectElement";
import { getBoundingBox } from "../hitTest/pointUtilts";
import { getElementsInsideBox } from "../hitTest/getElementsInsideBox";

export class SelectTool {
    h: { handleId: string | null } | null = null;
    isMoved: boolean = false;
    initialPos: Point | null = null;
    el: Element[] = [];
    isDragging: boolean = false;

    // keyBoardEvent(e: KeyboardEvent, ws: TypedWebSocket, slug: string) {
    //     console.log(e.key);
    //     if (e.key === 'delete') {
    //         if (this.el) {
    //             useElementStore.getState().remove(this.el.id);
    //             ws.sendTyped({
    //                 type: 'ELEMENT_DELETE',
    //                 slug,
    //                 elementId: this.el.id
    //             })
    //         }
    //     }
    // }

    pointerDown(draftCtx: CanvasRenderingContext2D, pt: Point, ws: TypedWebSocket, slug: string) {
        this.h = getHandleAtPoints(pt, draftCtx);
        this.initialPos = pt;
        if (this.h.handleId !== '') {
            this.isDragging = false;

            if (this.h.handleId === 'drag' || this.h.handleId === 'single') {
                this.h.handleId = ''
            }

            const ids = useSelectStore.getState().selectedIds;
            const store = useElementStore.getState();

            for (const id of ids) {
                const e = store.elements[id];
                if (e) this.el.push(e);
                store.remove(id);
            }

            for (const e of this.el) {
                switch (e.type) {
                    case "RECTANGLE": {
                        renderRectangle(draftCtx, e)
                        break;
                    }
                    case "PENCIL": {
                        renderPencil(draftCtx, e)
                        break;
                    }
                    case "ELLIPSE": {
                        renderEllipse(draftCtx, e)
                        break;
                    }
                    case "LINE": {
                        renderLine(draftCtx, e)
                        break;
                    }
                    case "ARROW": {
                        renderArrow(draftCtx, e)
                        break;
                    }
                    case "TEXT": {
                        renderText(draftCtx, e)
                        break;
                    }
                }
            }
        }
        else {
            this.isDragging = true;
            useSelectStore.getState().clearSelection();
        }
    }

    pointerMove(pt: Point, draftCtx: CanvasRenderingContext2D, ws: TypedWebSocket, slug: string) {

        const { scale, x, y } = useTransformStore.getState();

        draftCtx.setTransform(1, 0, 0, 1, 0, 0);
        draftCtx.clearRect(0, 0, draftCtx.canvas.width, draftCtx.canvas.height);
        draftCtx.setTransform(scale, 0, 0, scale, x, y);
        if (this.isDragging) {
            if (!this.initialPos) return;

            const w = pt.x - this.initialPos.x;
            const h = pt.y - this.initialPos.y;

            draftCtx.fillStyle = 'rgb(36, 123, 194, 0.25)';
            draftCtx.fillRect(this.initialPos.x, this.initialPos.y, w, h);

            getElementsInsideBox(this.initialPos, pt, draftCtx);
            return;
        }
        if (this.el.length === 0 || !this.initialPos || !this.h) return;
        console.log(this.h.handleId);
        const diffX = pt.x - this.initialPos.x;
        const diffY = pt.y - this.initialPos.y;
        this.initialPos = pt;
        for (const e of this.el) {
            this.isMoved = true;

            if (this.h.handleId === '') {
                switch (e.type) {
                    case "TEXT": {
                        e.data.x += diffX;
                        e.data.y += diffY;
                        renderText(draftCtx, e);
                        break;
                    }
                    case "PENCIL": {
                        const pts = e.data.points;
                        for (const p of pts) {
                            p.x += diffX;
                            p.y += diffY;
                        }
                        e.data.points = pts;
                        renderPencil(draftCtx, e);
                        break;
                    }
                    case "RECTANGLE": {
                        e.data.x += diffX;
                        e.data.y += diffY;
                        renderRectangle(draftCtx, e);
                        break;
                    }
                    case "ELLIPSE": {
                        e.data.x += diffX;
                        e.data.y += diffY;
                        renderEllipse(draftCtx, e);
                        break;
                    }
                    case "LINE": {
                        e.data.sX += diffX;
                        e.data.eX += diffX;
                        e.data.sY += diffY;
                        e.data.eY += diffY;
                        renderLine(draftCtx, e);
                        break;
                    }
                    case "ARROW": {
                        e.data.sX += diffX;
                        e.data.eX += diffX;
                        e.data.sY += diffY;
                        e.data.eY += diffY;
                        renderArrow(draftCtx, e);
                        break;
                    }
                }

            }
            else {
                switch (this.h.handleId) {
                    case "tl": {
                        switch (e.type) {
                            case "PENCIL": {
                                const { x1, x2, y1, y2 } = getBoundingBox(e, draftCtx);
                                const oldWidth = Math.abs(x2 - x1);
                                const oldHeight = Math.abs(y2 - y1);

                                const scaleX = (oldWidth - diffX) / oldWidth;
                                const scaleY = (oldHeight - diffY) / oldHeight;

                                const pts = e.data.points;
                                for (const pt of pts) {
                                    pt.x = (pt.x - x2) * scaleX + x2;
                                    pt.y = (pt.y - y2) * scaleY + y2;
                                }
                                e.data.points = pts;
                                renderPencil(draftCtx, e);
                                break;
                            }
                            case "RECTANGLE": {
                                e.data.x += diffX;
                                e.data.y += diffY;
                                e.data.w -= diffX;
                                e.data.h -= diffY;
                                renderRectangle(draftCtx, e);
                                break;
                            }
                            case "ELLIPSE": {
                                e.data.x += diffX / 2;
                                e.data.y += diffY / 2;
                                e.data.rX -= diffX / 2;
                                e.data.rY -= diffY / 2;
                                renderEllipse(draftCtx, e);
                                break;
                            }
                            case "LINE": {
                                e.data.sX += diffX;
                                e.data.sY += diffY;
                                renderLine(draftCtx, e);
                                break;
                            }
                            case "ARROW": {
                                e.data.sX += diffX;
                                e.data.sY += diffY;
                                renderArrow(draftCtx, e);
                                break;
                            }
                            case "TEXT": {
                                const { text, fontSize, fontFamily = 'Arial' } = e.data;
                                const lines = text.split('\n');
                                let w = 0, h = 0;

                                draftCtx.font = `${fontSize}px ${fontFamily}`;
                                draftCtx.fillStyle = 'rgb(255, 255, 255)';
                                draftCtx.textBaseline = 'top';

                                for (const line of lines) {
                                    const metrics = draftCtx.measureText(line);
                                    w = Math.max(w, metrics.width);
                                    h += metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent + 5;
                                }

                                const newFontSize = Math.max(10, Math.abs(fontSize * Math.abs((w - diffX + h - diffY) / (w + h))));
                                e.data.x += diffX;
                                e.data.y += diffY;
                                e.data.fontSize = newFontSize;
                                renderText(draftCtx, e);
                                break;
                            }
                        }
                        break;
                    }
                    case "tr": {
                        switch (e.type) {
                            case "PENCIL": {
                                const { x1, x2, y1, y2 } = getBoundingBox(e, draftCtx);
                                const oldWidth = Math.abs(x2 - x1);
                                const oldHeight = Math.abs(y2 - y1);

                                const scaleX = (oldWidth + diffX) / oldWidth;
                                const scaleY = (oldHeight - diffY) / oldHeight;

                                const pts = e.data.points;
                                for (const pt of pts) {
                                    pt.x = (pt.x - x1) * scaleX + x1;
                                    pt.y = (pt.y - y2) * scaleY + y2;
                                }
                                e.data.points = pts;
                                renderPencil(draftCtx, e);
                                break;
                            }
                            case "RECTANGLE": {
                                e.data.y += diffY;
                                e.data.w += diffX;
                                e.data.h -= diffY;
                                renderRectangle(draftCtx, e);
                                break;
                            }
                            case "ELLIPSE": {
                                e.data.x += diffX / 2;
                                e.data.y += diffY / 2;
                                e.data.rX += diffX / 2;
                                e.data.rY -= diffY / 2;
                                renderEllipse(draftCtx, e);
                                break;
                            }
                            case "LINE": {
                                e.data.sY += diffY;
                                e.data.eX += diffX;
                                renderLine(draftCtx, e);
                                break;
                            }
                            case "ARROW": {
                                e.data.sY += diffY;
                                e.data.eX += diffX;
                                renderArrow(draftCtx, e);
                                break;
                            }
                            case "TEXT": {
                                const { text, fontSize, fontFamily = 'Arial' } = e.data;
                                const lines = text.split('\n');
                                let w = 0, h = 0;

                                draftCtx.font = `${fontSize}px ${fontFamily}`;
                                draftCtx.fillStyle = 'rgb(255, 255, 255)';
                                draftCtx.textBaseline = 'top';

                                for (const line of lines) {
                                    const metrics = draftCtx.measureText(line);
                                    w = Math.max(w, metrics.width);
                                    h += metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent + 5;
                                }

                                const newFontSize = Math.max(10, Math.abs(fontSize * Math.abs((w + diffX + h - diffY) / (w + h))));
                                e.data.y += diffY;
                                e.data.fontSize = newFontSize;
                                renderText(draftCtx, e);
                                break;
                            }
                        }
                        break;
                    }
                    case "br": {
                        switch (e.type) {
                            case "PENCIL": {
                                const { x1, x2, y1, y2 } = getBoundingBox(e, draftCtx);
                                const oldWidth = Math.abs(x1 - x2);
                                const oldHeight = Math.abs(y1 - y2);

                                const scaleX = (oldWidth + diffX) / oldWidth;
                                const scaleY = (oldHeight + diffY) / oldHeight;

                                const pts = e.data.points;
                                for (const pt of pts) {
                                    pt.x = (pt.x - x1) * scaleX + x1;
                                    pt.y = (pt.y - y1) * scaleY + y1;
                                }
                                e.data.points = pts;
                                renderPencil(draftCtx, e);
                                break;
                            }
                            case "RECTANGLE": {
                                e.data.w += diffX;
                                e.data.h += diffY;
                                renderRectangle(draftCtx, e);
                                break;
                            }
                            case "ELLIPSE": {
                                e.data.x += diffX / 2;
                                e.data.y += diffY / 2;
                                e.data.rX += diffX / 2;
                                e.data.rY += diffY / 2;
                                renderEllipse(draftCtx, e);
                                break;
                            }
                            case "LINE": {
                                e.data.eX += diffX;
                                e.data.eY += diffY;
                                renderLine(draftCtx, e);
                                break;
                            }
                            case "ARROW": {
                                e.data.eX += diffX;
                                e.data.eY += diffY;
                                renderArrow(draftCtx, e);
                                break;
                            }
                            case "TEXT": {
                                const { text, fontSize, fontFamily = 'Arial' } = e.data;
                                const lines = text.split('\n');
                                let w = 0;

                                for (const line of lines) {
                                    draftCtx.font = `${fontSize}px ${fontFamily}`;
                                    draftCtx.fillStyle = 'rgb(255, 255, 255)';
                                    draftCtx.textBaseline = 'top';

                                    const metrics = draftCtx.measureText(line);
                                    w = Math.max(w, metrics.width);
                                }

                                const newFontSize = Math.max(10, fontSize * ((w + diffX) / (w)));
                                e.data.fontSize = newFontSize;
                                renderText(draftCtx, e);
                            }
                        }
                        break;
                    }
                    case "bl": {
                        switch (e.type) {
                            case "PENCIL": {
                                const { x1, x2, y1, y2 } = getBoundingBox(e, draftCtx);
                                const oldWidth = Math.abs(x2 - x1);
                                const oldHeight = Math.abs(y2 - y1);

                                const scaleX = (oldWidth - diffX) / oldWidth;
                                const scaleY = (oldHeight + diffY) / oldHeight;

                                const pts = e.data.points;
                                for (const pt of pts) {
                                    pt.x = (pt.x - x2) * scaleX + x2;
                                    pt.y = (pt.y - y1) * scaleY + y1;
                                }
                                e.data.points = pts;
                                renderPencil(draftCtx, e);
                                break;
                            }
                            case "RECTANGLE": {
                                e.data.x += diffX;
                                e.data.w -= diffX;
                                e.data.h += diffY;
                                renderRectangle(draftCtx, e);
                                break;
                            }
                            case "ELLIPSE": {
                                e.data.x += diffX / 2;
                                e.data.y += diffY / 2;
                                e.data.rX -= diffX / 2;
                                e.data.rY += diffY / 2;
                                renderEllipse(draftCtx, e);
                                break;
                            }
                            case "LINE": {
                                e.data.sX += diffX;
                                e.data.eY += diffY;
                                renderLine(draftCtx, e);
                                break;
                            }
                            case "ARROW": {
                                e.data.sX += diffX;
                                e.data.eY += diffY;
                                renderArrow(draftCtx, e);
                                break;
                            }
                            case "TEXT": {
                                const { text, fontSize, fontFamily = 'Arial' } = e.data;
                                const lines = text.split('\n');
                                let w = 0;

                                draftCtx.font = `${fontSize}px ${fontFamily}`;
                                draftCtx.fillStyle = 'rgb(255, 255, 255)';
                                draftCtx.textBaseline = 'top';

                                for (const line of lines) {
                                    const metrics = draftCtx.measureText(line);
                                    w = Math.max(w, metrics.width);
                                }

                                const newFontSize = Math.max(10, Math.abs(fontSize * Math.abs((w - diffX) / (w))));
                                e.data.x += diffX;
                                // e.data.y += diffY;
                                e.data.fontSize = newFontSize;
                                renderText(draftCtx, e);
                                break;
                            }
                        }
                        break;
                    }
                    case "tc": {
                        switch (e.type) {
                            case "PENCIL": {
                                const { y1, y2 } = getBoundingBox(e, draftCtx);
                                const oldHeight = Math.abs(y2 - y1);

                                const scaleY = (oldHeight - diffY) / oldHeight;

                                const pts = e.data.points;
                                for (const pt of pts) {
                                    pt.y = (pt.y - y2) * scaleY + y2;
                                }
                                e.data.points = pts;
                                renderPencil(draftCtx, e);
                                break;
                            }
                            case "RECTANGLE": {
                                e.data.y += diffY;
                                e.data.h -= diffY;
                                renderRectangle(draftCtx, e);
                                break;
                            }
                            case "ELLIPSE": {
                                e.data.y += diffY / 2;
                                e.data.rY -= diffY / 2;
                                renderEllipse(draftCtx, e);
                                break;
                            }
                            case "LINE": {
                                e.data.sY += diffY;
                                renderLine(draftCtx, e);
                                break;
                            }
                            case "ARROW": {
                                e.data.sY += diffY;
                                renderArrow(draftCtx, e);
                                break;
                            }
                            case "TEXT":
                        }
                        break;
                    }
                    case "mr": {
                        switch (e.type) {
                            case "PENCIL": {
                                const { x1, x2 } = getBoundingBox(e, draftCtx);
                                const oldWidth = Math.abs(x2 - x1);

                                const scaleX = (oldWidth + diffX) / oldWidth;

                                const pts = e.data.points;
                                for (const pt of pts) {
                                    pt.x = (pt.x - x1) * scaleX + x1;
                                }
                                e.data.points = pts;
                                renderPencil(draftCtx, e);
                                break;
                            }
                            case "RECTANGLE": {
                                e.data.w += diffX;
                                renderRectangle(draftCtx, e);
                                break;
                            }
                            case "ELLIPSE": {
                                e.data.x += diffX / 2;
                                e.data.rX += diffX / 2;
                                renderEllipse(draftCtx, e);
                                break;
                            }
                            case "LINE": {
                                e.data.eX += diffX;
                                renderLine(draftCtx, e);
                                break;
                            }
                            case "ARROW": {
                                e.data.eX += diffX;
                                renderArrow(draftCtx, e);
                                break;
                            }
                            case "TEXT":
                        }
                        break;
                    }
                    case "bc": {
                        switch (e.type) {
                            case "PENCIL": {
                                const { y1, y2 } = getBoundingBox(e, draftCtx);
                                const oldHeight = Math.abs(y2 - y1);

                                const scaleY = (oldHeight + diffY) / oldHeight;

                                const pts = e.data.points;
                                for (const pt of pts) {
                                    pt.y = (pt.y - y1) * scaleY + y1;
                                }
                                e.data.points = pts;
                                renderPencil(draftCtx, e);
                                break;
                            }
                            case "RECTANGLE": {
                                e.data.h += diffY;
                                renderRectangle(draftCtx, e);
                                break;
                            }
                            case "ELLIPSE": {
                                e.data.y += diffY / 2;
                                e.data.rY += diffY / 2;
                                renderEllipse(draftCtx, e);
                                break;
                            }
                            case "LINE": {
                                e.data.eY += diffY;
                                renderLine(draftCtx, e);
                                break;
                            }
                            case "ARROW": {
                                e.data.eY += diffY;
                                renderArrow(draftCtx, e);
                                break;
                            }
                            case "TEXT":
                        }
                        break;
                    }
                    case "ml": {
                        switch (e.type) {
                            case "PENCIL": {
                                const { x1, x2 } = getBoundingBox(e, draftCtx);
                                const oldWidth = Math.abs(x2 - x1);

                                const scaleX = (oldWidth - diffX) / oldWidth;

                                const pts = e.data.points;
                                for (const pt of pts) {
                                    pt.x = (pt.x - x2) * scaleX + x2;
                                }
                                e.data.points = pts;
                                renderPencil(draftCtx, e);
                                break;
                            }
                            case "RECTANGLE": {
                                e.data.x += diffX;
                                e.data.w -= diffX;
                                renderRectangle(draftCtx, e);
                                break;
                            }
                            case "ELLIPSE": {
                                e.data.x += diffX / 2;
                                e.data.rX -= diffX / 2;
                                renderEllipse(draftCtx, e);
                                break;
                            }
                            case "LINE": {
                                e.data.sX += diffX;
                                renderLine(draftCtx, e);
                                break;
                            }
                            case "ARROW": {
                                e.data.sX += diffX;
                                renderArrow(draftCtx, e);
                                break;
                            }
                            case "TEXT":
                        }
                        break;
                    }
                }
            }

            const boundingBox = getBoundingBox(e, draftCtx);
            useSelectStore.getState().updateBox(e.id, boundingBox);
        }
        return;
    }

    pointerUp(store: ElementState, ws: TypedWebSocket, draftCtx: CanvasRenderingContext2D, slug: string) {
        // console.log(useSelectStore.getState().selectedIds);
        if (this.isDragging) {
            const ids = useSelectStore.getState().selectedIds;
            const els = useElementStore.getState().elements;
            for (const id of ids) {
                if (els[id])
                    this.el.push(els[id]);
            }
        }
        this.isDragging = false;
        if (!this.el[0]) return;
        for (const e of this.el) {
            store.add(e);
            if (this.isMoved) {
                ws.sendTyped({
                    type: 'ELEMENT_UPDATE',
                    slug,
                    element: {
                        ...e,
                        data: JSON.stringify(e.data)
                    }
                })
            }
        }

        this.isMoved = false;
        this.h = null;
        this.initialPos = null;
        this.el = [];
        return;
    }
}