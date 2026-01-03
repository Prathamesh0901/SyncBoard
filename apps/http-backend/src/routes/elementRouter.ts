import express, { Router } from 'express';
import { prismaClient } from '@repo/db/client';
import { auth } from '../middleware/authMiddleware';

const elementRouter: Router = express.Router();

elementRouter.get('/:slug', auth, async (req, res) => {
    try {
        const slug = req.params.slug;
        if(!slug) {
            return res.status(403).json({
                messageType: "error",
                message: "Slug is required"
            })
        }

        const room = await prismaClient.canvasRoom.findUnique({
            where: {
                slug
            },
            include: {
                elements: {
                    orderBy: { createdAt: 'asc' }
                },
                users: {
                    select: {
                        userId: true
                    }
                }
            }
        });

        // @ts-ignore
        const userId = req.userId;

        if (!room) {
            return res.status(404).json({
                messageType: "error",
                message: "Room does not exist"
            })
        }

        let hasAccess = room.adminId === userId;
        for (const user of room.users) {
            hasAccess = hasAccess || user.userId === userId;
            if (hasAccess) break;
        }

        if (!hasAccess) {
            return res.status(401).json({
                messageType: "error",
                message: "Unauthorized access"
            })
        }

        res.status(200).json({
            messageType: "info",
            elements: room.elements,
            roomId: room.id,
            message: "Elements fetched"
        });
        
    } catch (error) {
        console.log('Error fetching the elements:', error);
        res.status(411).json({
            messageType: "error",
            message: "Error fetching the elements"
        })
    }
})

export default elementRouter;