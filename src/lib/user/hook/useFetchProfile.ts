import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../api';

export function useFetchProfile(userId: string) {
  console.log('useFetchProfile', userId);
  return useQuery({
    queryKey: ['profile', userId],
    queryFn: () => getUserProfile(userId),
  });
}
