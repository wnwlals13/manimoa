'use client';
import { Button } from '@/components/ui/button';
import { useModalStore } from '@/store/modal/useModalStore';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { id, setIsOpen } = useModalStore();
  const router = useRouter();

  const handleMove = () => {
    router.push(`/feed/form?isEdit=${true}&feedId=${id}`);
    setIsOpen(false);
  };

  const handleDelete = () => {
    setIsOpen(false);
  };

  return (
    <ul className="p-default">
      <div className="flex justify-end">
        <Button variant="none" size="sm" onClick={() => setIsOpen(false)}>
          X
        </Button>
      </div>
      <li className="cursor-pointer pb-2" onClick={handleMove}>
        수정하기
      </li>
      <li className="cursor-pointer pb-2" onClick={handleDelete}>
        삭제하기
      </li>
    </ul>
  );
}
