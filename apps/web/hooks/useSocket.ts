import { useEffect, useState } from "react";
import { WS_BACKEND_URL } from "../config";
import { useRouter } from "next/navigation";

export function useSocket() {
    const [loading, setLoading] = useState<boolean>(false);
    const [socket, setSocket]   = useState<WebSocket | null>(null);
    const router = useRouter();
    
    useEffect(() => {
        const token = JSON.parse(localStorage.getItem('draw-app-data') || '');
        if(token === '') {
            alert('Signin or signup first');
            router.push('/auth/signin');
        }
        setLoading(true);
        const ws = new WebSocket(`${WS_BACKEND_URL}?token=${token}`);
        ws.onopen = () => {
            setLoading(false);
            setSocket(ws);
        }

        return () => {
            socket?.close();
        }
    }, []);

    return {
        socket,
        loading
    }
}