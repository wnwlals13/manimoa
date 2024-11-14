'use client';

import logo from '@/assets/logo.png';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button/button';
import { ChangeEvent, useEffect } from 'react';
import { ResponseError } from '@/types';
import { useLogin } from '@/lib/auth/hook/useLogin';
import FormField from '@/components/ui/inputs/FormField/component';
import { useLoadingStore } from '@/store/loading/loadingStore';

export interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Page() {
  const { mutate, isError, isSuccess, failureReason } = useLogin();
  const { setLoading } = useLoadingStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm({
    defaultValues: { email: '', password: '' },
  });

  const onSubmit = (data: LoginFormInputs) => {
    setLoading(true);
    mutate(data);
  };

  const isValideEmail = (e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    setValue('email', email);
  };

  const isValidePassword = (e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    setValue('password', password);
  };

  useEffect(() => {
    if (!isError) return;
    const err = failureReason as ResponseError;

    if (err.status === 401) {
      setError('password', { message: err.message });
    } else if (err.status === 404) {
      setError('email', { message: err.message });
    }
  }, [isError, isSuccess]);

  return (
    <form
      className="w-full h-full min-h-screen flex flex-col justify-center items-center gap-2 pl-8 pr-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <img width={180} src={logo.src} alt="manimoa 메인 로고 이미지" />
      <FormField
        variant={`${errors.email ? 'error' : 'default'}`}
        fieldType="text"
        labelName="email"
        labelText="이메일"
        placeholderText="이메일을 입력해주세요."
        onFieldChange={isValideEmail}
        errorMsg={errors.email ? `${errors.email.message}` : null}
        {...register('email', { required: '이메일을 입력해주세요.' })}
      />
      <FormField
        variant={`${errors.password ? 'error' : 'default'}`}
        fieldType="password"
        labelName="password"
        labelText="비밀번호"
        placeholderText="비밀번호를 입력해주세요."
        onFieldChange={isValidePassword}
        errorMsg={errors.password ? `${errors.password.message}` : null}
        {...register('password', { required: '비밀번호를 입력해주세요.' })}
      />
      <div className="flex flex-col items-center w-full mt-5 gap-3">
        <Button variant="default" size="full">
          로그인
        </Button>
        <Link href={'/register'}>회원가입</Link>
      </div>
    </form>
  );
}
