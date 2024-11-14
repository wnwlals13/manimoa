import { IChatRoom } from '@/types';
import { formatChatDate } from '@/util/formatChatDate';
import Link from 'next/link';
import Profile from '../ui/profile';

export default function ChatItem({
  roomId,
  participantProfiles,
  participantEmails,
  createdAt,
}: IChatRoom) {
  return (
    <Link
      key={roomId}
      href={{
        pathname: `/chat/room/${roomId}`,
        query: { otherUserEmail: participantEmails[0].email },
      }}
      className="flex border-b [&:not(:first-child)]:pt-default pb-2 gap-2"
    >
      <Profile
        src={participantProfiles ? participantProfiles[0].profileImg : ''}
        size="md"
      />
      <div className="flex-1 flex justify-start items-center">
        {participantEmails[0].email}
      </div>
      <div className="flex justify-center items-center text-[12px]">
        {formatChatDate(createdAt)}
      </div>
    </Link>
  );
}
