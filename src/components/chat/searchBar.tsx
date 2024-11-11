'use client';

import { ChangeEvent, useState } from 'react';
import { Button } from '../ui/button/button';
import { Input } from '../ui/input';
import { useRouter } from 'next/navigation';

export default function SearchBar() {
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
    <div className="flex gap-2 ">
      <Input placeholder="친구 ID를 검색하세요." onChange={handleSearch} />
      <Button onClick={onSubmit}>검색</Button>
    </div>
  );
}
