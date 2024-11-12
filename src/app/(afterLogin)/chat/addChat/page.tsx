'use client';

import { SearchUserList } from '@/components/chat/search-user-list';
import { useGetUserList } from '@/lib/user/hook/useGetUserList';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { IChatUser } from '@/types';
import { Suspense } from 'react';

export default function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  const { user } = useAuthStore();
  const { data, isPending } = useGetUserList(searchParams.q);

  const users = data?.pages
    .flatMap((item) => item.users)
    .filter((item) => item.uid != user?.uid) as IChatUser[];

  if (isPending) return <div>Loading...</div>;
  if (!searchParams.q) return <></>;

  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchUserList q={searchParams.q} users={users} />
      </Suspense>
    </>
  );
}
