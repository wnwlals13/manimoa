import { IChatUser } from '@/types';
import Profile from '../ui/profile';
import { Button } from '../ui/button/button';

export interface IChatUserProps extends IChatUser {
  onHandleJoin: (
    otherId: string,
    email: string,
    isChatExist: string,
    chatRoomId: string,
  ) => void;
}

export default function UserItem({ onHandleJoin, ...item }: IChatUserProps) {
  const onHandleJoinRoom = () =>
    onHandleJoin(item.uid, item.email, item.isChatExist, item.chatRoomId);

  return (
    <div className="flex border-b pt-2 pb-2 gap-4">
      <Profile src={item.profileImg as string} size="md" />
      <div className="flex-1 flex justify-start items-center">{item.name}</div>
      <div className="flex items-center">
        <Button icon="message" variant="none" onClick={onHandleJoinRoom} />
      </div>
    </div>
  );
}
