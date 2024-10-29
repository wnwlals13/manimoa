import { Button } from '@/components/ui/button';
import { CarouselComponent } from '@/components/ui/carousel';
import InteractiveButton from '@/components/ui/interactiveButton';
import Profile from '@/components/ui/profile';
import { FeedData } from '@/types';
import { FiHeart, FiMessageCircle } from 'react-icons/fi';

async function FeedDetail({ feedId }: { feedId: string }) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/feed/detail?id=${feedId}`,
    { method: 'get' },
  );
  if (!response.ok) {
    console.error('게시글 상세보기 도중 에러발생!');
  }
  const { feed } = await response.json();
  const feedInfo = feed[0] as FeedData;
  console.log('feed', feed);

  const imagesArray = feedInfo.images?.split(',');
  return (
    <div>
      <div className="flex items-center p-default gap-2">
        <Profile profileImg={feedInfo.profileImg} />
        <div className="flex-1">{feedInfo.userName}</div>
        <Button variant="outline">팔로우</Button>
      </div>
      {imagesArray && <CarouselComponent images={imagesArray} />}
      <div className="flex gap-2 mt-4">
        <Button variant="main">
          <FiHeart size="20" /> {feedInfo.likeCount}
        </Button>
        <InteractiveButton variant="submain" name={`comments.${feedId}`}>
          <FiMessageCircle size="20" /> {feedInfo.commentCount}
        </InteractiveButton>
      </div>
      <div className="p-default">{feedInfo.content}</div>
    </div>
  );
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <div>
      <FeedDetail feedId={params.id} />
      {/* <CommentList feedId={params.id} /> */}
    </div>
  );
}
