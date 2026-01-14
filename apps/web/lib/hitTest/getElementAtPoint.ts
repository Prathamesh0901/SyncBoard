import { useElementStore } from "../../store/element";
import { useSelectStore } from "../../store/selectElement";
import { Point, Element } from "../types/types";
import { hitTestElement } from "./hitTestElement";
import { getBoundingBox } from "./pointUtilts";

export function getElementAtPoints (pt: Point, ctx: CanvasRenderingContext2D) {
    const elements = useElementStore.getState().elements;
    useSelectStore.getState().clearSelection();
    let el: Element | null = null;
    Object.values(elements).forEach((element: Element) => {
        const box = getBoundingBox(element, ctx);
        if(hitTestElement(element, pt, 10, ctx) === true) {
            const type = element.type;
            useSelectStore.getState().add(element.id, box, (type === 'TEXT'?'TEXT':'OTHER'));
            el = element;
        }
    });
    return el;
}