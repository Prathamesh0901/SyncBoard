import { Shape } from "@repo/common/types";
import { HTTP_BACKEND_URL } from "../config";

export async function getExisitingShapes (roomId: string): Promise<Shape[]> {
    try {
        const data = await fetch(`${HTTP_BACKEND_URL}/chats/${roomId}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        if(data.status !== 200) return [];
        const messages = await data.json();
        
        const shapes = messages.chats.map((x: { id: number, message: string }) => {
            const messageData = {
                ...JSON.parse(x.message),
                id: x.id
            };
            return messageData;
        });
        
        return shapes;
    } catch (error) {
        console.log('Error fetching existing shapes:', error);
        return [];
    } 
}
