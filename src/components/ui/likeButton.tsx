import { useLike } from '@/app/lib/like/hook/useDoLike';
import { Button } from './button';
import { useUnLike } from '@/app/lib/like/hook/useUndoLike';
import Cookies from 'js-cookie';

export function LikeButton({
  feedId,
  isLiked,
  children,
}: {
  feedId: number;
  isLiked: boolean;
  children: React.ReactNode;
}) {
  const like = useLike();
  const unLike = useUnLike();
  const cookieStore = Cookies.get('user') as string;
  const user = JSON.parse(cookieStore);

  const handleLike = () => {
    if (!user) return;
    if (!isLiked) {
      like.mutate({ feedId, userId: user.uid });
    } else {
      unLike.mutate({ feedId, userId: user.uid });
    }
  };
  return (
    <Button style={{ width: '65px' }} onClick={handleLike}>
      {children}
    </Button>
  );
}
