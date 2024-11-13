export interface RequestChatDto {
  userIds: string[];
  otherUserEmail: string;
}

export interface ResponseChatDto {
  newChatRoomId: string;
  otherUserEmail: string;
}

export interface RemoveRequestDto {
  willRemoveRooms: string[];
}

export interface SendRequestDto {
  author: string;
  msg: string;
  date: string;
  roomId: string;
}
