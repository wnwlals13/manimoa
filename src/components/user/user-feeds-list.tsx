'use client';

import { useFetchMyFeeds } from '@/lib/user/hook/useFetchMyFeeds';
import MyFeedsSkeleton from '../ui/skeleton/mypage/my-feeds-skeleton';
import { FeedData } from '@/types';
import MyFeedItem from '../feed/my-feed-item';

export default function UserFeedsList({ userId }: { userId: string }) {
  const { data: feeds, isLoading } = useFetchMyFeeds(userId);
  if (isLoading)
    return new Array(3).fill(0).map((_, idx) => <MyFeedsSkeleton key={idx} />);

  return (
    <div className="mb-1 p-default">
      <h1 className="font-bold">내글 보기</h1>
      {feeds &&
        feeds.map((item: FeedData, idx: number) => (
          <MyFeedItem key={idx} {...item} />
        ))}
    </div>
  );
}

// async function UserFeeds({ userId }: { userId: string }) {
//     const response = await fetch(
//       `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/getFeeds?userId=${userId}`,
//       {
//         method: 'get',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//       },
//     );
//     const { feeds } = await response.json();

//     return (
//       <div className="p-default">
//         {feeds &&
//           feeds.map((item: FeedData, idx: number) => (
//             <Link
//               key={idx}
//               href={`/feed/${item.id}`}
//               className="flex justify-between items-center h-[50px] mb-5"
//             >
//               <div className=" flex items-center h-full gap-5 ">
//                 <div className="w-[50px] h-full rounded-md bg-gray-200 overflow-hidden">
//                   {item.images && (
//                     <Image
//                       width={50}
//                       height={50}
//                       src={`${
//                         process.env.NEXT_PUBLIC_SUPABASE_URL
//                       }/storage/v1/object/public/${
//                         process.env.NEXT_PUBLIC_STORAGE_BUCKET
//                       }/${item.images?.split(',')[0]}`}
//                       alt={`${userId} 사용자가 업로드한 피드 이미지`}
//                       style={{ height: '100%' }}
//                     />
//                   )}
//                 </div>
//                 <div>{item.content}</div>
//               </div>
//               <p className="text-sm text-gray-500">{item.createdAt}</p>
//             </Link>
//           ))}
//       </div>
//     );
//   }
