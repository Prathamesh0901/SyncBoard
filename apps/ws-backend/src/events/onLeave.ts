import { room } from "../RoomManager";
import WebSocket from 'ws';
import { ClientMessage } from "@repo/common/messageTypes";

export async function onLeave(ws: WebSocket, message: ClientMessage) {
    if (message.type !== 'LEAVE_ROOM') return;

    const { slug } = message;
    
    const senderId = room.getUserId(ws);

    room.leaveRoom(slug, ws);

    if (!senderId) return;

    room.broadcast(slug, {
        type: 'LEFT_ROOM',
        slug,
        senderId
    }, ws);
}