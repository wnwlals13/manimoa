import { create } from 'zustand';

export interface ChatStore {
  willRemoveRoomCnt: number;
  willRemoveRooms: string[];
  setWillRemoveCnt: (count: number) => void;
  setWillRemoveRooms: (roomId: string) => void;
  filterWillRemoveRooms: (roomId: string) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  willRemoveRoomCnt: 0,
  willRemoveRooms: [],
  setWillRemoveCnt: (count: number) => set({ willRemoveRoomCnt: count }),
  setWillRemoveRooms: (roomId: string) =>
    set((state) => ({ willRemoveRooms: [...state.willRemoveRooms, roomId] })),
  filterWillRemoveRooms: (roomId: string) => {
    const deleted = get().willRemoveRooms.filter((item) => item !== roomId);
    set(() => ({
      willRemoveRooms: deleted,
    }));
  },
}));
