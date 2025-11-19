import { HTTP_BACKEND_URL } from "../../config";
import { Element } from "../types/types";

export async function getExisitingElements (slug: string): Promise<Element[]> {
    try {
        const token = JSON.parse(localStorage.getItem('draw-app-data') || '');
        const data = await fetch(`${HTTP_BACKEND_URL}/elements/${slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        });
        console.log(data);
        if(data.status !== 200) return [];
        const messages = await data.json();
        const shapes = messages.elements;
        
        return shapes;
    } catch (error) {
        console.log('Error fetching existing shapes:', error);
        return [];
    } 
}
