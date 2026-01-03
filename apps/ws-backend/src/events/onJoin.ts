import { room } from "../RoomManager";
import { ClientMessage } from "@repo/common/messageTypes";
import WebSocket from 'ws';
import { checkAccess } from "../utils/checkAccess";

export async function onJoin(ws: WebSocket, message: ClientMessage, userId: string) {
    if (message.type !== 'JOIN_ROOM') return;

    const { roomId } = message;

    if (!checkAccess(userId, roomId)) {
        ws.send(JSON.stringify({
            type: 'ERROR',
            message: 'Unauthorized Accesss'
        }));
        return;
    }

    room.joinRoom(roomId, ws, userId);

    room.broadcast(roomId, {
        type: 'JOINED_ROOM',
        roomId,
        userId
    }, ws);
}