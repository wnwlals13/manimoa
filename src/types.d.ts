export interface FeedData {
  id: number;
  userId: number;
  content: string;
  price: number;
  priceOption: number;
  createdAt: string;
  updatedAt: string;
}

export interface UserData {
  uid: number;
  email: string;
  name: string;
  profileImg: string;
}
