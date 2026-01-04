import { createClient, type RedisClientType } from 'redis';
import { ServerMessage } from "@repo/common/messageTypes";
import WebSocket from 'ws';
import { REDIS_DB_URL } from './config';

export class RoomManager {
    private static instance: RoomManager;
    private subscribeClient: RedisClientType;
    private publishClient: RedisClientType;
    private rooms: Map<string, WebSocket[]>;
    private sockets: Map<WebSocket, string>;

    private constructor() {
        this.publishClient = createClient({
            url: REDIS_DB_URL
        });
        this.publishClient.connect();
        this.subscribeClient = this.publishClient.duplicate();
        this.subscribeClient.connect();
        this.rooms = new Map();
        this.sockets = new Map();
    }

    static getInstance() {
        if(RoomManager.instance) return RoomManager.instance;
        RoomManager.instance = new RoomManager();
        return RoomManager.instance;
    }

    joinRoom (roomId: string, ws: WebSocket, userId: string) {
        if(!this.rooms.has(roomId)) 
            this.rooms.set(roomId, []);
        this.rooms.get(roomId)?.push(ws);
        if(this.rooms.get(roomId)?.length === 1) {
            this.subscribeClient.subscribe(roomId, (message) => {
                this.forwardMessageToUser(roomId, message);
            });
            console.log('Subscribed to this room', roomId);
        }
        this.sockets.set(ws, userId);
    }

    forwardMessageToUser(roomId: string, message: string) {
        this.rooms.get(roomId)?.forEach(ws => {
            if(ws?.readyState === WebSocket.OPEN) {
                ws.send(message);
            }
        })
    }

    broadcast (roomId: string, message: ServerMessage, senderWS: WebSocket) {
        this.publishClient.publish(roomId, JSON.stringify(message));
        this.rooms.get(roomId)?.forEach(user => {
            if(user && user !== senderWS && user.readyState === WebSocket.OPEN) {
                user.send(JSON.stringify(message));
            }
        })
    }

    leaveRoom (roomId: string, ws: WebSocket) {
        this.rooms.set(roomId, this.rooms.get(roomId)?.filter(s => s !== ws) || []);
        
        if(this.rooms.get(roomId)?.length === 0) {
            this.subscribeClient.unsubscribe(roomId);
            console.log('Unsubscribed to this channel', roomId);
        }
        this.sockets.delete(ws);
        ws.close();
    }

    getUserId (ws: WebSocket) {
        return this.sockets.get(ws);
    }
}

export const room = RoomManager.getInstance();