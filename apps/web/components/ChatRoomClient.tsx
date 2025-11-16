"use client";

import { useEffect, useState } from "react";
import { useSocket } from "../hooks/useSocket";
import { useRouter } from "next/navigation";

interface Message {
    id: string,
    message: string,
    senderId: string,
    roomId: string
}

export function ChatRoomClient({
    messages,
    id
}: {
    messages: Message[],
    id: string
}) {
    const [chats, setChats] = useState(messages);
    const [message, setMessage] = useState("");
    const {socket, loading} = useSocket();
    const router = useRouter();

    useEffect(() => {
        if(socket && !loading) {
            console.log('joined room')
            alert('joined room')
            socket?.send(JSON.stringify({
                type: 'join_room',
                roomId: id,
            }))
            
            if(socket) socket.onmessage = (e) => {
                const parsedData = JSON.parse(e.data);
                console.log(e);
                if (parsedData.type === 'chat') {
                    setChats(prev => [
                        ...prev, {
                            id: parsedData.id,
                            message: parsedData.message,
                            senderId: parsedData.senderId,
                            roomId: parsedData.roomId
                        }
                    ])
                }
            }
        }
    }, [socket, loading, id]);

    return (
        <div>
            <div>
                { 
                    chats.map(chat => (
                        <div key={chat.id}>
                            {chat.message}
                        </div>
                    ))
                }
            </div>

            <div>
                <input type="text" value={message} onChange={(e) => {
                    setMessage(e.target.value);
                }}/>
                <button onClick={() => {
                    socket?.send(JSON.stringify({
                        type: "chat",
                        roomId: id,
                        senderId: '1',
                        message
                    }));
                    setMessage('');
                }}>Send Message</button>
                {
                    socket && 
                    <button onClick={() => {
                        socket.send(JSON.stringify({
                            type: "leave_room",
                            roomId: id
                        }))
                        alert('Disconnected from room');
                        router.push('/');
                    }}>Disconnect</button>
                }
            </div>
        </div>
    )
}