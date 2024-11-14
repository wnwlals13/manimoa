import CommentInput from '@/components/comment/comment-input';
import { CommentSection } from '@/components/feed/detail/comments-section';
import { FeedSection } from '@/components/feed/detail/feed-section';
import { FeedData } from '@/types';

// 피드 게시물 메타데이터
export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = await params;

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/feedformeta/${id}`,
    { cache: 'force-cache' },
  );

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  const feed: FeedData = await response.json();

  return {
    title: `${feed.userName} 의 피드 게시물`,
    description: `${feed.content}`,
    openGraph: {
      title: `${feed.userName} 의 피드 게시물`,
      description: `${feed.content}`,
      images: [feed.images],
    },
  };
}

export default function Page({ params }: { params: { id: string } }) {
  return (
    <>
      <div className="mt-[60px] pl-default pr-default">
        <FeedSection feedId={params.id} />
        <CommentSection feedId={params.id} />
      </div>
      <CommentInput feedId={params.id as string} />
    </>
  );
}
