'use client';

import logo from '@/styles/logo.png';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Cookies from 'js-cookie';

export interface LoginFormInputs {
  email: string;
  password: string;
}

// [function] 사용자 로그인
const userLogin = async (data: LoginFormInputs) => {
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
      Cookies.set('accessToken', result.accessToken);
      Cookies.set('user', JSON.stringify(result.user));
    }

    return result;
  } catch (err) {
    console.error('Error', err);
    throw new Error();
  }
};

export default function Page() {
  const { setUser } = useAuthStore();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    defaultValues: { email: '', password: '' },
  });

  // 로그인 제출
  const onSubmit = (data: LoginFormInputs) => {
    const login = async () => {
      const result = await userLogin(data);
      if (result.status === 201) {
        setUser({
          uid: result.user.uid,
          email: result.user.email,
          name: result.user.name,
          profileImg: result.user.profileImg,
        });
        router.push('/');
      } else if (result.status === 401) {
        setError('password', { message: result.message });
      } else if (result.status === 409) {
        setError('email', { message: result.message });
      }
    };
    login();
  };
  return (
    <form
      className="w-full h-full min-h-screen flex flex-col justify-center items-center gap-2 pl-8 pr-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <img width={180} src={logo.src} alt="" />
      <div className="w-full">
        <label htmlFor="email">이메일</label>
        <Input
          variant={`${errors.email ? 'error' : 'default'}`}
          placeholder="이메일을 입력해주세요."
          {...register('email', { required: true })}
        />
        {errors.email && (
          <p className="text-red-500 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="w-full">
        <label htmlFor="password">비밀번호</label>
        <Input
          variant={`${errors.password ? 'error' : 'default'}`}
          type="password"
          placeholder="비밀번호를 입력해주세요."
          {...register('password', { required: true })}
        />
        {errors.password && (
          <p className="text-red-500 text-sm">{errors.password.message}</p>
        )}
      </div>
      <Button variant="default" size="full">
        로그인
      </Button>
      <Link href={'/register'}>회원가입</Link>
    </form>
  );
}
