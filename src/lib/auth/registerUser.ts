import { RegisterFormInputs } from '@/app/register/page';

export async function userRegister(data: RegisterFormInputs) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_SERVER_URL}/api/auth/register`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    console.error(`Error during register user : ${response.status}`);
    throw new Error('회원가입 실패');
  }

  console.log(`회원가입 성공 : ${response.status}`);
  return response.json();
}
