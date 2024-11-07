'use client';

import { Button } from '@/components/ui/button/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import { ChangeEvent, useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [input, setInput] = useState<string>('');
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };
  const onSubmit = () => {
    if (!input) return;
    router.push(`/chat/addChat?q=${input}`);
  };
  return (
    <div className="p-default pt-[65px]">
      <div className="flex gap-2 ">
        <Input placeholder="친구 ID를 검색하세요." onChange={handleSearch} />
        <Button onClick={onSubmit}>검색</Button>
      </div>
      {children}
    </div>
  );
}
