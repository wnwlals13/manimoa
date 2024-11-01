import MyFeedItem from '@/components/feed/my-feed-item';
import { FeedData } from '@/types';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = cookies().get('user')?.value as string;
  const user = JSON.parse(cookieStore);

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getFeeds?userId=${user?.uid}`,
    {
      method: 'get',
      headers: {
        'Content-Type': 'application/json',
      },
    },
  );
  if (!response.ok) {
    return { error: '사용자의 피드게시글 조회 도중 에러가 발생헀습니다.' };
  }
  const { feeds } = await response.json();

  return (
    <div className="">
      <div className="w-full border-t"></div>
      <h1 className="mt-4 mb-4 font-bold ">내글 보기</h1>
      {feeds &&
        feeds.map((item: FeedData, idx: number) => (
          <MyFeedItem key={idx} {...item} />
        ))}
    </div>
  );
}
