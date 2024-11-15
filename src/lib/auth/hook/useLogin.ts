import { useMutation } from '@tanstack/react-query';
import { userLogin } from '../api';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { ResponseError } from '@/types';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { LoginRequestDto, LoginResponseDto } from '../type';
import { useToast } from '@/store/toast/useToast';
import { useLoadingStore } from '@/store/loading/loadingStore';

export const useLogin = () => {
  const { setUser } = useAuthStore();
  const { addToast } = useToast();
  const router = useRouter();
  const { setLoading } = useLoadingStore();

  return useMutation<LoginResponseDto, Error, LoginRequestDto>({
    mutationFn: userLogin,
    onSuccess: (userData) => {
      setUser({
        uid: userData.uid,
        email: userData.email,
        name: userData.name,
        profileImg: userData.profileImg,
      });

      Cookies.set('accessToken', userData.accessToken);
      Cookies.set('refreshToken', userData.refreshToken);

      addToast({
        message: '로그인에 성공했습니다.',
        type: 'info',
      });

      router.push('/');
    },
    onSettled: () => {
      setLoading(false);
    },
    onError: (err: ResponseError) => {
      return { status: err.status, message: err.message };
    },
  });
};
