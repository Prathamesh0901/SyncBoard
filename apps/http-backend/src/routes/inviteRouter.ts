import express, { Router } from 'express';
import { prismaClient } from '@repo/db/client';
import { auth } from '../middleware/authMiddleware';
import jwt from 'jsonwebtoken';
import { JWT_INVITE_SECRET } from '@repo/backend-common/config';

const inviteRouter: Router = express.Router();

inviteRouter.post('/', auth, async (req, res) => {
    try {
        const { slug } = req.body;
        if(!slug) {
            return res.status(403).json({
                messageType: "error",
                message: "Room Id is required"
            })
        }

        const room = await prismaClient.canvasRoom.findUnique({
            where: {
                slug: slug
            }
        });

        if (!room) {
            return res.status(404).json({
                messageType: "error",
                message: "Room does not exist"
            })
        }

        // @ts-ignore
        const userId = req.userId;

        if (room.adminId !== userId) {
            return res.status(401).json({
                messageType: "error",
                messsage: "Unauthorized access"
            });
        }

        const payload = {
            roomId: room.id
        }

        const token = jwt.sign(payload, JWT_INVITE_SECRET, { expiresIn: '24h' });

        res.status(200).json({
            messageType: "info",
            roomId: room.id,
            token,
            message: "Invite link generated"
        });
        
    } catch (error) {
        console.log('Error generating invite token:', error);
        res.status(411).json({
            messageType: "error",
            message: "Error generating invite link"
        })
    }
});

inviteRouter.post('/verify', async (req, res) => {
    try {
        const { token } = req.body;
        if(!token) {
            return res.status(403).json({
                message: "Invite Token is required"
            })
        }

        const decoded = jwt.verify(token, JWT_INVITE_SECRET);

        const room = await prismaClient.canvasRoom.findUnique({
            where: {
                // @ts-ignore
                id: decoded.roomId
            }
        });

        if (!room) {
            return res.status(404).json({
                messageType: "error",
                message: "Invalid Invite Token",
                valid: false
            })
        };
        
        res.status(200).json({
            messageType: "success",
            message: "Valid invite token",
            valid: true,
            slug: room.slug,
            roomId: room.id
        });
        
    } catch (error) {
        console.log('Error verifying token:', error);
        res.status(411).json({
            messageType: "error",
            message: "Invalid or expired token",
            valid: false
        })
    }
})

inviteRouter.post('/accept', auth, async (req, res) => {
    try {
        const { token } = req.body;
        if(!token) {
            return res.status(403).json({
                messageType: "error",
                message: "Room Id is required"
            })
        }

        const decoded = jwt.verify(token, JWT_INVITE_SECRET);

        const room = await prismaClient.canvasRoom.findUnique({
            where: {
                // @ts-ignore
                id: decoded.roomId
            }
        });

        if (!room) {
            return res.status(404).json({
                messageType: "error",
                message: "Invalid Invite Token",
                valid: false
            })
        };

        await prismaClient.roomUser.create({
            data: {
                // @ts-ignore
                userId: req.userId,
                // @ts-ignore
                roomId: decoded.roomId
            }
        })

        res.status(200).json({
            messageType: "success",
            message: "Invite accepted",
            valid: true,
            slug: room.slug,
            roomId: room.id
        });
        
    } catch (error) {
        console.log('Error verifying token:', error);
        res.status(411).json({
            messageType: "error",
            message: "Invalid or expired token",
            valid: false
        })
    }
})

export default inviteRouter;