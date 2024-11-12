'use server';

import { QueryFunctionContext } from '@tanstack/react-query';
import { cookies } from 'next/headers';

export const fetchFeedsAction = async ({
  pageParam = 1,
}: QueryFunctionContext) => {
  const cookieStore = cookies().get('user')?.value as string;
  const user = JSON.parse(cookieStore);
  const pageSize = 10;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/readAll?cursor=` +
        pageParam +
        `&pageSize=` +
        pageSize +
        `&userId=` +
        user.id,
      { cache: 'no-store' },
    ).then((res) => res.json());

    return response;
  } catch (err) {
    console.error('게시글 fetch 실패', err);
    throw new Error();
  }
};
