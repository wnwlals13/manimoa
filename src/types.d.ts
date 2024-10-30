export interface FeedData {
  id: number;
  userId: string;
  userName: string;
  profileImg?: string;
  content: string;
  price: number;
  priceOption: number;
  images?: string;
  likeCount: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface LikeData {
  isUserDoLike: number;
}

export interface IFeedWithLikeData extends FeedData, LikeData {}

export interface UserData {
  uid: string;
  email: string;
  name?: string;
  profileImg?: string | null;
  followCount?: number; // 유저가 팔로우하는 유저의 수
  followingCount?: number; // 유저를 팔로우하는 유저의 수
}

export interface GoalData {
  id: number;
  userId: number;
  content: string;
  createdAt: string;
}

export interface CommentData {
  id: number;
  feedId: number;
  userId: number;
  userName: string;
  profileImg?: string;
  content: string;
  parentCommentId: number;
  createdAt: string;
  updatedAt: string;
  deletedAt: string;
}

export interface ResponseError extends Error {
  status?: number;
}
