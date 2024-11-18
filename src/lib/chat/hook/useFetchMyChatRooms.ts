'use client';
import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchMyChatRooms } from '../api';
import { IChatRoom } from '@/types';
import { CHATS_KEY } from '../key';

export interface ChatRoomResponseDto {
  chat: IChatRoom[];
}

export interface PaginatedChatDto {
  chats: IChatRoom[];
  hasNextPage: boolean;
  totalCount: number;
  nextCursor?: number;
  currentPage: number;
}

export interface ChatRequestDto {
  pageParam: number;
  pageSize: number;
}

export function useFetchMyChatRooms({ pageSize }: { pageSize: number }) {
  return useInfiniteQuery<PaginatedChatDto, Error>({
    queryKey: [CHATS_KEY],
    queryFn: ({ pageParam = 1 }) =>
      fetchMyChatRooms({ pageParam: pageParam as number, pageSize }),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
