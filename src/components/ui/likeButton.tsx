import { useLike } from '@/app/lib/like/hook/useDoLike';
import { Button } from './button';
import { useUnLike } from '@/app/lib/like/hook/useUndoLike';
import { QueryObserverResult } from '@tanstack/react-query';

export function LikeButton({
  feedId,
  isLiked,
  refetch,
  children,
}: {
  feedId: number;
  isLiked: boolean;
  refetch: () => Promise<QueryObserverResult>;
  children: React.ReactNode;
}) {
  const like = useLike(refetch);
  const unLike = useUnLike(refetch);

  const handleLike = () => {
    console.log('isLiked', isLiked);
    if (!isLiked) {
      like.mutate({ feedId });
    } else {
      unLike.mutate({ feedId });
    }
  };
  return <Button onClick={handleLike}>{children}</Button>;
}
