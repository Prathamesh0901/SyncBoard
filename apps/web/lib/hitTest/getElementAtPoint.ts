import { useElementStore } from "../../store/element";
import { useSelectStore } from "../../store/selectElement";
import { Point, Element } from "../types/types";
import { hitTestElement } from "./hitTestElement";
import { getBoundingBox } from "./pointUtilts";

export function getElementAtPoints (pt: Point, ctx: CanvasRenderingContext2D) {
    console.log('called by getElementAtPoints')
    const elements = useElementStore.getState().elements;
    useSelectStore.getState().clearSelection();
    let el: Element | null = null;
    Object.values(elements).forEach((element: Element) => {
        if(hitTestElement(element, pt, 6, ctx) === true) {
            const box = getBoundingBox(element, ctx);
            useSelectStore.getState().add(element.id, box);
            el = element;
        }
    });
    return el;
}