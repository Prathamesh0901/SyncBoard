import { create } from 'zustand';
import { BoundingBox } from '../lib/types/types';

export interface SelectState {
    selectedIds: string[];
    boundingBoxes: Record<string, BoundingBox>

    select: (id: string) => void;
    updateBox: (id: string, box: BoundingBox) => void;
    selectMany: (ids: string[]) => void;
    add: (id: string, box: BoundingBox) => void;
    clearSelection: () => void;
};

export const useSelectStore = create<SelectState>((set) => ({
    selectedIds: [],
    boundingBoxes: {},
    select: (id) => set({
        selectedIds: [id],
        boundingBoxes: {}
    }),
    updateBox: (id, box) => set((s) => ({
        boundingBoxes: {
            ...s.boundingBoxes,
            [id]: box
        }
    })),
    selectMany: (ids) => set({
        selectedIds: ids,
        boundingBoxes: {}
    }),
    add: (id, box) => set((s) => ({
        selectedIds: [
            ...s.selectedIds,
            id
        ],
        boundingBoxes: {
            ...s.boundingBoxes,
            [id]: box
        }
    })),
    clearSelection: () => {
        set({
            selectedIds: [],
            boundingBoxes: {}
        })
    },
}));