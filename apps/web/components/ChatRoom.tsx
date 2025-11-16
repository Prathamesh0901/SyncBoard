import { HTTP_BACKEND_URL } from "../config";
import { ChatRoomClient } from "./ChatRoomClient";

async function getChats(roomId: string) {
    const data = await fetch(`${HTTP_BACKEND_URL}/chats/${roomId}`, {
        method: 'GET'
    });
    const parsedData = await data.json();
    return parsedData.chats;
}

export default async function ChatRoom({roomId}: {roomId: string}) {
    const chats = await getChats(roomId);
    return (
        <ChatRoomClient messages={chats} id={roomId}/>
    )
}