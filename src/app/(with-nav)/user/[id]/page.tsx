'use client';

import { Button } from '@/components/ui/button';
import { useAuthStore } from '@/store/auth/useAuthStore';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Suspense } from 'react';

function UserInfo({ id }: { id: string }) {
  const { logout } = useAuthStore();
  const router = useRouter();
  return (
    <div className="flex flex-col gap-2 p-default">
      <div className="relative flex  justify-between items-center">
        <div className="flex gap-10 justify-start items-center">
          <div className="flex gap-2 items-center">
            <div className="w-[50px] h-[50px] bg-gray-200 rounded-full flex justify-center items-center">
              img
            </div>
            <p>{id}</p>
          </div>
          <div className="flex gap-2">
            <div className="flex">
              팔로우 <p>10</p>
            </div>
            <div className="flex">
              팔로잉 <p>10</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <Button
          variant="outline"
          size="full"
          onClick={(e) => {
            e.preventDefault();
            router.push(`/user/${id}/edit`);
          }}
        >
          프로필 수정
        </Button>
        <Button
          variant="outline"
          size="full"
          onClick={() => {
            logout();
            router.push('/login');
          }}
        >
          로그아웃
        </Button>
      </div>
    </div>
  );
}

function ExpenseGoal({ id }: { id: string }) {
  return (
    <>
      <Link
        href={`/user/${id}/expense-goals/edit`}
        className="inline-block w-full bg-main p-default rounded-xl"
      >
        <h3 className="font-bold mb-2">이번 달의 소비 목표!</h3>
        <div className="flex items-center gap-2">
          <div className="bg-white h-2 rounded-lg flex-1" />
          <p>10/100</p>
        </div>
        <p>👏 당신은 절약왕! 아낀만큼 주변사람들과의 관계도 챙겨보세요!</p>
      </Link>
      <div></div>
    </>
  );
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <UserInfo id={params.id} />
      <Suspense fallback={<div>loading...</div>}>
        <ExpenseGoal id={params.id} />
      </Suspense>
      <div>{/* 월별 feed */}</div>
    </>
  );
}
