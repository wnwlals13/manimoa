import { useMutation, useQueryClient } from '@tanstack/react-query';
import { sendMessage } from '../api';
import { IMsg } from '@/types';
import { SendRequestDto } from '../type';
import { MESSAGES_KEY } from '../key';

export function useSendMessage(roomId: string) {
  const queryClient = useQueryClient();
  return useMutation<IMsg, Error, SendRequestDto>({
    mutationFn: sendMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [`${MESSAGES_KEY}-${roomId}`],
      });
    },
  });
}
