import { useQuery } from '@tanstack/react-query';
import { getUserIsFollow } from '../api';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { FOLLOW_KEY } from '../key';

export const useIsFollow = (targetId: string) => {
  const { user } = useAuthStore();
  return useQuery({
    queryKey: [FOLLOW_KEY, targetId],
    queryFn: () => getUserIsFollow(targetId, user?.uid as string),
  });
};
