import { FeedData } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { FiMoreHorizontal } from 'react-icons/fi';
import InteractiveButton from '../ui/button/interactive-button';
import { formatDate } from '@/util/formatDate';
import { useAuthStore } from '@/store/auth/useAuthStore';

export default function MyFeedItem(feed: FeedData) {
  const { user } = useAuthStore();
  const { id, content, images, createdAt, userId } = feed;
  const feedDisplayDate = formatDate(createdAt);
  let imagesArray;
  if (images) {
    imagesArray = images.split(',');
  }

  return (
    <div className="flex pt-default pb-default border-b justify-between items-center">
      <Link href={`/feed/${id}`} className="flex-1 flex gap-4 justify-start">
        {imagesArray && (
          <Image
            width={50}
            height={50}
            src={`${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/${process.env.NEXT_PUBLIC_STORAGE_BUCKET}/${imagesArray[0]}`}
            alt="사용자가 업로드한 피드 이미지"
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
      {user?.uid === userId && (
        <div>
          <InteractiveButton variant="none" name={`openModal.${id}`}>
            <FiMoreHorizontal />
          </InteractiveButton>
        </div>
      )}
    </div>
  );
}
