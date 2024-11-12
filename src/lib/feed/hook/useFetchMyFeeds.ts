import { useQuery } from '@tanstack/react-query';
import { fetchMyFeeds } from '../api';
import Cookies from 'js-cookie';

export const useFetchMyFeeds = () => {
  const cookieStore = Cookies.get('user');
  const user = JSON.parse(cookieStore!);

  return useQuery({
    queryKey: ['myfeeds'],
    queryFn: () => fetchMyFeeds(user.uid),
  });
};
