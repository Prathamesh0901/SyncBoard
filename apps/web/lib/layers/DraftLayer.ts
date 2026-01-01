import { TypedWebSocket } from "../ws/TypedWebSocket";
import { useElementStore } from "../../store/element";
import { Element, Point } from "../types/types";
import { toolManager } from "../tools/ToolManager";
import { useTransformStore } from "../../store/transform";
import { useToolStore } from "../../store/tool";
import { screenToWorld } from "../utils/helper";
import { useSelectStore } from "../../store/selectElement";
import { getBoundingBox } from "../hitTest/pointUtilts";
import { useRoomStore } from "../../store/room";

export class DraftLayer {
    private draftCanvas: HTMLCanvasElement;
    private draftCtx: CanvasRenderingContext2D;
    private slug: string;
    private socket: TypedWebSocket;
    private isDrawing: boolean;
    private isPanning: boolean;
    private isErasing: boolean;
    private setPan: (x: number, y: number) => void;
    private setZoom: (factor: number) => void;

    constructor(draftCanvas: HTMLCanvasElement, slug: string, socket: TypedWebSocket) {
        this.draftCanvas = draftCanvas;
        this.draftCtx = draftCanvas.getContext('2d')!;
        this.slug = slug;
        this.socket = socket;
        this.isDrawing = false;
        this.isPanning = false;
        this.isErasing = false;
        this.setPan = useTransformStore.getState().setPan;
        this.setZoom = useTransformStore.getState().setZoom;
        this.initHandlers();
        this.initEvents();
    }

    initEvents () {
        this.draftCanvas.addEventListener('mousedown', this.onMouseDown);
        this.draftCanvas.addEventListener('mousemove', this.onMouseMove);
        this.draftCanvas.addEventListener('mouseup', this.onMouseUp);
        this.draftCanvas.addEventListener('wheel', this.onZoom);
        document.addEventListener('keydown', this.onKeyDown);
        this.clearDraftCanvas();
    }

    initHandlers() {
        this.socket.onTypedMessage((message) => {
            switch (message.type) {
                case "JOINED_ROOM": {
                    break;
                }
                case "ELEMENT_CREATED": {
                    const element: Element = {
                        ...message.element,
                        data: JSON.parse(message.element.data)
                    }
                    useElementStore.getState().add(element);
                    break;
                }
                case "ELEMENT_UPDATED": {
                    const el: Element = {
                        ...message.element,
                        data: JSON.parse(message.element.data)
                    }
                    useElementStore.getState().remove(el.id);
                    useElementStore.getState().add(el);
                    const box = getBoundingBox(el, this.draftCtx);
                    useSelectStore.getState().updateBox(el.id, box);
                    break;
                }
                case "ELEMENT_DELETED": {
                    useElementStore.getState().remove(message.elementId);
                    useSelectStore.getState().remove(message.elementId);
                    break;
                }
                case "LEFT_ROOM": {
                    break;
                }
            }
        })
    }

    clearDraftCanvas() {
        const { scale, x, y } = useTransformStore.getState();
        this.draftCtx.setTransform(1, 0, 0, 1, 0, 0);
        this.draftCtx.clearRect(0, 0, this.draftCanvas.width, this.draftCanvas.height);
        this.draftCtx.setTransform(scale, 0, 0, scale, x, y);
        return;
    }
    
    private onMouseDown = (e: MouseEvent) => {
        const currTool = useToolStore.getState().tool;
        if (currTool === 'FREE_HAND' && !this.isDrawing) {
            this.isPanning = true;
            return;
        }
        if (currTool === 'ERASER') this.isErasing = true;
        this.clearDraftCanvas();
        this.isDrawing = true;
        const tool = toolManager.getTool();
        const pt: Point = screenToWorld({x: e.clientX, y: e.clientY}, useTransformStore.getState());
        tool?.pointerDown(this.draftCtx, pt, this.socket, this.slug);
    }

    private onMouseMove = (e: MouseEvent) => {
        if (this.isPanning) {
            const {x, y} = useTransformStore.getState();
            this.setPan(x + e.movementX, y + e.movementY);
            return;
        }
        if (useToolStore.getState().tool === 'ERASER' && !this.isErasing) return;
        this.clearDraftCanvas();
        const tool = toolManager.getTool();
        const pt: Point = screenToWorld({x: e.clientX, y: e.clientY}, useTransformStore.getState());
        tool?.pointerMove(pt, this.draftCtx, this.socket, this.slug);
    }

    private onMouseUp = () => {
        if (this.isPanning) {
            this.isPanning = false;
            return;
        }
        if (this.isErasing) this.isErasing = false;
        this.clearDraftCanvas();
        this.isDrawing = false;
        const tool = toolManager.getTool();
        tool?.pointerUp(useElementStore.getState(), this.socket, this.draftCtx, this.slug);
    }

    private onZoom = (e: WheelEvent) => {
        e.preventDefault();
        const zoomIntensity = 1.1;
        const mouseX = e.offsetX - this.draftCanvas.getBoundingClientRect().left;
        const mouseY = e.offsetY - this.draftCanvas.getBoundingClientRect().top;

        const direction = e.deltaY < 0 ? 1: -1;
        const zoom = Math.pow(zoomIntensity, direction);

        const { x, y, scale } = useTransformStore.getState();

        const nx = mouseX - (mouseX - x) * zoom;
        const ny = mouseY - (mouseY - y) * zoom;

        const finalZoom = zoom * scale;
        
        if (finalZoom >= 0.1 && finalZoom <= 30) {
            this.setPan(nx, ny);
            this.setZoom(finalZoom);
        }
    }

    private onKeyDown (e: KeyboardEvent) {
        const key = e.key.toLowerCase();
        console.log(key);
        if (key === 'delete') {
            const roomId = useRoomStore.getState().roomId;
            const selectStore = useSelectStore.getState();
            const elementStore = useElementStore.getState();
            selectStore.selectedIds.forEach(id => {
                this.socket?.sendTyped({
                    type: 'ELEMENT_DELETE',
                    elementId: id,
                    roomId
                })
                elementStore.remove(id);
            });
            useSelectStore.getState().clearSelection();
        }
    }

    destroy() {
        this.draftCanvas.removeEventListener('mousedown', this.onMouseDown);
        this.draftCanvas.removeEventListener('mousemove', this.onMouseMove);
        this.draftCanvas.removeEventListener('mouseup', this.onMouseUp);
        this.draftCanvas.removeEventListener('wheel', this.onZoom);
        document.removeEventListener('keydown', this.onKeyDown);
        this.socket.sendTyped({
            type: 'LEAVE_ROOM',
            roomId: useRoomStore.getState().roomId
        });
        this.socket.close();
    }
}