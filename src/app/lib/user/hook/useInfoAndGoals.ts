import { useQuery } from '@tanstack/react-query';
import { getExpenseInfo } from '../api';

export interface InfoGoalsResponseDto {
  price?: string;
  goals?: string[];
}

export function useInfoAndGoals(userId: string) {
  return useQuery({
    queryKey: ['infoAndGoals'],
    queryFn: () => getExpenseInfo(userId),
  });
}
