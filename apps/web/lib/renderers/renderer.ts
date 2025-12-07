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
    ctx.ellipse(x, y, Math.abs(rX), Math.abs(rY), 0, 0, 2*Math.PI);
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
    const {x, y, text, fontSize, fontFamily = 'Arial', angle} = element.data;

    const lines = text.split('\n');
    let w = 0, h = 0;

    ctx.save();
    
    for (const line of lines) {
        ctx.font = `${fontSize}px ${fontFamily}`;
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.textBaseline = 'top';
        
        const metrics = ctx.measureText(line);
        w = Math.max(w, metrics.width);
        h += metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent + 5;
    }
    
    let offset = y;
    
    for(const line of lines) {
        ctx.fillText(line, x, offset);
        offset += h;
    }
    ctx.restore();
}
