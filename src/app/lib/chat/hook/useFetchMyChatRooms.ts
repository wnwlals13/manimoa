'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchMyChatRooms } from '../api';
import { IChatRoom } from '@/types';

export interface ChatRoomResponseDto {
  chat: IChatRoom[];
}

export function useFetchMyChatRooms() {
  return useQuery<ChatRoomResponseDto, Error>({
    queryKey: ['chatRooms'],
    queryFn: fetchMyChatRooms,
  });
}
