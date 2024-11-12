'use client';

import { ChangeEvent, KeyboardEvent, useState } from 'react';
import { Button } from '../ui/button/button';
import { Input } from '../ui/inputs/input';
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

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <div className="flex gap-2 ">
      <Input
        placeholder="친구 ID를 검색하세요."
        onChange={handleSearch}
        onKeyDown={handleKeyDown}
      />
      <Button onClick={onSubmit} disabled={!input}>
        검색
      </Button>
    </div>
  );
}
