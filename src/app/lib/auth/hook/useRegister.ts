import { ResponseError } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { userRegister } from '../api';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth/useAuthStore';
import Cookies from 'js-cookie';

export interface RegisterResponseDto {
  uid: string;
  email: string;
  name: string;
  profileImg?: string;
  accessToken: string;
  refreshToken: string;
}

export interface RegisterRequestDto {
  email: string;
  password: string;
  name: string;
  goal?: string;
}

export const useRegister = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();
  return useMutation<RegisterResponseDto, Error, RegisterRequestDto>({
    mutationFn: userRegister,
    onSuccess: (userData) => {
      console.log('register success?', userData);
      setUser({
        uid: userData.uid,
        email: userData.email,
        name: userData.name,
        profileImg: userData.profileImg,
      });
      Cookies.set('accessToken', userData.accessToken);
      router.replace('/');
    },
    onError: (err: ResponseError) => {
      return { status: err.status, message: err.message };
    },
  });
};
