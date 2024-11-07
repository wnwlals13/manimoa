import { useAuthStore } from '@/store/auth/useAuthStore';
import { useInfiniteQuery } from '@tanstack/react-query';

export function useGetUserList(input: string) {
  const { user } = useAuthStore();
  return useInfiniteQuery({
    queryKey: ['users'],
    queryFn: async ({ pageParam = 1 }) => {
      try {
        const userId = user?.uid;
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getUserList?` +
            `cursor=` +
            pageParam +
            `&pageSize=` +
            20 +
            `&input=` +
            input +
            `&userId=` +
            userId,
          { method: 'get' },
        );
        if (!response.ok) {
          return { error: `유저 정보 조회` };
        }
        const result = await response.json();
        return result;
      } catch (err) {
        console.error('error', err);
      }
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextCursor,
  });
}
