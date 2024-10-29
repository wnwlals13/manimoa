import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { FiMessageCircle } from 'react-icons/fi';
import { CarouselComponent } from '../ui/carousel';
import { FeedData, LikeData } from '@/types';
import Link from 'next/link';
import { Button } from '../ui/button';
import InteractiveButton from '../ui/interactiveButton';
import Profile from '../ui/profile';
import { LikeButton } from '../ui/likeButton';
import { QueryObserverResult } from '@tanstack/react-query';

export function UserInfoGroup({
  writer,
  profileImg,
}: {
  writer: string;
  profileImg: string;
}) {
  return (
    <div className="flex items-center p-default gap-2">
      <Profile profileImg={profileImg} />
      <div className="flex-1">{writer}</div>
      <Button variant="outline">팔로우</Button>
    </div>
  );
}

export interface FeedItemProps extends FeedData, LikeData {
  refetch: () => Promise<QueryObserverResult>;
}

export function FeedItem({
  id,
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
      <UserInfoGroup writer={userName} profileImg={profileImg!} />
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
