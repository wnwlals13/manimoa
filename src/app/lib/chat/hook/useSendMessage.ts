import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendMessage } from '../api';
import { IMsg } from '@/types';

export interface SendRequestDto {
  author: string;
  msg: string;
  date: string;
  roomId: string;
}

export function useSendMessage(roomId: string) {
  const queryClient = useQueryClient();
  return useMutation<IMsg, Error, SendRequestDto>({
    mutationFn: sendMessage,
    onSuccess: () => {
      console.log('메세지 저장 성공');
      queryClient.invalidateQueries({ queryKey: [`messages-${roomId}`] });
    },
  });
}
