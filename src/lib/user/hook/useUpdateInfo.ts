import { useMutation } from '@tanstack/react-query';
import { updateInfo } from '../api';
import { UserData } from '@/types';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { useRouter } from 'next/navigation';
import { InfoRequestDto } from '../type';
import { useToast } from '@/store/toast/useToast';

export function useUpdateInfo(user: UserData) {
  const { setUser } = useAuthStore();
  const { addToast } = useToast();
  const router = useRouter();
  return useMutation<InfoRequestDto, Error, InfoRequestDto>({
    mutationFn: updateInfo,
    onSuccess: (res) => {
      const updated = {
        ...user!,
        name: res.name,
        profileImg: res.profileImg,
      };
      setUser(updated);
      Cookies.set('user', JSON.stringify(updated));

      addToast({
        message: '프로필이 성공적으로 수정되었습니다.',
        type: 'info',
      });

      router.replace('/mypage');
    },
  });
}
