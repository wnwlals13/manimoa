'use server';
import { cookies } from 'next/headers';
import { GoalsRequestDto } from './hook/useUpdateGoals';
import { InfoRequestDto } from './hook/useUpdateInfo';
import { revalidateTag } from 'next/cache';

export const updateInfo = async (data: InfoRequestDto) => {
  try {
    console.log('[updateinfo] env =>', process.env.NEXT_PUBLIC_BASE_URL);
    const cookieStore = await cookies().get('user');
    const user = JSON.parse(cookieStore?.value as string);
    const fileResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/profile/edit`,
      {
        method: 'post',
        body: JSON.stringify({ ...data, userId: user.uid }),
      },
    );
    console.log('user/edit', fileResponse);
    if (!fileResponse.ok) {
      console.error('[client] 프로필 데이터 저장 싪패!');
      throw new Error();
    }
    revalidateTag('profile');
    const result = await fileResponse.json();

    return result.updated;
  } catch (err) {
    console.error('프로필 업데이트 fetch 도중 에러 발생!', err);
    throw new Error();
  }
};

export const updateGoals = async (data: GoalsRequestDto) => {
  try {
    const cookieStore = await cookies().get('user');
    const user = JSON.parse(cookieStore?.value as string);
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/goal/edit`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, userId: user.uid }),
      },
    );
    const result = await response.json();
    return result.data;
  } catch (err) {
    console.error('목표 업데이트 fetch 도중 에러 발생!', err);
    throw new Error();
  }
};

export const getInfoAndGoals = async (userId?: string) => {
  // 소비 목표 금액 & 다짐 정보 조회
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/goal?userId=${userId}`,
    { method: 'get', next: { tags: ['goals'] } },
  );
  if (!response.ok) {
    return { error: `소비 목표 금액 & 다짐 정보 조회 실패` };
  }
  const result = await response.json();
  console.log('resposne 입니다. ', result.goals, result.price);

  return { goals: result.goals, price: result.price };
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
