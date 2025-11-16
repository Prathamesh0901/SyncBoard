import { Point, Shape } from "@repo/common/types";
import { getExisitingShapes } from "./fetch";
import { useDrawStore } from "@repo/store/store";
import { DrawShape } from "./DrawShape";
import { createId } from '@paralleldrive/cuid2';

export class Draw {
    private mainCanvas: HTMLCanvasElement;
    private draftCanvas: HTMLCanvasElement;
    private mainCtx: CanvasRenderingContext2D;
    private draftCtx: CanvasRenderingContext2D;
    private existingShapes: Shape[];
    private roomId: string;
    private socket: WebSocket;
    private isDrawing: boolean;
    private startX: number;
    private startY: number;
    private draftShape: Shape | null;
    private points: Point[];
    private drawShape: DrawShape;
    private viewportTransform: {
        x: number,
        y: number,
        scale: number;
    }
    private isPanning: boolean;
    private id: string;
    private eraser: {
        x: number;
        y: number;
        radius: number;
    }

    constructor(mainCanvas: HTMLCanvasElement, draftCanvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {
        this.mainCanvas = mainCanvas;
        this.draftCanvas = draftCanvas
        this.mainCtx = mainCanvas.getContext('2d')!;
        this.draftCtx = draftCanvas.getContext('2d')!;
        this.existingShapes = [];
        this.roomId = roomId;
        this.socket = socket;
        this.isDrawing = false;
        this.startX = 0;
        this.startY = 0;
        this.points = [];
        this.drawShape = new DrawShape();
        this.draftShape = null;
        this.viewportTransform = {
            x: 0,
            y: 0,
            scale: 1
        };
        this.eraser = {
            x: 0,
            y: 0,
            radius: 5
        }
        this.id = "";
        this.isPanning = false;
        this.init();
        this.initHandlers();
        this.initMouseHandlers();
    }

    async init() {
        this.existingShapes = await getExisitingShapes(this.roomId);
        this.clearMainCanvas();
        this.clearDraftCanvas();
    }

    initHandlers() {
        this.socket.onmessage = (e) => {
            const message = JSON.parse(e.data);

            if (message.type === 'chat') {
                const parsedMessage = JSON.parse(message.message);
                this.existingShapes.push({
                    ...parsedMessage,
                    id: message.id
                });
                this.clearMainCanvas();
            }
        }
    }

    initMouseHandlers() {
        this.draftCanvas.addEventListener('mousedown', this.mouseDownHandler);

        this.draftCanvas.addEventListener('mouseup', this.mouseUpHandler);

        this.draftCanvas.addEventListener('mousemove', this.mouseMoveHandler);

        this.draftCanvas.addEventListener('wheel', this.onMouseWheel);

    }

    private screenToWorld (x: number, y: number) {
        return {
            x: (x - this.viewportTransform.x) / this.viewportTransform.scale,
            y: (y - this.viewportTransform.y) / this.viewportTransform.scale,
        }
    }

    private deleteElement (id: string) {
        console.log('delete:', id);
        this.existingShapes = this.existingShapes.filter(shape => shape.id !== id);
    }

    private pointToSegmentDistance (pos: {x: number, y: number}, a:  {x: number, y: number}, b: {x: number, y: number}) {
        const abx = b.x - a.x;
        const aby = b.y - a.y;

        const apx = pos.x - a.x;
        const apy = pos.y - a.y;

        const ablensq = abx * abx + aby * aby;
        if (ablensq === 0) return this.distance(pos, a);

        const t = Math.max(
            0,
            Math.min(1, (apx * apx + apy * apy)/ablensq)
        );

        const closest = {
            x: a.x + t * abx,
            y: a.y + t * aby
        }

        return this.distance(pos, closest);
    }

    private distance (a:  {x: number, y: number}, b:  {x: number, y: number}) {
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        return Math.sqrt(dx * dx + dy * dy);
    }

    private hitShape (shape: Shape, pos: {x: number, y: number}) {
        switch (shape.type) {
            case "rect": {
                return  pos.x >= shape.startX && pos.y <= shape.startX + shape.width 
                        &&
                        pos.y >= shape.startY && pos.y <= shape.startY + shape.height;
            }
            case "circle": {
                const dist = this.distance(pos, {x: shape.centerX, y: shape.centerY})
                return dist <= shape.radiusX && dist <= shape.radiusY;
            }
            case "triangle": {
                
                break;
            }
            case "arrow": {
                return this.pointToSegmentDistance(pos, {x: shape.startX, y: shape.startY}, {x: shape.endX, y: shape.endY}) <= 8;
            }
        }
    }

    private erasePencil (shape: Shape, pos: {x: number, y: number}, radius: number) {
        if (shape.type !== 'pencil') return;
        const pts = shape.points;
        const segments: Point[][] = [];
        let currSeg: Point[] = [];

        let cutHappend = false;

        pts.forEach(pt => {
            const dist = this.distance(pt, pos);

            if (dist > radius) {
                currSeg.push(pt);
            }
            else {
                cutHappend = true;

                if (currSeg.length > 1) {
                    segments.push(currSeg);
                }

                currSeg = [];
            }
        })

        if (currSeg.length > 1) {
            segments.push(currSeg);
        }

        if(!cutHappend) return false;

        this.deleteElement(shape.id);

        segments.forEach(seg => {
            if (!seg) return;
            this.existingShapes.push({
                id: createId(),
                type: 'pencil',
                points: seg
            })
        });

        return true;
    }

    private mouseDownHandler = (e: MouseEvent) => {
        if (useDrawStore.getState().selectedTool === 'free_hand') {
            this.isPanning = true;
            this.startX = e.offsetX - this.viewportTransform.x;
            this.startY = e.offsetY - this.viewportTransform.y;
        }
        else {
            this.id = createId();
            const pos = this.screenToWorld(e.offsetX, e.offsetY);
            this.isDrawing = true;
            this.startX = pos.x;
            this.startY = pos.y;
        }
    }
    
    private mouseUpHandler = (e: MouseEvent) => {
        this.isPanning = false;
        if (!this.isDrawing) return;
        this.isDrawing = false;
        if (e.offsetX === this.startX && e.offsetY === this.startY) return;
        this.sendShape();
        this.clearMainCanvas();
        this.clearDraftCanvas();
        this.draftShape = null;
        this.points = [];
    }
    
    private mouseMoveHandler = (e: MouseEvent) => {
        
        const selectedTool = useDrawStore.getState().selectedTool;
        if (selectedTool === 'free_hand' && this.isPanning) {
            this.viewportTransform.x = e.offsetX - this.startX;
            this.viewportTransform.y = e.offsetY - this.startY;

            this.clearMainCanvas();
            return;
        }
        
        if (!this.isDrawing ) return;
        this.clearDraftCanvas();
        const pos = this.screenToWorld(e.offsetX, e.offsetY);
        this.draftCtx.lineWidth = 1/this.viewportTransform.scale;

        switch (selectedTool) {

            case "free_hand": {
                // this.updatePanning(e);
                this.clearMainCanvas();
                this.clearDraftCanvas();
                break;
            }

            case "eraser": {
                const pos = this.screenToWorld(e.clientX, e.clientY);
                this.existingShapes.forEach(shape => {
                    if (shape.type === 'pencil') {
                        const hasCut = this.erasePencil(shape, pos, this.eraser.radius);
                        if (hasCut) {
                            this.clearMainCanvas();
                        };
                    }
                    else {
                        if (this.hitShape(shape, pos)) {
                            this.deleteElement(shape.id);
                            return;
                        }
                    }
                })
                break;
            }
            
            case "rect": {
                // rectangle
                const width = pos.x - this.startX;
                const height = pos.y - this.startY;
                this.draftShape = {
                    id: this.id,
                    type: 'rect',
                    startX: this.startX,
                    startY: this.startY,
                    width,
                    height
                }
                break;
            }
            
            case "circle": {
                // circle
                const radiusX = Math.abs(pos.x - this.startX);
                const radiusY = Math.abs(pos.y - this.startY);
                const centerX = this.startX;
                const centerY = this.startY;
                this.draftShape = {
                    id: this.id,
                    type: 'circle',
                    centerX,
                    centerY,
                    radiusX,
                    radiusY
                };
                break;
            }
            
            case "triangle": {
                // triangle
                this.draftShape = {
                    id: this.id,
                    type: 'triangle',
                    x1: this.startX,
                    y1: this.startY,
                    x2: pos.x,
                    y2: pos.y,
                    x3: pos.x - 2 * (Math.abs(this.startX - pos.x)),
                    y3: pos.y
                };
                break;
            }
            
            case "arrow": {
                // arrow
                this.draftShape = {
                    id: this.id,
                    type: 'arrow',
                    startX: this.startX,
                    startY: this.startY,
                    endX: pos.x,
                    endY: pos.y,
                    headlen: 10 / this.viewportTransform.scale
                };
                break;
            }
            
            case "pencil": {
                // pencil
                this.points.push({
                    x: pos.x, 
                    y: pos.y
                });
                this.draftShape = {
                    id: this.id,
                    type: 'pencil',
                    points: this.points
                }
                break;
            }
        }

        if (this.draftShape)
            this.drawShape.draw(this.draftCtx, this.draftShape);
    }

    private onMouseWheel = (e: WheelEvent) => {
        e.preventDefault();
        const zoomIntensity = 1.1;
        const mouseX = e.offsetX - this.mainCanvas.getBoundingClientRect().left;
        const mouseY = e.offsetY - this.mainCanvas.getBoundingClientRect().top;

        const direction = e.deltaY < 0 ? 1: -1;
        const zoom = Math.pow(zoomIntensity, direction);

        this.viewportTransform.x = mouseX - (mouseX - this.viewportTransform.x) * zoom;
        this.viewportTransform.y = mouseY - (mouseY - this.viewportTransform.y) * zoom;

        this.viewportTransform.scale *= zoom;

        this.clearMainCanvas();
    }
    
    clearMainCanvas() {
        this.mainCtx.setTransform(1, 0, 0, 1, 0, 0);
        this.mainCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
        this.mainCtx.fillStyle = "rgba(0, 0, 0)";
        this.mainCtx.fillRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
        this.mainCtx.setTransform(this.viewportTransform.scale, 0, 0, this.viewportTransform.scale, this.viewportTransform.x, this.viewportTransform.y);
        this.mainCtx.strokeStyle = "rgba(255, 255, 255)";
        this.mainCtx.lineWidth = 1/this.viewportTransform.scale;

        if (!this.existingShapes || this.existingShapes.length === 0) return;

        this.existingShapes.map(shape => {
            console.log('existing:',shape.id)
           this.drawShape.draw(this.mainCtx, shape);
        })

        return;
    }

    clearDraftCanvas() {
        this.draftCtx.setTransform(1, 0, 0, 1, 0, 0);
        this.draftCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
        this.draftCtx.setTransform(this.viewportTransform.scale, 0, 0, this.viewportTransform.scale, this.viewportTransform.x, this.viewportTransform.y);
        return;
    }

    sendShape() {
        if (!this.draftShape) return;
        this.existingShapes.push(this.draftShape);
        this.socket.send(JSON.stringify({
            type: "chat",
            roomId: this.roomId,
            message: JSON.stringify(this.draftShape)
        }));
        return;
    }

    destroy() {
        this.draftCanvas.removeEventListener('mousedown', this.mouseDownHandler);
        this.draftCanvas.removeEventListener('mouseup', this.mouseUpHandler);
        this.draftCanvas.removeEventListener('mousemove', this.mouseMoveHandler);
        this.socket.send(JSON.stringify({
            type: 'leave_room',
            roomId: this.roomId
        }));
        this.socket.close();
    }
}