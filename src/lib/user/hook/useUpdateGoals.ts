import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateGoals } from '../api';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { useRouter } from 'next/navigation';
import { GoalsRequestDto } from '../type';
import { useToast } from '@/store/toast/useToast';
import { GOALS_KEY } from '../key';

export function useUpdateGoals() {
  const { setGoals } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { addToast } = useToast();

  return useMutation<GoalsRequestDto, Error, GoalsRequestDto>({
    mutationFn: updateGoals,
    onSuccess: (res) => {
      if (res.month_goals) {
        const update = res.month_goals.map((item) => item.value);
        queryClient.invalidateQueries({ queryKey: [GOALS_KEY] });
        setGoals(update);
      }

      addToast({
        message: '소비 목표가 성공적으로 수정되었습니다.',
        type: 'info',
      });

      router.push('/mypage');
    },
  });
}
