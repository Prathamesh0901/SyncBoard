import { getExisitingElements } from "../utils/fetch";
import { useElementStore } from "../../store/element";
import { renderArrow, renderEllipse, renderLine, renderPencil, renderRectangle, renderText } from "../renderers/renderer";
import { useTransformStore } from "../../store/transform";
import { getBoundingBox } from "../hitTest/pointUtilts";
import { renderWithTransform } from "../renderers/render";
import { useRoomStore } from "../../store/room";

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
        const message = await getExisitingElements(this.slug);
        useElementStore.getState().init(message.elements);
        useRoomStore.getState().setRoomState(this.slug, message.roomId);
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