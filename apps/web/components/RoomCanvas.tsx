"use client";

import { useEffect, useState } from "react";
import { WS_BACKEND_URL } from "../config";
import Canvas from "./Canvas";

export default function RoomCanvas ({ roomId }: {
    roomId: string
}) {
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('draw-app-data') || '');
        const ws = new WebSocket(`${WS_BACKEND_URL}?token=${token}`);
        
        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: 'join_room',
                roomId
            }));
            setSocket(ws);
        }

        return () => {
            alert('here');
            ws.send(JSON.stringify({
                type: 'leave_room',
                roomId
            }));
            ws.close();
        }

    }, [roomId]);

    if (!socket) {
        return (
            <div>
                Error connecting to websocket
            </div>
        )
    }

    return (
        <Canvas roomId={roomId} socket={socket}/>
    )
}