'use client';
import { ButtonComponent } from '@/components/ui/button';
import { InputComponent } from '@/components/ui/input';
import logo from '@/styles/logo.png';
import { useForm } from 'react-hook-form';
import { EMAIL_PATTERN, PASSWORD_PATTERN } from '@/constants';
import { userRegister } from '@/lib/auth/registerUser';
import { useRouter } from 'next/navigation';

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
    formState: { errors },
  } = useForm({
    defaultValues: { email: '', password: '', name: '', goal: '' },
  });

  const onSubmit = (data: RegisterFormInputs) => {
    userRegister(data).then((res) => {
      console.log(res);
      if (res.status === 201) {
        router.push('/login');
      } else if (res.status === 400) {
        setError('email', { message: res.message });
        return;
      }
    });
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
          <InputComponent
            size="medium"
            state={`${errors.email ? 'error' : 'default'}`}
            placeholderText="이메일을 입력해주세요."
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
        <InputComponent
          size="medium"
          state="default"
          placeholderText="비밀번호를 입력해주세요."
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
        <InputComponent
          size="medium"
          state="default"
          placeholderText="이름을 입력해주세요."
          {...register('name', { required: '이름을 입력해주세요.' })}
        />
        {errors.name && (
          <p className="text-red-600 text-sm">{errors.name.message}</p>
        )}
      </div>
      <div className="w-full">
        <label htmlFor="email">다짐</label>
        <div className="relative"></div>
        <InputComponent
          size="medium"
          state="default"
          placeholderText="이루고 싶은 소비 다짐을 입력해주세요. (선택)"
          {...register('goal')}
        />
      </div>
      <ButtonComponent intent="default" type="submit" disabled={false}>
        회원가입
      </ButtonComponent>
    </form>
  );
}
