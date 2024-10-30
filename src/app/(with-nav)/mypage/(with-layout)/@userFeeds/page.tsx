import { FeedData } from '@/types';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';

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
  const { feeds } = await response.json();

  return (
    <div className="">
      <div className="w-full border-t"></div>
      <h1 className="mt-4 mb-4 font-bold ">내글 보기</h1>
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
