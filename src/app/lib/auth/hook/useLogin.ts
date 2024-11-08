import { useMutation } from '@tanstack/react-query';
import { userLogin } from '../api';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { ResponseError } from '@/types';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { LoginRequestDto, LoginResponseDto } from '../type';

export const useLogin = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();
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
      router.push('/');
    },
    onError: (err: ResponseError) => {
      return { status: err.status, message: err.message };
    },
  });
};
