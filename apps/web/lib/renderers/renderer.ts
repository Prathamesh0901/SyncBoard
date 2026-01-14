import { Element } from "../types/types";

export function renderRectangle(ctx: CanvasRenderingContext2D, element: Element) {
    if (element.type !== 'RECTANGLE') return;
    
    const { x, y, w, h, strokeColor, strokeWidth, opacity, strokeType } = element.data;

    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.globalAlpha = opacity;

    if (strokeType === 'DOTTED') ctx.setLineDash([2, 5]);
    else if (strokeType === 'DASHED') ctx.setLineDash([8, 5]);

    ctx.strokeRect(x, y, w, h);
    ctx.setLineDash([]);
}

export function renderEllipse(ctx: CanvasRenderingContext2D, element: Element) {
    if (element.type !== 'ELLIPSE') return;

    const { x, y, rX, rY, strokeColor, strokeWidth, opacity, strokeType } = element.data;
    
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.globalAlpha = opacity;

    ctx.beginPath();

    if (strokeType === 'DOTTED') ctx.setLineDash([2, 5]);
    else if (strokeType === 'DASHED') ctx.setLineDash([8, 5]);

    ctx.ellipse(x, y, Math.abs(rX), Math.abs(rY), 0, 0, 2 * Math.PI);
    ctx.stroke();
    ctx.setLineDash([]);
}

export function renderArrow(ctx: CanvasRenderingContext2D, element: Element) {
    if (element.type !== 'ARROW') return;

    const { sX, sY, eX, eY, headlen, strokeColor, strokeWidth, opacity, strokeType } = element.data;
    
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.globalAlpha = opacity;
    
    ctx.beginPath();

    if (strokeType === 'DOTTED') ctx.setLineDash([2, 5]);
    else if (strokeType === 'DASHED') ctx.setLineDash([8, 5]);

    ctx.moveTo(sX, sY);
    ctx.lineTo(eX, eY);
    ctx.stroke();

    const a = Math.atan2(eY - sY, eX - sX);

    ctx.beginPath();
    ctx.moveTo(eX, eY);
    ctx.lineTo(
        eX - headlen * Math.cos(a - 0.3),
        eY - headlen * Math.sin(a - 0.3),
    );
    ctx.moveTo(eX, eY);
    ctx.lineTo(
        eX - headlen * Math.cos(a + 0.3),
        eY - headlen * Math.sin(a + 0.3),
    );
    ctx.stroke();
    ctx.setLineDash([]);
}

export function renderLine(ctx: CanvasRenderingContext2D, element: Element) {
    if (element.type !== 'LINE') return;

    const { sX, sY, eX, eY, strokeColor, strokeWidth, opacity, strokeType } = element.data;
    
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.globalAlpha = opacity;

    ctx.beginPath();
    
    if (strokeType === 'DOTTED') ctx.setLineDash([2, 5]);
    else if (strokeType === 'DASHED') ctx.setLineDash([8, 5]);

    ctx.moveTo(sX, sY);
    ctx.lineTo(eX, eY);
    ctx.stroke();
    ctx.setLineDash([]);
}

export function renderPencil(ctx: CanvasRenderingContext2D, element: Element) {
    if (element.type !== 'PENCIL') return;

    const { points, strokeColor, strokeWidth, opacity } = element.data;
    
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.globalAlpha = opacity;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

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

export function renderText(ctx: CanvasRenderingContext2D, element: Element) {
    if (element.type !== 'TEXT') return;
    const { x, y, text, fontSize, fontFamily = 'Arial', currWidth, lineHeight, strokeColor, strokeWidth, opacity } = element.data;

    ctx.font = `${fontSize}px ${fontFamily}`;
    ctx.fillStyle = strokeColor;
    ctx.lineWidth = strokeWidth;
    ctx.globalAlpha = opacity;
    ctx.textBaseline = 'top';
    
    const resultLines: string[] = [];
    const paragraphs = text.split("\n");

    let currMaxWidth = 0;

    paragraphs.forEach(paragraph => {

        const tokens = paragraph.match(/\S+\s*/g) || [];

        let currentLine = "";

        for (const token of tokens) {
            currMaxWidth = Math.max(currMaxWidth, ctx.measureText(token).width); 
            const testLine = currentLine + token;
            const measure = ctx.measureText(testLine);
            const width = measure.width;
            if (width > currWidth && currentLine !== "") {
                resultLines.push(currentLine);
                currentLine = token;
            } else {
                currentLine = testLine;
            }
        }
        
        if (currentLine) {
            resultLines.push(currentLine);
        }
    })

    element.data.lineCount = resultLines.length;
    element.data.maxWidth = currMaxWidth;
    
    let offset = y;

    resultLines.forEach((line) => {
        ctx.fillText(line, x, offset);
        offset += fontSize + lineHeight;
    })
}
