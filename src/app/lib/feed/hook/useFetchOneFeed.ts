import { useQuery } from '@tanstack/react-query';
import { fetchOneFeed } from '../api';

export const useFetchOneFeed = (feedId: string) => {
  return useQuery({
    queryKey: ['feed'],
    queryFn: () => fetchOneFeed(feedId),
  });
};
