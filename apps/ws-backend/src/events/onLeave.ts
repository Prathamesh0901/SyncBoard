import { room } from "../RoomManager";
import WebSocket from 'ws';
import { ClientMessage } from "@repo/common/messageTypes";

export async function onLeave(ws: WebSocket, message: ClientMessage) {
    if (message.type !== 'LEAVE_ROOM') return;

    const { roomId } = message;
    
    const senderId = room.getUserId(ws);

    room.leaveRoom(roomId, ws);

    if (!senderId) return;

    room.broadcast(roomId, {
        type: 'LEFT_ROOM',
        roomId,
        senderId
    }, ws);
}