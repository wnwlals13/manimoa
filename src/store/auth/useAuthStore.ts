import { UserData } from '@/types';
import { create } from 'zustand';

interface AuthStore {
  isLogin: boolean;
  user: UserData | null;
  setUser: (data: UserData) => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: false,
  user: null,

  setUser: (user: UserData) => {
    set({ user: user, isLogin: true });
  },
}));
