import { create } from 'zustand';
import { Tools } from '../lib/types/types';

export interface ToolState {
    tool: Tools;
    setTool: (tool: Tools) => void
};

export const useToolStore = create<ToolState>((set) => ({
    tool: 'SELECT',
    setTool: (t) => set({ tool: t })
}));