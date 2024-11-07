import { useMutation, useQueryClient } from '@tanstack/react-query';
import { removeChat } from '../api';
import { IMsg } from '@/types';
import { useRouter } from 'next/navigation';

export interface RemoveRequestDto {
  willRemoveRooms: string[];
}

export function useRemoveChat() {
  const queryClient = useQueryClient();
  const router = useRouter();
  return useMutation<IMsg, Error, RemoveRequestDto>({
    mutationFn: removeChat,
    onSuccess: () => {
      router.push('/chat');
      queryClient.invalidateQueries({ queryKey: ['chatRooms'] });
    },
  });
}
