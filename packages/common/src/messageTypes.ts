import { ShapeTypes } from "@repo/db/types";

export type ClientMessage = {
    type: 'JOIN_ROOM';
    roomId: string;
} | {
    type: 'ELEMENT_CREATE';
    roomId: string;
    element: {
        id: string;
        type: ShapeTypes;
        data: string;
    }
} | {
    type: 'ELEMENT_UPDATE';
    roomId: string;
    element: {
        id: string;
        type: ShapeTypes;
        data: string;
    }
} | {
    type: 'ELEMENT_DELETE';
    roomId: string;
    elementId: string;
} | {
    type: 'LEAVE_ROOM';
    roomId: string;
};

export type ServerMessage = {
    type: 'JOINED_ROOM';
    roomId: string;
    userId: string;
} | {
    type: 'ELEMENT_CREATED';
    roomId: string;
    element: {
        id: string;
        type: ShapeTypes;
        data: string;
    };
    senderId: string;
} | {
    type: 'ELEMENT_UPDATED';
    roomId: string;
    element: {
        id: string;
        type: ShapeTypes;
        data: string;
    };
    senderId: string;
} | {
    type: 'ELEMENT_DELETED';
    roomId: string;
    elementId: string;
    senderId: string;
} | {
    type: 'LEFT_ROOM';
    roomId: string;
    senderId: string;
} | {
    type: 'ERROR',
    message: string
};