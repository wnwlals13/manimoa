import { FollowProps } from './hook/useFollow';

export const getUserIsFollow = async (targetId: string) => {
  try {
    const resposne = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getFollow?targetId=${targetId}`,
    );
    return await resposne.json();
  } catch (err) {
    console.error(`팔로우 여부 조회 도중 에러 발생`, err);
  }
};

export const userFollow = async ({ targetId }: FollowProps) => {
  try {
    const resposne = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/doFollow`,
      { method: 'post', body: targetId },
    );
    return await resposne.json();
  } catch (err) {
    console.error(`팔로우 도중 에러 발생`, err);
  }
};

export const userUnFollow = async ({ targetId }: FollowProps) => {
  try {
    const resposne = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/undoFollow`,
      { method: 'post', body: targetId },
    );
    return await resposne.json();
  } catch (err) {
    console.error(`팔로우 취소 도중 에러 발생`, err);
  }
};
