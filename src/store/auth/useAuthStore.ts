'use client';

import { GoalData, UserData } from '@/types';
import { create } from 'zustand';
import Cookies from 'js-cookie';

export interface AuthStore {
  isLogin: boolean;
  user: UserData | null;
  goals: GoalData[];
  setUser: (data: UserData) => void;
  checkLoginStatus: () => void;
  setGoals: (goals: GoalData[]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: !!Cookies.get('accessToken'),
  user: null,
  goals: [],

  setUser: (user: UserData) => {
    set({ user: user, isLogin: true });
  },
  // 유저 상태 체크
  checkLoginStatus: async () => {
    const token = Cookies.get('accessToken');
    const userCookie = Cookies.get('user');
    const user = JSON.parse(userCookie as string);
    try {
      if (token) {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/info?q=${user.uid}`,
        );
        const rows = await response.json();
        if (rows && rows.data) {
          set({
            user: {
              uid: rows.data.id,
              email: rows.data.email,
              name: rows.data.name,
              profileImg: rows.data.profileImg,
            },
            isLogin: true,
          });
        } else {
          set({ user: null, isLogin: false });
          console.error('유저 정보를 가져올 수 없습니다.');
        }
      }
    } catch (err) {
      console.error(err);
    }
  },
  setGoals: (goals: GoalData[]) => {
    set({ goals: goals });
  },
  logout: () => {
    Cookies.remove('accessToken');
    Cookies.remove('user');
    set({ user: null, isLogin: false });
  },
}));
