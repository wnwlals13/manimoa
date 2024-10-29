export interface FeedData {
  id: number;
  userId: number;
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
