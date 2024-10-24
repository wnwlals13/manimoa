'use client';

import logo from '@/styles/logo.png';
import { useForm } from 'react-hook-form';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '@/constants';
// import { userRegister } from '@/app/actions/user-register';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export interface RegisterFormInputs {
  email: string;
  password: string;
  name: string;
  goal?: string;
}

export default function Page() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isLoading },
  } = useForm({
    defaultValues: { email: '', password: '', name: '', goal: '' },
  });

  const onSubmit = (data: RegisterFormInputs) => {
    const register = async () => {
      try {
        // api 호출
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          },
        );

        if (!response.ok) {
          console.error(`Error during register user : ${response.status}`);
          throw new Error('회원가입 실패');
        }
        const result = await response.json();

        if (result.status === 201) {
          router.push('/login');
        } else if (result.status === 400) {
          setError('email', { message: result.message });
          return;
        }
      } catch (err) {
        console.error(err);
        throw new Error('회원가입 실패');
      }
    };
    register();
  };
  return (
    <form
      className="w-full h-full min-h-screen flex flex-col justify-center items-center gap-2 pl-8 pr-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <img width={180} src={logo.src} alt="" />
      <div className="w-full">
        <label htmlFor="email">이메일</label>
        <div className="relative">
          <Input
            variant={`${errors.email ? 'error' : 'default'}`}
            placeholder="이메일을 입력해주세요."
            {...register('email', {
              pattern: {
                value: EMAIL_PATTERN,
                message: '이메일 양식이 올바르지 않습니다.',
              },
              required: '이메일을 입력해주세요.',
            })}
          />
        </div>
        {errors.email && (
          <p className="text-red-600 text-sm">{errors.email.message}</p>
        )}
      </div>
      <div className="w-full">
        <label htmlFor="email">비밀번호</label>
        <div className="relative"></div>
        <Input
          variant={`${errors.password ? 'error' : 'default'}`}
          placeholder="비밀번호를 입력해주세요."
          type="password"
          {...register('password', {
            pattern: {
              value: PASSWORD_PATTERN,
              message:
                '비밀번호는 영문 소문자, 영문 대문자, 숫자, 특수문자 중 3개 이상 포함해야 합니다.',
            },
            required: '비밀번호를 입력해주세요.',
          })}
        />
        {errors.password && (
          <p className="text-red-600 text-sm">{errors.password.message}</p>
        )}
      </div>
      <div className="w-full">
        <label htmlFor="email">이름</label>
        <div className="relative"></div>
        <Input
          variant={`${errors.name ? 'error' : 'default'}`}
          placeholder="이름을 입력해주세요."
          {...register('name', { required: '이름을 입력해주세요.' })}
        />
        {errors.name && (
          <p className="text-red-600 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div className="w-full">
        <label htmlFor="email">다짐</label>
        <div className="relative"></div>
        <Input
          placeholder="이루고 싶은 소비 다짐을 입력해주세요. (선택)"
          {...register('goal')}
        />
      </div>
      <Button variant="default" size="full" disabled={isLoading}>
        회원가입
      </Button>
    </form>
  );
}
