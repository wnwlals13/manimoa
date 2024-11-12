import Link from 'next/link';
import Profile from '../ui/profile';
import { FollowButton } from '../ui/button/follow-button';
import React from 'react';

const UserInfo = React.memo(function UserInfo({
  writer,
  writerId,
  profileImg,
}: {
  writer: string;
  writerId: string;
  profileImg: string;
}) {
  return (
    <div className="flex p-2">
      <div className="flex-1 flex items-center gap-2">
        <Profile src={profileImg} size="sm" />
        <Link href={`/user/${writerId}`} className="flex-1">
          {writer}
        </Link>
      </div>
      <div>
        <FollowButton targetId={writerId}></FollowButton>
      </div>
    </div>
  );
});

export default UserInfo;
