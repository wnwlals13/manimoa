import { IFeedWithLikeData, LikeData } from '@/types';

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

export interface uploadFeedRequestDto {
  price: string;
  content: string;
  priceOption: boolean;
  userId: string;
  previewImage: File[] | null;
}

export interface updateFeedRequestDto {
  price: string;
  priceOption: boolean;
  content: string;
  userId: string;
  willDeleteImgs?: string[];
  previewImage?: File[];
  feedId: string;
}

export interface PaginatedLikeDto {
  likes: LikeData[];
  hasNextPage: boolean;
  totalCount: number;
  nextCursor?: number;
  currentPage: number;
}
