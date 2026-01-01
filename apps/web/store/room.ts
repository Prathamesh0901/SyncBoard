import { create } from 'zustand';

interface RoomState {
    slug: string;
    roomId: string;
    setRoomState: (slug: string, roomId: string) => void,
    clearRoomState: () => void
};

export const useRoomStore = create<RoomState>((set) => ({
    slug: '',
    roomId: '',
    setRoomState: (slug, roomId) => set({ slug, roomId}),
    clearRoomState: () => set({ slug: '', roomId: ''})
}));