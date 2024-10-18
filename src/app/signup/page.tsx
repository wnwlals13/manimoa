'use client';
import { ButtonComponent } from '@/components/ui/button';
import { InputComponent } from '@/components/ui/input';
import logo from '@/styles/logo.png';
import { useState } from 'react';

export default function Page() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [goal, setGoal] = useState<string | null>('');
  // const [state, setState] = useState<boolean>(false); // 버튼 활성화 비활성화

  const handleSignup = () => {
    console.log(goal);
    if (!email || !password || !name) {
      return;
    }
  };
  return (
    <form
      className="w-full h-full min-h-screen flex flex-col justify-center items-center gap-2 pl-8 pr-8"
      onSubmit={handleSignup}
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
      <InputComponent
        size="medium"
        state="default"
        placeholderText="이름을 입력해주세요."
        handleChange={(e) => setName(e.target.value)}
      />
      <InputComponent
        size="medium"
        state="default"
        placeholderText="이루고 싶은 소비 다짐을 입력해주세요. (선택)"
        handleChange={(e) => setGoal(e.target.value)}
      />
      <ButtonComponent intent="default" type="submit" disabled={true}>
        회원가입
      </ButtonComponent>
    </form>
  );
}
