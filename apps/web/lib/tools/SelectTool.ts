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

        const boundingBoxes = useSelectStore.getState().boundingBoxes;

        const diffX = pt.x - this.initialPos.x;
        const diffY = pt.y - this.initialPos.y;

        const pt1: Point = { x: 1000000, y: 1000000 };
        const pt2: Point = { x: -1000000, y: -1000000 };

        Object.values(boundingBoxes).forEach(box => {
            pt1.x = Math.min(pt1.x, box.x1);
            pt1.y = Math.min(pt1.y, box.y1);
            pt1.x = Math.min(pt1.x, box.x2);
            pt1.y = Math.min(pt1.y, box.y2);
            pt2.x = Math.max(pt2.x, box.x1);
            pt2.y = Math.max(pt2.y, box.y1);
            pt2.x = Math.max(pt2.x, box.x2);
            pt2.y = Math.max(pt2.y, box.y2);
        });
        const bbox = { x1: pt1.x, y1: pt1.y, x2: pt2.x, y2: pt2.y };

        const sx = (bbox.x2 - bbox.x1 - diffX) / (bbox.x2 - bbox.x1);
        const sy = (bbox.y2 - bbox.y1 - diffY) / (bbox.y2 - bbox.y1);

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
                                const pts = e.data.points;
                                for (const pt of pts) {
                                    pt.x = (pt.x - bbox.x2) * sx + bbox.x2;
                                    pt.y = (pt.y - bbox.y2) * sy + bbox.y2;
                                }
                                e.data.points = pts;
                                renderPencil(draftCtx, e);
                                break;
                            }
                            case "RECTANGLE": {
                                e.data.x = bbox.x2 + (e.data.x - bbox.x2) * sx;
                                e.data.y = bbox.y2 + (e.data.y - bbox.y2) * sy;
                                e.data.w *= sx;
                                e.data.h *= sy;
                                renderRectangle(draftCtx, e);
                                break;
                            }
                            case "ELLIPSE": {
                                e.data.x = bbox.x2 + (e.data.x - bbox.x2) * sx;
                                e.data.y = bbox.y2 + (e.data.y - bbox.y2) * sy;
                                e.data.rX *= sx;
                                e.data.rY *= sy;
                                renderEllipse(draftCtx, e);
                                break;
                            }
                            case "LINE": {
                                e.data.sX = bbox.x2 + (e.data.sX - bbox.x2) * sx;
                                e.data.sY = bbox.y2 + (e.data.sY - bbox.y2) * sy;

                                e.data.eX = bbox.x2 + (e.data.eX - bbox.x2) * sx;
                                e.data.eY = bbox.y2 + (e.data.eY - bbox.y2) * sy;

                                renderLine(draftCtx, e);
                                break;
                            }
                            case "ARROW": {
                                e.data.sX = bbox.x2 + (e.data.sX - bbox.x2) * sx;
                                e.data.sY = bbox.y2 + (e.data.sY - bbox.y2) * sy;

                                e.data.eX = bbox.x2 + (e.data.eX - bbox.x2) * sx;
                                e.data.eY = bbox.y2 + (e.data.eY - bbox.y2) * sy;

                                e.data.headlen *= sx;
                                renderArrow(draftCtx, e);
                                break;
                            }
                            case "TEXT": {
                                const { text, fontSize, fontFamily = 'Arial' } = e.data;
                                
                                draftCtx.font = `${fontSize}px ${fontFamily}`;
                                draftCtx.fillStyle = 'rgb(255, 255, 255)';
                                draftCtx.textBaseline = 'top';
                                
                                // const lines = text.split('\n');
                                // let w = 0, h = 0;
                                // for (const line of lines) {
                                //     const metrics = draftCtx.measureText(line);
                                //     w = Math.max(w, metrics.width);
                                //     h += metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent + 5;
                                // }

                                // const newFontSize = Math.max(10, Math.abs(fontSize * Math.abs((w - diffX + h - diffY) / (w + h))));
                                // e.data.fontSize = newFontSize * (bbox.x2 - bbox.x1 - diffX + bbox.y2 - bbox.y1 - diffY) / (bbox.x2 - bbox.x1 + bbox.y2 - bbox.y1);

                                // e.data.x += diffX;
                                // e.data.y += diffY;
                                
                                e.data.x = bbox.x2 + (e.data.x - bbox.x2) * sx;
                                e.data.y = bbox.y2 + (e.data.y - bbox.y2) * sy;
                                e.data.fontSize *= sx;
                                renderText(draftCtx, e);
                                break;
                            }
                        }
                        break;
                    }
                    case "tr": {
                        switch (e.type) {
                            case "PENCIL": {
                                const pts = e.data.points;
                                for (const pt of pts) {
                                    pt.x = (pt.x - bbox.x1) / sx + bbox.x1;
                                    pt.y = (pt.y - bbox.y2) * sy + bbox.y2;
                                }
                                e.data.points = pts;
                                renderPencil(draftCtx, e);
                                break;
                            }
                            case "RECTANGLE": {
                                e.data.x = bbox.x1 + (e.data.x - bbox.x1) / sx;
                                e.data.y = bbox.y2 + (e.data.y - bbox.y2) * sy;
                                e.data.w /= sx;
                                e.data.h *= sy;
                                renderRectangle(draftCtx, e);
                                break;
                            }
                            case "ELLIPSE": {
                                e.data.x = bbox.x1 + (e.data.x - bbox.x1) / sx;
                                e.data.y = bbox.y2 + (e.data.y - bbox.y2) * sy;
                                e.data.rX /= sx;
                                e.data.rY *= sy;
                                renderEllipse(draftCtx, e);
                                break;
                            }
                            case "LINE": {
                                e.data.sX = bbox.x1 + (e.data.sX - bbox.x1) / sx;
                                e.data.sY = bbox.y2 + (e.data.sY - bbox.y2) * sy;
                                e.data.eX = bbox.x1 + (e.data.eX - bbox.x1) / sx;
                                e.data.eY = bbox.y2 + (e.data.eY - bbox.y2) * sy;
                                renderLine(draftCtx, e);
                                break;
                            }
                            case "ARROW": {
                                e.data.sX = bbox.x1 + (e.data.sX - bbox.x1) / sx;
                                e.data.sY = bbox.y2 + (e.data.sY - bbox.y2) * sy;
                                e.data.eX = bbox.x1 + (e.data.eX - bbox.x1) / sx;
                                e.data.eY = bbox.y2 + (e.data.eY - bbox.y2) * sy;
                                e.data.headlen /= sx;
                                renderArrow(draftCtx, e);
                                break;
                            }
                            case "TEXT": {
                                const { text, fontSize, fontFamily = 'Arial' } = e.data;
                                const lines = text.split('\n');
                                
                                draftCtx.font = `${fontSize}px ${fontFamily}`;
                                draftCtx.fillStyle = 'rgb(255, 255, 255)';
                                draftCtx.textBaseline = 'top';
                                
                                // let w = 0, h = 0;
                                // for (const line of lines) {
                                //     const metrics = draftCtx.measureText(line);
                                //     w = Math.max(w, metrics.width);
                                //     h += metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent + 5;
                                // }

                                // const newFontSize = Math.max(10, Math.abs(fontSize * Math.abs((w + diffX + h - diffY) / (w + h))));
                                // e.data.y += diffY;
                                // e.data.fontSize = newFontSize;

                                e.data.x = bbox.x1 + (e.data.x - bbox.x1) / sx;
                                e.data.y = bbox.y2 + (e.data.y - bbox.y2) * sy;
                                e.data.fontSize /= sx;
                                renderText(draftCtx, e);
                                break;
                            }
                        }
                        break;
                    }
                    case "br": {
                        switch (e.type) {
                            case "PENCIL": {
                                const pts = e.data.points;
                                for (const pt of pts) {
                                    pt.x = (pt.x - bbox.x1) / sx + bbox.x1;
                                    pt.y = (pt.y - bbox.y1) / sy + bbox.y1;
                                }
                                e.data.points = pts;
                                renderPencil(draftCtx, e);
                                break;
                            }
                            case "RECTANGLE": {
                                e.data.x = bbox.x1 + (e.data.x - bbox.x1) / sx;
                                e.data.y = bbox.y1 + (e.data.y - bbox.y1) / sy;
                                e.data.w /= sx;
                                e.data.h /= sy;
                                renderRectangle(draftCtx, e);
                                break;
                            }
                            case "ELLIPSE": {
                                e.data.x = bbox.x1 + (e.data.x - bbox.x1) / sx;
                                e.data.y = bbox.y1 + (e.data.y - bbox.y1) / sy;
                                e.data.rX /= sx;
                                e.data.rY /= sy;
                                renderEllipse(draftCtx, e);
                                break;
                            }
                            case "LINE": {
                                e.data.sX = bbox.x1 + (e.data.sX - bbox.x1) / sx;
                                e.data.sY = bbox.y1 + (e.data.sY - bbox.y1) / sy;
                                e.data.eX = bbox.x1 + (e.data.eX - bbox.x1) / sx;
                                e.data.eY = bbox.y1 + (e.data.eY - bbox.y1) / sy;
                                renderLine(draftCtx, e);
                                break;
                            }
                            case "ARROW": {
                                e.data.sX = bbox.x1 + (e.data.sX - bbox.x1) / sx;
                                e.data.sY = bbox.y1 + (e.data.sY - bbox.y1) / sy;
                                e.data.eX = bbox.x1 + (e.data.eX - bbox.x1) / sx;
                                e.data.eY = bbox.y1 + (e.data.eY - bbox.y1) / sy;
                                e.data.headlen /= sx;
                                renderArrow(draftCtx, e);
                                break;
                            }
                            case "TEXT": {
                                const { text, fontSize, fontFamily = 'Arial' } = e.data;
                                const lines = text.split('\n');
                                draftCtx.font = `${fontSize}px ${fontFamily}`;
                                draftCtx.fillStyle = 'rgb(255, 255, 255)';
                                draftCtx.textBaseline = 'top';
                                // let w = 0;

                                // for (const line of lines) {
                                //     draftCtx.font = `${fontSize}px ${fontFamily}`;
                                //     draftCtx.fillStyle = 'rgb(255, 255, 255)';
                                //     draftCtx.textBaseline = 'top';

                                //     const metrics = draftCtx.measureText(line);
                                //     w = Math.max(w, metrics.width);
                                // }

                                // const newFontSize = Math.max(10, fontSize * ((w + diffX) / (w)));
                                // e.data.fontSize = newFontSize;

                                e.data.x = bbox.x1 + (e.data.x - bbox.x1) / sx;
                                e.data.y = bbox.y1 + (e.data.y - bbox.y1) / sy;     
                                e.data.fontSize /= sx;
                                renderText(draftCtx, e);
                            }
                        }
                        break;
                    }
                    case "bl": {
                        switch (e.type) {
                            case "PENCIL": {
                                const pts = e.data.points;
                                for (const pt of pts) {
                                    pt.x = (pt.x - bbox.x2) * sx + bbox.x2;
                                    pt.y = (pt.y - bbox.y1) / sy + bbox.y1;
                                }
                                e.data.points = pts;
                                renderPencil(draftCtx, e);
                                break;
                            }
                            case "RECTANGLE": {
                                e.data.x = bbox.x2 + (e.data.x - bbox.x2) * sx;
                                e.data.y = bbox.y1 + (e.data.y - bbox.y1) / sy;
                                e.data.w *= sx;
                                e.data.h /= sy;
                                renderRectangle(draftCtx, e);
                                break;
                            }
                            case "ELLIPSE": {
                                e.data.x = bbox.x2 + (e.data.x - bbox.x2) * sx;
                                e.data.y = bbox.y1 + (e.data.y - bbox.y1) / sy;
                                e.data.rX *= sx;
                                e.data.rY /= sy;
                                renderEllipse(draftCtx, e);
                                break;
                            }
                            case "LINE": {
                                e.data.sX = bbox.x2 + (e.data.sX - bbox.x2) * sx;
                                e.data.sY = bbox.y1 + (e.data.sY - bbox.y1) / sy;
                                e.data.eX = bbox.x2 + (e.data.eX - bbox.x2) * sx;
                                e.data.eY = bbox.y1 + (e.data.eY - bbox.y1) / sy;
                                renderLine(draftCtx, e);
                                break;
                            }
                            case "ARROW": {
                                e.data.sX = bbox.x2 + (e.data.sX - bbox.x2) * sx;
                                e.data.sY = bbox.y1 + (e.data.sY - bbox.y1) / sy;
                                e.data.eX = bbox.x2 + (e.data.eX - bbox.x2) * sx;
                                e.data.eY = bbox.y1 + (e.data.eY - bbox.y1) / sy;
                                e.data.headlen *= sx;
                                renderArrow(draftCtx, e);
                                break;
                            }
                            case "TEXT": {
                                const { text, fontSize, fontFamily = 'Arial' } = e.data;
                                draftCtx.font = `${fontSize}px ${fontFamily}`;
                                draftCtx.fillStyle = 'rgb(255, 255, 255)';
                                draftCtx.textBaseline = 'top';
                                // const lines = text.split('\n');
                                // let w = 0;


                                // for (const line of lines) {
                                //     const metrics = draftCtx.measureText(line);
                                //     w = Math.max(w, metrics.width);
                                // }

                                // const newFontSize = Math.max(10, Math.abs(fontSize * Math.abs((w - diffX) / (w))));
                                // e.data.x += diffX;
                                // // e.data.y += diffY;
                                // e.data.fontSize = newFontSize;
                                
                                e.data.x = bbox.x2 + (e.data.x - bbox.x2) * sx;
                                e.data.y = bbox.y1 + (e.data.y - bbox.y1) / sy;
                                e.data.fontSize *= sx;
                                renderText(draftCtx, e);
                                break;
                            }
                        }
                        break;
                    }
                    case "tc": {
                        switch (e.type) {
                            case "PENCIL": {
                                const pts = e.data.points;
                                for (const pt of pts) {
                                    pt.y = (pt.y - bbox.y2) * sy + bbox.y2;
                                }
                                e.data.points = pts;
                                renderPencil(draftCtx, e);
                                break;
                            }
                            case "RECTANGLE": {
                                e.data.y = bbox.y2 + (e.data.y - bbox.y2) * sy;
                                e.data.h *= sy;
                                renderRectangle(draftCtx, e);
                                break;
                            }
                            case "ELLIPSE": {
                                e.data.y = bbox.y2 + (e.data.y - bbox.y2) * sy;
                                e.data.rY *= sy;
                                renderEllipse(draftCtx, e);
                                break;
                            }
                            case "LINE": {
                                e.data.sY = bbox.y2 + (e.data.sY - bbox.y2) * sy;
                                e.data.eY = bbox.y2 + (e.data.eY - bbox.y2) * sy;
                                renderLine(draftCtx, e);
                                break;
                            }
                            case "ARROW": {
                                e.data.sY = bbox.y2 + (e.data.sY - bbox.y2) * sy;
                                e.data.eY = bbox.y2 + (e.data.eY - bbox.y2) * sy;
                                e.data.headlen *= sy;
                                renderArrow(draftCtx, e);
                                break;
                            }
                            case "TEXT": {
                                renderText(draftCtx, e);
                                break;
                            }
                        }
                        break;
                    }
                    case "mr": {
                        switch (e.type) {
                            case "PENCIL": {
                                const pts = e.data.points;
                                for (const pt of pts) {
                                    pt.x = (pt.x - bbox.x1) / sx + bbox.x1;
                                }
                                e.data.points = pts;
                                renderPencil(draftCtx, e);
                                break;
                            }
                            case "RECTANGLE": {
                                e.data.x = bbox.x1 + (e.data.x - bbox.x1) / sx;
                                e.data.w /= sx;
                                renderRectangle(draftCtx, e);
                                break;
                            }
                            case "ELLIPSE": {
                                e.data.x = bbox.x1 + (e.data.x - bbox.x1) / sx;
                                e.data.rX /= sx;
                                renderEllipse(draftCtx, e);
                                break;
                            }
                            case "LINE": {
                                e.data.sX = bbox.x1 + (e.data.sX - bbox.x1) / sx;
                                e.data.eX = bbox.x1 + (e.data.eX - bbox.x1) / sx;
                                renderLine(draftCtx, e);
                                break;
                            }
                            case "ARROW": {
                                e.data.sX = bbox.x1 + (e.data.sX - bbox.x1) / sx;
                                e.data.eX = bbox.x1 + (e.data.eX - bbox.x1) / sx;
                                e.data.headlen /= sx;
                                renderArrow(draftCtx, e);
                                break;
                            }
                            case "TEXT": {
                                renderText(draftCtx, e);
                                break;
                            }
                        }
                        break;
                    }
                    case "bc": {
                        switch (e.type) {
                            case "PENCIL": {
                                const pts = e.data.points;
                                for (const pt of pts) {
                                    pt.y = (pt.y - bbox.y1) / sy + bbox.y1;
                                }
                                e.data.points = pts;
                                renderPencil(draftCtx, e);
                                break;
                            }
                            case "RECTANGLE": {
                                e.data.y = bbox.y1 + (e.data.y - bbox.y1) / sy;
                                e.data.h /= sy;
                                renderRectangle(draftCtx, e);
                                break;
                            }
                            case "ELLIPSE": {
                                e.data.y = bbox.y1 + (e.data.y - bbox.y1) / sy;
                                e.data.rY /= sy;
                                renderEllipse(draftCtx, e);
                                break;
                            }
                            case "LINE": {
                                e.data.sY = bbox.y1 + (e.data.sY - bbox.y1) / sy;
                                e.data.eY = bbox.y1 + (e.data.eY - bbox.y1) / sy;
                                renderLine(draftCtx, e);
                                break;
                            }
                            case "ARROW": {
                                e.data.sY = bbox.y1 + (e.data.sY - bbox.y1) / sy;
                                e.data.eY = bbox.y1 + (e.data.eY - bbox.y1) / sy;
                                e.data.headlen /= sy;
                                renderArrow(draftCtx, e);
                                break;
                            }
                            case "TEXT": {
                                renderText(draftCtx, e);
                                break;
                            }
                        }
                        break;
                    }
                    case "ml": {
                        switch (e.type) {
                            case "PENCIL": {
                                const pts = e.data.points;
                                for (const pt of pts) {
                                    pt.x = (pt.x - bbox.x2) * sx + bbox.x2;
                                }
                                e.data.points = pts;
                                renderPencil(draftCtx, e);
                                break;
                            }
                            case "RECTANGLE": {
                                e.data.x = bbox.x2 + (e.data.x - bbox.x2) * sx;
                                e.data.w *= sx;
                                renderRectangle(draftCtx, e);
                                break;
                            }
                            case "ELLIPSE": {
                                e.data.x = bbox.x2 + (e.data.x - bbox.x2) * sx;
                                e.data.rX *= sx;
                                renderEllipse(draftCtx, e);
                                break;
                            }
                            case "LINE": {
                                e.data.sX = bbox.x2 + (e.data.sX - bbox.x2) * sx;
                                e.data.eX = bbox.x2 + (e.data.eX - bbox.x2) * sx;
                                renderLine(draftCtx, e);
                                break;
                            }
                            case "ARROW": {
                                e.data.sX = bbox.x2 + (e.data.sX - bbox.x2) * sx;
                                e.data.eX = bbox.x2 + (e.data.eX - bbox.x2) * sx;
                                e.data.headlen *= sx;
                                renderArrow(draftCtx, e);
                                break;
                            }
                            case "TEXT": {
                                renderText(draftCtx, e);
                                break;
                            }
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