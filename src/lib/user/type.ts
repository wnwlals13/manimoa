import { UseQueryOptions } from '@tanstack/react-query';
import { IExpenseInfo, IMonthlyExpenseInfo } from './api';

export type TQueries = [
  UseQueryOptions<IExpenseInfo>[],
  UseQueryOptions<IMonthlyExpenseInfo>[],
];

export interface GoalsRequestDto {
  month_price: string;
  month_goals: { value: string }[];
  userId: string;
}

export interface InfoRequestDto {
  name?: string;
  profileImg: string | null;
  userId: string;
}

export interface IFollow {
  followCount: number;
  followingCount: number;
}
