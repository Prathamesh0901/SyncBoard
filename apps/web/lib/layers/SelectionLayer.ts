import { TransformState, useTransformStore } from "../../store/transform";
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
                this.drawSingleBox(box, transform);
                // this.drawHandles(box, transform);
            });

            const box = { x1: pt1.x, y1: pt1.y, x2: pt2.x, y2: pt2.y };
            const { scale } = transform;

            const width = pt2.x - pt1.x;
            const height = pt2.y - pt1.y;

            // this.clearSelectCanvas();
            this.selectCtx.strokeStyle = '#ff0000';
            this.selectCtx.lineDashOffset = 10;
            this.selectCtx.lineWidth = 1 / scale;

            this.selectCtx.strokeRect(pt1.x, pt1.y, width, height);
            this.drawHandles(box, transform);
        }
        else {
            Object.values(boundingBoxes).forEach(box => {
                this.drawSingleBox(box, transform);
                this.drawHandles(box, transform);
            });
        }
    }

    drawSingleBox(box: BoundingBox, transform: TransformState) {
        const { x1, y1, x2, y2 } = box;
        const { scale } = transform;

        const width = x2 - x1;
        const height = y2 - y1;

        // this.clearSelectCanvas();
        this.selectCtx.strokeStyle = '#4A90E2';
        this.selectCtx.lineWidth = 1 / scale;

        this.selectCtx.strokeRect(x1, y1, width, height);
    }

    drawHandles(box: BoundingBox, transform: TransformState) {
        const { x1, y1, x2, y2 } = box;
        const { scale } = transform;

        const handleSize = 8 / scale;
        const half = handleSize / 2;

        const cx = (x1 + x2) / 2;
        const cy = (y1 + y2) / 2;

        const handles = [
            { x: x1, y: y1, id: "tl" },
            { x: cx, y: y1, id: "tc" },
            { x: x2, y: y1, id: "tr" },
            { x: x2, y: cy, id: "mr" },
            { x: x2, y: y2, id: "br" },
            { x: cx, y: y2, id: "bc" },
            { x: x1, y: y2, id: "bl" },
            { x: x1, y: cy, id: "ml" },
        ]

        // this.clearSelectCanvas();
        this.selectCtx.strokeStyle = '#4A90E2';
        this.selectCtx.lineWidth = 1 / scale;

        handles.forEach(p => {
            this.selectCtx.beginPath();
            this.selectCtx.rect(p.x - half, p.y - half, handleSize, handleSize);
            this.selectCtx.fill();
            this.selectCtx.stroke();
        })
    }

    clearSelectCanvas() {
        const { scale, x, y } = useTransformStore.getState();
        this.selectCtx.setTransform(1, 0, 0, 1, 0, 0);
        this.selectCtx.clearRect(0, 0, this.selectCanvas.width, this.selectCanvas.height);
        this.selectCtx.setTransform(scale, 0, 0, scale, x, y);
        return;
    }
}