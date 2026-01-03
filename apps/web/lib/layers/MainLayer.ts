import { getExisitingElements } from "../utils/fetch";
import { useElementStore } from "../../store/element";
import { useTransformStore } from "../../store/transform";
import { renderWithTransform } from "../renderers/render";

export class MainLayer {
    private mainCanvas: HTMLCanvasElement;
    private mainCtx: CanvasRenderingContext2D;
    private slug: string;
    private roomId: string;

    constructor(mainCanvas: HTMLCanvasElement, slug: string, roomId: string) {
        this.mainCanvas = mainCanvas;
        this.mainCtx = mainCanvas.getContext('2d')!;
        this.slug = slug;
        this.roomId = roomId;
        this.init();
    }

    async init() {
        const message = await getExisitingElements(this.slug);
        useElementStore.getState().init(message.elements);
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
        Object.values(elements).forEach((el) => {
            renderWithTransform(this.mainCtx, el);
        })
    }
}