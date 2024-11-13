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
    email: string,
    isChatExist: string,
    chatRoomId: string,
  ) => {
    if (!otherId || !user?.uid) return;
    const joinIds = [otherId, user?.uid];

    if (!isChatExist && !chatRoomId) {
      mutate({ userIds: joinIds, otherUserEmail: email });
    } else {
      router.push(`/chat/room/${chatRoomId}?otherUserEmail=${email}`);
    }
  };

  return (
    <div className="flex-1 flex flex-col justify-center mt-2">
      {users.length > 0 ? (
        users.map((item) => (
          <UserItem key={item.uid} onHandleJoin={onHandleJoin} {...item} />
        ))
      ) : (
        <div className="flex flex-col justify-center items-center mt-2 text-sm">
          <div className="flex-1">검색 결과가 없습니다.</div>
        </div>
      )}
    </div>
  );
}
