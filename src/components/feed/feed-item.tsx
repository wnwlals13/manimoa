import { FiHeart } from 'react-icons/fi';
import { FiMessageCircle } from 'react-icons/fi';
import { CarouselComponent } from '../ui/carousel';
import { FeedData } from '@/types';
import Link from 'next/link';
import { Button } from '../ui/button';

export function UserInfoGroup({ writer }: { writer: number }) {
  return (
    <div className="flex items-center p-default gap-2">
      <div className="w-[40px] h-[40px] bg-gray-200 rounded-full leading-9"></div>
      <div className="flex-1">{writer}</div>
      <Button variant="outline">팔로우</Button>
    </div>
  );
}

export function IconGroup() {
  return (
    <div className="flex gap-2 mt-4">
      <Button variant="main">
        <FiHeart size="20" /> 10
      </Button>
      <Button variant="submain">
        <FiMessageCircle size="20" /> 10
      </Button>
    </div>
  );
}

export function FeedItem({ id, userId, content }: FeedData) {
  return (
    <div className="border-b mb-4">
      <UserInfoGroup writer={userId} />
      <CarouselComponent />
      <IconGroup />
      <Link href={`/feed/${id}`}>
        <div className="max-w-[400px] overflow-hidden pt-default pb-default text-ellipsis">
          {content}
        </div>
      </Link>
    </div>
  );
}
