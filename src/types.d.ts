export interface FeedData {
  id: string;
  userId: string;
  userName: string;
  profileImg?: string;
  content: string;
  price: string;
  priceOption: number;
  images?: string;
  imagesArray?: string[];
  commentCount: number;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string;
}

export interface LikeData {
  likeCount: number;
  isUserDoLike: number;
  feedId: string;
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
  deletedAt?: string;
}

export interface ResponseError extends Error {
  status?: number;
}

export interface IMsg {
  author: string;
  msg: string;
  date: string;
  roomId: string;
  read?: boolean;
}

export interface IChatUser {
  uid: string;
  name: string;
  email: string;
  profileImg?: string;
  isChatExist: string;
  chatRoomId: string;
}

export interface IChatRoom {
  roomId: string;
  createdAt: string;
  participantIds: string[];
  participantEmails: { id: string; email: string }[];
  participantProfiles: { id: string; profileImg: string }[];
}

export interface ImageData {
  id: string;
  feedId: string;
  imageUrl: string;
  createdAt: string;
}
