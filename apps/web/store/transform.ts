import { create } from 'zustand';

export interface TransformState {
    x: number;
    y: number;
    scale: number;
    setPan: (dx: number, dy: number) => void;
    setZoom: (factor: number) => void;
};

export const useTransformStore = create<TransformState>((set) => ({
    x: 0,
    y: 0,
    scale: 1,
    setPan: (dx, dy) => set((s) => ({ x: dx, y: dy })),
    setZoom: (factor) => set((s) => ({ scale: s.scale * factor }))
}));