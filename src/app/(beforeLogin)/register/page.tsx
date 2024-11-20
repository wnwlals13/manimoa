'use client';

import logo from '@/assets/logo.png';
import { useForm } from 'react-hook-form';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '@/constants';
import { Button } from '@/components/ui/button/button';
import { ChangeEvent, useEffect } from 'react';
import { ResponseError } from '@/types';
import { useRegister } from '@/lib/auth/hook/useRegister';
import FormField from '@/components/ui/inputs/FormField/component';
import { useLoadingStore } from '@/store/loading/loadingStore';
import { debounce } from '@/util/debounce';

export interface RegisterFormInputs {
  email: string;
  password: string;
  name: string;
  goal?: string;
}

export default function Page() {
  const { mutate, isError, failureReason } = useRegister();
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    setValue,
    formState: { errors, isLoading },
  } = useForm({
    defaultValues: { email: '', password: '', name: '', goal: '' },
    mode: 'onChange',
  });
  const { setLoading } = useLoadingStore();

  // 회원가입 제출
  const onSubmit = ({
    email,
    password,
    name,
    goal,
  }: {
    email: string;
    password: string;
    name: string;
    goal?: string;
  }) => {
    setLoading(true);
    mutate({ email, password, name, goal });
  };

  const isValideEmail = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const email = e.target.value;
    if (!EMAIL_PATTERN.test(email)) {
      setError('email', {
        message: '이메일 양식이 올바르지 않습니다.',
      });
    } else {
      setValue('email', email);
      clearErrors('email');
    }
  });

  const isValidePassword = debounce((e: ChangeEvent<HTMLInputElement>) => {
    const password = e.target.value;
    if (!PASSWORD_PATTERN.test(password)) {
      setError('password', {
        message:
          '비밀번호는 영문 소문자, 영문 대문자, 숫자, 특수문자 중 3개 이상 포함해야 합니다.',
      });
    } else {
      setValue('password', password);
      clearErrors('password');
    }
  });

  const handleNameVal = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setValue('name', name);
  };

  const handleGoalVal = (e: ChangeEvent<HTMLInputElement>) => {
    const goal = e.target.value;
    setValue('goal', goal);
  };

  useEffect(() => {
    if (!isError) return;
    const error = failureReason as ResponseError;
    if (error.status === 400) {
      setError('email', { message: error.message });
    }
  }, [isError]);

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
        errorMsg={errors.email?.message ? errors.email.message : null}
        {...register('email', {
          required: '이메일을 입력해주세요.',
        })}
      />
      <FormField
        variant={`${errors.password ? 'error' : 'default'}`}
        fieldType="password"
        labelName="password"
        labelText="비밀번호"
        placeholderText="비밀번호를 입력해주세요."
        onFieldChange={isValidePassword}
        errorMsg={errors.password?.message ? errors.password.message : null}
        {...register('password', {
          required: '비밀번호를 입력해주세요.',
        })}
      />
      <FormField
        variant={`${errors.name ? 'error' : 'default'}`}
        fieldType="text"
        labelName="name"
        labelText="이름"
        placeholderText="이름을 입력해주세요."
        onFieldChange={handleNameVal}
        errorMsg={errors.name?.message ? errors.name.message : null}
        {...register('name', { required: '이름을 입력해주세요.' })}
      />
      <FormField
        variant={`${errors.goal ? 'error' : 'default'}`}
        fieldType="text"
        labelName="goal"
        labelText="소비 다짐"
        placeholderText="이루고 싶은 소비 다짐을 입력해주세요. (선택)"
        onFieldChange={handleGoalVal}
        errorMsg={errors.goal?.message ? errors.goal.message : null}
        {...register('goal')}
      />
      <div className="flex flex-col items-center w-full mt-5 gap-3">
        <Button
          variant="primary"
          size="full"
          type="submit"
          disabled={isLoading}
        >
          회원가입
        </Button>
      </div>
    </form>
  );
}
