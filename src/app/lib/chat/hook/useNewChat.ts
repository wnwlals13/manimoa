import { useMutation } from '@tanstack/react-query';
import { addNewChat } from '../api';
import { useRouter } from 'next/navigation';

export interface RequestChatDto {
  userIds: string[];
}

export function useNewChat() {
  const router = useRouter();
  return useMutation<Promise<any>, Error, RequestChatDto>({
    mutationFn: addNewChat,
    onSuccess: (res: any) => {
      console.log('add new chatroom success', res);
      const newChatRoomId = res.newChatRoomId;
      // 채팅 연결
      router.push(`/chat/room/${newChatRoomId}`);
    },
  });
}
