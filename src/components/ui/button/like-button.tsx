import { useLike } from '@/lib/like/hook/useDoLike';
import { Button } from './button';
import { useUnLike } from '@/lib/like/hook/useUndoLike';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useAuthStore } from '@/store/auth/useAuthStore';

export function LikeButton({
  feedId,
  isLiked,
  likeCount,
  children,
}: {
  feedId: number;
  isLiked: number;
  likeCount: number;
  children?: React.ReactNode;
}) {
  const { mutate: likeMutate, isPending: likePending } = useLike();
  const { mutate: unlikeMutate, isPending: unlikePending } = useUnLike();
  const { user } = useAuthStore();

  const handleLike = () => {
    likeMutate({ feedId, userId: user?.uid as string, isLiked, likeCount });
  };

  const handleUnLike = () => {
    unlikeMutate({ feedId, userId: user?.uid as string, isLiked, likeCount });
  };

  return (
    <Button
      style={{ width: '65px' }}
      onClick={!isLiked ? handleLike : handleUnLike}
      disabled={likePending || unlikePending}
    >
      {isLiked > 0 ? <AiFillHeart color="red" /> : <AiOutlineHeart />}
      {likeCount}
      {children}
    </Button>
  );
}
