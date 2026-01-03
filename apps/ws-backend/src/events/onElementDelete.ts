import { room } from "../RoomManager";
import { ClientMessage } from "@repo/common/messageTypes";
import { prismaClient } from "@repo/db/client";
import WebSocket from 'ws';
import { checkAccess } from "../utils/checkAccess";

export async function onElementDelete(ws: WebSocket, message: ClientMessage) {
    if (message.type !== 'ELEMENT_DELETE') return;

    const { roomId, elementId } = message;
    
    const senderId = room.getUserId(ws);
    
    if (!senderId) return;

    if (!checkAccess(senderId, roomId)) {
        ws.send(JSON.stringify({
            type: 'ERROR',
            message: 'Unauthorized Accesss'
        }));
        return;
    }
    
    await prismaClient.element.deleteMany({
        where: {
            id: elementId
        }
    })

    room.broadcast(roomId, {...message, type: 'ELEMENT_DELETED', senderId}, ws);
}