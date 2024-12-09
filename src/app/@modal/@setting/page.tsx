'use client';
import { useDeleteFeed } from '@/lib/feed/hook/useRemoveFeed';
import { useModalStore } from '@/store/modal/useModalStore';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { id, setIsOpen } = useModalStore();
  const router = useRouter();
  const { mutate } = useDeleteFeed();

  const handleMove = () => {
    router.push(`/feed/form?isEdit=${true}&feedId=${id}`);
    setIsOpen(false);
  };

  const handleDelete = () => {
    mutate(id);
    setIsOpen(false);
  };

  return (
    <ul className="p-default min-h-[300px]">
      <li className="cursor-pointer pb-2" onClick={handleMove}>
        수정하기
      </li>
      <li className="cursor-pointer pb-2" onClick={handleDelete}>
        삭제하기
      </li>
    </ul>
  );
}
