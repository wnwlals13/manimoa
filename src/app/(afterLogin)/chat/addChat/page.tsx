'use client';

import { SearchUserList } from '@/components/chat/search-user-list';
import ChatListSkeleton from '@/components/ui/skeleton/chat/chat-list-skeleton';
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

  if (!searchParams.q) return <></>;
  if (isPending) return <ChatListSkeleton count={5} />;

  return (
    <>
      <Suspense fallback={<ChatListSkeleton count={5} />}>
        <SearchUserList q={searchParams.q} users={users} />
      </Suspense>
    </>
  );
}
