'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { FiEdit2 } from 'react-icons/fi';

export default function Page() {
  const { user } = useAuthStore();
  return (
    <div className="h-full flex flex-col justify-between items-center gap-5">
      <div className="w-full flex flex-col">
        <div className="h-[100px] w-full flex justify-center">
          <div className="profile-btn w-[100px] h-[100px] bg-gray-300 rounded-full absolute">
            <div className="absolute bottom-0 right-0 p-2 border border-gray-300 rounded-full bg-white">
              <FiEdit2 />
            </div>
          </div>
        </div>
        <div className="w-full">
          <label htmlFor="name">이름</label>
          <Input value={user?.name} />
        </div>
      </div>
      <Button variant="default" size="full">
        저장하기
      </Button>
    </div>
  );
}
