import { ProfileFormInputs } from '../(with-nav)/mypage/edit/page';

export async function updateUserProfile(data: ProfileFormInputs) {
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

    return result;
  } catch (err) {
    console.error('[client] 프로필 업데이트 fetch 도중 에러 발생!', err);
    throw new Error();
  }
}
