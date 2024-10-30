'use client';

import { FeedData, UserData } from '@/types';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import Cookies from 'js-cookie';

export interface AuthStore {
  isLogin: boolean;
  user: UserData | null;
  goals: string[];
  userFeeds: FeedData[];
  nowEdit: boolean;

  setUser: (data: UserData) => void;
  setGoals: (goals: string[]) => void;
  setUserFeeds: (feeds: FeedData[]) => void;
  logout: () => void;
  setNowEdit: (state: boolean) => void;
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      isLogin: !!Cookies.get('accessToken'),
      user: null,
      goals: [],
      userFeeds: [],
      nowEdit: false,

      setUser: (user: UserData) => {
        set({ user: user, isLogin: true });
      },
      setGoals: (goals: string[]) => {
        set({ goals: goals });
      },
      setUserFeeds: (feeds: FeedData[]) => {
        set({ userFeeds: feeds });
      },
      logout: () => {
        Cookies.remove('accessToken');
        Cookies.remove('user');
        set({ user: null, isLogin: false });
      },
      setNowEdit: (state: boolean) => set({ nowEdit: state }),
    }),
    { name: 'user-storage', storage: createJSONStorage(() => sessionStorage) },
  ),
);
