import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { CreateRoomSchema, CreateUserSchema, SigninSchema } from '@repo/common/types';
import { prismaClient } from '@repo/db/client';
import { auth } from './middlewares';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('hi there');
})

app.post('/signin', async (req, res) => {
    try {
        const parsedData = SigninSchema.safeParse(req.body);

        if(!parsedData.success) {
            return res.status(403).json({
                message: 'Incorrect inputs'
            })
        }   

        const user = await prismaClient.user.findFirst({
            where: {
                email: parsedData.data.email,
                password: parsedData.data.password
            }
        });

        if(!user) {
            return res.status(403).json({
                message: "Invalid username or password"
            })
        }

        const token = jwt.sign( {
            userId: user.id
        }, JWT_SECRET);
        
        res.status(200).json({
            message: 'User signed in successfully',
            token,
            id: user.id
        })

    } catch (err) {
        console.log(`Error signing user: ${err}`);
        res.status(411).json({
            message: 'Error signing user',
        })
    }
})

app.post('/signup', async (req, res) => {
    try {
        console.log(req.body);
        const parsedData = CreateUserSchema.safeParse(req.body);
        
        if(!parsedData.success) {
            console.log(parsedData.error);
            return res.status(403).json({
                message: 'Incorrect inputs'
            })
        }
        
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data.email,
                password: parsedData.data.password,
                name: parsedData.data.name
            }
        });
        
        if(!user) {
            return res.status(500).json({
                message: "Internal server error"
            })
        }

        const token = jwt.sign({
            userId: user.id
        }, JWT_SECRET);

        res.json({
            message: "User signup successful",
            id: user.id,
            token
        });
        
    } catch (err) {
        return res.status(411).json({
            message: "Username already exists"
        })
    }
})

app.post('/room', auth, async (req, res) => {
    try {
        const parsedData = CreateRoomSchema.safeParse(req.body);
        
        if(!parsedData.success) {
            return res.status(403).json({
                message: 'Incorrect inputs'
            })
        }

        const room = await prismaClient.room.create({
            data: {
                slug: parsedData.data.slug,
                // @ts-ignore
                adminId: req.userId
            }
        });

        res.status(200).json({
            message: "Room created successfully",
            id: room.id,
            slug: room.slug
        });
    } catch (error) {
        res.status(411).json({
            message: "Slug should be unique"
        })
    }
});

app.get('/rooms', auth, async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.userId;
        const rooms = await prismaClient.room.findMany({
            where: {
                adminId: userId
            }
        });
        res.status(200).json({
            message: "Rooms fetched successfully",
            rooms
        })
    } catch (error) {
        console.log('Error fetching rooms:', error);
        res.status(403).json({
            message: "Error fetching rooms"
        });
    }
})

app.get('/chats/:roomId', async (req, res) => {
    try {
        const roomId = req.params.roomId;
        if(!roomId) {
            return res.status(403).json({
                message: "Room Id is required"
            })
        }
        const chats = await prismaClient.chat.findMany({
            where: {
                roomId
            },
            orderBy: {
                id: "asc"
            },
        });
        res.status(200).json({
            chats
        });
    } catch (error) {
        console.log('Error fetching the chats:', error);
        res.status(411).json({
            message: "Error fetching the chats"
        })
    }
})

app.get('/room/:slug', async (req, res) => {
    try {
        const slug = req.params.slug;
        if(!slug) {
            return res.status(403).json({
                message: "Slug is required"
            })
        }
        const room = await prismaClient.room.findFirst({
            where: {
                slug
            }
        });
        res.status(200).json({
            room
        });
    } catch (error) {
        console.log('Error fetching the room:', error);
        res.status(411).json({
            message: "Error fetching the room"
        })
    }
})

app.listen(3001, () => {
    console.log(`http server listening on http://localhost:3001`);
})