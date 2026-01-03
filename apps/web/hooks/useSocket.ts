import { useEffect, useState } from "react";
import { WS_BACKEND_URL } from "../config";
import { TypedWebSocket } from "../lib/ws/TypedWebSocket";
import { getAuthToken } from "../lib/utils/fetch";

export function useSocket(roomId: string) {
    const [loading, setLoading] = useState<boolean>(false);
    const [socket, setSocket] = useState<TypedWebSocket>();
    
    useEffect(() => {
        const token = getAuthToken();
        setLoading(true);
        const ws = new TypedWebSocket(`${WS_BACKEND_URL}?token=${token}`);
        
        ws.onopen = () => {
            setTimeout(() => {
                setLoading(false);
                setSocket(ws);
                ws.sendTyped({
                    type: 'JOIN_ROOM',
                    roomId,
                });
            }, 5);
        }
        
        ws.onclose = () => {
            console.log('WebSocket closed');
            setSocket(undefined);
        }
        
        return () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.sendTyped({
                    type: 'LEAVE_ROOM',
                    roomId
                });
            }
            ws.close();
        }
    }, [roomId]);
    
    return {
        socket,
        loading
    }
}