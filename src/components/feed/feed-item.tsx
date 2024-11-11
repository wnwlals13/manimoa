import { FiMessageCircle } from 'react-icons/fi';
import { CarouselComponent } from '../ui/carousel/carousel';
import { IFeedWithLikeData } from '@/types';
import Link from 'next/link';
import InteractiveButton from '../ui/button/interactive-button';
import Profile from '../ui/profile';
import { LikeButton } from '../ui/button/like-button';
import { FollowButton } from '../ui/button/follow-button';
import React, { useEffect, useState } from 'react';
import { formatDate } from '@/util/formatDate';

export const UserInfoGroup = React.memo(function UserInfoGroup({
  writer,
  writerId,
  profileImg,
}: {
  writer: string;
  writerId: string;
  profileImg: string;
}) {
  return (
    <div className="flex p-2">
      <div className="flex-1 flex items-center gap-2">
        <Profile src={profileImg} size="md" />
        <Link href={`/user/${writerId}`} className="flex-1">
          {writer}
        </Link>
      </div>
      <div>
        <FollowButton targetId={writerId}></FollowButton>
      </div>
    </div>
  );
});

export const Contents = React.memo(function Contents({
  feedId,
  content,
  createdAt,
}: {
  feedId: number;
  content: string;
  createdAt: string;
}) {
  const [displayDate, setDisplayDate] = useState<string>();

  useEffect(() => {
    if (createdAt) {
      setDisplayDate(formatDate(createdAt));
    }
  }, [createdAt]);

  return (
    <Link href={`/feed/${feedId}`}>
      <div className="max-w-[400px] overflow-hidden pt-default text-ellipsis">
        {content}
      </div>
      <div className="pt-1 pb-default text-sm text-gray-500">{displayDate}</div>
    </Link>
  );
});

export const FeedItem = React.memo(function FeedItem({
  feedId,
  userId,
  userName,
  profileImg,
  images,
  commentCount,
  createdAt,
  content,
  likeCount,
  isUserDoLike,
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
      <UserInfoGroup
        writer={userName}
        writerId={userId}
        profileImg={profileImg!}
      />
      {imgsArr && <CarouselComponent images={imgsArr} />}
      <div className="flex gap-2 mt-4">
        <LikeButton
          feedId={feedId}
          isLiked={isUserDoLike}
          likeCount={likeCount}
        />
        <InteractiveButton variant="submain" name={`comments.${feedId}`}>
          <FiMessageCircle size="20" /> {commentCount}
        </InteractiveButton>
      </div>
      <Contents feedId={feedId} content={content} createdAt={createdAt} />
    </div>
  );
});
