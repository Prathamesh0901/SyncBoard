import express, { Router } from 'express';
import { auth } from '../middleware/authMiddleware';
import { CreateRoomSchema } from '@repo/common/types';
import { prismaClient } from '@repo/db/client';

const roomRouter: Router = express.Router();

// create a new room
roomRouter.post('/', auth, async (req, res) => {
    try {
        const parsedData = CreateRoomSchema.safeParse(req.body);
        
        if(!parsedData.success) {
            return res.status(403).json({
                messageType: "error",
                message: 'Incorrect inputs'
            })
        }

        const room = await prismaClient.canvasRoom.create({
            data: {
                slug: parsedData.data.slug,
                // @ts-ignore
                adminId: req.userId,
            }
        });

        await prismaClient.roomUser.create({
            data: {
                // @ts-ignore
                userId: req.userId,
                roomId: room.id
            }
        });

        res.status(200).json({
            messageType: "success",
            message: "Room created successfully",
            id: room.id,
            slug: room.slug
        });
    } catch (error) {
        res.status(411).json({
            messageType: "error",   
            message: "Room name should be unique"
        })
    }
});

// get all rooms belonging to user
roomRouter.get('/', auth, async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.userId;
        const rooms = await prismaClient.roomUser.findMany({
            where: {
                userId
            },
            select: {
                room: {
                }
            }
        });
        const updatedRooms = rooms.map(room => room.room);
        res.status(200).json({
            messageType: "info",
            message: "Canvas fetched",
            rooms: updatedRooms
        })
    } catch (error) {
        console.log('Error fetching rooms:', error);
        res.status(403).json({
            messageType: "error",
            message: "Error fetching canvas"
        });
    }
})

// get room id by slug
roomRouter.get('/:slug', async (req, res) => {
    try {
        const slug = req.params.slug;
        if(!slug) {
            return res.status(403).json({
                messageType: "error",
                message: "Slug is required"
            })
        }
        const room = await prismaClient.canvasRoom.findFirst({
            where: {
                slug
            }
        });

        if (!room) {
            return res.status(400).json({
                messageType: "error",
                message: "Invalid room slug"
            });
        }
        
        res.status(200).json({
            message: "Room id fetched",
            messageType: "info",
            roomId: room.id,
            slug: room.slug
        });

    } catch (error) {
        console.log('Error fetching the room:', error);
        res.status(411).json({
            messageType: "error",
            message: "Error fetching the room"
        })
    }
});

// delete a room (only admin can)
roomRouter.delete('/:roomId', auth, async (req, res) => {
    try {
        const { roomId } = req.params;
        if(!roomId) {
            return res.status(403).json({
                messageType: "error",
                message: 'Room id is required'
            })
        }

        const room = await prismaClient.canvasRoom.findUnique({
            where: {
                id: roomId
            }
        });

        if (!room) {
            return res.status(500).json({
                messageType: "error",
                message: "Room does not exist",
            });
        }

        // @ts-ignore
        const userId = req.userId;

        if (room.adminId !== userId) {
            return res.status(500).json({
                messageType: "error",
                message: "Unauthorized request",
            });
        }

        await prismaClient.canvasRoom.delete({
            where: {
                id: room.id
            }
        });

        res.status(200).json({
            messageType: "success",
            message: "Canvas deleted successfully",
            id: room.id,
            slug: room.slug
        });

    } catch (error) {
        res.status(411).json({
            messageType: "error",   
            message: "Cannot delete canvas"
        })
    }
});

// rename a room (only admin can)
roomRouter.patch('/:roomId', auth, async (req, res) => {
    try {
        const { roomId } = req.params;
        const { newSlug } = req.body;
        
        if(!roomId || !newSlug) {
            return res.status(403).json({
                messageType: "error",
                message: 'Invalid parameters'
            })
        }

        // @ts-ignore
        const userId = req.userId;

        const room = await prismaClient.canvasRoom.update({
            where: {
                id: roomId,
                adminId: userId
            },
            data: {
                slug: newSlug
            }
        });

        if (!room) {
            return res.status(500).json({
                messageType: "error",
                message: "Name not unique or unauthorized",
            });
        }

        res.status(200).json({
            messageType: "success",
            message: "Canvas name changed",
            id: room.id,
            slug: room.slug
        });

    } catch (error) {
        res.status(411).json({
            messageType: "error",   
            message: "Cannot rename canvas"
        })
    }
});

export default roomRouter