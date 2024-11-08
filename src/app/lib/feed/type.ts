import { IFeedWithLikeData } from '@/types';

export interface UseFetchFeedsProps {
  pageSize: number;
}

export interface PaginatedFeedDto {
  feeds: IFeedWithLikeData[];
  hasNextPage: boolean;
  totalCount: number;
  nextCursor?: number;
  currentPage: number;
}
