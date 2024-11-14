'use client';

import { useFetchOneFeed } from '@/lib/feed/hook/useFetchOneFeed';
import { FeedData } from '@/types';
import UserInfo from '../user-info';
import { CarouselComponent } from '@/components/ui/carousel/carousel';

export function FeedSection({ feedId }: { feedId: string }) {
  const { data: feed, isLoading: fetchFeedLoading } = useFetchOneFeed(feedId);
  if (fetchFeedLoading) return <div>Loading...</div>;
  const { imagesArray } = feed as FeedData;

  return (
    <>
      <UserInfo
        writer={feed?.userName as string}
        writerId={feed?.userId as string}
        profileImg={feed?.profileImg as string}
      />
      {imagesArray && imagesArray?.length > 0 && (
        <CarouselComponent images={imagesArray} />
      )}
      <div>
        <div className="pt-default whitespace-pre-wrap">{feed?.content}</div>
        {feed?.priceOption === 1 ? (
          <div className="text-sm text-gray-400 mt-2 mb-2">{`소비 금액 : ${feed?.price}`}</div>
        ) : (
          <></>
        )}
        <div className="pt-1 pb-default text-sm text-gray-500">
          {feed?.createdAt}
        </div>
      </div>
    </>
  );
  //
}
