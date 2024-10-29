import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { FiMessageCircle } from 'react-icons/fi';
import { CarouselComponent } from '../ui/carousel';
import { FeedData, LikeData } from '@/types';
import Link from 'next/link';
import InteractiveButton from '../ui/interactiveButton';
import Profile from '../ui/profile';
import { LikeButton } from '../ui/likeButton';
import { QueryObserverResult } from '@tanstack/react-query';
import { FollowButton } from '../ui/FollowButton';

export function UserInfoGroup({
  writer,
  writerId,
  profileImg,
}: {
  writer: string;
  writerId: string;
  profileImg: string;
}) {
  return (
    <div className="flex p-default">
      <div className="flex-1 flex items-center gap-2">
        <Profile profileImg={profileImg} />
        <Link href={`/user/${writerId}`} className="flex-1">
          {writer}
        </Link>
      </div>
      <div>
        <FollowButton targetId={writerId}></FollowButton>
      </div>
    </div>
  );
}

export interface FeedItemProps extends FeedData, LikeData {
  refetch: () => Promise<QueryObserverResult>;
}

export function FeedItem({
  id,
  userId,
  userName,
  profileImg,
  content,
  images,
  commentCount,
  likeCount,
  isUserDoLike,
  refetch,
}: FeedItemProps) {
  const imagesArray = images?.split(',');

  return (
    <div className="border-b mb-4">
      <UserInfoGroup
        writer={userName}
        writerId={userId}
        profileImg={profileImg!}
      />
      {imagesArray && <CarouselComponent images={imagesArray} />}
      <div className="flex gap-2 mt-4">
        <LikeButton feedId={id} isLiked={isUserDoLike > 0} refetch={refetch}>
          {isUserDoLike > 0 ? <AiFillHeart /> : <AiOutlineHeart />} {likeCount}
        </LikeButton>
        <InteractiveButton variant="submain" name={`comments.${id}`}>
          <FiMessageCircle size="20" /> {commentCount}
        </InteractiveButton>
      </div>
      <Link href={`/feed/${id}`}>
        <div className="max-w-[400px] overflow-hidden pt-default pb-default text-ellipsis">
          {content}
        </div>
      </Link>
    </div>
  );
}
