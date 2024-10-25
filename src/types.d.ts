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
