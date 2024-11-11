import { useNewChat } from '@/app/lib/chat/hook/useNewChat';
import { useGetUserList } from '@/app/lib/user/hook/useGetUserList';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { IChatUser } from '@/types';
import { useRouter } from 'next/router';
import UserItem from './user-item';

export function SearchUserList({ q }: { q: string }) {
  const { user } = useAuthStore();
  const router = useRouter();
  const { mutate } = useNewChat();
  const { data, isPending } = useGetUserList(q);

  const users = data?.pages
    .flatMap((item) => item.users)
    .filter((item) => item.uid != user?.uid) as IChatUser[];

  // 채팅방 생성 혹은 입장
  const onHandleJoin = (
    otherId: string,
    isChatExist: string,
    chatRoomId: string,
  ) => {
    if (!otherId || !user?.uid) return;
    const joinIds = [otherId, user?.uid];

    if (!isChatExist && !chatRoomId) {
      console.log('새 채팅방입니다.');
      mutate({ userIds: joinIds });
    } else {
      console.log('존재합니다.');
    }
    router.push(`/chat/room/${chatRoomId}`);
  };

  if (isPending) return <div>Loading...</div>;
  return (
    <>
      {users &&
        users.map((item) => (
          <UserItem key={item.uid} onHandleJoin={onHandleJoin} {...item} />
        ))}
    </>
  );
}
