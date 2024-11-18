import { useQuery } from '@tanstack/react-query';
import { getMyFeeds } from '../api';
import { MY_FEEDS_KEY } from '../key';

export function useFetchMyFeeds(userId: string) {
  return useQuery({
    queryKey: [MY_FEEDS_KEY, userId],
    queryFn: () => getMyFeeds(userId),
  });
}
