import { create } from 'zustand';
import { BoundingBox } from '../lib/types/types';

type SelectionMeta = {
    hasText: boolean;
    hasNonText: boolean;
};

export interface SelectState {
    selectedIds: string[];
    selectionMeta: SelectionMeta;
    boundingBoxes: Record<string, BoundingBox>;

    select: (id: string, elementType: 'TEXT' | 'OTHER') => void;
    selectMany: (items: { id: string; type: 'TEXT' | 'OTHER' }[]) => void;
    add: (id: string, box: BoundingBox, elementType: 'TEXT' | 'OTHER') => void;

    updateBox: (id: string, box: BoundingBox) => void;
    clearSelection: () => void;
    remove: (id: string) => void;
};

export const useSelectStore = create<SelectState>((set) => ({
    selectedIds: [],
    boundingBoxes: {},
    selectionMeta: {
        hasText: false,
        hasNonText: false,
    },

    select: (id, elementType) =>
        set({
            selectedIds: [id],
            boundingBoxes: {},
            selectionMeta: {
                hasText: elementType === 'TEXT',
                hasNonText: elementType !== 'TEXT',
            },
        }),

    selectMany: (items) => {
        let hasText = false;
        let hasNonText = false;

        for (const item of items) {
            if (item.type === 'TEXT') hasText = true;
            else hasNonText = true;
        }

        set({
            selectedIds: items.map(i => i.id),
            boundingBoxes: {},
            selectionMeta: { hasText, hasNonText },
        });
    },

    add: (id, box, elementType) =>
        set((s) => ({
            selectedIds: [...s.selectedIds, id],
            boundingBoxes: {
                ...s.boundingBoxes,
                [id]: box,
            },
            selectionMeta: {
                hasText: s.selectionMeta.hasText || elementType === 'TEXT',
                hasNonText: s.selectionMeta.hasNonText || elementType !== 'TEXT',
            },
        })),

    updateBox: (id, box) =>
        set((s) => ({
            boundingBoxes: {
                ...s.boundingBoxes,
                [id]: box,
            },
        })),

    clearSelection: () =>
        set({
            selectedIds: [],
            boundingBoxes: {},
            selectionMeta: { hasText: false, hasNonText: false },
        }),

    remove: (id) =>
        set((s) => {
            const boxes = { ...s.boundingBoxes };
            delete boxes[id];

            return {
                selectedIds: s.selectedIds.filter(i => i !== id),
                boundingBoxes: boxes,
            };
        }),
}));
