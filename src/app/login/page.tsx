'use client';

import logo from '@/styles/logo.png';
import { useState } from 'react';
import Link from 'next/link';
import { InputComponent } from '@/components/ui/input';
import { ButtonComponent } from '@/components/ui/button';

export default function Page() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email || !password) {
      return;
    }
    // const formData = new FormData();
    // formData.append('email', email);
    // formData.append('password', password);

    // loginAction(formData);
  };
  return (
    <form
      className="w-full h-full min-h-screen flex flex-col justify-center items-center gap-2 pl-8 pr-8"
      onSubmit={handleSubmit}
    >
      <img width={180} src={logo.src} alt="" />
      <InputComponent
        size="medium"
        state="default"
        placeholderText="이메일을 입력해주세요."
        handleChange={(e) => setEmail(e.target.value)}
      />
      <InputComponent
        size="medium"
        state="default"
        placeholderText="비밀번호를 입력해주세요."
        handleChange={(e) => setPassword(e.target.value)}
      />
      <ButtonComponent intent="default" type="submit">
        로그인
      </ButtonComponent>
      <Link href={'/signup'}>회원가입</Link>
    </form>
  );
}
