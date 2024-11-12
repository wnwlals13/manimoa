import { useQuery } from '@tanstack/react-query';
import { getUserIsFollow } from '../api';
import { useAuthStore } from '@/store/auth/useAuthStore';

export const useIsFollow = (targetId: string) => {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: ['follow', targetId],
    queryFn: () => getUserIsFollow(targetId, user?.uid as string),
  });
};
