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
    const email = Cookies.get('email');

    if (token) {
      try {
        const resposne = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/info?q=${email}`,
        );
        const info = await resposne.json();

        if (info.data) {
          set({
            user: {
              uid: info.data.id,
              email: info.data.email,
              name: info.data.name,
              profileImg: info.data.profileImg,
            },
            isLogin: true,
          });
        } else {
          set({ user: null, isLogin: false });
          console.error('유저 정보를 가져올 수 없습니다.');
        }
      } catch (error) {
        console.error('유저 정보를 가져오는 중 에러가 발생했습니다.', error);
        set({ user: null, isLogin: false });
      }
    }
  },
  setGoals: (goals: GoalData[]) => {
    set({ goals: goals });
  },
  logout: () => {
    Cookies.remove('accessToken');
    set({ user: null, isLogin: false });
  },
}));
