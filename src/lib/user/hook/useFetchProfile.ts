import { useQuery } from '@tanstack/react-query';
import { getUserProfile } from '../api';
import { PROFILE_KEY } from '../key';

export function useFetchProfile(userId: string) {
  return useQuery({
    queryKey: [PROFILE_KEY, userId],
    queryFn: () => getUserProfile(userId),
    staleTime: 3 * 60 * 1000,
  });
}
