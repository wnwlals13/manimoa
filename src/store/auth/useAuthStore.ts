'use client';

import { FeedData, GoalData, UserData } from '@/types';
import { create } from 'zustand';
import Cookies from 'js-cookie';

export interface AuthStore {
  isLogin: boolean;
  user: UserData | null;
  goals: GoalData[];
  userFeeds: FeedData[];

  setUser: (data: UserData) => void;
  checkLoginStatus: () => void;
  setGoals: (goals: GoalData[]) => void;
  setUserFeeds: (feeds: FeedData[]) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
  isLogin: !!Cookies.get('accessToken'),
  user: null,
  goals: [],
  userFeeds: [],

  setUser: (user: UserData) => {
    set({ user: user, isLogin: true });
  },
  // 유저 상태 체크
  checkLoginStatus: async () => {
    // const token = Cookies.get('accessToken');
    // const userCookie = Cookies.get('user');
    // const user = JSON.parse(userCookie as string);
    // console.log('check login status :', token, 'user info :', user);
    // try {
    //   if (token) {
    //     console.log('?is call');
    //     const response = await fetch(
    //       `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/info?q=${user.uid}`,
    //       {
    //         cache: 'no-store',
    //       },
    //     );
    //     const rows = await response.json();
    //     if (rows && rows.data) {
    //       set({
    //         user: {
    //           uid: rows.data.id,
    //           email: rows.data.email,
    //           name: rows.data.name,
    //           profileImg: rows.data.profile_img,
    //         },
    //         isLogin: true,
    //       });
    //     } else {
    //       set({ user: null, isLogin: false });
    //       console.error('유저 정보를 가져올 수 없습니다.');
    //     }
    //   }
    // } catch (err) {
    //   console.error('유저 정보를 가져오는 도중 에러가 발생했습니다.', err);
    //   set({ user: null, isLogin: false });
    // }
  },
  setGoals: (goals: GoalData[]) => {
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
}));
