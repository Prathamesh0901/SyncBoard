import { useElementStore } from "../../store/element";
import { useSelectStore } from "../../store/selectElement";
import { Point } from "../types/types";
import { getBoundingBox } from "./pointUtilts";

export function getElementsInsideBox (pt1: Point, pt2: Point, ctx: CanvasRenderingContext2D) {
    const elements = useElementStore.getState().elements;
    const selectStore = useSelectStore.getState();
    selectStore.clearSelection();
    Object.values(elements).forEach(element => {
        const box = getBoundingBox(element, ctx);
        if (box.x1 >= pt1.x && box.x1 <= pt2.x &&
            box.x2 >= pt1.x && box.x2 <= pt2.x &&
            box.y1 >= pt1.y && box.y1 <= pt2.y &&
            box.y2 >= pt1.y && box.y2 <= pt2.y
        ) {
            selectStore.add(element.id, box);
        }
    });
    return;
}