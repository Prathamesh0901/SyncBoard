// export type Tools = 'free_hand' | 'rect' | 'circle' | 'triangle' | 'arrow' | 'line' | 'pencil' | 'eraser';
export type Tools = "PENCIL" | "RECTANGLE" | "ELLIPSE" | "LINE" | "ARROW" | "TEXT" | "FREE_HAND" | "ERASER" | "SELECT";

export type Element = {
    id: string;
    type: 'PENCIL',
    data: {
        points: Point[]
    }
} | {
    id: string;
    type: 'RECTANGLE';
    data: {
        x: number;
        y: number;
        h: number;
        w: number;
    }
} | {
    id: string;
    type: 'ELLIPSE';
    data: {
        x: number;
        y: number;
        rX: number;
        rY: number;
    }
} | {
    id: string;
    type: 'LINE';
    data: {
        sX: number;
        sY: number;
        eX: number;
        eY: number;
    }
} | {
    id: string;
    type: 'ARROW';
    data: {
        sX: number;
        sY: number;
        eX: number;
        eY: number;
        headlen: number;
    }
} | {
    id: string;
    type: 'TEXT';
    data: {
        x: number,
        y: number, 
        text: string, 
        fontSize: number,
        fontFamily: string,
        angle: number,
        maxWidth?: number
    }
};

export type Point = {
    x: number,
    y: number
}

export interface BoundingBox {
    x1: number, 
    y1: number, 
    x2: number, 
    y2: number
}