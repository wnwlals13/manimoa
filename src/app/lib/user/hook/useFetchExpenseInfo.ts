import { useQueries } from '@tanstack/react-query';
import { getExpenseInfo, getUserMonthExpense } from '../api';
import { TQueries } from '../type';

export function useFetchExpenseInfo(userId: string) {
  return useQueries<TQueries>({
    queries: [
      { queryKey: ['expense', userId], queryFn: () => getExpenseInfo(userId) },
      {
        queryKey: ['month-expense', userId],
        queryFn: () => getUserMonthExpense(userId),
      },
    ],
  });
}
