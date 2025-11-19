import express, { Router } from 'express';
import jwt from 'jsonwebtoken';
import { CreateUserSchema, SigninSchema } from '@repo/common/types';
import { prismaClient } from '@repo/db/client';
import { JWT_SECRET } from '@repo/backend-common/config';

const authRouter: Router = express.Router();

authRouter.post('/signup', async (req, res) => {
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

authRouter.post('/signin', async (req, res) => {
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

export default authRouter;