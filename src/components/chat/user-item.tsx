import { IChatUser } from '@/types';
import { Button } from '../ui/button';
import { FiSend } from 'react-icons/fi';

export interface IChatUserProps extends IChatUser {
  onHandleJoin: (
    otherId: string,
    isChatExist: string,
    chatRoomId: string,
  ) => void;
}

export default function UserItem({ onHandleJoin, ...item }: IChatUserProps) {
  const onHandleJoinRoom = () =>
    onHandleJoin(item.uid, item.isChatExist, item.chatRoomId);

  return (
    <div className="flex border-b pt-default pb-default gap-4">
      <div className="w-[45px] h-[45px] bg-gray-200 flex justify-center items-center rounded-full">
        {/* {item.profileImg && (
          <Image
            width={45}
            height={45}
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${item.profileImg}`}
            style={{
              objectFit: 'cover',
              width: '100%',
              height: '100%',
            }}
            alt=""
          />
        )} */}
      </div>
      <div className="flex-1 flex justify-start items-center">{item.name}</div>
      <div className="flex items-center">
        <Button variant="none" onClick={onHandleJoinRoom}>
          <FiSend />
        </Button>
      </div>
    </div>
  );
}
