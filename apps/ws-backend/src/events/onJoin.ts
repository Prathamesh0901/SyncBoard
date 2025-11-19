import { room } from "../RoomManager";
import { ClientMessage } from "@repo/common/messageTypes";
import WebSocket from 'ws';

export async function onJoin(ws: WebSocket, message: ClientMessage, userId: string) {
    if (message.type !== 'JOIN_ROOM') return;

    const { slug } = message;

    room.joinRoom(slug, ws, userId);

    room.broadcast(slug, {
        type: 'JOINED_ROOM',
        slug,
        userId
    }, ws);
}