import { useQuery } from '@tanstack/react-query';
import { getUserFollowCnt } from '../api';
import { FOLLOW_CNT_KEY } from '../key';

export function useFetchFollowCnt(userId: string) {
  return useQuery({
    queryKey: [FOLLOW_CNT_KEY, userId],
    queryFn: () => getUserFollowCnt(userId),
  });
}
