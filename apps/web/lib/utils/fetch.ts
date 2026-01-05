import { HTTP_BACKEND_URL } from "../../config";
import { useToastStore } from "../../store/toast";
import { Element } from "../types/types";

const { showToast } = useToastStore.getState();

export async function signInSignUp (userData: {name?: string, email: string, password: string}, isSignin: boolean) {
    try {
        const data = await fetch(
            `${HTTP_BACKEND_URL}/auth/${isSignin ? "signin" : "signup"}`,
            {
                method: "POST",
                body: JSON.stringify(userData),
                headers: { "Content-Type": "application/json" },
            }
        );

        const message = await data.json();
        showToast(message.message, message.messageType);
        if (message.messageType === 'error') return false;
        return {
            id: message.id,
            token: message.token,
            name: message.name,
            email: message.email
        };
    } catch (error) {
        console.log('Error signing up:', error);
        return false;
    }
}
    
export async function getExisitingElements(slug: string): Promise<{ roomId: string, elements: Element[] }> {
    try {
        const token = getAuthToken();
        const data = await fetch(`${HTTP_BACKEND_URL}/elements/${slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        });
        const message = await data.json();
        showToast(message.message, message.messageType);
        if (message.messageType === 'error') return {
            roomId: '',
            elements: []
        };
        return message;
    } catch (error) {
        console.log('Error fetching existing shapes:', error);
        return {
            roomId: '',
            elements: []
        };
    }
}

export async function getInviteToken(slug: string) {
    try {
        const token = getAuthToken();
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

        if (data.status !== 200) return '';
        const message = await data.json();
        showToast(message.message, message.messageType);
        const inviteToken = message.token;
        return inviteToken;
    } catch (error) {
        console.log('Error fetching existing shapes:', error);
        return '';
    }
}

export async function verifyToken(inviteToken: string) {
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

        if (data.status !== 200) return false;
        const message = await data.json();
        console.log(message);
        showToast(message.message, message.messageType);
        return message;
    } catch (error) {
        console.log('Error verifying token:', error);
        return false;
    }
}

export async function acceptToken(inviteToken: string) {
    try {
        const token = getAuthToken();
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

        if (data.status !== 200) return false;
        const message = await data.json();
        showToast(message.message, message.messageType);
        return message;
    } catch (error) {
        console.log('Error verifying token:', error);
        return false;
    }
}

export async function getCanvasRoomId(slug: string) {
    try {
        const token = getAuthToken();
        const data = await fetch(`${HTTP_BACKEND_URL}/rooms/${slug}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'authorization': `Bearer ${token}`
            }
        });

        if (data.status !== 200) return false;
        const message = await data.json();
        showToast(message.message, message.messageType);
        return message;
    } catch (error) {
        console.log('Error verifying token:', error);
        return false;
    }
}

export async function createCanvasRoom (slug: string) {
    try {
        const token = getAuthToken();
        const data = await fetch(`${HTTP_BACKEND_URL}/rooms`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({ slug: slug.trim() }),
        });
        if (data.status !== 200) return false;
        const message = await data.json();
        showToast(message.message, message.messageType);
        return message;
    } catch (error) {
        console.log('Error creating room:', error);
        return false;
    }
}

export async function fetchMyCanvasRooms () {
    try {
        const token = getAuthToken();
        const data = await fetch(`${HTTP_BACKEND_URL}/rooms`, {
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        })
        if (data.status !== 200) return false;
        const message = await data.json();
        showToast(message.message, message.messageType);
        return message;
    } catch (error) {
        console.log('Error creating room:', error);
        return false;
    }
}

export async function deleteCanvasRoom (roomId: string) {
    try {
        const token = getAuthToken();
        const data = await fetch(`${HTTP_BACKEND_URL}/rooms/${roomId}`, {
            method: 'DELETE',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
        if (data.status !== 200) return false;
        const message = await data.json();
        showToast(message.message, message.messageType);
        return true;
    } catch (error) {
        console.log('Error deleting room:', error);
        return false;
    }
}

export async function updateCanvasName (roomId: string, newSlug: string) {
    try {
        const token = getAuthToken();
        const data = await fetch(`${HTTP_BACKEND_URL}/rooms/${roomId}`, {
            method: 'PATCH',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify({
                newSlug
            })
        });
        if (data.status !== 200) return false;
        const message = await data.json();
        showToast(message.message, message.messageType);
        return true;
    } catch (error) {
        console.log('Error renaming room:', error);
        return false;
    }
}

export function getAuthToken () {
    const data = localStorage.getItem('draw-app-data');
    if (!data) {
        showToast('You are not signed in', 'info');
        return false;
    }
    const parsedData = JSON.parse(data);
    return parsedData.token; 
}

export function getUserName () {
    const data = localStorage.getItem('draw-app-data');
    if (!data) {
        showToast('You are not signed in', 'info');
        return false;
    }
    const parsedData = JSON.parse(data);
    return parsedData.name; 
}

export function getUserEmail () {
    const data = localStorage.getItem('draw-app-data');
    if (!data) {
        showToast('You are not signed in', 'info');
        return false;
    }
    const parsedData = JSON.parse(data);
    return parsedData.email; 
}

export function getUserId () {
    const data = localStorage.getItem('draw-app-data');
    if (!data) {
        showToast('You are not signed in', 'info');
        return false;
    }
    const parsedData = JSON.parse(data);
    return parsedData.id; 
}