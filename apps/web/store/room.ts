import { create } from 'zustand';

interface RoomState {
    slug: string;
    roomId: string;
    setState: (slug: string, roomId: string) => void
};

export const useRoomStore = create<RoomState>((set) => ({
    slug: '',
    roomId: '',
    setState: (slug, roomId) => set({ slug, roomId})
}));