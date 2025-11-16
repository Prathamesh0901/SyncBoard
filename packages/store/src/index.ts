import { create } from 'zustand';
import { Tools, Colors } from '@repo/common/types'

interface DrawState {
    selectedTool: Tools;
    setSelectedTool: (tool: Tools) => void;
};

interface ColorState {
    selectedColor: Colors;
    setSelectedColor: (color: Colors) => void;
};

export const useDrawStore = create<DrawState>((set) => ({
    selectedTool: 'free_hand',
    setSelectedTool: (tool) => set({ selectedTool: tool }),
}));

export const useColorStore = create<ColorState>((set) => ({
    selectedColor: 'black',
    setSelectedColor: (color) => set({ selectedColor: color }),
}));