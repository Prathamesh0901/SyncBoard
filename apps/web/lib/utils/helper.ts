import { TransformState } from "../../store/transform";
import { Point } from "../types/types";

export function screenToWorld (a: Point, b: TransformState) {
    return {
        x: (a.x - b.x) / b.scale,
        y: (a.y - b.y) / b.scale,
    }
}

export function worldToScreen (a: Point, b: TransformState) {
    return {
        x: a.x * b.scale + b.x,
        y: a.y * b.scale + b.y,
    }
}