import { getMyFeeds } from '@/actions/get-myfeeds.action';
import { cookies } from 'next/headers';

export default async function Page() {
  const cookieStore = cookies().get('user')?.value as string;
  const user = JSON.parse(cookieStore);
  console.log('[MYPAGE] user2 => ', user, user.uid);
  const feeds = await getMyFeeds(user.uid);
  console.log('[MYPAGE] feeds2 => ', feeds);
  return (
    <div className="">
      {/* <div className="w-full border-t"></div>
      <h1 className="mt-4 mb-4 font-bold ">내글 보기</h1>
      {feeds &&
        feeds.map((item: FeedData, idx: number) => (
          <MyFeedItem key={idx} {...item} />
        ))} */}
    </div>
  );
}
