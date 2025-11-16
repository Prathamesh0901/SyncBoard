import WebSocket from 'ws';

class Rooms {
    private static instance: Rooms;
    private users: Map<string, WebSocket[]>;

    private constructor() {
        this.users = new Map();
    }

    static getInstance() {
        if(Rooms.instance) return Rooms.instance;
        Rooms.instance = new Rooms();
        return Rooms.instance;
    }

    joinRoom (roomId: string, ws: WebSocket) {
        const u = this.users.get(roomId) || [];
        this.users.set(roomId, [...u, ws]);
    }

    sendMessage (senderWs: WebSocket, roomId: string, message: {
        id: string
        type: "chat",
        roomId: string,
        message: string,
    }) {
        console.log(roomId, this.users.get(roomId)?.length);
        this.users.get(roomId)?.forEach(user => {
            if(user && user !== senderWs && user.readyState === WebSocket.OPEN) {
                user.send(JSON.stringify(message));
            }
        })
    }

    leaveRoom (roomId: string, ws: WebSocket) {
        this.users.set(roomId, this.users.get(roomId)?.filter(user => user !== ws) || []);
    }

}

export const rooms = Rooms.getInstance();