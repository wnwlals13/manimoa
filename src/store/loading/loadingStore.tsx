import { create } from 'zustand';

interface LoadingStore {
  loading: boolean;
  setLoading: (loading: boolean) => void;
}

export const useLoadingStore = create<LoadingStore>((set, get) => ({
  loading: false,
  setLoading: (loading: boolean) => {
    if (loading === get().loading) return;
    set(() => ({ loading }));
  },
}));
