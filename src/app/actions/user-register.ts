'use server';

import { RegisterFormInputs } from '@/app/register/page';
import { cookies } from 'next/headers';

export async function userRegister(data: RegisterFormInputs) {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    // api 호출
    const response = await fetch(`${apiUrl}/api/auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `${cookies().get('token')}`,
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error(`Error during register user : ${response.status}`);
      throw new Error('회원가입 실패');
    }
    const result = await response.json();

    return result;
  } catch (err) {
    console.error(err);
    throw new Error('userRegister 회원가입 실패');
  }
}
