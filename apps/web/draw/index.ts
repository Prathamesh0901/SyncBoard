import { useDrawStore } from "@repo/store/store";
import { HTTP_BACKEND_URL } from "../config";

type Shape = {
    type:   'rect';
    startX: number;
    startY: number; 
    height: number;
    width:  number
} | {
    type: 'circle';
    centerX: number;
    centerY: number;
    radiusX: number;
    radiusY: number;
} | {
    type: 'triangle';
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x3: number;
    y3: number;
} | {
    type: 'arrow';
    startX: number;
    startY: number;
    endX: number;
    endY: number;
};

export async function initDraw (canvas: HTMLCanvasElement, roomId: string, socket: WebSocket) {

    const ctx = canvas.getContext('2d');
    if(!ctx) return; 

    const existingShapes: Shape[] = await getExisitingShapes(roomId);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    socket.onmessage = (e) => {
        const message = JSON.parse(e.data);

        if (message.type === 'chat') {
            const parsedMessage = JSON.parse(message.message);
            existingShapes.push(parsedMessage);
            clearCanvas(existingShapes, ctx, canvas);
        }
    }

    clearCanvas(existingShapes, ctx, canvas);

    let clicked: boolean = false;
    let startX = 0;
    let startY = 0;

    canvas.addEventListener('mousedown', (e) => {
        clicked = true;
        startX = e.offsetX;
        startY = e.offsetY;
    });

    canvas.addEventListener('mouseup', (e) => {
        if (!clicked) return;
        clicked = false;
        const selectedShape = useDrawStore.getState().selectedTool;
        if (selectedShape !== 'free_hand' && e.offsetX === startX && e.offsetY === startY) return;
        switch (selectedShape) {
            case "rect": {
                const width = e.offsetX - startX;
                const height = e.offsetY - startY;
                const shape: Shape = {
                    type: 'rect',
                    startX,
                    startY,
                    height,
                    width
                }
                sendShape(existingShapes, socket, roomId, shape);
                break;
            }
            case "circle": {
                const radiusX = Math.abs(e.offsetX-startX);
                const radiusY = Math.abs(e.offsetY-startY);
                const shape: Shape = {
                    type: 'circle',
                    centerX: startX,
                    centerY: startY,
                    radiusX,
                    radiusY
                }
                sendShape(existingShapes, socket, roomId, shape);
                break;
            }
            case "triangle": {
                const shape: Shape = {
                    type: 'triangle',
                    x1: startX,
                    y1: startY,
                    x2: e.offsetX,
                    y2: e.offsetY,
                    x3: e.offsetX-2*(Math.abs(startX-e.offsetX)),
                    y3: e.offsetY
                }
                sendShape(existingShapes, socket, roomId, shape);
                break;
            }
            case "arrow": {
                const shape: Shape = {
                    type: 'arrow',
                    startX,
                    startY,
                    endX: e.offsetX,
                    endY: e.offsetY
                }
                sendShape(existingShapes, socket, roomId, shape);
                break;
            }
        };
    })

    canvas.addEventListener('mousemove', (e) => {
        if (clicked) {
            clearCanvas(existingShapes, ctx, canvas);
            const selectedShape = useDrawStore.getState().selectedTool;
            
            switch (selectedShape) {

                case "rect": {
                    // rectangle
                    const width = e.offsetX - startX;
                    const height = e.offsetY - startY;
                    ctx.strokeRect(startX, startY, width, height);
                    break;
                }

                case "circle": {
                    // circle
                    ctx.strokeStyle = "rgba(255, 255, 255)";
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    const radiusX = Math.abs(e.offsetX-startX);
                    const radiusY = Math.abs(e.offsetY-startY);
                    ctx.ellipse(startX, startY, radiusX, radiusY, 0, 0, 2*Math.PI);
                    ctx.stroke();
                    ctx.closePath();
                    break;
                }

                case "triangle": {
                    // triangle
                    ctx.beginPath();
                    ctx.moveTo(startX, startY);
                    ctx.lineTo(e.offsetX, e.offsetY);
                    ctx.lineTo(e.offsetX-2*(Math.abs(startX-e.offsetX)), e.offsetY);
                    ctx.closePath();
                    ctx.strokeStyle = "rgba(255, 255, 255)";
                    ctx.lineWidth = 1;
                    ctx.stroke();
                    ctx.closePath();
                    break;
                }

                case "arrow": {
                    // arrow
                    ctx.beginPath();
                    ctx.moveTo(startX, startY);
                    ctx.lineTo(e.offsetX, e.offsetY);
                    ctx.strokeStyle = "rgba(255, 255, 255)";
                    ctx.lineWidth = 1;
                    const headlen = 10;
                    const angle = Math.atan2(e.offsetY-startY, e.offsetX-startX);
                    ctx.lineTo(e.offsetX - headlen*Math.cos(angle-Math.PI/6), e.offsetY-headlen*Math.sin(angle-Math.PI/6));
                    ctx.moveTo(e.offsetX, e.offsetY);
                    ctx.lineTo(e.offsetX - headlen*Math.cos(angle+Math.PI/6), e.offsetY-headlen*Math.sin(angle+Math.PI/6));
                    ctx.stroke();
                    ctx.closePath();
                    break;
                }
                
                case "free_hand": {
                    // free_hand
                    console.log('here');
                    ctx.strokeStyle = "rgba(255, 255, 255)";
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(startX, startY);
                    ctx.lineTo(e.offsetX, e.offsetY);
                    ctx.stroke();
                    startX = e.offsetX;
                    startY = e.offsetY;
                    ctx.closePath();
                    break;
                }
            } 
        }
    })
}

function clearCanvas (existingShapes: Shape[], ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.clearRect(0, 0, canvas.height, canvas.width);
    ctx.fillStyle = "rgba(0, 0, 0)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    if (!existingShapes || existingShapes.length === 0) return;

    existingShapes.map(shape => {
        if(shape.type === 'rect') {
            ctx.strokeStyle = "rgba(255, 255, 255)";
            ctx.strokeRect(shape.startX, shape.startY, shape.width, shape.height);
        }
        else if(shape.type === 'circle') {
            ctx.beginPath();
            ctx.strokeStyle = "rgba(255, 255, 255)";
            ctx.lineWidth = 1;
            ctx.ellipse(shape.centerX, shape.centerY, shape.radiusX, shape.radiusY, 0, 0, 2*Math.PI);
            ctx.stroke();
            ctx.closePath();
        }
        else if(shape.type === 'triangle') {
            ctx.beginPath();
            ctx.moveTo(shape.x1, shape.y1);
            ctx.lineTo(shape.x2, shape.y2);
            ctx.lineTo(shape.x3, shape.y3);
            ctx.closePath();
            ctx.strokeStyle = "rgba(255, 255, 255)";
            ctx.lineWidth = 1;
            ctx.stroke();
            ctx.closePath();
        }
        else if (shape.type === 'arrow') {
            ctx.beginPath();
            ctx.moveTo(shape.startX, shape.startY);
            ctx.lineTo(shape.endX, shape.endY);
            ctx.strokeStyle = "rgba(255, 255, 255)";
            ctx.lineWidth = 1;
            const headlen = 10;
            const angle = Math.atan2(shape.endY-shape.startY, shape.endX-shape.startX);
            ctx.lineTo(shape.endX - headlen*Math.cos(angle-Math.PI/6), shape.endY-headlen*Math.sin(angle-Math.PI/6));
            ctx.moveTo(shape.endX, shape.endY);
            ctx.lineTo(shape.endX - headlen*Math.cos(angle+Math.PI/6), shape.endY-headlen*Math.sin(angle+Math.PI/6));
            ctx.stroke();
            ctx.closePath();
        }
    })

    return;
}

async function getExisitingShapes (roomId: string): Promise<Shape[]> {
    try {
        const data = await fetch(`${HTTP_BACKEND_URL}/chats/${roomId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(data.status !== 200) return [];
        const messages = await data.json();
        
        const shapes = messages.chats.map((x: { message: string }) => {
            const messageData = JSON.parse(x.message);
            return messageData;
        });
        
        return shapes;
    } catch (error) {
        console.log('Error fetching existing shapes:', error);
        return [];
    } 
}

function sendShape (existingShapes: Shape[], socket: WebSocket, roomId: string, shape: Shape) {
    existingShapes.push(shape);
    socket.send(JSON.stringify({
        type: "chat",
        roomId,
        message: JSON.stringify(shape)
    }));
    return;
}