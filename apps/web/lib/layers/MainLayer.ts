import { getExisitingElements } from "../utils/fetch";
import { useElementStore } from "../../store/element";
import { renderArrow, renderEllipse, renderLine, renderPencil, renderRectangle, renderText } from "../renderers/renderer";
import { useTransformStore } from "../../store/transform";

export class MainLayer {
    private mainCanvas: HTMLCanvasElement;
    private mainCtx: CanvasRenderingContext2D;
    private slug: string;

    constructor(mainCanvas: HTMLCanvasElement, slug: string) {
        this.mainCanvas = mainCanvas;
        this.mainCtx = mainCanvas.getContext('2d')!;
        this.slug = slug;
        this.init();
    }

    async init() {
        const shapes = await getExisitingElements(this.slug);
        useElementStore.getState().init(shapes);
        this.clearCanvas();
    }

    clearCanvas() {
        const { scale, x, y } = useTransformStore.getState();
        this.mainCtx.setTransform(1, 0, 0, 1, 0, 0);
        this.mainCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
        this.mainCtx.fillStyle = "rgba(0, 0, 0)";
        this.mainCtx.fillRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
        this.mainCtx.setTransform(scale, 0, 0, scale, x, y);
        return;
    }

    draw() {
        const elements = useElementStore.getState().elements;
        Object.entries(elements).forEach((val) => {
            const el = val[1];
            switch (el.type) {
                case "RECTANGLE": {
                    renderRectangle(this.mainCtx, el);
                    break;
                }
                case "ELLIPSE": {
                    renderEllipse(this.mainCtx, el);
                    break;
                }
                case "TEXT": {
                    renderText(this.mainCtx, el);
                    break;
                }
                case "ARROW": {
                    renderArrow(this.mainCtx, el);
                    break;
                }
                case "LINE": {
                    renderLine(this.mainCtx, el);
                    break;
                }
                case "PENCIL": {
                    renderPencil(this.mainCtx, el);
                    break;
                }
            }
        })
    }
}