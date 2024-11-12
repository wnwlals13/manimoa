'use client';

import { useNewChat } from '@/lib/chat/hook/useNewChat';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { IChatUser } from '@/types';
import { useRouter } from 'next/navigation';
import UserItem from './user-item';

export function SearchUserList({ users }: { q: string; users: IChatUser[] }) {
  const { user } = useAuthStore();
  const { mutate } = useNewChat();
  const router = useRouter();

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

  return (
    <div className="flex flex-col justify-center mt-5">
      {users.length > 0 ? (
        users.map((item) => (
          <UserItem key={item.uid} onHandleJoin={onHandleJoin} {...item} />
        ))
      ) : (
        <p>검색 결과가 없습니다.</p>
      )}
    </div>
  );
}
