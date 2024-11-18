import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeChat } from '../api';
import { IMsg } from '@/types';
import { useRouter } from 'next/navigation';
import { RemoveRequestDto } from '../type';
import { CHATS_KEY } from '../key';

export function useRemoveChat() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<IMsg, Error, RemoveRequestDto>({
    mutationFn: removeChat,
    onSuccess: () => {
      router.push('/chat');
      queryClient.invalidateQueries({ queryKey: [CHATS_KEY] });
    },
  });
}
