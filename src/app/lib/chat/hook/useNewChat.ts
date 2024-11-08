import { useMutation } from '@tanstack/react-query';
import { addNewChat } from '../api';
import { useRouter } from 'next/navigation';
import { RequestChatDto, ResponseChatDto } from '../type';

export function useNewChat() {
  const router = useRouter();
  return useMutation<ResponseChatDto, Error, RequestChatDto>({
    mutationFn: addNewChat,
    onSuccess: (res) => {
      const newChatRoomId = res.newChatRoomId;
      // 채팅 연결
      router.push(`/chat/room/${newChatRoomId}`);
    },
  });
}
