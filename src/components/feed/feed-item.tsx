import { CarouselComponent } from '../ui/carousel/carousel';
import { IFeedWithLikeData } from '@/types';
import InteractiveButton from '../ui/button/interactive-button';
import { LikeButton } from '../ui/button/like-button';
import React, { useEffect, useState } from 'react';
import UserInfo from './user-info';
import FeedContents from './feed-contents';

export const FeedItem = React.memo(function FeedItem({
  id: feedId,
  userId,
  userName,
  profileImg,
  images,
  commentCount,
  createdAt,
  content,
  likeCount,
  isUserDoLike,
  price,
  priceOption,
}: IFeedWithLikeData) {
  const [imgsArr, setImgsArr] = useState<string[]>(
    images?.split(',') as string[],
  );

  useEffect(() => {
    if (images) {
      setImgsArr(images?.split(','));
    }
  }, [images]);

  return (
    <div className="border-b mb-4">
      <UserInfo writer={userName} writerId={userId} profileImg={profileImg!} />
      {imgsArr ? <CarouselComponent images={imgsArr} /> : <></>}
      <div className="flex gap-2 mt-4">
        <LikeButton
          feedId={feedId}
          isLiked={isUserDoLike}
          likeCount={likeCount}
        />
        <InteractiveButton
          variant="accent"
          name={`comments.${feedId}`}
          isIcon={true}
          icon="comment"
        >
          {commentCount}
        </InteractiveButton>
      </div>
      <FeedContents
        feedId={feedId}
        content={content}
        createdAt={createdAt}
        price={String(price)}
        priceOption={priceOption}
      />
    </div>
  );
});
