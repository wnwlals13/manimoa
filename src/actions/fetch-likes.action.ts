'use server';

export const fetchLikesAction = async (
  pageParam: number,
  pageSize: number,
  userId: string,
) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/readLikes?cursor=` +
        pageParam +
        `&pageSize=` +
        pageSize +
        `&userId=` +
        userId,
      { cache: 'no-store' },
    ).then((res) => res.json());

    return response;
  } catch (err) {
    console.error('게시글 likes fetch 실패', err);
    throw new Error();
  }
};
