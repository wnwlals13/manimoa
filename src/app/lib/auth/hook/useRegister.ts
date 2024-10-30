import { ResponseError, UserData } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { userRegister } from '../api';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/auth/useAuthStore';

export interface RegisterRequestDto {
  email: string;
  password: string;
  name: string;
  goal?: string;
}

export const useRegister = () => {
  const { setUser } = useAuthStore();
  const router = useRouter();
  return useMutation<UserData, Error, RegisterRequestDto>({
    mutationFn: userRegister,
    onSuccess: (userData) => {
      setUser({
        uid: userData.uid,
        email: userData.email,
        name: userData.name,
        profileImg: userData.profileImg,
      });
      router.push('/login');
    },
    onError: (err: ResponseError) => {
      return { status: err.status, message: err.message };
    },
  });
};
