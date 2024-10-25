// 'use server';

// import { cookies } from 'next/headers';
import { ProfileFormInputs } from '../(with-nav)/user/edit/page';

export async function updateUserProfile(data: ProfileFormInputs) {
  try {
    console.log('env =>', process.env.NEXT_PUBLIC_BASE_URL);
    const fileResponse = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/profile/edit`,
      {
        method: 'post',
        body: JSON.stringify(data),
        // next: { tags: ['profile'] },
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
