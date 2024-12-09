import { useLike } from '@/lib/like/hook/useDoLike';
import { useUnLike } from '@/lib/like/hook/useUndoLike';
import { useAuthStore } from '@/store/auth/useAuthStore';
import { Button } from './button';

export function LikeButton({
  feedId,
  isLiked,
  likeCount,
}: {
  feedId: string;
  isLiked: number;
  likeCount: number;
}) {
  const { user } = useAuthStore();
  const { mutate: likeMutate, isPending: likePending } = useLike();
  const { mutate: unlikeMutate, isPending: unlikePending } = useUnLike();

  const handleLike = () => {
    likeMutate({ feedId, userId: user?.uid as string, isLiked, likeCount });
  };

  const handleUnLike = () => {
    unlikeMutate({ feedId, userId: user?.uid as string, isLiked, likeCount });
  };

  return (
    <Button
      isIcon={true}
      icon={isLiked ? 'like' : 'unlike'}
      style={{ width: '65px' }}
      onClick={!isLiked ? handleLike : handleUnLike}
      disabled={likePending || unlikePending}
    >
      {likeCount}
    </Button>
  );
}
