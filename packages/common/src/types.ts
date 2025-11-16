import z from "zod";

export const CreateUserSchema = z.object({
    email: z.string().min(3).max(20),
    password: z.string(),
    name: z.string()
});

export const SigninSchema = z.object({
    email: z.string().min(3).max(20),
    password: z.string()
});

export const CreateRoomSchema = z.object({
    slug: z.string().min(3).max(20)
})

export type Tools = 'free_hand' | 'rect' | 'circle' | 'triangle' | 'arrow' | 'line' | 'pencil' | 'eraser';

export type Shape = {
    id: string;
    type: 'rect';
    startX: number;
    startY: number;
    height: number;
    width: number
} | {
    id: string;
    type: 'circle';
    centerX: number;
    centerY: number;
    radiusX: number;
    radiusY: number;
} | {
    id: string;
    type: 'triangle';
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    x3: number;
    y3: number;
} | {
    id: string;
    type: 'arrow';
    startX: number;
    startY: number;
    endX: number;
    endY: number;
    headlen: number;
} | {
    id: string;
    type: 'line';
    startX: number;
    startY: number;
    endX: number;
    endY: number;
} | {
    id: string;
    type: 'pencil',
    points: Point[]
};

export interface Point {
    x: number,
    y: number
}

export type Colors =  'rgb(255, 255, 255)' | 'rgb(0, 0, 0)' | 'rgb(255, 0, 0)' | 'rgb(0, 255, 0)' | 'rgb(0, 0, 255)';