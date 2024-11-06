'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchAllMessages, fetchMyChatRooms } from '../api';

export function useFetchAllMessages(roomId: string) {
  return useQuery({
    queryKey: [`messages-${roomId}`],
    queryFn: () => fetchAllMessages(roomId),
  });
}
