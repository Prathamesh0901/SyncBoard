import { createId } from "@paralleldrive/cuid2";
import { Element, Point } from "../types/types";
import { ElementState, useElementStore } from "../../store/element";
import { TypedWebSocket } from "../ws/TypedWebSocket";

export class TextTool {
    start: Point | null = null;
    inputEl: HTMLTextAreaElement | null = null;

    pointerDown (pt: Point, ws: TypedWebSocket, slug: string) {
        this.start = pt;
        console.log('pointer down');
        this.createInput(this.start, ws, slug);
    }

    pointerMove (pt: Point, draftCtx: CanvasRenderingContext2D, ws: TypedWebSocket, slug: string) {
        return;
    }
    
    pointerUp (store: ElementState, ws: TypedWebSocket, slug: string) {
        return;
    }

    createInput (point: Point, ws: TypedWebSocket, slug: string) {
        const input = document.createElement('textarea');
        input.style.position = 'absolute';
        input.style.left = point.x + "px";
        input.style.top = point.y + "px";
        input.style.fontSize = "20px";
        input.style.fontFamily = "Aerial";
        input.style.lineHeight = "20px";
        input.style.padding = "0";
        input.style.border = "1px dashed #999";
        input.style.background = "transparent";
        input.style.outline = "none";
        input.style.resize = "none";
        input.style.whiteSpace = "pre";
        input.style.color = "#999";

        document.body.appendChild(input);
        input.focus();

        this.inputEl = input;

        input.addEventListener('keydown', (e) => {
            if ((e.key === 'Enter' && !e.shiftKey) || e.key === 'Delete') {
                e.preventDefault();
                this.finish(ws, slug);
            }
        })
    }

    finish (ws: TypedWebSocket, slug: string) {
        if (!this.inputEl || !this.start) return;

        const text = this.inputEl.value.trim();
        if (text.length > 0) {
            const element: Element = {
                id: createId(),
                type: 'TEXT',
                data: {
                    x: this.start.x,
                    y: this.start.y,
                    text,
                    fontSize: 20,
                    fontFamily: 'Arial'
                }
            };
            useElementStore.getState().add(element)
            ws.sendTyped({
                type: 'ELEMENT_CREATE',
                slug,
                element: {
                    ...element,
                    data: JSON.stringify(element.data)
                }
            })
        }
        
        document.body.removeChild(this.inputEl);
        this.start = null;
        this.inputEl = null;
    }
}