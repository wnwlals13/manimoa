export const getMyFeeds = async (userId: string) => {
  if (!userId) {
    return {
      status: false,
      error: '[getAdditionalInfo] 유저 아이디가 없습니다.',
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getFeeds?userId=${userId}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );
    console.log('[MYPAGE] feeds => ', response);
    if (!response.ok) {
      return { error: `내 피드게시글 데이터 조회에 실패했습니다.` };
    }
    const { feeds } = await response.json();
    return { status: true, error: '', data: feeds };
  } catch (err) {
    return {
      status: false,
      error: `내 피드 게시글 조회 도중 에러가 발생했습니다. : ${err}`,
    };
  }
};
