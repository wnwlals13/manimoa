import { CommentData } from '@/types';

export interface NewComment {
  content: string;
  writer: string;
  feedId: string;
}

export interface UseFetchCommentsProps {
  feedId: string;
  pageSize: number;
}

export interface PaginatedCommentDto {
  comments: CommentData[];
  hasNextPage: boolean;
  totalCount: number;
  nextCursor?: number;
}

export interface removeCommentDto {
  commentId: string;
  feedId: string;
}

export interface updateCommentDto {
  content: string;
  commentId: string;
}
