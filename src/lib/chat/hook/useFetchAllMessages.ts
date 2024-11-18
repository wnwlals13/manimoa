'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchAllMessages } from '../api';
import { IPaginatedMessages } from '../type';
import { MESSAGES_KEY } from '../key';

export function useFetchAllMessages(roomId: string) {
  return useInfiniteQuery<IPaginatedMessages, Error>({
    queryKey: [`${MESSAGES_KEY}-${roomId}`],
    queryFn: ({ pageParam = 1 }) =>
      fetchAllMessages({ pageParam: pageParam as number, roomId }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
