import z from "zod";

export const CreateUserSchema = z.object({
    email: z.string().min(3),
    password: z.string(),
    name: z.string()
});

export const SigninSchema = z.object({
    email: z.string().min(3),
    password: z.string()
});

export const CreateRoomSchema = z.object({
    slug: z.string().min(3).max(20)
})

export type Colors =  'rgb(255, 255, 255)' | 'rgb(0, 0, 0)' | 'rgb(255, 0, 0)' | 'rgb(0, 255, 0)' | 'rgb(0, 0, 255)';