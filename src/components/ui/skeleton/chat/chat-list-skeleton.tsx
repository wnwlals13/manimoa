import ChatItemSkeleton from './chat-item-skeleton';

export default function ChatListSkeleton({ count }: { count: number }) {
  return new Array(count)
    .fill(0)
    .map((_, idx) => <ChatItemSkeleton key={`chat-item-skeleton-${idx}`} />);
}
