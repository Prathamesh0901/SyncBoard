// export type Tools = 'free_hand' | 'rect' | 'circle' | 'triangle' | 'arrow' | 'line' | 'pencil' | 'eraser';
export type Tools = "PENCIL" | "RECTANGLE" | "ELLIPSE" | "LINE" | "ARROW" | "TEXT" | "FREE_HAND" | "ERASER" | "SELECT";

export type Element = {
    id: string;
    type: 'PENCIL',
    data: {
        x: number;
        y: number;
        points: Point[];
        angle: number;
        strokeColor: string;
        strokeWidth: number;
        opacity: number;
    }
} | {
    id: string;
    type: 'RECTANGLE';
    data: {
        x: number;
        y: number;
        h: number;
        w: number;
        angle: number;
        strokeColor: string;
        strokeWidth: number;
        opacity: number;
        strokeType: StrokeTypes;
    }
} | {
    id: string;
    type: 'ELLIPSE';
    data: {
        x: number;
        y: number;
        rX: number;
        rY: number;
        angle: number;
        strokeColor: string;
        strokeWidth: number;
        opacity: number;
        strokeType: StrokeTypes;
    }
} | {
    id: string;
    type: 'LINE';
    data: {
        sX: number;
        sY: number;
        eX: number;
        eY: number;
        angle: number;
        strokeColor: string;
        strokeWidth: number;
        opacity: number;
        strokeType: StrokeTypes;
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
        angle: number;
        strokeColor: string;
        strokeWidth: number;
        opacity: number;
        strokeType: StrokeTypes;
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
        maxWidth: number,
        currWidth: number,
        lineCount: number,
        lineHeight: number
        strokeColor: string;
        strokeWidth: number;
        opacity: number;
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
    y2: number,
    angle: number
}

export type ResizeHandle = "no" | "ea" | "so" | "we" | "nw" | "ne" | "se" | "sw";


export type StrokeTypes = "SOLID" | "DASHED" | "DOTTED";