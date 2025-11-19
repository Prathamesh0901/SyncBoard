import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from "@repo/backend-common/config";
import { prismaClient } from "@repo/db/client";

export async function auth (req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.split(' ')[1] || '';
    const decoded = jwt.verify(token, JWT_SECRET);
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
            message: 'Unauthorized user'
        })
    }
}