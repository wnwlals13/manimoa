import { useMutation, useQueryClient } from '@tanstack/react-query';
import { updateGoals } from '../api';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { useRouter } from 'next/navigation';
import { GoalsRequestDto } from '../type';

export function useUpdateGoals() {
  const { setGoals } = useAuthStore();
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation<GoalsRequestDto, Error, GoalsRequestDto>({
    mutationFn: updateGoals,
    onSuccess: (res) => {
      if (res.month_goals) {
        const update = res.month_goals.map((item) => item.value);
        queryClient.invalidateQueries({ queryKey: ['infoAndGoals'] });
        setGoals(update);
        router.push('/mypage');
      }
    },
  });
}
