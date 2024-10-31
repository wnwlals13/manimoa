import { FeedData } from '@/types';
import Image from 'next/image';
import Link from 'next/link';
import { FiMoreHorizontal } from 'react-icons/fi';
import InteractiveButton from '../ui/interactiveButton';

export default function MyFeedItem(feed: FeedData) {
  const { id, content, images, createdAt } = feed;
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
            style={{ borderRadius: '5px' }}
          />
        )}
        <div>
          <div>{content}</div>
          <p>{createdAt}</p>
        </div>
      </Link>
      <div>
        <InteractiveButton variant="none" name={`openModal.${id}`}>
          <FiMoreHorizontal />
        </InteractiveButton>
        {/* <Link
          href={`/feed/form?isEdit=${true}&feedId=${id}`}
          // variant={'outline'}
          // size={'sm'}
          // name={`edit_feed.${id}`}
        >
          수정하기
        </Link>
        <InteractiveButton
          variant={'outline'}
          size={'sm'}
          name={`delete_feed.${id}`}
        >
          삭제하기
        </InteractiveButton> */}
      </div>
    </div>
  );
}
