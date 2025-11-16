import { WebSocketServer, WebSocket } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { prismaClient } from '@repo/db/client';
import { rooms } from './rooms';

const wss = new WebSocketServer({ port: 3002 });

async function checkUser (token: string): Promise<string | null> {
    try {
        const decoded = jwt.verify(token, JWT_SECRET); 
        
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
        const parsedData = JSON.parse(data.toString());
        console.log(parsedData.type);
        if(parsedData.type === 'join_room') {
            rooms.joinRoom(parsedData.roomId, ws);
        }
        else if(parsedData.type === 'leave_room') {
            rooms.leaveRoom(parsedData.roomId, ws);
        }
        else if(parsedData.type === 'chat') {
            console.log(parsedData);
            await prismaClient.chat.create({
                data: {
                    roomId: parsedData.roomId,
                    senderId: userId,
                    message: parsedData.message
                }
            })
            rooms.sendMessage(ws, parsedData.roomId, parsedData);
        }
    })

    ws.on('error', console.error);
});