import { GoalData, UserData } from '@/types';
import { create } from 'zustand';
import Cookies from 'js-cookie';

interface AuthStore {
  isLogin: boolean;
  user: UserData | null;
  goals: GoalData[];
  setUser: (data: UserData) => void;
  setGoals: (goals: GoalData[]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: false,
  user: null,
  goals: [],

  setUser: (user: UserData) => {
    set({ user: user, isLogin: true });
  },
  setGoals: (goals: GoalData[]) => {
    set({ goals: goals });
  },
  logout: () => {
    Cookies.remove('user');
    set({ isLogin: false, user: null });
  },
}));
