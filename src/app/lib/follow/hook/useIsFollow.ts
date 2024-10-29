import { useQuery } from '@tanstack/react-query';
import { getUserIsFollow } from '../api';

export const useIsFollow = (targetId: string) => {
  return useQuery({
    queryKey: ['follow', targetId],
    queryFn: () => getUserIsFollow(targetId),
  });
};
