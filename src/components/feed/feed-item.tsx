import { FiHeart } from 'react-icons/fi';
import { FiMessageCircle } from 'react-icons/fi';
import { ButtonComponent, IconButtonComponent } from '../ui/button';
import { CarouselComponent } from '../ui/carousel';
import { FeedData } from '@/types';
import Link from 'next/link';

export function UserInfoGroup({ writer }: { writer: number }) {
  return (
    <div className="flex items-center p-default gap-2">
      <div className="w-[40px] h-[40px] bg-gray-200 rounded-full leading-9"></div>
      <div className="flex-1">{writer}</div>
      <ButtonComponent intent="outline" type="button">
        팔로우
      </ButtonComponent>
    </div>
  );
}

export function IconGroup() {
  return (
    <div className="flex gap-2 mt-4">
      <IconButtonComponent intent="main" title="10">
        <FiHeart size="20" />
      </IconButtonComponent>
      <IconButtonComponent intent="subMain" title="15">
        <FiMessageCircle size="20" />
      </IconButtonComponent>
    </div>
  );
}

export function FeedItem({ userId, content }: FeedData) {
  return (
    <Link href={'/feed/1'} className="border-b mb-4">
      <UserInfoGroup writer={userId} />
      <CarouselComponent />
      <IconGroup />
      <div className="max-w-[400px] overflow-hidden pt-default pb-default text-ellipsis">
        {content}
      </div>
    </Link>
  );
}
