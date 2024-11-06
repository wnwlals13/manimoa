import { useMutation } from '@tanstack/react-query';
import { addNewChat } from '../api';

export interface RequestChatDto {
  userIds: string[];
}

export function useIsChatExist() {
  return useMutation({
    mutationFn: addNewChat,
    onSuccess: (res: string) => {
      console.log('chat is already exist', res);
    },
  });
}
