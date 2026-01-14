import { create } from "zustand";
import { StrokeTypes } from "../lib/types/types";

interface StyleState {
    strokeColor: string;
    strokeWidth: number;
    opacity: number;
    strokeType: StrokeTypes;
    fontSize: number;

    setStrokeColor: (v: string) => void;
    setStrokeWidth: (v: number) => void;
    setOpacity: (v: number) => void;
    setStrokeType: (v: StrokeTypes) => void;
    setFontSize: (v: number) => void;
    setStyle: (patch: {
        strokeColor?: string;
        strokeWidth?: number;
        opacity?: number;
        strokeType?: StrokeTypes;
        fontSize?: number;
    }) => void;
}

export const useStyleStore = create<StyleState>((set) => ({
    strokeColor: "#ffffff",
    strokeWidth: 2,
    opacity: 1,
    strokeType: "SOLID",
    fontSize: 20,

    setStrokeColor: (strokeColor) => set({ strokeColor }),
    setStrokeWidth: (strokeWidth) => set({ strokeWidth }),
    setOpacity: (opacity) => set({ opacity }),
    setStrokeType: (strokeType) => set({ strokeType }),
    setFontSize: (fontSize) => set({ fontSize }),
    setStyle: (patch) => set((s) => ({ ...s, ...patch }))
}));
