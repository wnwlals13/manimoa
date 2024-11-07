'use client';
import { useQuery } from '@tanstack/react-query';
import { fetchMyChatRooms } from '../api';

export function useFetchMyChatRooms() {
  return useQuery({
    queryKey: ['chatRooms'],
    queryFn: fetchMyChatRooms,
  });
}
