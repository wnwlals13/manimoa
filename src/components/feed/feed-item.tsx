import { AiOutlineHeart } from 'react-icons/ai';
import { AiFillHeart } from 'react-icons/ai';
import { FiMessageCircle } from 'react-icons/fi';
import { CarouselComponent } from '../ui/carousel/carousel';
import { FeedData, LikeData } from '@/types';
import Link from 'next/link';
import InteractiveButton from '../ui/button/interactive-button';
import Profile from '../ui/profile';
import { LikeButton } from '../ui/button/like-button';
import { FollowButton } from '../ui/button/follow-button';
import { formatDate } from '@/lib/formatDate';

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
    <div className="flex p-2">
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
  createdAt,
}: FeedData & LikeData) {
  const imagesArray = images?.split(',');
  const feedDisplayDate = formatDate(createdAt);

  return (
    <div className="border-b mb-4">
      <UserInfoGroup
        writer={userName}
        writerId={userId}
        profileImg={profileImg!}
      />
      {imagesArray && <CarouselComponent images={imagesArray} />}
      <div className="flex gap-2 mt-4">
        <LikeButton feedId={id} isLiked={isUserDoLike > 0}>
          {isUserDoLike > 0 ? <AiFillHeart color="red" /> : <AiOutlineHeart />}{' '}
          {likeCount}
        </LikeButton>
        <InteractiveButton variant="submain" name={`comments.${id}`}>
          <FiMessageCircle size="20" /> {commentCount}
        </InteractiveButton>
      </div>
      <Link href={`/feed/${id}`}>
        <div className="max-w-[400px] overflow-hidden pt-default text-ellipsis">
          {content}
        </div>
        <div className="pt-1 pb-default text-sm text-gray-500">
          {feedDisplayDate}
        </div>
      </Link>
    </div>
  );
}
