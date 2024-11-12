import { useQuery } from '@tanstack/react-query';
import { fetchOneFeed } from '../api';
import Cookies from 'js-cookie';
import { FeedData } from '@/types';

export const useFetchOneFeed = (feedId: string | null) => {
  const cookieStore = Cookies.get('user') as string;
  const user = JSON.parse(cookieStore);

  return useQuery<FeedData | undefined, Error>({
    queryKey: [`feed-${feedId}`],
    queryFn: () => fetchOneFeed(feedId as string, user.uid),
  });
};
