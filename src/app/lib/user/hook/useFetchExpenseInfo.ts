import { useQueries, UseQueryOptions } from '@tanstack/react-query';
import {
  getExpenseInfo,
  getUserMonthExpense,
  IExpenseInfo,
  IMonthlyExpenseInfo,
} from '../api';

type TQueries = [
  UseQueryOptions<IExpenseInfo>[],
  UseQueryOptions<IMonthlyExpenseInfo>[],
];

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
