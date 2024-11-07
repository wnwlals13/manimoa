import { useQuery } from '@tanstack/react-query';
import { getMyFeeds } from '../api';

export function useFetchMyFeeds(userId: string) {
  return useQuery({
    queryKey: ['myfeeds', userId],
    queryFn: () => getMyFeeds(userId),
  });
}
