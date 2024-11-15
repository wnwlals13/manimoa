import { GoalData } from '@/types';
import Cookies from 'js-cookie';
import { GoalsRequestDto, IFollow, InfoRequestDto } from './type';

export const updateInfo = async (data: InfoRequestDto) => {
  try {
    const cookieStore = Cookies.get('user') as string;
    const user = JSON.parse(cookieStore);
    const fileResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/profile/edit`,
      {
        method: 'PATCH',
        body: JSON.stringify({ ...data, userId: user.uid }),
      },
    );

    if (!fileResponse.ok) {
      console.error('[client] 프로필 데이터 저장 싪패!');
      throw new Error();
    }

    const result = await fileResponse.json();

    return result.updated;
  } catch (err) {
    console.error('프로필 업데이트 fetch 도중 에러 발생!', err);
    throw new Error();
  }
};

export const updateGoals = async (data: GoalsRequestDto) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/goal/edit`,
      {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    );
    const result = await response.json();
    return result.data;
  } catch (err) {
    console.error('목표 업데이트 fetch 도중 에러 발생!', err);
    throw new Error();
  }
};

export interface IExpenseInfo {
  goals: GoalData[];
  price: string;
}

export const getExpenseInfo = async (userId: string) => {
  // 소비 목표 금액 & 다짐 정보 조회
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/goal?userId=${userId}`,
    { method: 'get', next: { tags: ['goals'] } },
  );
  if (!response.ok) {
    return { error: `소비 목표 금액 & 다짐 정보 조회 실패` };
  }
  const result = await response.json();
  return result.data as IExpenseInfo;
};

export interface IMonthlyExpenseInfo {
  expense: string;
}

export const getUserMonthExpense = async (userId: string) => {
  // 이번 달 총 소비 금액
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/monthlyExpense?userId=${userId}`,
    { method: 'get', next: { tags: ['expense'] } },
  );
  if (!response.ok) {
    return { error: `이번 달 총 소비 금액 조회 실패` };
  }
  const result = await response.json();

  return result.expenses as IMonthlyExpenseInfo;
};

export const getUserList = async () => {
  // 소비 목표 금액 & 다짐 정보 조회
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getUserList`,
    { method: 'get' },
  );
  console.log(response);
  if (!response.ok) {
    return { error: `유저 정보 조회` };
  }
  const result = await response.json();

  return result;
};

export const getUserProfile = async (userId: string) => {
  try {
    const cookieStore = Cookies.get('user') as string;
    const user = JSON.parse(cookieStore);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getInfo?userId=${userId}&loginId=${user.uid}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    if (!response.ok) {
      return { error: `유저 정보 조회에 실패했습니다.` };
    }
    const result = await response.json();
    return result.user;
  } catch (err) {
    console.error(`유저 정보 데이터 조회 도중 에러 발생`, err);
  }
};

export const getUserFollowCnt = async (userId: string): Promise<IFollow> => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/profile?q=${userId}`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );

  if (!response.ok) {
    throw new Error(`유저 팔로우/팔로잉 데이터 조회에 실패했습니다.`);
  }
  const result = await response.json();
  return result.data;
};

export const getMyFeeds = async (userId: string) => {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getFeeds?userId=${userId}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: ['my-feeds'] },
    },
  );
  if (!response.ok) {
    return { error: `내 피드게시글 데이터 조회에 실패했습니다.` };
  }
  const { feeds } = await response.json();
  return feeds;
};
