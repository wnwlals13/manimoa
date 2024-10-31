import { GoalsRequestDto } from './hook/useUpdateGoals';
import { InfoRequestDto } from './hook/useUpdateInfo';

export const updateInfo = async (data: InfoRequestDto) => {
  try {
    console.log('env =>', process.env.NEXT_PUBLIC_BASE_URL);
    const fileResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/profile/edit`,
      {
        method: 'post',
        body: JSON.stringify(data),
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
        method: 'post',
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

export const getInfoAndGoals = async (userId?: string) => {
  try {
    // 소비 목표 금액 & 다짐 정보 조회
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/mypage/goal?userId=${userId}`,
      { method: 'get' },
    );
    if (!response.ok) {
      console.error(`소비 목표 금액 & 다짐 정보 조회 실패`);
      throw new Error();
    }
    console.log(`getInfo and Goals =>`, response);
    const result = await response.json();

    // const goalArr = result.goals.map((item: GoalData) => item.content);
    console.log('resposne 입니다. ', result.goals, result.price);

    return { goals: result.goals, price: result.price };
  } catch (err) {
    console.error('소비 목표 금액 & 다짐 정보 조회 에러 발생!', err);
    throw new Error();
  }
};
