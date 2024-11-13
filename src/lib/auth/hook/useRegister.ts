import { ResponseError } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { userRegister } from '../api';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth/useAuthStore';
import Cookies from 'js-cookie';
import { RegisterRequestDto, RegisterResponseDto } from '../type';
import { useToast } from '@/store/toast/useToast';
import { useLoadingStore } from '@/store/loading/loadingStore';

export const useRegister = () => {
  const { setUser } = useAuthStore();
  const { addToast } = useToast();
  const { setLoading } = useLoadingStore();

  const router = useRouter();
  return useMutation<RegisterResponseDto, Error, RegisterRequestDto>({
    mutationFn: userRegister,
    onSuccess: (userData) => {
      setUser({
        uid: userData.uid,
        email: userData.email,
        name: userData.name,
        profileImg: userData.profileImg,
      });
      Cookies.set('accessToken', userData.accessToken);

      addToast({
        message: '회원가입에 성공했습니다.',
        type: 'info',
      });

      router.replace('/');
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: (err: ResponseError) => {
      return { status: err.status, message: err.message };
    },
  });
};
