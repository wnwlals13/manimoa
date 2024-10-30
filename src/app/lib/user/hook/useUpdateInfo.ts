import { useMutation } from '@tanstack/react-query';
import { updateInfo } from '../api';
import { UserData } from '@/types';
import Cookies from 'js-cookie';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { useRouter } from 'next/navigation';

export interface InfoRequestDto {
  name?: string;
  profileImg?: string;
}

export function useUpdateInfo(user: UserData) {
  const { setUser } = useAuthStore();
  const router = useRouter();
  return useMutation<InfoRequestDto, Error, InfoRequestDto>({
    mutationFn: updateInfo,
    onSuccess: (res) => {
      console.log(res);
      const updated = {
        ...user!,
        name: res.name,
        profileImg: res.profileImg,
      };
      setUser(updated);
      Cookies.set('user', JSON.stringify(updated));
      router.back();
    },
  });
}
