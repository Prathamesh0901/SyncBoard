import { useSelectStore } from "../../store/selectElement";
import { getBoundingBox } from "../hitTest/pointUtilts";
import { Element } from "../types/types";
import { renderArrow, renderEllipse, renderLine, renderPencil, renderRectangle, renderText } from "./renderer";

export function renderWithTransform(ctx: CanvasRenderingContext2D, e: Element) {

    const { x1, y1, x2, y2, angle } = getBoundingBox(e, ctx);

    const cx = x1 + (x2 - x1) / 2;
    const cy = y1 + (y2 - y1) / 2;

    ctx.save();

    // rotate around element center
    ctx.translate(cx, cy);
    ctx.rotate(angle);
    ctx.translate(-cx, -cy);

    switch (e.type) {
        case "RECTANGLE": {
            renderRectangle(ctx, e);
            break;
        }
        case "ELLIPSE": {
            renderEllipse(ctx, e);
            break;
        }
        case "TEXT": {
            renderText(ctx, e);
            break;
        }
        case "PENCIL": {
            renderPencil(ctx, e);
            break;
        }
        case "LINE": {
            renderLine(ctx, e);
            break;
        }
        case "ARROW": {
            renderArrow(ctx, e);
            break;
        }
    }

    ctx.restore();
}

export function render(ctx: CanvasRenderingContext2D, e: Element) {
    switch (e.type) {
        case "RECTANGLE": return renderRectangle(ctx, e);
        case "ELLIPSE": return renderEllipse(ctx, e);
        case "TEXT": return renderText(ctx, e);
        case "PENCIL": return renderPencil(ctx, e);
        case "LINE": return renderLine(ctx, e);
        case "ARROW": return renderArrow(ctx, e);
    }
}