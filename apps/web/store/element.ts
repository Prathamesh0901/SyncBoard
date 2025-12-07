import { create } from 'zustand';
import { Element } from '../lib/types/types';

export interface ElementState {
    elements: Record<string, Element>;
    add: (element: Element) => void;
    init: (elements: Element[]) => void;
    remove: (id: string) => void;
    update: (id: string, el: Element) => void;
};

export const useElementStore = create<ElementState>((set) => ({
    elements: {},
    add: (el) => set((s) => ({ elements: {
        ...s.elements,
        [el.id]: el 
    }})),
    init: (el) => set(() => {
        const newMap: Record<string, Element> = {};
        for(const e of el) {
            newMap[e.id] = e;
        }
        return {
            elements: newMap
        }
    }),
    remove: (id) => set((s) => {
        const newElements = {...s.elements};
        delete newElements[id];
        return {elements: newElements}
    }),
    update: (id, el) => set((s) => {
        const newElements = {...s.elements};
        newElements[id] = el;
        return {elements: newElements}
    })
}));