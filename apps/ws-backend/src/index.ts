import { WebSocketServer } from 'ws';
import jwt from 'jsonwebtoken';
import { JWT_AUTH_SECRET } from '@repo/backend-common/config';
import { prismaClient } from '@repo/db/client';
import { ClientMessage } from "@repo/common/messageTypes";
import { onJoin } from './events/onJoin';
import { onElementCreate } from './events/onElementCreate';
import { onElementDelete } from './events/onElementDelete';
import { onLeave } from './events/onLeave';
import { onElementUpdate } from './events/onElementUpdate';

const wss = new WebSocketServer({ port: 3002 });

async function checkUser (token: string): Promise<string | null> {
    try {
        const decoded = jwt.verify(token, JWT_AUTH_SECRET); 
        
        if(typeof decoded === 'string') return null;
        
        const user = await prismaClient.user.findFirst({
            where: {
                // @ts-ignore
                id: decoded.userId
            }
        })

        if(!user) {
            return null;
        }

        return user.id;
        
    } catch (err) {
        console.log('Error authenticating user:', err);
        return null;
    }
}

wss.on('connection', async function connection(ws, request) {
    const url = request.url;
    if(!url) {
        return;
    }       

    const queryParams = new URLSearchParams(url.split('?')[1]);
    const token = queryParams.get('token') || '';

    const userId = await checkUser(token);

    if(!userId) {
        ws.close();
        return;
    }
    
    ws.on('message', async function message(data) {
        const message: ClientMessage = JSON.parse(data.toString());
        console.log(message.type);
        if (!message.type) {
            ws.send(JSON.stringify({
                status: 400,
                message: 'Invalid message'
            }))
            return;
        }

        switch (message.type) {
            case 'JOIN_ROOM': {
                onJoin(ws, message, userId);
                break;
            }
            case 'ELEMENT_CREATE': {
                onElementCreate(ws, message);
                break;
            }
            case 'ELEMENT_UPDATE': {
                onElementUpdate(ws, message);
                break;
            }
            case 'ELEMENT_DELETE': {
                onElementDelete(ws, message);
                break;
            }
            case 'LEAVE_ROOM': {
                onLeave(ws, message);
                break;
            }
        }
    })

    ws.on('error', console.error);
});