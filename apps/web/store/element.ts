import { create } from 'zustand';
import { Element } from '../lib/types/types';

export interface ElementState {
    elements: Element[];
    add: (element: Element) => void;
    init: (elements: Element[]) => void;
    remove: (id: string) => void;
};

export const useElementStore = create<ElementState>((set) => ({
    elements: [],
    add: (el) => set((s) => ({ elements: [
        ...s.elements,
        el
    ]})),
    init: (el) => set({elements: [...el]}),
    remove: (id) => set((s) => ({elements: s.elements.filter(el => el.id !== id)}))
}));