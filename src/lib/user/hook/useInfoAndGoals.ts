import { useQuery } from '@tanstack/react-query';
import { getExpenseInfo } from '../api';
import { GOALS_KEY } from '../key';

export function useInfoAndGoals(userId: string) {
  return useQuery({
    queryKey: [GOALS_KEY],
    queryFn: () => getExpenseInfo(userId),
  });
}
