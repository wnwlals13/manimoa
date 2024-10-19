'use client';

import logo from '@/styles/logo.png';
import Link from 'next/link';
import { InputComponent } from '@/components/ui/input';
import { ButtonComponent } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { userLogin } from '@/lib/auth/loginUser';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth/useAuthStore';

export interface LoginFormInputs {
  email: string;
  password: string;
}

export default function Page() {
  const { setUser } = useAuthStore();
  const router = useRouter();
  const { register, handleSubmit } = useForm({
    defaultValues: { email: '', password: '' },
  });
  const onSubmit = (data: LoginFormInputs) => {
    userLogin(data).then((res) => {
      if (res.status === 201) {
        router.push('/');
        console.log('res->', res.user);
        setUser({
          uid: res.user.uid,
          email: res.user.email,
          name: res.user.name,
          profileImg: res.user.profileImg,
        });
      }
    });
  };
  return (
    <form
      className="w-full h-full min-h-screen flex flex-col justify-center items-center gap-2 pl-8 pr-8"
      onSubmit={handleSubmit(onSubmit)}
    >
      <img width={180} src={logo.src} alt="" />
      <InputComponent
        size="medium"
        state="default"
        placeholderText="이메일을 입력해주세요."
        {...register('email')}
      />
      <InputComponent
        size="medium"
        state="default"
        type="password"
        placeholderText="비밀번호를 입력해주세요."
        {...register('password')}
      />
      <ButtonComponent intent="default" type="submit">
        로그인
      </ButtonComponent>
      <Link href={'/register'}>회원가입</Link>
    </form>
  );
}
