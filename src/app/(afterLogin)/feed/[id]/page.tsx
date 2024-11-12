'use client';
import { useFetchOneFeed } from '@/lib/feed/hook/useFetchOneFeed';
import { FeedData } from '@/types';
import { CarouselComponent } from '@/components/ui/carousel/carousel';
import CommentInput from '@/components/comment/comment-input';
import { useFetchComments } from '@/lib/comment/hook/useFetchComments';
import { useUpdateComment } from '@/lib/comment/hook/useUpdateComment';
import { CommentList } from '@/components/comment/comment-list';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import UserInfo from '@/components/feed/user-info';
const ROWS_PER_PAGE = 10;

function FeedSection({ feedId }: { feedId: string }) {
  const { data: feed, isLoading: fetchFeedLoading } = useFetchOneFeed(feedId);
  if (fetchFeedLoading) return <div>Loading...</div>;
  const { imagesArray } = feed as FeedData;

  return (
    <>
      <UserInfo
        writer={feed?.userName as string}
        writerId={feed?.userId as string}
        profileImg={feed?.profileImg as string}
      />
      {imagesArray && imagesArray?.length > 0 && (
        <CarouselComponent images={imagesArray} />
      )}
      <div>
        <div className="pt-default whitespace-pre-wrap">{feed?.content}</div>
        {feed?.priceOption === 1 ? (
          <div className="text-sm text-gray-400 mt-2 mb-2">{`소비 금액 : ${feed?.price}`}</div>
        ) : (
          <></>
        )}
        <div className="pt-1 pb-default text-sm text-gray-500">
          {feed?.createdAt}
        </div>
      </div>
    </>
  );
  //
}

function CommentSection({ feedId }: { feedId: string }) {
  const { data, isPending, fetchNextPage, isFetchingNextPage } =
    useFetchComments({
      feedId: feedId,
      pageSize: ROWS_PER_PAGE,
    });

  const updateCommentHook = useUpdateComment(feedId);

  const { ref, inView } = useInView({
    threshold: 0.5, // 화면의 20%가 보일 때 감지
  });
  useEffect(() => {
    if (inView) {
      fetchNextPage();
    }
  }, [inView]);

  const handleMutate = (content: string, commentId: string) => {
    updateCommentHook.mutate({ content, commentId });
  };

  if (isPending) return <></>;
  const commentsGroup = data ? data.pages.map((page) => page.comments) : [];

  return (
    <div>
      <CommentList comments={commentsGroup} mutateFn={handleMutate} />
      {isFetchingNextPage ? (
        <div>Loading...</div>
      ) : (
        <div ref={ref} style={{ width: '100%', height: 80 }} />
      )}
    </div>
  );
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
