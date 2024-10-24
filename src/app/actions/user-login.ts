'use server';

import { LoginFormInputs } from '@/app/login/page';
import { cookies } from 'next/headers';

export async function userLogin(data: LoginFormInputs) {
  const apiUrl = process.env.NEXT_PUBLIC_BASE_URL;
  try {
    const response = await fetch(`${apiUrl}/api/auth/login`, {
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      console.error('Error');
      throw new Error();
    }
    const result = await response.json();

    if (result.user) {
      cookies().set('accessToken', result.accessToken);
      cookies().set('user', JSON.stringify(result.user));
    }

    return result;
  } catch (err) {
    console.error('Error', err);
    throw new Error('userLogin API 호출 실패');
  }
}
