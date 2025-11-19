import { room } from "../RoomManager";
import { ClientMessage } from "@repo/common/messageTypes";
import { prismaClient } from "@repo/db/client";
import WebSocket from 'ws';

export async function onElementsCreate(ws: WebSocket, message: ClientMessage) {
    if (message.type !== 'ELEMENT_CREATE') return;

    const { slug, element } = message;
    
    const senderId = room.getUserId(ws);
    
    if (!senderId) return;

    const roomId = await room.getRoomId(slug);

    if (!roomId) {
        ws.send(JSON.stringify({
            message: "Invalid Room"
        }));
        return;
    }

    await prismaClient.element.create({
        data: {
            id: element.id,
            roomId,
            type: element.type,
            data: JSON.parse(element.data),
            senderId
        }
    });

    room.broadcast(slug, {...message, type: 'ELEMENT_CREATED', senderId}, ws);
}