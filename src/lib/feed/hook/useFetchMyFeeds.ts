import { useQuery } from '@tanstack/react-query';
import { fetchMyFeeds } from '../api';
import Cookies from 'js-cookie';
import { MY_FEEDS_KEY } from '@/lib/user/key';

export const useFetchMyFeeds = () => {
  const cookieStore = Cookies.get('user');
  const user = JSON.parse(cookieStore!);

  return useQuery({
    queryKey: [MY_FEEDS_KEY],
    queryFn: () => fetchMyFeeds(user.uid),
  });
};
