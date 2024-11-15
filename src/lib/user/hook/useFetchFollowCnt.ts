import { useQuery } from '@tanstack/react-query';
import { getUserFollowCnt } from '../api';

export function useFetchFollowCnt(userId: string) {
  return useQuery({
    queryKey: ['followCount', userId],
    queryFn: () => getUserFollowCnt(userId),
  });
}
