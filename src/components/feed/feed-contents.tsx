import { formatDate } from '@/util/formatDate';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const FeedContents = React.memo(function Contents({
  feedId,
  content,
  createdAt,
  price,
  priceOption,
}: {
  feedId: string;
  content: string;
  createdAt: string;
  price: string;
  priceOption: number;
}) {
  const [displayDate, setDisplayDate] = useState<string>();

  useEffect(() => {
    if (createdAt) {
      setDisplayDate(formatDate(createdAt));
    }
  }, [createdAt]);

  return (
    <Link href={`/feed/${feedId}`}>
      <div className="max-w-[200px] overflow-hidden pt-default text-ellipsis line-clamp-1">
        {content}
      </div>
      {priceOption === 1 ? (
        <div className="text-sm text-gray-400 mt-2 mb-2">{`소비 금액 : -${price}`}</div>
      ) : (
        <></>
      )}
      <div className="pt-1 pb-default text-sm text-gray-500">{displayDate}</div>
    </Link>
  );
});

export default FeedContents;
