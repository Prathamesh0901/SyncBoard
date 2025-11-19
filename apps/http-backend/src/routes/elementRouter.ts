import express, { Router } from 'express';
import { prismaClient } from '@repo/db/client';
import { auth } from '../middleware/authMiddleware';

const elementRouter: Router = express.Router();

elementRouter.get('/:slug', auth, async (req, res) => {
    try {
        const slug = req.params.slug;
        if(!slug) {
            return res.status(403).json({
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
                }
            } 
        });

        if (!room) {
            return res.status(404).json({
                message: "Slug is invalid or room does not exist"
            })
        }

        res.status(200).json({
            elements: room.elements,
            roomId: room.id
        });
        
    } catch (error) {
        console.log('Error fetching the chats:', error);
        res.status(411).json({
            message: "Error fetching the chats"
        })
    }
})

export default elementRouter;