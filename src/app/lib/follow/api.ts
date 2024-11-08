import { FollowProps } from './type';

export const getUserIsFollow = async (targetId: string, userId: string) => {
  try {
    const resposne = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getFollow?targetId=${targetId}&userId=${userId}`,
    );
    const result = await resposne.json();
    return result.isFriend;
  } catch (err) {
    console.error(`팔로우 여부 조회 도중 에러 발생`, err);
  }
};

export const userFollow = async ({ targetId, userId }: FollowProps) => {
  try {
    const resposne = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/doFollow`,
      {
        method: 'post',
        body: JSON.stringify({ targetId: targetId, userId: userId }),
      },
    );

    return await resposne.json();
  } catch (err) {
    console.error(`팔로우 도중 에러 발생`, err);
  }
};

export const userUnFollow = async ({ targetId, userId }: FollowProps) => {
  try {
    const resposne = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/undoFollow`,
      {
        method: 'post',
        body: JSON.stringify({ targetId: targetId, userId: userId }),
      },
    );

    return await resposne.json();
  } catch (err) {
    console.error(`팔로우 취소 도중 에러 발생`, err);
  }
};
