import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { JWT_AUTH_SECRET } from '../config';
import { prismaClient } from "@repo/db/client";

export async function auth (req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1] || '';
    const decoded = jwt.verify(token, JWT_AUTH_SECRET);
    const user = await prismaClient.user.findFirst({
        where: {
            // @ts-ignore
            id: decoded.userId
        }
    });
    if(user) {
        // @ts-ignore: TODO: Fix 
        req.userId = decoded.userId;
        next();
    }
    else {
        return res.status(403).json({
            messageType: "error",
            message: 'Unauthorized user'
        })
    }
}