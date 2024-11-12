'use client';
import { useFetchOneFeed } from '@/lib/feed/hook/useFetchOneFeed';
import { FeedItem } from '@/components/feed/feed-item';

export default function Page({ params }: { params: { id: string } }) {
  const { data } = useFetchOneFeed(params.id);
  return (
    <div className="mt-[60px] pl-default pr-default">
      {data && <FeedItem {...data[0]} />}
    </div>
  );
}
