'use client';

import { SearchUserList } from '@/components/chat/search-user-list';
import { Suspense } from 'react';

export default function Page({
  searchParams,
}: {
  searchParams: { q: string };
}) {
  if (!searchParams.q) return <></>;
  return (
    <>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchUserList q={searchParams.q} />
      </Suspense>
    </>
  );
}
