import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import { CreateUserSchema, SigninSchema } from '@repo/common/types';
import { prismaClient } from '@repo/db/client';
import { JWT_AUTH_SECRET } from '../config';
import bcrypt from 'bcrypt';

const authRouter: Router = express.Router();

authRouter.post('/signup', async (req, res) => {
    try {
        const parsedData = CreateUserSchema.safeParse(req.body);
        
        if(!parsedData.success) {
            console.log(parsedData.error);
            return res.status(403).json({
                messageType: "error",
                message: 'Incorrect inputs'
            })
        }

        const hash = await bcrypt.hash(parsedData.data.password, 12);
        
        const user = await prismaClient.user.create({
            data: {
                email: parsedData.data.email,
                password: hash,
                name: parsedData.data.name
            }
        });
        
        if(!user) {
            return res.status(500).json({
                messageType: "error",
                message: "User already exists"
            })
        }

        const token = jwt.sign({
            userId: user.id
        }, JWT_AUTH_SECRET);

        res.json({
            messageType: "success",
            message: "User signup successful",
            id: user.id,
            token,
            email: user.email,
            name: user.name
        });
        
    } catch (err) {
        return res.status(411).json({
            messageType: "error",
            message: "Username already exists"
        })
    }
})

authRouter.post('/signin', async (req, res) => {
    try {
        const parsedData = SigninSchema.safeParse(req.body);

        if(!parsedData.success) {
            return res.status(403).json({
                messageType: "error",
                message: 'Incorrect inputs'
            })
        }   

        const user = await prismaClient.user.findFirst({
            where: {
                email: parsedData.data.email
            }
        });

        if(!user) {
            return res.status(403).json({
                messageType: "error",
                message: "Invalid username or password"
            })
        }
        
        const valid = await bcrypt.compare(parsedData.data.password, user.password);

        if(!valid) {
            return res.status(403).json({
                messageType: "error",
                message: "Invalid password"
            })
        }

        const token = jwt.sign( {
            userId: user.id
        }, JWT_AUTH_SECRET);
        
        res.status(200).json({
            messageType: "success",
            message: 'User signed in successfully',
            token,
            id: user.id,
            email: user.email,
            name: user.name
        })

    } catch (err) {
        console.log(`Error signing user: ${err}`);
        res.status(411).json({
            messageType: "error",
            message: 'Error signing user'
        })
    }
})

export default authRouter;