import { prismaClient } from "@repo/db/client";

export async function checkAccess (userId: string, roomId: string) {
    try {
        const room = await prismaClient.roomUser.findUnique({
            where: {
                userId_roomId: {
                    userId,
                    roomId
                }
            }
        });

        if (room) {
            return true;
        }

        return false;
    } catch (error) {
        console.log('Error checking access of user:', error);
        return false;
    }
}