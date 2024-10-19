import { LoginFormInputs } from '@/app/login/page';

export async function userLogin(data: LoginFormInputs) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/auth/login`,
      {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      },
    );

    if (!response.ok) {
      console.error('Error');
    }
    return await response.json();
  } catch (err) {
    console.error('Error', err);
  }
}
