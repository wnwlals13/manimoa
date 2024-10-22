'use server';

import { RegisterFormInputs } from '@/app/register/page';
import { cookies } from 'next/headers';

export async function userRegister(data: RegisterFormInputs) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `${cookies().get('token')}`,
        },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      console.error(`Error during register user : ${response.status}`);
      throw new Error('회원가입 실패');
    }

    console.log(`회원가입 성공 : ${response.status}`);
    return response.json();
  } catch (err) {
    console.error(err);
  }
}
