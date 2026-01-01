import { HTTP_BACKEND_URL } from "../../config";
import { Element } from "../types/types";

export async function getExisitingElements (slug: string): Promise<{roomId: string, elements: Element[]}> {
    try {
        const token = JSON.parse(localStorage.getItem('draw-app-data') || '');
        const data = await fetch(`${HTTP_BACKEND_URL}/elements/${slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        });
        if(data.status !== 200) return {
            roomId: '',
            elements: []
        };
        const message = await data.json();
        return message;
    } catch (error) {
        console.log('Error fetching existing shapes:', error);
        return {
            roomId: '',
            elements: []
        };
    } 
}

export async function getInviteToken (slug: string) {
    try {
        const token = JSON.parse(localStorage.getItem('draw-app-data') || '');
        const data = await fetch(`${HTTP_BACKEND_URL}/invite/`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                slug
            })
        });

        if(data.status !== 200) return '';
        const message = await data.json();
        const inviteToken = message.token;
        console.log(inviteToken);
        return inviteToken;
    } catch (error) {
        console.log('Error fetching existing shapes:', error);
        return '';
    } 
}

export async function verifyToken (inviteToken: string) {
    try {
        const data = await fetch(`${HTTP_BACKEND_URL}/invite/verify`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                token: inviteToken
            })
        });

        if(data.status !== 200) return false;
        const message = await data.json();
        console.log(message);
        return message;
    } catch (error) {
        console.log('Error verifying token:', error);
        return false;
    } 
}

export async function acceptToken (inviteToken: string) {
    try {
        const token = JSON.parse(localStorage.getItem('draw-app-data') || '');
        const data = await fetch(`${HTTP_BACKEND_URL}/invite/accept`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                token: inviteToken
            })
        });

        if(data.status !== 200) return false;
        const message = await data.json();
        return message;
    } catch (error) {
        console.log('Error verifying token:', error);
        return false;
    } 
}

export async function getRoomId (slug: string) {
    try {
        const token = JSON.parse(localStorage.getItem('draw-app-data') || '');
        const data = await fetch(`${HTTP_BACKEND_URL}/rooms/${slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        });

        if(data.status !== 200) return false;
        const message = await data.json();
        return message;
    } catch (error) {
        console.log('Error verifying token:', error);
        return false;
    } 
}