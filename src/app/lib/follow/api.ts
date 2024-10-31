'use server';

import { revalidateTag } from 'next/cache';
import { FollowProps } from './hook/useFollow';
import { cookies } from 'next/headers';

export const getUserIsFollow = async (targetId: string) => {
  try {
    const cookieStore = await cookies().get('user');
    const user = JSON.parse(cookieStore?.value as string);
    const resposne = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getFollow?targetId=${targetId}&userId=${user.uid}`,
    );
    return await resposne.json();
  } catch (err) {
    console.error(`팔로우 여부 조회 도중 에러 발생`, err);
  }
};

export const userFollow = async ({ targetId }: FollowProps) => {
  try {
    const cookieStore = await cookies().get('user');
    const user = JSON.parse(cookieStore?.value as string);
    const resposne = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/doFollow`,
      {
        method: 'post',
        body: JSON.stringify({ targetId: targetId, userId: user.uid }),
      },
    );
    revalidateTag('profile');
    return await resposne.json();
  } catch (err) {
    console.error(`팔로우 도중 에러 발생`, err);
  }
};

export const userUnFollow = async ({ targetId }: FollowProps) => {
  try {
    const cookieStore = await cookies().get('user');
    const user = JSON.parse(cookieStore?.value as string);
    const resposne = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/undoFollow`,
      {
        method: 'post',
        body: JSON.stringify({ targetId: targetId, userId: user.uid }),
      },
    );
    revalidateTag('profile');
    return await resposne.json();
  } catch (err) {
    console.error(`팔로우 취소 도중 에러 발생`, err);
  }
};
