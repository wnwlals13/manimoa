import { useQuery } from '@tanstack/react-query';
import { getInfoAndGoals } from '../api';
import { useAuthStore } from '@/store/auth/useAuthStore';

export interface InfoGoalsResponseDto {
  price?: string;
  goals?: string[];
}

export function useInfoAndGoals() {
  const { user } = useAuthStore();
  console.log('user', user);
  return useQuery({
    queryKey: ['infoAndGoals'],
    queryFn: () => getInfoAndGoals(user?.uid),
  });
}
