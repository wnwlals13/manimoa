import { cookies } from 'next/headers';

const getMyFeeds = async () => {
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
    return { error: `내 피드게시글 데이터 조회에 실패했습니다.` };
  }
  const { feeds } = await response.json();
  console.log('[MYPAGE] feeds => ', feeds);
  return feeds;
};

export default async function Page() {
  const feeds = await getMyFeeds();
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
