'use server';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export const doLike = async ({ feedId }: { feedId: number }) => {
  try {
    const cookieStore = await cookies().get('user');
    const user = JSON.parse(cookieStore?.value as string);
    const resposne = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/like/doLike`,
      {
        method: 'post',
        body: JSON.stringify({ feedId: feedId.toString(), userId: user.uid }),
      },
    );
    if (!resposne.ok) {
      console.error(`좋아요가 실패했습니다.`);
    }
    revalidateTag('profile');
    return await resposne.json();
  } catch (err) {
    console.error(err);
    throw new Error();
  }
};

export const undoLike = async ({ feedId }: { feedId: number }) => {
  try {
    const cookieStore = await cookies().get('user');
    const user = JSON.parse(cookieStore?.value as string);
    const resposne = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/like/undoLike`,
      {
        method: 'post',
        body: JSON.stringify({ feedId: feedId.toString(), userId: user.uid }),
      },
    );
    if (!resposne.ok) {
      console.error(`좋아요 해제가 실패했습니다.`);
    }
    revalidateTag('profile');
    return await resposne.json();
  } catch (err) {
    console.error(err);
    throw new Error();
  }
};
