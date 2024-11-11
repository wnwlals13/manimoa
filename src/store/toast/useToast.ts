import { create } from 'zustand';
import { ToastStore } from './types';
import { v4 as uuidv4 } from 'uuid';

export const useToast = create<ToastStore>((set, get) => ({
  items: [],
  disposeAll: () => {
    set(() => ({
      items: [],
    }));
  },
  toast: (params) => {
    const id = uuidv4();
    const newItem = { ...params, id: id };
    set((state) => ({ items: [...state.items, newItem] }));
  },
  addToast: (params) => {
    const { toast, disposeAll } = get();
    disposeAll();
    toast(params);
  },
}));
