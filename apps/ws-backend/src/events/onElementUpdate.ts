import { room } from "../RoomManager";
import { ClientMessage } from "@repo/common/messageTypes";
import { prismaClient } from "@repo/db/client";
import WebSocket from 'ws';

export async function onElementUpdate(ws: WebSocket, message: ClientMessage) {
    if (message.type !== 'ELEMENT_UPDATE') return;

    const { roomId } = message;
    const { id } = message.element;
    
    const senderId = room.getUserId(ws);
    
    if (!senderId) return;

    const res = await prismaClient.element.update({
        where: {
            id
        },
        data: {
            data: JSON.parse(message.element.data)
        }
    })

    console.log(res.updatedAt);

    room.broadcast(roomId, {...message, type: 'ELEMENT_UPDATED', senderId}, ws);
}