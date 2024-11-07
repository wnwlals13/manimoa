import { useQuery } from '@tanstack/react-query';
import { fetchOneFeed } from '../api';
import Cookies from 'js-cookie';

export const useFetchOneFeed = (feedId: string) => {
  const cookieStore = Cookies.get('user') as string;
  const user = JSON.parse(cookieStore);

  return useQuery({
    queryKey: [`feed-${feedId}`],
    queryFn: () => fetchOneFeed(feedId, user.uid),
  });
};
