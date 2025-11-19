import { TransformState } from "../../store/transform";
import { Point } from "../types/types";

export function screenToWorld (a: Point, b: TransformState) {
    return {
        x: (a.x - b.x) / b.scale,
        y: (a.y - b.y) / b.scale,
    }
}