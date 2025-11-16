import { PrismaClient } from "./generated/client/index.js";
declare global {
    var prismaClient: PrismaClient | undefined
}

export const prismaClient = globalThis.prismaClient ?? new PrismaClient({log: ['error', 'warn']})

if (process.env.NODE_ENV !== 'production') globalThis.prismaClient = prismaClient;  