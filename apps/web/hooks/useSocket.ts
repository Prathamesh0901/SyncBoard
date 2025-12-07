import { useEffect, useState } from "react";
import { WS_BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";
import { TypedWebSocket } from "../lib/ws/TypedWebSocket";

export function useSocket(slug: string) {
    const [loading, setLoading] = useState<boolean>(false);
    const [socket, setSocket]   = useState<TypedWebSocket>();
    const router = useRouter();
    
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('draw-app-data') || '');
        if(token === '') {
            alert('Signin or signup first');
            router.push('/auth/signin');
        }
        setLoading(true);
        const ws = new TypedWebSocket(`${WS_BACKEND_URL}?token=${token}`);

        ws.onopen = () => {
            setTimeout(() => {
                setLoading(false);
                setSocket(ws);
                ws.sendTyped({
                    type: 'JOIN_ROOM',
                    slug,
                })
            }, 5);
        }

        return () => {
            socket?.close();
        }
    }, [slug]);

    return {
        socket,
        loading
    }
}