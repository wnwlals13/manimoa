'use server';

import { QueryFunctionContext } from '@tanstack/react-query';

export const fetchFeedsAction = async ({
  pageParam = 1,
}: QueryFunctionContext) => {
  const pageSize = 10;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/readAll?cursor=` +
        pageParam +
        `&pageSize=` +
        pageSize,
      { cache: 'no-store' },
    ).then((res) => res.json());

    return response;
  } catch (err) {
    console.error('게시글 fetch 실패', err);
    throw new Error();
  }
};
