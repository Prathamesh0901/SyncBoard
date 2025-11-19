import { ShapeTypes } from "@repo/db/types";

export type ClientMessage = {
    type: 'JOIN_ROOM';
    slug: string;
} | {
    type: 'ELEMENT_CREATE';
    slug: string;
    element: {
        id: string;
        type: ShapeTypes;
        data: string;
    }
} | {
    type: 'ELEMENT_DELETE';
    slug: string;
    elementId: string;
} | {
    type: 'LEAVE_ROOM';
    slug: string;
};

export type ServerMessage = {
    type: 'JOINED_ROOM';
    slug: string;
    userId: string;
} | {
    type: 'ELEMENT_CREATED';
    slug: string;
    element: {
        id: string;
        type: ShapeTypes;
        data: string;
    };
    senderId: string;
} | {
    type: 'ELEMENT_DELETED';
    slug: string;
    elementId: string;
    senderId: string;
} | {
    type: 'LEFT_ROOM';
    slug: string;
    senderId: string;
};