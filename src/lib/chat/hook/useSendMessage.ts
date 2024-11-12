import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendMessage } from '../api';
import { IMsg } from '@/types';
import { SendRequestDto } from '../type';

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
