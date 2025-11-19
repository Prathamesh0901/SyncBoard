import { useElementStore } from "../../store/element";
import { useSelectStore } from "../../store/selectElement";
import { Point, Element } from "../types/types";
import { hitTestElement } from "./hitTestElement";
import { getBoundingBox } from "./pointUtilts";

export function getElementAtPoints (pt: Point) {
    const elements = useElementStore.getState().elements;
    if (elements.length === 0) return;
    useSelectStore.getState().clearSelection();
    elements.forEach((element: Element) => {
        if(hitTestElement(element, pt, 6) === true) {
            const box = getBoundingBox(element);
            useSelectStore.getState().add(element.id, box);
        }
    });
}