import { FeedData } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { FiMoreHorizontal } from 'react-icons/fi';
import InteractiveButton from '../ui/button/interactive-button';
import { formatDate } from '@/util/formatDate';

export default function MyFeedItem(feed: FeedData) {
  const { id, content, images, createdAt } = feed;
  const feedDisplayDate = formatDate(createdAt);
  let imagesArray;
  if (images) {
    imagesArray = images.split(',');
  }

  return (
    <div className="flex p-default border-b justify-between items-center">
      <Link href={`/feed/${id}`} className="flex-1 flex gap-2 justify-start">
        {imagesArray && (
          <Image
            width={50}
            height={50}
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${imagesArray[0]}`}
            alt="이미지 정보"
            style={{ borderRadius: '5px', maxHeight: `50px` }}
          />
        )}
        <div className="flex flex-col gap-1">
          <p className="text-ellipsis overflow-hidden break-words line-clamp-1">
            {content}
          </p>
          <p className="text-sm text-gray-500">{feedDisplayDate}</p>
        </div>
      </Link>
      <div>
        <InteractiveButton variant="none" name={`openModal.${id}`}>
          <FiMoreHorizontal />
        </InteractiveButton>
      </div>
    </div>
  );
}
