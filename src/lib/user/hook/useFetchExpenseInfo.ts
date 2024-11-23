import { useQueries } from '@tanstack/react-query';
import { getExpenseInfo, getUserMonthExpense } from '../api';
import { TQueries } from '../type';
import { EXPENSES_KEY, MONTHLY_EXPENSE_KEY } from '../key';

export function useFetchExpenseInfo(userId: string) {
  return useQueries<TQueries>({
    queries: [
      {
        queryKey: [EXPENSES_KEY, userId],
        queryFn: () => getExpenseInfo(userId),
        staleTime: 3 * 60 * 1000,
      },
      {
        queryKey: [MONTHLY_EXPENSE_KEY, userId],
        queryFn: () => getUserMonthExpense(userId),
        staleTime: 3 * 60 * 1000,
      },
    ],
  });
}
