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

// get all rooms created by user
roomRouter.get('/', auth, async (req, res) => {
    try {
        // @ts-ignore
        const userId = req.userId;
        const rooms = await prismaClient.canvasRoom.findMany({
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

// get room id by slug
roomRouter.get('/:slug', auth, async (req, res) => {
    try {
        const slug = req.params.slug;
        if(!slug) {
            return res.status(403).json({
                message: "Slug is required"
            })
        }
        const room = await prismaClient.canvasRoom.findFirst({
            where: {
                slug
            },
            include: {
                users: {
                    select: {
                        userId: true
                    }
                }
            }
        });

        if (!room) {
            return res.status(400).json({
                message: "Invalid room slug"
            });
        }
        
        // @ts-ignore
        const userId = req.userId;

        let hasAccess = room.adminId === userId;
        for (const user of room.users) {
            hasAccess = hasAccess || user.userId === userId;
            if (hasAccess) break;
        }

        if (!hasAccess) {
            return res.status(401).json({
                message: "Unauthorized access"
            })
        }

        res.status(200).json({
            roomId: room.id,
            slug: room.slug
        });

    } catch (error) {
        console.log('Error fetching the room:', error);
        res.status(411).json({
            message: "Error fetching the room"
        })
    }
})

export default roomRouter