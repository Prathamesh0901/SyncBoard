import { Shape } from "@repo/common/types";

export class DrawShape {

    draw(ctx: CanvasRenderingContext2D, shape: Shape) {
        ctx.strokeStyle = "rgba(255, 255, 255)";
        switch (shape.type) {

            case "rect": {
                ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
                break;
            }
            case "circle": {
                ctx.beginPath();
                ctx.ellipse(shape.centerX, shape.centerY, shape.radiusX, shape.radiusY, 0, 0, 2*Math.PI);
                ctx.closePath();
                ctx.stroke();
                break;
            }
            case "triangle": {
                ctx.beginPath();
                ctx.moveTo(shape.x1, shape.y1);
                ctx.lineTo(shape.x2, shape.y2);
                ctx.lineTo(shape.x3, shape.y3);
                ctx.closePath();
                ctx.stroke();
                break;
            }
            case "arrow": {
                ctx.beginPath();
                const sX = shape.startX ;
                const sY = shape.startY ;
                const eX = shape.endX ;
                const eY = shape.endY ;
                ctx.beginPath();
                ctx.moveTo(sX, sY);
                ctx.lineTo(eX, eY);
                const headlen = shape.headlen;
                const angle = Math.atan2(eY - sY, eX - sX);
                ctx.lineTo(eX - headlen * Math.cos(angle - Math.PI / 6), eY - headlen * Math.sin(angle - Math.PI / 6));
                ctx.moveTo(eX, eY);
                ctx.lineTo(eX - headlen * Math.cos(angle + Math.PI / 6), eY - headlen * Math.sin(angle + Math.PI / 6));
                ctx.stroke();
                ctx.closePath();
                break;
            }
            case "pencil": {
                if (shape.points.length < 2) return;
                ctx.lineJoin = 'round';
                ctx.lineCap = 'round';
                ctx.beginPath();
                ctx.beginPath();
                ctx.moveTo((shape.points[0]?.x || 0), (shape.points[0]?.y || 0));

                for (let i = 1; i < shape.points.length; i++) {
                    ctx.lineTo(shape.points[i]?.x || 0, shape.points[i]?.y || 0);
                    ctx.moveTo(shape.points[i]?.x || 0, shape.points[i]?.y || 0);
                }

                ctx.stroke();
                ctx.closePath();
            }
        }
    }
}