import FeedItemSkeleton from './feed-item-skeleton';

export default function FeedListSkeleton({ count }: { count: number }) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => <FeedItemSkeleton key={`feed-item-skeleton-${idx}`} />);
}
