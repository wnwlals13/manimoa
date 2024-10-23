'use client';

import { Input } from '@/components/ui/input';
import InteractiveButton from '@/components/ui/interactiveButton';
import { Toggle } from '@/components/ui/toggle';
import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FiImage } from 'react-icons/fi';

export default function Page() {
  const { handleSubmit } = useForm({ defaultValues: {} });
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showPrice, setShowPrice] = useState<boolean>(false);
  const [today, setToday] = useState<string>('');
  const [imgs] = useState<string[]>([]);

  const onSubmit = () => {};
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    setToday(new Date().toLocaleString());
  }, []);

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex-1 flex flex-col">
      <div className="flex-1">
        <div className="flex pt-5 pb-5 border-b">
          <div className="min-w-[100px]">소비 일자</div>
          <div>{today}</div>
        </div>
        <div className="flex gap-5 pt-5 pb-5 border-b mb-5">
          <div className="flex-1 flex items-center">
            <div className="min-w-[100px]">오늘 소비</div>
            <Input type="number" />
          </div>
          <Toggle
            variant="outline"
            size="sm"
            onClick={() => setShowPrice((prev) => !prev)}
          >
            {!showPrice ? '금액 보이기' : '금액 숨기기'}
          </Toggle>
        </div>

        <textarea
          name="content"
          id="content"
          placeholder="오늘 당신의 소비내용을 기록해주세요."
          className="min-h-44 h-44  resize-none"
        ></textarea>

        {imgs && imgs.map((item, idx) => <div key={idx}>{item}</div>)}
        <div>
          <FiImage
            size="25"
            className="mt-2 mb-5 cursor-pointer"
            onClick={handleClick}
          />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
          />
        </div>
      </div>
      <InteractiveButton name="add_feed" type="submit">
        게시글 추가
      </InteractiveButton>
    </form>
  );
}
