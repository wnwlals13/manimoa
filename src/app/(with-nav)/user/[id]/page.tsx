import { FollowButton } from '@/components/ui/button/follow-button';
import { MessageButton } from '@/components/ui/button/message-button';
import Profile from '@/components/ui/profile';
import { FeedData } from '@/types';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

async function UserInfo({ userId }: { userId: string }) {
  const cookieStore = cookies().get('user')?.value as string;
  const loginUser = JSON.parse(cookieStore);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getInfo?userId=${userId}&loginId=${loginUser.uid}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
      next: { tags: [`profile-${userId}`] },
    },
  );
  const { user } = await response.json();

  return (
    <div className="flex flex-col gap-2 p-default pt-[60px]">
      <div className="relative flex  justify-between items-center">
        <div className="flex gap-10 justify-start items-center">
          <div className="flex gap-2 items-center">
            <Profile src={user.profileImg} size="lg" />
            <p>{user.email}</p>
          </div>
          <div className="flex gap-2">
            <div className="flex">
              팔로우 &nbsp;<p>{user.followCount}</p>
            </div>
            <div className="flex">
              팔로잉 &nbsp;<p>{user.followingCount}</p>
            </div>
          </div>
        </div>
      </div>
      <div className="flex gap-2 mt-4">
        <FollowButton targetId={user.uid} />
        <MessageButton
          targetId={user.uid}
          loginId={loginUser.uid}
          isChatExist={user.isChatExist}
          roomId={user.chatRoomId}
        >
          메세지
        </MessageButton>
      </div>
    </div>
  );
}

async function UserFeeds({ userId }: { userId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getFeeds?userId=${userId}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  const { feeds } = await response.json();

  return (
    <div className="p-default">
      {feeds &&
        feeds.map((item: FeedData, idx: number) => (
          <Link
            key={idx}
            href={`/feed/${item.id}`}
            className="flex justify-between items-center h-[50px] mb-5"
          >
            <div className=" flex items-center h-full gap-5 ">
              <div className="w-[50px] h-full rounded-md bg-gray-200 overflow-hidden">
                {item.images && (
                  <Image
                    width={50}
                    height={50}
                    src={`${
                      process.env.NEXT_PUBLIC_SUPABASE_URL
                    }/storage/v1/object/public/${
                      process.env.NEXT_PUBLIC_STORAGE_BUCKET
                    }/${item.images?.split(',')[0]}`}
                    alt=""
                    style={{ height: '100%' }}
                  />
                )}
              </div>
              <div>{item.content}</div>
            </div>
            <p className="text-sm text-gray-500">{item.createdAt}</p>
          </Link>
        ))}
    </div>
  );
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <UserInfo userId={params.id} />
      <UserFeeds userId={params.id} />
    </div>
  );
}
