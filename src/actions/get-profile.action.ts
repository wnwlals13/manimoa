'use server';

export const getAdditionalInfo = async (userId: string) => {
  if (!userId) {
    return {
      status: false,
      error: '[getAdditionalInfo] 유저 아이디가 없습니다.',
    };
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/profile?q=${userId}`,
      {
        method: 'get',
        headers: {
          'Content-Type': 'application/json',
        },
        next: { tags: [`profile`] },
      },
    );
    console.log('[MYPAGE] profile => ', response);
    if (!response.ok) {
      return { error: `팔로우/팔로잉 데이터 조회에 실패했습니다.` };
    }
    const result = await response.json();
    console.log('[MYPAGE] feeds2 => ', result);
    return { status: true, error: '', data: result.data };
  } catch (err) {
    return {
      status: false,
      error: `유저 부가정보 조회에 실패했습니다. : ${err}`,
    };
  }
};
