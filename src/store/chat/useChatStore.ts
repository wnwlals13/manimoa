import { create } from 'zustand';

export interface ChatStore {
  roomCnt: number;
  willRemoveRoomCnt: number;
  willRemoveRooms: string[];
  setRoomCnt: (count: number) => void;
  setWillRemoveCnt: (count: number) => void;
  setWillRemoveRooms: (roomId: string) => void;
  filterWillRemoveRooms: (roomId: string) => void;
  resetRemoveRooms: () => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  roomCnt: 0,
  willRemoveRoomCnt: 0,
  willRemoveRooms: [],
  setRoomCnt: (count: number) => set({ roomCnt: count }),
  setWillRemoveCnt: (count: number) => set({ willRemoveRoomCnt: count }),
  setWillRemoveRooms: (roomId: string) =>
    set((state) => ({ willRemoveRooms: [...state.willRemoveRooms, roomId] })),
  filterWillRemoveRooms: (roomId: string) => {
    const deleted = get().willRemoveRooms.filter((item) => item !== roomId);
    set(() => ({
      willRemoveRooms: deleted,
    }));
  },
  resetRemoveRooms: () => set({ willRemoveRoomCnt: 0, willRemoveRooms: [] }),
}));
