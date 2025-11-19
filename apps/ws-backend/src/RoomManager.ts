import { ServerMessage } from "@repo/common/messageTypes";
import WebSocket from 'ws';

export class RoomManager {
    private static instance: RoomManager;
    private rooms: Map<string, WebSocket[]>;
    private sockets: Map<WebSocket, string>;
    private roomId: Map<string, string>;

    private constructor() {
        this.rooms = new Map();
        this.sockets = new Map();
        this.roomId = new Map();
    }

    static getInstance() {
        if(RoomManager.instance) return RoomManager.instance;
        RoomManager.instance = new RoomManager();
        return RoomManager.instance;
    }

    joinRoom (roomId: string, ws: WebSocket, userId: string) {
        const u = this.rooms.get(roomId) || [];
        this.rooms.set(roomId, [...u, ws]);
        this.sockets.set(ws, userId);
    }

    broadcast (roomId: string, message: ServerMessage, senderWS: WebSocket) {
        this.rooms.get(roomId)?.forEach(user => {
            if(user && user !== senderWS && user.readyState === WebSocket.OPEN) {
                user.send(JSON.stringify(message));
            }
        })
    }

    leaveRoom (roomId: string, ws: WebSocket) {
        this.rooms.set(roomId, this.rooms.get(roomId)?.filter(user => user !== ws) || []);
        this.sockets.delete(ws);
        ws.close();
    }

    getUserId (ws: WebSocket) {
        return this.sockets.get(ws);
    }

    async getRoomId (slug: string) {
        let id = this.roomId.get(slug);
        if (!id) {
            const room = await prismaClient?.canvasRoom.findUnique({
                where: {
                    slug
                }
            })
            if (!room) return null;
            this.roomId.set(slug, room.id);
            id = room.id;
        }
        return id;
    }
}

export const room = RoomManager.getInstance();