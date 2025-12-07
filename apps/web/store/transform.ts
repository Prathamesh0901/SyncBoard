import { create } from 'zustand';

export interface TransformState {
    x: number;
    y: number;
    scale: number;
    setPan: (dx: number, dy: number) => void;
    setZoom: (zoom: number) => void;
};

export const useTransformStore = create<TransformState>((set) => ({
    x: 0,
    y: 0,
    scale: 1,
    setPan: (dx, dy) => set((s) => ({ x: dx, y: dy })),
    setZoom: (zoom) => set((s) => {
        if (zoom >= 0.1 && zoom <= 30) {
            return {scale: zoom}
        }
        return {scale: s.scale}
    })
}));