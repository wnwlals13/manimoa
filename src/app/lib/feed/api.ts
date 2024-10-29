export const deleteFeed = async (feedId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/delete`,
      {
        method: 'post',
        body: feedId,
      },
    );

    if (!res.ok) {
      console.error(`데이터 삭제 과정 api 에러 발생`);
    }

    const result = await res.json();
    return result;
  } catch (err) {
    console.error('피드 삭제에 실패했습니다.', err);
  }
};

export const fetchMyFeeds = async (userId: string) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/readByUser?id=${userId}`,
      {
        method: 'get',
        cache: 'no-store',
      },
    ).then((res) => res.json());

    return response.data;
  } catch (err) {
    console.error('myfetch 에러 발생', err);
  }
};
