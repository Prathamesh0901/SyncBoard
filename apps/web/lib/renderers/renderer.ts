import { Element } from "../types/types";

export function renderRectangle (ctx: CanvasRenderingContext2D, element: Element) {
    if (element.type !== 'RECTANGLE') return;

    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth   = 1;

    const {x, y, w, h} = element.data;

    ctx.strokeRect(x, y, w, h);
}

export function renderEllipse (ctx: CanvasRenderingContext2D, element: Element) {
    if (element.type !== 'ELLIPSE') return;

    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth   = 1;

    const {x, y, rX, rY} = element.data;

    ctx.beginPath();
    ctx.ellipse(x, y, rX, rY, 0, 0, 2*Math.PI);
    ctx.stroke();
}

export function renderArrow (ctx: CanvasRenderingContext2D, element: Element) {
    if (element.type !== 'ARROW') return;

    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth   = 1;

    const {sX, sY, eX, eY, headlen} = element.data;

    ctx.beginPath();
    ctx.moveTo(sX, sY);
    ctx.lineTo(eX, eY);
    ctx.stroke();

    const angle = Math.atan2(eY - sY, eX - sX);

    ctx.beginPath();
    ctx.moveTo(eX, eY);
    ctx.lineTo(
        eX - headlen * Math.cos(angle - 0.3),
        eY - headlen * Math.sin(angle - 0.3),
    );
    ctx.moveTo(eX, eY);
    ctx.lineTo(
        eX - headlen * Math.cos(angle + 0.3),
        eY - headlen * Math.sin(angle + 0.3),
    );
    ctx.stroke();
}

export function renderLine (ctx: CanvasRenderingContext2D, element: Element) {
    if (element.type !== 'LINE') return;

    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth   = 1;

    const {sX, sY, eX, eY} = element.data;

    ctx.beginPath();
    ctx.moveTo(sX, sY);
    ctx.lineTo(eX, eY);
    ctx.stroke();
}

export function renderPencil (ctx: CanvasRenderingContext2D, element: Element) {
    if (element.type !== 'PENCIL') return;
    
    ctx.strokeStyle = 'rgb(255, 255, 255)';
    ctx.lineWidth   = 1;
    ctx.lineCap     = 'round';
    ctx.lineJoin    = 'round';

    const points = element.data.points;

    ctx.beginPath();
    points.forEach((p, i) => {
        if (i == 0) {
            ctx.moveTo(p.x, p.y);
        }
        else {
            ctx.lineTo(p.x, p.y);
        }
    })
    ctx.stroke();
}

export function renderText (ctx: CanvasRenderingContext2D, element: Element) {
    if (element.type !== 'TEXT') return;
    const {x, y, text, fontSize = 20, fontFamily = 'Aerial'} = element.data;

    ctx.font = `${fontSize}px ${fontFamily} #999`;
    ctx.fillStyle = 'rgb(255, 255, 255)';
    console.log(text);
    ctx.textRendering = 'optimizeLegibility';
    console.log(ctx.measureText(text).actualBoundingBoxAscent);
    ctx.fillText(text.normalize(), x, y);
    // ctx.strokeText(text, x, y);/
}
