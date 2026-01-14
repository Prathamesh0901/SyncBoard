import { createId } from "@paralleldrive/cuid2";
import { Element, Point } from "../types/types";
import { ElementState, useElementStore } from "../../store/element";
import { TypedWebSocket } from "../ws/TypedWebSocket";
import { worldToScreen } from "../utils/helper";
import { useTransformStore } from "../../store/transform";
import { getBoundingBox } from "../hitTest/pointUtilts";
import { useSelectStore } from "../../store/selectElement";
import { useToolStore } from "../../store/tool";
import { useStyleStore } from "../../store/style";

export class TextTool {
    start: Point | null = null;
    inputEl: HTMLTextAreaElement | null = null;

    pointerDown(draftCtx: CanvasRenderingContext2D, pt: Point, ws: TypedWebSocket, slug: string, roomId: string) {
        this.start = pt;
        this.createInput(draftCtx, this.start, ws, slug, roomId);
    }

    pointerMove(pt: Point, draftCtx: CanvasRenderingContext2D, ws: TypedWebSocket, slug: string, roomId: string) {
        return;
    }

    pointerUp(store: ElementState, ws: TypedWebSocket, draftCtx: CanvasRenderingContext2D, slug: string, roomId: string) {
        return;
    }

    createInput(ctx: CanvasRenderingContext2D, point: Point, ws: TypedWebSocket, slug: string, roomId: string) {
        const p = worldToScreen(point, useTransformStore.getState());
        const styleStore = useStyleStore.getState();
        const input = document.createElement('textarea');
        input.style.position = 'absolute';
        input.style.left = p.x + "px";
        input.style.top = p.y + "px";
        input.style.fontSize = "20px";
        input.style.fontFamily = "Aerial";
        input.style.lineHeight = "20px";
        input.style.padding = "0";
        input.style.border = "1px dashed #999";
        input.style.background = "transparent";
        input.style.outline = "none";
        input.style.resize = "none";
        input.style.whiteSpace = "pre";
        input.style.color = styleStore.strokeColor;

        document.body.appendChild(input);
        input.focus();

        this.inputEl = input;

        input.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' && !e.shiftKey) || e.key === 'Delete') {
                e.preventDefault();
                this.finish(ctx, ws, slug, roomId);
            }
        })
    }

    finish(ctx: CanvasRenderingContext2D, ws: TypedWebSocket, slug: string, roomId: string) {
        if (!this.inputEl || !this.start) return;
        const text = this.inputEl.value.trim();
        if (text.length > 0) {
            ctx.font = `50px Arial`;
            ctx.fillStyle = 'rgb(255, 255, 255)';
            ctx.lineWidth = 1;
            ctx.textBaseline = 'top';
            let maxWidth = 0, currWidth = 0;
            const lines = text.split('\n');
            lines.forEach(line => {
                const tokens = line.match(/\S+\s*/g);
                tokens?.forEach(token => {
                    maxWidth = Math.max(maxWidth, ctx.measureText(token).width);
                });
                currWidth = Math.max(currWidth, ctx.measureText(line).width);
            });
            const styleStore = useStyleStore.getState();
            const element: Element = {
                id: createId(),
                type: 'TEXT',
                data: {
                    x: this.start.x,
                    y: this.start.y,
                    text,
                    fontSize: styleStore.fontSize,
                    fontFamily: 'Arial',
                    angle: 0,
                    maxWidth,
                    currWidth,
                    lineCount: lines.length,
                    lineHeight: 0,
                    strokeColor: styleStore.strokeColor,
                    strokeWidth: styleStore.strokeWidth,
                    opacity: styleStore.opacity
                }
            };

            useElementStore.getState().add(element);

            ws.sendTyped({
                type: 'ELEMENT_CREATE',
                roomId,
                element: {
                    ...element,
                    data: JSON.stringify(element.data)
                }
            })
            const box = getBoundingBox(element, ctx);
            const selectStore = useSelectStore.getState();
            selectStore.clearSelection();
            selectStore.add(element.id, box, 'TEXT');

            useToolStore.getState().setTool('SELECT');
        }

        document.body.removeChild(this.inputEl);
        this.start = null;
        this.inputEl = null;

    }
}