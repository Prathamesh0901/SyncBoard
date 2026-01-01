import { TransformState, useTransformStore } from "../../store/transform";
import { toLocalPoint, toWorldPoint } from "../geometry/transform";
import { BoundingBox, Point } from "../types/types";

export class SelectionLayer {
    private selectCanvas: HTMLCanvasElement;
    private selectCtx: CanvasRenderingContext2D;
    private slug: string;

    constructor(selectCanvas: HTMLCanvasElement, slug: string) {
        this.selectCanvas = selectCanvas;
        this.selectCtx = selectCanvas.getContext('2d')!;
        this.slug = slug;
        this.clearSelectCanvas();
    }

    drawBoundingBox(boundingBoxes: Record<string, BoundingBox>, transform: TransformState) {
        this.clearSelectCanvas();

        if (Object.keys(boundingBoxes).length > 1) {

            const pt1: Point = { x: Infinity, y: Infinity };
            const pt2: Point = { x: -Infinity, y: -Infinity };

            Object.values(boundingBoxes).forEach(box => {
                const cx = box.x1 + (box.x2 - box.x1) / 2;
                const cy = box.y1 + (box.y2 - box.y1) / 2;
                const {x: x1, y: y1} = toWorldPoint(box.x1, box.y1, cx, cy, box.angle);
                const {x: x2, y: y2} = toWorldPoint(box.x2, box.y2, cx, cy, box.angle);
                const {x: x3, y: y3} = toWorldPoint(box.x1, box.y2, cx, cy, box.angle);
                const {x: x4, y: y4} = toWorldPoint(box.x2, box.y1, cx, cy, box.angle);
                pt1.x = Math.min(pt1.x, x1, x2, x3, x4);
                pt1.y = Math.min(pt1.y, y1, y2, y3, y4);
                pt2.x = Math.max(pt2.x, x1, x2, x3, x4);
                pt2.y = Math.max(pt2.y, y1, y2, y3, y4);
                this.drawSingleBox(box, transform);
            });

            const box = { x1: pt1.x, y1: pt1.y, x2: pt2.x, y2: pt2.y, angle: 0 };
            const { scale } = transform;

            const width = pt2.x - pt1.x;
            const height = pt2.y - pt1.y;

            this.selectCtx.setLineDash([10, 5]);
            this.selectCtx.strokeStyle = '#4A90E2';
            this.selectCtx.lineWidth = 1 / scale;

            this.selectCtx.strokeRect(pt1.x, pt1.y, width, height);
            this.selectCtx.setLineDash([]);
            this.drawHandles(this.selectCtx, box, transform);
        }
        else {
            Object.values(boundingBoxes).forEach(box => {
                this.drawSingleBox(box, transform);
                this.drawHandles(this.selectCtx, box, transform);
            });
        }
    }

    drawSingleBox(box: BoundingBox, transform: TransformState) {
        const { x1, y1, x2, y2, angle } = box;
        const { scale } = transform;

        const width = x2 - x1;
        const height = y2 - y1;

        const cx = x1 + width / 2;
        const cy = y1 + height / 2;

        this.selectCtx.save();
        this.selectCtx.translate(cx, cy);
        this.selectCtx.rotate(angle);
        this.selectCtx.translate(-cx, -cy);
        
        this.selectCtx.strokeStyle = '#4A90E2';
        this.selectCtx.lineWidth = 1 / scale;
        
        this.selectCtx.strokeRect(x1, y1, width, height);
        this.selectCtx.restore();
    }

    drawHandles(ctx: CanvasRenderingContext2D, box: BoundingBox, transform: TransformState) {
        const { x1, y1, x2, y2, angle } = box;
        const { scale } = transform;

        const w = x2 - x1;
        const h = y2 - y1;

        const cx = x1 + w/2;
        const cy = y1 + h/2;

        const handleSize = 8 / scale;
        const half = handleSize / 2;

        ctx.save();
        ctx.translate(cx, cy);
        ctx.rotate(angle);
        ctx.translate(-cx, -cy);

        const handles = [
            { x: x1, y: y1, id: "nw" },
            { x: cx, y: y1, id: "no" },
            { x: x2, y: y1, id: "ne" },
            { x: x2, y: cy, id: "ea" },
            { x: x2, y: y2, id: "se" },
            { x: cx, y: y2, id: "so" },
            { x: x1, y: y2, id: "sw" },
            { x: x1, y: cy, id: "we" },
            { x: cx, y: Math.min(y1, y2) - 10, id: "rt"}
        ]
        
        this.selectCtx.strokeStyle = '#4A90E2';
        this.selectCtx.fillStyle = '#ffffff';
        this.selectCtx.lineWidth = 1 / scale;
        
        handles.forEach(p => {
            const x = p.x - half, y = p.y - half;
            
            this.selectCtx.beginPath();
            this.selectCtx.rect(x, y, handleSize, handleSize);
            this.selectCtx.fill();
            this.selectCtx.stroke();
        })
        
        ctx.restore();
    }
    
    clearSelectCanvas() {
        const { scale, x, y } = useTransformStore.getState();
        this.selectCtx.setTransform(1, 0, 0, 1, 0, 0);
        this.selectCtx.clearRect(0, 0, this.selectCanvas.width, this.selectCanvas.height);
        this.selectCtx.setTransform(scale, 0, 0, scale, x, y);
        return;
    }
}